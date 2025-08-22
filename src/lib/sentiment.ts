import { SentimentAnalysis } from '@/types'

// Simple sentiment analysis using keyword-based approach
// In production, you'd use a proper ML model or API like Google Cloud Natural Language
export function analyzeSentiment(text: string): SentimentAnalysis {
  const lowerText = text.toLowerCase()
  
  // Sentiment keywords
  const positiveWords = [
    'excellent', 'amazing', 'great', 'fantastic', 'wonderful', 'perfect', 'love', 'best',
    'awesome', 'outstanding', 'superb', 'brilliant', 'incredible', 'delicious', 'beautiful',
    'helpful', 'friendly', 'professional', 'quick', 'fast', 'clean', 'fresh', 'recommend'
  ]
  
  const negativeWords = [
    'terrible', 'awful', 'horrible', 'worst', 'hate', 'disgusting', 'dirty', 'slow',
    'rude', 'unprofessional', 'expensive', 'overpriced', 'disappointing', 'poor', 'bad',
    'broken', 'delayed', 'cancelled', 'refund', 'complaint', 'issue', 'problem'
  ]
  
  const emotionKeywords = {
    anger: ['angry', 'furious', 'mad', 'annoyed', 'frustrated', 'outraged', 'livid'],
    joy: ['happy', 'excited', 'thrilled', 'delighted', 'pleased', 'satisfied', 'cheerful'],
    sadness: ['sad', 'disappointed', 'upset', 'depressed', 'unhappy', 'dissatisfied'],
    fear: ['worried', 'concerned', 'anxious', 'scared', 'nervous', 'uncertain'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'unexpected', 'wow']
  }
  
  // Count sentiment words
  let positiveCount = 0
  let negativeCount = 0
  const foundKeywords: string[] = []
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) {
      positiveCount++
      foundKeywords.push(word)
    }
  })
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) {
      negativeCount++
      foundKeywords.push(word)
    }
  })
  
  // Calculate emotions
  const emotions = {
    anger: 0,
    joy: 0,
    sadness: 0,
    fear: 0,
    surprise: 0
  }
  
  Object.entries(emotionKeywords).forEach(([emotion, words]) => {
    const count = words.filter(word => lowerText.includes(word)).length
    emotions[emotion as keyof typeof emotions] = Math.min(count / 3, 1) // Normalize to 0-1
  })
  
  // Calculate overall sentiment
  const totalWords = positiveCount + negativeCount
  let score = 0
  let label: 'negative' | 'neutral' | 'positive' = 'neutral'
  let confidence = 0.5
  
  if (totalWords > 0) {
    score = (positiveCount - negativeCount) / Math.max(totalWords, 1)
    confidence = Math.min(totalWords / 5, 1) // Higher confidence with more sentiment words
    
    if (score > 0.2) {
      label = 'positive'
    } else if (score < -0.2) {
      label = 'negative'
    }
  }
  
  // Adjust for exclamation marks and caps
  const exclamationCount = (text.match(/!/g) || []).length
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length
  
  if (exclamationCount > 2 || capsRatio > 0.3) {
    score = score > 0 ? Math.min(score + 0.2, 1) : Math.max(score - 0.2, -1)
    confidence = Math.min(confidence + 0.1, 1)
  }
  
  return {
    score: Math.round(score * 100) / 100,
    label,
    confidence: Math.round(confidence * 100) / 100,
    emotions,
    keywords: foundKeywords
  }
}

export function getSentimentColor(sentiment: SentimentAnalysis): string {
  if (sentiment.label === 'positive') return 'text-green-600'
  if (sentiment.label === 'negative') return 'text-red-600'
  return 'text-gray-600'
}

export function getSentimentIcon(sentiment: SentimentAnalysis): string {
  if (sentiment.label === 'positive') return '😊'
  if (sentiment.label === 'negative') return '😞'
  return '😐'
}
