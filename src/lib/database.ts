// Database abstraction layer supporting multiple storage backends
import { Template, SentimentAnalysis } from '@/types'
import { createClient } from '@supabase/supabase-js'

// For development/demo - in-memory storage (global across all instances)
const globalThis = global as any

if (!globalThis.inMemoryTemplates) {
  globalThis.inMemoryTemplates = []
}

if (!globalThis.inMemoryRateLimit) {
  globalThis.inMemoryRateLimit = new Map<string, { count: number; resetTime: number }>()
}

const inMemoryTemplates: Template[] = globalThis.inMemoryTemplates
const inMemoryRateLimit = globalThis.inMemoryRateLimit

// Database interface - can be implemented with different backends
export interface DatabaseAdapter {
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

  async getTemplates(): Promise<Template[]> {
    if (!this.kv) return new InMemoryAdapter().getTemplates()
    
    try {
      const data = await this.kv.get('templates')
      return data || []
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
      
      const dailyKey = `rate_limit:${ip}:daily:${dayStart}`
      const minuteKey = `rate_limit:${ip}:minute:${minuteStart}`
      
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
      await this.kv.incr(dailyKey)
      await this.kv.expire(dailyKey, 86400) // 24 hours
      await this.kv.incr(minuteKey)
      await this.kv.expire(minuteKey, 60) // 1 minute
      
      return { allowed: true }
    } catch (error) {
      console.error('KV Rate limit error:', error)
      return new InMemoryAdapter().checkRateLimit(ip)
    }
  }

  async cleanup(): Promise<void> {
    // KV cleanup is handled by TTL
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