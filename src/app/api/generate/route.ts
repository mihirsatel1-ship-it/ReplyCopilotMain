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
  const { review, stars = 3, tone, brandVoice, length, aiModel, businessType } = data;
  
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

  const modelContext = aiModel ? `Using ${aiModel} model for enhanced response quality.` : '';

  // Enhanced business-specific guidance
  const businessGuidance = getBusinessSpecificGuidance(businessType, stars);

  return `You are a professional customer service representative helping businesses respond to customer reviews.

${starGuidance}

${businessGuidance}

Business Type: ${businessType || 'General Business'}
Brand Voice: ${brandVoice || 'Professional and customer-focused'}
Tone: ${tone}
Length: ${lengthGuidance[length]}
${modelContext}

Customer Review: "${review}"

Generate exactly 3 different response options labeled A, B, and C. Each response should:
- Match the specified tone and brand voice EXACTLY
- Be appropriate for the star rating and business type
- Include the specified length
- Be professional and authentic
- Avoid generic responses - make them specific to the business type
- Use industry-appropriate language and terminology
- Address the specific concerns or compliments mentioned

Format your response exactly as follows:
A: [Response A]
B: [Response B] 
C: [Response C]

Do not include any other text, explanations, or formatting.`;
}

function getBusinessSpecificGuidance(businessType: string = '', stars?: number): string {
  const businessTypeLower = businessType.toLowerCase();
  
  // Restaurant & Food Service
  if (businessTypeLower.includes('restaurant') || businessTypeLower.includes('food')) {
    if (stars && stars <= 2) {
      return 'This is a restaurant review. For negative feedback, acknowledge the specific food quality, service, or atmosphere issues. Offer solutions like a return visit, discount, or direct contact. Use food service terminology appropriately.';
    }
    return 'This is a restaurant review. For positive feedback, mention specific dishes, service quality, or atmosphere details. Encourage return visits and word-of-mouth recommendations. Use warm, food-focused language.';
  }
  
  // Hospitality & Travel
  if (businessTypeLower.includes('hotel') || businessTypeLower.includes('airbnb') || businessTypeLower.includes('vacation')) {
    if (stars && stars <= 2) {
      return 'This is a hospitality review. For negative feedback, address specific accommodation, cleanliness, or service issues. Offer compensation or future stay discounts. Use hospitality industry language.';
    }
    return 'This is a hospitality review. For positive feedback, mention specific amenities, service quality, or guest experience details. Encourage future stays and referrals. Use welcoming, hospitality-focused language.';
  }
  
  // Retail & E-commerce
  if (businessTypeLower.includes('retail') || businessTypeLower.includes('e-commerce')) {
    if (stars && stars <= 2) {
      return 'This is a retail review. For negative feedback, address product quality, customer service, or shopping experience issues. Offer returns, exchanges, or direct assistance. Use retail customer service language.';
    }
    return 'This is a retail review. For positive feedback, mention specific products, service quality, or shopping experience details. Encourage future purchases and referrals. Use retail-focused language.';
  }
  
  // Professional Services
  if (businessTypeLower.includes('legal') || businessTypeLower.includes('medical') || businessTypeLower.includes('consulting')) {
    if (stars && stars <= 2) {
      return 'This is a professional service review. For negative feedback, address specific service quality, communication, or outcome issues professionally. Offer follow-up consultations or direct contact. Use professional service terminology.';
    }
    return 'This is a professional service review. For positive feedback, acknowledge specific expertise, service quality, or outcome details. Encourage referrals and future engagement. Use professional, trustworthy language.';
  }
  
  // Technology & Digital
  if (businessTypeLower.includes('technology') || businessTypeLower.includes('digital') || businessTypeLower.includes('agency')) {
    if (stars && stars <= 2) {
      return 'This is a technology service review. For negative feedback, address specific technical issues, communication, or service quality problems. Offer technical support or direct assistance. Use tech industry language appropriately.';
    }
    return 'This is a technology service review. For positive feedback, mention specific technical solutions, service quality, or innovation details. Encourage future projects and referrals. Use tech-focused, innovative language.';
  }
  
  // Beauty & Wellness
  if (businessTypeLower.includes('spa') || businessTypeLower.includes('wellness') || businessTypeLower.includes('fitness')) {
    if (stars && stars <= 2) {
      return 'This is a wellness service review. For negative feedback, address specific service quality, environment, or experience issues. Offer complimentary services or direct contact. Use wellness-focused, caring language.';
    }
    return 'This is a wellness service review. For positive feedback, mention specific treatments, atmosphere, or wellness benefits. Encourage return visits and referrals. Use relaxing, wellness-focused language.';
  }
  
  // Automotive & Services
  if (businessTypeLower.includes('automotive') || businessTypeLower.includes('auto')) {
    if (stars && stars <= 2) {
      return 'This is an automotive service review. For negative feedback, address specific repair quality, service, or communication issues. Offer follow-up service or direct contact. Use automotive industry language.';
    }
    return 'This is an automotive service review. For positive feedback, mention specific repair quality, service, or vehicle care details. Encourage future service and referrals. Use automotive-focused, trustworthy language.';
  }
  
  // Education & Training
  if (businessTypeLower.includes('education')) {
    if (stars && stars <= 2) {
      return 'This is an educational service review. For negative feedback, address specific learning outcomes, communication, or service quality issues. Offer additional support or direct contact. Use educational, supportive language.';
    }
    return 'This is an educational service review. For positive feedback, mention specific learning outcomes, teaching quality, or educational benefits. Encourage continued learning and referrals. Use educational, encouraging language.';
  }
  
  // Default guidance
  return 'Focus on providing excellent customer service responses that match the business type and address the specific feedback provided.';
}

function generateSuggestions(sentiment: any, stars?: number, tone?: string, businessType?: string): string[] {
  const suggestions: string[] = []
  const businessTypeLower = businessType?.toLowerCase() || ''
  
  if (sentiment.label === 'negative') {
    suggestions.push('Consider acknowledging the specific issue mentioned')
    suggestions.push('Offer a concrete solution or next steps')
    suggestions.push('Invite them to contact you directly to resolve the matter')
    
    // Business-specific negative suggestions
    if (businessTypeLower.includes('restaurant') || businessTypeLower.includes('food')) {
      suggestions.push('Offer a complimentary meal or discount on their next visit')
      suggestions.push('Invite them to speak with the manager or chef directly')
    } else if (businessTypeLower.includes('hotel') || businessTypeLower.includes('airbnb')) {
      suggestions.push('Offer a room upgrade or discount on future stays')
      suggestions.push('Provide contact for the general manager')
    } else if (businessTypeLower.includes('retail') || businessTypeLower.includes('e-commerce')) {
      suggestions.push('Offer a return, exchange, or store credit')
      suggestions.push('Provide direct customer service contact')
    } else if (businessTypeLower.includes('medical') || businessTypeLower.includes('healthcare')) {
      suggestions.push('Offer a follow-up consultation or appointment')
      suggestions.push('Provide direct contact for patient relations')
    }
  } else if (sentiment.label === 'positive') {
    suggestions.push('Thank them for specific details they mentioned')
    suggestions.push('Encourage them to share their experience with others')
    suggestions.push('Invite them to return or try other services')
    
    // Business-specific positive suggestions
    if (businessTypeLower.includes('restaurant') || businessTypeLower.includes('food')) {
      suggestions.push('Invite them to try seasonal menu items or special events')
      suggestions.push('Encourage them to join your loyalty program')
    } else if (businessTypeLower.includes('hotel') || businessTypeLower.includes('airbnb')) {
      suggestions.push('Invite them to book future stays or join loyalty program')
      suggestions.push('Encourage them to recommend your property to friends')
    } else if (businessTypeLower.includes('retail') || businessTypeLower.includes('e-commerce')) {
      suggestions.push('Invite them to check out new arrivals or sales')
      suggestions.push('Encourage them to join your email list for updates')
    } else if (businessTypeLower.includes('medical') || businessTypeLower.includes('healthcare')) {
      suggestions.push('Invite them to schedule follow-up appointments')
      suggestions.push('Encourage them to refer friends and family')
    }
  } else {
    suggestions.push('Ask for more specific feedback to improve')
    suggestions.push('Highlight your commitment to customer satisfaction')
    
    // Business-specific neutral suggestions
    if (businessTypeLower.includes('restaurant') || businessTypeLower.includes('food')) {
      suggestions.push('Invite them to try different menu items on their next visit')
    } else if (businessTypeLower.includes('hotel') || businessTypeLower.includes('airbnb')) {
      suggestions.push('Invite them to experience different room types or amenities')
    } else if (businessTypeLower.includes('retail') || businessTypeLower.includes('e-commerce')) {
      suggestions.push('Invite them to explore other product categories')
    }
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
    const suggestions = generateSuggestions(sentiment, body.stars, body.tone, body.businessType);
    
    // Calculate metadata
    const processingTime = Date.now() - startTime;
    const metadata = {
      generatedAt: new Date().toISOString(),
      model: body.aiModel || 'gemini-1.5-flash', // Use the selected model name
      processingTime,
      wordCount: Math.round(Object.values(options).reduce((acc, text) => acc + text.split(' ').length, 0) / 3),
      readabilityScore: Math.round(calculateReadabilityScore(Object.values(options).join(' ')) * 10) / 10
    };





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
