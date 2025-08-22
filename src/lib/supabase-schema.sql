-- Supabase Database Schema for ReplyPilot
-- Run this in your Supabase SQL editor to set up the database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Templates table for saved response templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  tone VARCHAR(20) NOT NULL,
  brand_voice TEXT,
  length VARCHAR(10) NOT NULL,
  platform VARCHAR(20) DEFAULT 'other',
  business_type VARCHAR(50),
  usage_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT FALSE,
  created_by UUID, -- for user accounts later
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate limiting table (alternative to Redis)
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_hash VARCHAR(64) NOT NULL,
  limit_type VARCHAR(10) NOT NULL, -- 'daily' or 'minute'
  count INTEGER DEFAULT 1,
  reset_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ip_hash, limit_type, reset_time)
);

-- User accounts table (for future user management)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  plan VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
  usage_current INTEGER DEFAULT 0,
  usage_limit INTEGER DEFAULT 30,
  usage_reset_date DATE DEFAULT CURRENT_DATE + INTERVAL '1 month',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_rate_limits_ip_type ON rate_limits(ip_hash, limit_type);
CREATE INDEX idx_rate_limits_reset_time ON rate_limits(reset_time);
CREATE INDEX idx_templates_platform ON templates(platform);
CREATE INDEX idx_templates_business_type ON templates(business_type);

-- Row Level Security (RLS) policies
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public read access for public templates
CREATE POLICY "Public templates are readable" ON templates
  FOR SELECT USING (is_public = true);

-- Rate limits are only accessible by service role
CREATE POLICY "Rate limits service access" ON rate_limits
  FOR ALL USING (auth.role() = 'service_role');

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Insert some default public templates
INSERT INTO templates (id, name, description, tone, brand_voice, length, platform, business_type, is_public) VALUES
  (uuid_generate_v4(), 'Restaurant - Positive Review', 'For positive restaurant reviews', 'friendly', 'Warm, welcoming, and passionate about food quality', 'medium', 'google', 'Restaurant', true),
  (uuid_generate_v4(), 'Restaurant - Service Issue', 'For negative reviews about service', 'professional', 'Apologetic, solution-focused, and committed to improvement', 'long', 'google', 'Restaurant', true),
  (uuid_generate_v4(), 'Hotel - Great Stay', 'For positive hotel experiences', 'professional', 'Hospitable, attentive, and dedicated to guest satisfaction', 'medium', 'tripadvisor', 'Hotel', true),
  (uuid_generate_v4(), 'Retail - General Feedback', 'For general retail feedback', 'friendly', 'Customer-focused and helpful', 'short', 'other', 'Retail', true),
  (uuid_generate_v4(), 'Service - Professional', 'For professional service businesses', 'professional', 'Expert, reliable, and results-oriented', 'medium', 'google', 'Professional Service', true);


