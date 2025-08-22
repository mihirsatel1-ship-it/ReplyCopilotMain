// Database abstraction layer supporting multiple storage backends
import { Analytics, Template, SentimentAnalysis } from '@/types'
import { createClient } from '@supabase/supabase-js'

// For development/demo - in-memory storage (global across all instances)
const globalThis = global as any

if (!globalThis.inMemoryAnalytics) {
  globalThis.inMemoryAnalytics = {
    totalGenerations: 0,
    successRate: 1.0,
    averageResponseTime: 0,
    sentimentDistribution: {
      positive: 0,
      neutral: 0,
      negative: 0
    },
    platformBreakdown: {},
    tonePreferences: {},
    timeSeriesData: []
  }
}

if (!globalThis.inMemoryTemplates) {
  globalThis.inMemoryTemplates = []
}

if (!globalThis.inMemoryRateLimit) {
  globalThis.inMemoryRateLimit = new Map<string, { count: number; resetTime: number }>()
}

const inMemoryAnalytics: Analytics = globalThis.inMemoryAnalytics
const inMemoryTemplates: Template[] = globalThis.inMemoryTemplates
const inMemoryRateLimit = globalThis.inMemoryRateLimit

// Database interface - can be implemented with different backends
export interface DatabaseAdapter {
  // Analytics
  getAnalytics(): Promise<Analytics>
  updateAnalytics(data: Partial<Analytics>): Promise<void>
  trackGeneration(success: boolean, responseTime: number, tone: string, platform: string, sentiment?: SentimentAnalysis): Promise<void>
  
  // Templates
  getTemplates(): Promise<Template[]>
  saveTemplate(template: Template): Promise<void>
  deleteTemplate(id: string): Promise<void>
  
  // Rate Limiting
  checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }>
  
  // Cleanup
  cleanup(): Promise<void>
}

// In-Memory Database Adapter (for development/demo)
class InMemoryAdapter implements DatabaseAdapter {
  async getAnalytics(): Promise<Analytics> {
    return { ...inMemoryAnalytics }
  }

  async updateAnalytics(data: Partial<Analytics>): Promise<void> {
    Object.assign(inMemoryAnalytics, data)
  }

  async trackGeneration(
    success: boolean,
    responseTime: number,
    tone: string,
    platform: string = 'other',
    sentiment?: SentimentAnalysis
  ): Promise<void> {
    // console.log('📊 Tracking generation:', { success, responseTime, tone, platform, sentiment: sentiment?.label })
    inMemoryAnalytics.totalGenerations++
    
    // Update success rate
    const successCount = Math.round(inMemoryAnalytics.successRate * (inMemoryAnalytics.totalGenerations - 1))
    inMemoryAnalytics.successRate = success 
      ? (successCount + 1) / inMemoryAnalytics.totalGenerations
      : successCount / inMemoryAnalytics.totalGenerations
    
    // Update average response time
    inMemoryAnalytics.averageResponseTime = 
      (inMemoryAnalytics.averageResponseTime * (inMemoryAnalytics.totalGenerations - 1) + responseTime) / 
      inMemoryAnalytics.totalGenerations
    
    // Update sentiment distribution
    if (sentiment) {
      inMemoryAnalytics.sentimentDistribution[sentiment.label]++
    }
    
    // Update platform breakdown
    inMemoryAnalytics.platformBreakdown[platform] = (inMemoryAnalytics.platformBreakdown[platform] || 0) + 1
    
    // Update tone preferences
    inMemoryAnalytics.tonePreferences[tone] = (inMemoryAnalytics.tonePreferences[tone] || 0) + 1
    
    // Update time series data
    const today = new Date().toISOString().split('T')[0]
    const existingEntry = inMemoryAnalytics.timeSeriesData.find(entry => entry.date === today)
    
    if (existingEntry) {
      existingEntry.generations++
      if (sentiment) {
        existingEntry.avgSentiment = (existingEntry.avgSentiment + sentiment.score) / 2
      }
    } else {
      inMemoryAnalytics.timeSeriesData.push({
        date: today,
        generations: 1,
        avgSentiment: sentiment?.score || 0
      })
    }
    
    // Keep only last 30 days
    inMemoryAnalytics.timeSeriesData = inMemoryAnalytics.timeSeriesData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30)
  }

  async getTemplates(): Promise<Template[]> {
    return [...inMemoryTemplates]
  }

  async saveTemplate(template: Template): Promise<void> {
    const existingIndex = inMemoryTemplates.findIndex(t => t.id === template.id)
    if (existingIndex >= 0) {
      inMemoryTemplates[existingIndex] = template
    } else {
      inMemoryTemplates.push(template)
    }
  }

  async deleteTemplate(id: string): Promise<void> {
    const index = inMemoryTemplates.findIndex(t => t.id === id)
    if (index >= 0) {
      inMemoryTemplates.splice(index, 1)
    }
  }

  async checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
    const now = Date.now()
    const dayStart = new Date().setHours(0, 0, 0, 0)
    const minuteStart = Math.floor(now / 60000) * 60000
    
    const dailyKey = `${ip}:daily:${dayStart}`
    const minuteKey = `${ip}:minute:${minuteStart}`
    
    // Daily limit (30/day)
    const dailyData = inMemoryRateLimit.get(dailyKey) || { count: 0, resetTime: dayStart + 86400000 }
    if (now > dailyData.resetTime) {
      inMemoryRateLimit.delete(dailyKey)
      inMemoryRateLimit.set(dailyKey, { count: 1, resetTime: dayStart + 86400000 })
    } else if (dailyData.count >= 30) {
      return { allowed: false, message: 'Daily limit reached. Please try again tomorrow.' }
    } else {
      dailyData.count++
      inMemoryRateLimit.set(dailyKey, dailyData)
    }
    
    // Minute limit (3/min)
    const minuteData = inMemoryRateLimit.get(minuteKey) || { count: 0, resetTime: minuteStart + 60000 }
    if (now > minuteData.resetTime) {
      inMemoryRateLimit.delete(minuteKey)
      inMemoryRateLimit.set(minuteKey, { count: 1, resetTime: minuteStart + 60000 })
    } else if (minuteData.count >= 3) {
      return { allowed: false, message: 'Too many requests. Please wait a minute and try again.' }
    } else {
      minuteData.count++
      inMemoryRateLimit.set(minuteKey, minuteData)
    }
    
    return { allowed: true }
  }

  async cleanup(): Promise<void> {
    // Clean up old rate limit entries
    const now = Date.now()
    for (const [key, data] of inMemoryRateLimit.entries()) {
      if (now > data.resetTime) {
        inMemoryRateLimit.delete(key)
      }
    }
  }
}

// Vercel KV (Redis) Adapter
class VercelKVAdapter implements DatabaseAdapter {
  private kv: any

  constructor() {
    // Only import @vercel/kv in production/when available
    try {
      this.kv = require('@vercel/kv')
    } catch {
      console.warn('Vercel KV not available, falling back to in-memory storage')
      this.kv = null
    }
  }

  async getAnalytics(): Promise<Analytics> {
    if (!this.kv) return new InMemoryAdapter().getAnalytics()
    
    try {
      const data = await this.kv.get('analytics')
      return data || {
        totalGenerations: 0,
        successRate: 1.0,
        averageResponseTime: 0,
        sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
        platformBreakdown: {},
        tonePreferences: {},
        timeSeriesData: []
      }
    } catch (error) {
      console.error('KV Analytics fetch error:', error)
      return new InMemoryAdapter().getAnalytics()
    }
  }

  async updateAnalytics(data: Partial<Analytics>): Promise<void> {
    if (!this.kv) return new InMemoryAdapter().updateAnalytics(data)
    
    try {
      const current = await this.getAnalytics()
      const updated = { ...current, ...data }
      await this.kv.set('analytics', updated)
    } catch (error) {
      console.error('KV Analytics update error:', error)
    }
  }

  async trackGeneration(
    success: boolean,
    responseTime: number,
    tone: string,
    platform: string = 'other',
    sentiment?: SentimentAnalysis
  ): Promise<void> {
    if (!this.kv) return new InMemoryAdapter().trackGeneration(success, responseTime, tone, platform, sentiment)
    
    try {
      const analytics = await this.getAnalytics()
      
      analytics.totalGenerations++
      
      // Update success rate
      const successCount = Math.round(analytics.successRate * (analytics.totalGenerations - 1))
      analytics.successRate = success 
        ? (successCount + 1) / analytics.totalGenerations
        : successCount / analytics.totalGenerations
      
      // Update average response time
      analytics.averageResponseTime = 
        (analytics.averageResponseTime * (analytics.totalGenerations - 1) + responseTime) / 
        analytics.totalGenerations
      
      // Update sentiment distribution
      if (sentiment) {
        analytics.sentimentDistribution[sentiment.label]++
      }
      
      // Update platform breakdown
      analytics.platformBreakdown[platform] = (analytics.platformBreakdown[platform] || 0) + 1
      
      // Update tone preferences
      analytics.tonePreferences[tone] = (analytics.tonePreferences[tone] || 0) + 1
      
      // Update time series data
      const today = new Date().toISOString().split('T')[0]
      const existingEntry = analytics.timeSeriesData.find(entry => entry.date === today)
      
      if (existingEntry) {
        existingEntry.generations++
        if (sentiment) {
          existingEntry.avgSentiment = (existingEntry.avgSentiment + sentiment.score) / 2
        }
      } else {
        analytics.timeSeriesData.push({
          date: today,
          generations: 1,
          avgSentiment: sentiment?.score || 0
        })
      }
      
      // Keep only last 30 days
      analytics.timeSeriesData = analytics.timeSeriesData
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30)

      await this.kv.set('analytics', analytics)
    } catch (error) {
      console.error('KV Track generation error:', error)
    }
  }

  async getTemplates(): Promise<Template[]> {
    if (!this.kv) return new InMemoryAdapter().getTemplates()
    
    try {
      const templates = await this.kv.get('templates')
      return templates || []
    } catch (error) {
      console.error('KV Templates fetch error:', error)
      return []
    }
  }

  async saveTemplate(template: Template): Promise<void> {
    if (!this.kv) return new InMemoryAdapter().saveTemplate(template)
    
    try {
      const templates = await this.getTemplates()
      const existingIndex = templates.findIndex(t => t.id === template.id)
      
      if (existingIndex >= 0) {
        templates[existingIndex] = template
      } else {
        templates.push(template)
      }
      
      await this.kv.set('templates', templates)
    } catch (error) {
      console.error('KV Template save error:', error)
    }
  }

  async deleteTemplate(id: string): Promise<void> {
    if (!this.kv) return new InMemoryAdapter().deleteTemplate(id)
    
    try {
      const templates = await this.getTemplates()
      const filtered = templates.filter(t => t.id !== id)
      await this.kv.set('templates', filtered)
    } catch (error) {
      console.error('KV Template delete error:', error)
    }
  }

  async checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
    if (!this.kv) return new InMemoryAdapter().checkRateLimit(ip)
    
    try {
      const now = Date.now()
      const dayStart = new Date().setHours(0, 0, 0, 0)
      const minuteStart = Math.floor(now / 60000) * 60000
      
      const dailyKey = `ratelimit:${ip}:daily:${dayStart}`
      const minuteKey = `ratelimit:${ip}:minute:${minuteStart}`
      
      // Check daily limit
      const dailyCount = await this.kv.get(dailyKey) || 0
      if (dailyCount >= 30) {
        return { allowed: false, message: 'Daily limit reached. Please try again tomorrow.' }
      }
      
      // Check minute limit
      const minuteCount = await this.kv.get(minuteKey) || 0
      if (minuteCount >= 3) {
        return { allowed: false, message: 'Too many requests. Please wait a minute and try again.' }
      }
      
      // Increment counters
      await Promise.all([
        this.kv.set(dailyKey, dailyCount + 1, { ex: 86400 }), // 24 hours
        this.kv.set(minuteKey, minuteCount + 1, { ex: 60 })   // 1 minute
      ])
      
      return { allowed: true }
    } catch (error) {
      console.error('KV Rate limit error:', error)
      // Fallback to in-memory on error
      return new InMemoryAdapter().checkRateLimit(ip)
    }
  }

  async cleanup(): Promise<void> {
    // KV handles TTL automatically, no cleanup needed
  }
}

// Supabase Adapter (for when you want full database features)
class SupabaseAdapter implements DatabaseAdapter {
  private supabase: any

  constructor() {
    // Only initialize when environment variables are available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        this.supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          }
        )
        console.log('✅ Supabase database adapter initialized')
      } catch (error) {
        console.warn('⚠️ Supabase initialization failed:', error)
        this.supabase = null
      }
    } else {
      console.log('ℹ️ Supabase environment variables not found, using fallback')
      this.supabase = null
    }
  }

  async getAnalytics(): Promise<Analytics> {
    if (!this.supabase) return new InMemoryAdapter().getAnalytics()
    
    try {
      const { data, error } = await this.supabase
        .from('analytics')
        .select('*')
        .single()
      
      if (error) throw error
      return data || {
        totalGenerations: 0,
        successRate: 1.0,
        averageResponseTime: 0,
        sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
        platformBreakdown: {},
        tonePreferences: {},
        timeSeriesData: []
      }
    } catch (error) {
      console.error('Supabase Analytics fetch error:', error)
      return new InMemoryAdapter().getAnalytics()
    }
  }

  async updateAnalytics(data: Partial<Analytics>): Promise<void> {
    if (!this.supabase) return new InMemoryAdapter().updateAnalytics(data)
    
    try {
      const { error } = await this.supabase
        .from('analytics')
        .upsert(data)
      
      if (error) throw error
    } catch (error) {
      console.error('Supabase Analytics update error:', error)
    }
  }

  async trackGeneration(
    success: boolean,
    responseTime: number,
    tone: string,
    platform: string = 'other',
    sentiment?: SentimentAnalysis
  ): Promise<void> {
    // For Supabase, we'd track individual generation events
    if (!this.supabase) return new InMemoryAdapter().trackGeneration(success, responseTime, tone, platform, sentiment)
    
    try {
      // Insert generation event
      await this.supabase.from('generation_events').insert({
        success,
        response_time: responseTime,
        tone,
        platform,
        sentiment_label: sentiment?.label,
        sentiment_score: sentiment?.score,
        created_at: new Date().toISOString()
      })
      
      // Update aggregated analytics would be done via database functions or periodic jobs
    } catch (error) {
      console.error('Supabase Track generation error:', error)
    }
  }

  async getTemplates(): Promise<Template[]> {
    if (!this.supabase) return new InMemoryAdapter().getTemplates()
    
    try {
      const { data, error } = await this.supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Supabase Templates fetch error:', error)
      return []
    }
  }

  async saveTemplate(template: Template): Promise<void> {
    if (!this.supabase) return new InMemoryAdapter().saveTemplate(template)
    
    try {
      const { error } = await this.supabase
        .from('templates')
        .upsert(template)
      
      if (error) throw error
    } catch (error) {
      console.error('Supabase Template save error:', error)
    }
  }

  async deleteTemplate(id: string): Promise<void> {
    if (!this.supabase) return new InMemoryAdapter().deleteTemplate(id)
    
    try {
      const { error } = await this.supabase
        .from('templates')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Supabase Template delete error:', error)
    }
  }

  async checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
    // For production, you'd implement this with database queries
    // For now, fallback to in-memory
    return new InMemoryAdapter().checkRateLimit(ip)
  }

  async cleanup(): Promise<void> {
    // Database cleanup would be handled by scheduled functions
  }
}

// Database factory - chooses the right adapter based on environment
function createDatabaseAdapter(): DatabaseAdapter {
  // Check for Vercel KV
  if (process.env.KV_URL && process.env.KV_REST_API_URL) {
    console.log('✅ Using Vercel KV database adapter')
    return new VercelKVAdapter()
  }
  
  // Check for Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('✅ Using Supabase database adapter')
    return new SupabaseAdapter()
  }
  
  // Fallback to in-memory for development
  console.log('ℹ️ Using in-memory database adapter for development')
  return new InMemoryAdapter()
}

// Lazy-loaded singleton instance
let _db: DatabaseAdapter | null = null
function getDB(): DatabaseAdapter {
  if (!_db) {
    _db = createDatabaseAdapter()
  }
  return _db
}

// Helper functions that use the database adapter
export async function getAnalytics(): Promise<Analytics> {
  return getDB().getAnalytics()
}

export async function trackGeneration(
  success: boolean,
  responseTime: number,
  tone: string,
  platform: string = 'other',
  sentiment?: SentimentAnalysis
): Promise<void> {
  return getDB().trackGeneration(success, responseTime, tone, platform, sentiment)
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
  return getDB().checkRateLimit(ip)
}

export async function getTemplates(): Promise<Template[]> {
  return getDB().getTemplates()
}

export async function saveTemplate(template: Template): Promise<void> {
  return getDB().saveTemplate(template)
}

export async function deleteTemplate(id: string): Promise<void> {
  return getDB().deleteTemplate(id)
}

// Periodic cleanup function
export async function performCleanup(): Promise<void> {
  return getDB().cleanup()
}
