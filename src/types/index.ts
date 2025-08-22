// Core types
export interface GenerateRequest {
  review: string
  stars?: number
  tone: 'professional' | 'friendly' | 'casual' | 'formal'
  brandVoice?: string
  length: 'short' | 'medium' | 'long'
  platform?: 'google' | 'yelp' | 'facebook' | 'tripadvisor' | 'other'
  businessType?: string
}

export interface GenerateResponse {
  options: {
    A: string
    B: string
    C: string
  }
  sentiment?: SentimentAnalysis
  suggestions?: string[]
  metadata?: ResponseMetadata
}

export interface SentimentAnalysis {
  score: number // -1 to 1
  label: 'negative' | 'neutral' | 'positive'
  confidence: number
  emotions: {
    anger: number
    joy: number
    sadness: number
    fear: number
    surprise: number
  }
  keywords: string[]
}

export interface ResponseMetadata {
  generatedAt: string
  model: string
  processingTime: number
  wordCount: number
  readabilityScore: number
}

export interface Template {
  id: string
  name: string
  description: string
  tone: GenerateRequest['tone']
  brandVoice: string
  length: GenerateRequest['length']
  platform: GenerateRequest['platform']
  businessType: string
  createdAt: string
  usageCount: number
}

export interface Analytics {
  totalGenerations: number
  successRate: number
  averageResponseTime: number
  sentimentDistribution: {
    positive: number
    neutral: number
    negative: number
  }
  platformBreakdown: Record<string, number>
  tonePreferences: Record<string, number>
  timeSeriesData: {
    date: string
    generations: number
    avgSentiment: number
  }[]
}

export interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro' | 'enterprise'
  usage: {
    current: number
    limit: number
    resetDate: string
  }
  preferences: {
    defaultTone: GenerateRequest['tone']
    defaultLength: GenerateRequest['length']
    darkMode: boolean
    notifications: boolean
  }
  createdAt: string
}

export interface ReviewMonitor {
  id: string
  userId: string
  businessName: string
  platforms: string[]
  keywords: string[]
  isActive: boolean
  lastChecked: string
  notifications: {
    email: boolean
    webhook?: string
  }
}
