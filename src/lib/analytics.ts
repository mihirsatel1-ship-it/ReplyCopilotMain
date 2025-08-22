// Legacy analytics - now redirects to database layer
// This file is kept for backward compatibility

import { getAnalytics as dbGetAnalytics, trackGeneration as dbTrackGeneration } from '@/lib/database'
import { Analytics, SentimentAnalysis } from '@/types'

export async function trackGeneration(
  success: boolean,
  responseTime: number,
  tone: string,
  platform: string = 'other',
  sentiment?: SentimentAnalysis
): Promise<void> {
  try {
    await dbTrackGeneration(success, responseTime, tone, platform, sentiment)
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

export async function getAnalytics(): Promise<Analytics> {
  return dbGetAnalytics()
}

export function resetAnalytics() {
  console.warn('resetAnalytics is deprecated - analytics are now persistent')
}
