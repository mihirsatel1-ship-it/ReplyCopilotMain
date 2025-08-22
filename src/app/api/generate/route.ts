import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { GenerateRequest, GenerateResponse } from '@/types';
import { analyzeSentiment } from '@/lib/sentiment';
import { checkRateLimit as dbCheckRateLimit } from '@/lib/database';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const dayStart = new Date().setHours(0, 0, 0, 0);
  const minuteStart = Math.floor(now / 60000) * 60000;
  
  const dailyKey = `${ip}:daily:${dayStart}`;
  const minuteKey = `${ip}:minute:${minuteStart}`;
  
  // Daily limit (30/day)
  const dailyData = rateLimitStore.get(dailyKey) || { count: 0, resetTime: dayStart + 86400000 };
  if (now > dailyData.resetTime) {
    rateLimitStore.delete(dailyKey);
    rateLimitStore.set(dailyKey, { count: 1, resetTime: dayStart + 86400000 });
  } else if (dailyData.count >= 30) {
    return { allowed: false, message: 'Daily limit reached. Please try again tomorrow.' };
  } else {
    dailyData.count++;
    rateLimitStore.set(dailyKey, dailyData);
  }
  
  // Minute limit (3/min)
  const minuteData = rateLimitStore.get(minuteKey) || { count: 0, resetTime: minuteStart + 60000 };
  if (now > minuteData.resetTime) {
    rateLimitStore.delete(minuteKey);
    rateLimitStore.set(minuteKey, { count: 1, resetTime: minuteStart + 60000 });
  } else if (minuteData.count >= 3) {
    return { allowed: false, message: 'Too many requests. Please wait a minute and try again.' };
  } else {
    minuteData.count++;
    rateLimitStore.set(minuteKey, minuteData);
  }
  
  return { allowed: true };
}

function buildPrompt(data: GenerateRequest): string {
  const { review, stars = 3, tone, brandVoice, length } = data;
  
  const starGuidance = stars <= 2 
    ? 'This is a negative review. Focus on acknowledging the issue, apologizing sincerely, and offering a specific solution or invitation to discuss offline. Be empathetic and professional.'
    : stars >= 4
    ? 'This is a positive review. Express genuine gratitude, mention specific details from their experience, and encourage future engagement. Be warm and appreciative.'
    : 'This is a neutral review. Acknowledge their feedback, thank them for taking the time to review, and express commitment to improvement. Be balanced and professional.';

  const lengthGuidance = {
    short: 'Keep responses under 50 words - concise and to the point.',
    medium: 'Keep responses between 50-100 words - balanced detail.',
    long: 'Keep responses between 100-150 words - detailed and comprehensive.'
  };

  return `You are a professional customer service representative helping businesses respond to customer reviews.

${starGuidance}

Brand Voice: ${brandVoice}
Tone: ${tone}
Length: ${lengthGuidance[length]}

Customer Review: "${review}"

Generate exactly 3 different response options labeled A, B, and C. Each response should:
- Match the specified tone and brand voice
- Be appropriate for the star rating
- Include the specified length
- Be professional and authentic
- Avoid generic responses

Format your response exactly as follows:
A: [Response A]
B: [Response B] 
C: [Response C]

Do not include any other text, explanations, or formatting.`;
}

function generateSuggestions(sentiment: any, stars?: number, tone?: string): string[] {
  const suggestions: string[] = []
  
  if (sentiment.label === 'negative') {
    suggestions.push('Consider acknowledging the specific issue mentioned')
    suggestions.push('Offer a concrete solution or next steps')
    suggestions.push('Invite them to contact you directly to resolve the matter')
  } else if (sentiment.label === 'positive') {
    suggestions.push('Thank them for specific details they mentioned')
    suggestions.push('Encourage them to share their experience with others')
    suggestions.push('Invite them to return or try other services')
  } else {
    suggestions.push('Ask for more specific feedback to improve')
    suggestions.push('Highlight your commitment to customer satisfaction')
  }
  
  if (stars && stars <= 2) {
    suggestions.push('Consider offering a discount or compensation')
    suggestions.push('Follow up privately to resolve their concerns')
  }
  
  return suggestions
}

function calculateReadabilityScore(text: string): number {
  // Simple Flesch Reading Ease approximation
  const sentences = text.split(/[.!?]+/).length - 1
  const words = text.split(/\s+/).length
  const syllables = text.split(/[aeiouAEIOU]/).length - 1
  
  if (sentences === 0 || words === 0) return 0
  
  const avgSentenceLength = words / sentences
  const avgSyllablesPerWord = syllables / words
  
  return Math.max(0, Math.min(100, 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)))
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const clientIP = getClientIP(req);
    const rateLimit = await dbCheckRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: rateLimit.message },
        { status: 429 }
      );
    }

    const body: GenerateRequest = await req.json();
    
    // Validation
    if (!body.review || body.review.trim().length < 5) {
      return NextResponse.json(
        { error: 'Review must be at least 5 characters long' },
        { status: 400 }
      );
    }

    if (!['professional', 'friendly', 'casual', 'formal'].includes(body.tone)) {
      return NextResponse.json(
        { error: 'Invalid tone selection' },
        { status: 400 }
      );
    }

    if (!['short', 'medium', 'long'].includes(body.length)) {
      return NextResponse.json(
        { error: 'Invalid length selection' },
        { status: 400 }
      );
    }

    // Validate platform if provided
    if (body.platform && !['google', 'yelp', 'facebook', 'tripadvisor', 'other'].includes(body.platform)) {
      return NextResponse.json(
        { error: 'Invalid platform selection' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = buildPrompt(body);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract A, B, C options
    const lines = text.split('\n').filter(line => line.trim());
    const parsedOptions: { [key: string]: string } = {};
    
    lines.forEach(line => {
      if (line.startsWith('A:') || line.startsWith('B:') || line.startsWith('C:')) {
        const key = line.charAt(0);
        const content = line.substring(2).trim();
        if (content) {
          parsedOptions[key] = content;
        }
      }
    });

    // Ensure we have exactly 3 options and convert to correct type
    if (Object.keys(parsedOptions).length !== 3 || !parsedOptions.A || !parsedOptions.B || !parsedOptions.C) {
      throw new Error('Invalid response format from AI model');
    }

    const options = {
      A: parsedOptions.A,
      B: parsedOptions.B,
      C: parsedOptions.C
    };



    // Analyze sentiment
    const sentiment = analyzeSentiment(body.review);
    
    // Generate suggestions based on sentiment and stars
    const suggestions = generateSuggestions(sentiment, body.stars, body.tone);
    
    // Calculate metadata
    const processingTime = Date.now() - startTime;
    const metadata = {
      generatedAt: new Date().toISOString(),
      model: 'gemini-1.5-flash',
      processingTime,
      wordCount: Math.round(Object.values(options).reduce((acc, text) => acc + text.split(' ').length, 0) / 3),
      readabilityScore: Math.round(calculateReadabilityScore(Object.values(options).join(' ')) * 10) / 10
    };



    // Track telemetry (anonymized)
    console.log('Generation completed', {
      tone: body.tone,
      starsBucket: body.stars ? (body.stars <= 2 ? 'low' : body.stars >= 4 ? 'high' : 'medium') : 'unknown',
      length: body.length,
      provider: 'gemini-1.5-flash',
      sentiment: sentiment.label,
      processingTime
    });

    const responseData: GenerateResponse = {
      options,
      sentiment,
      suggestions,
      metadata
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Generation error:', error);
    
    // Track failed generation

    
    if (error instanceof Error && error.message.includes('quota')) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate responses. Please try again.' },
      { status: 500 }
    );
  }
}
