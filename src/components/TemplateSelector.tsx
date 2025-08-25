'use client'

import { useState } from 'react'
import { Template } from '@/types'

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
  className?: string
}

// Enhanced templates with more niche and optimized options
const defaultTemplates: Template[] = [
  // Restaurant & Food Service
  {
    id: 'restaurant-luxury-positive',
    name: 'Luxury Restaurant - Exceptional Experience',
    description: 'For high-end dining establishments with exceptional service',
    tone: 'formal',
    brandVoice: 'Sophisticated, attentive, and committed to culinary excellence',
    length: 'long',
    platform: 'google',
    businessType: 'Luxury Restaurant',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'restaurant-casual-positive',
    name: 'Casual Dining - Great Value',
    description: 'For casual restaurants with good food and atmosphere',
    tone: 'friendly',
    brandVoice: 'Welcoming, authentic, and focused on great food at fair prices',
    length: 'medium',
    platform: 'google',
    businessType: 'Casual Restaurant',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'restaurant-service-recovery',
    name: 'Service Recovery - Apologetic',
    description: 'For addressing service issues with empathy and solutions',
    tone: 'professional',
    brandVoice: 'Sincere, accountable, and committed to making things right',
    length: 'long',
    platform: 'google',
    businessType: 'Restaurant',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'food-delivery-positive',
    name: 'Food Delivery - Quick & Reliable',
    description: 'For food delivery services with fast, reliable service',
    tone: 'friendly',
    brandVoice: 'Fast, reliable, and committed to hot, fresh food delivery',
    length: 'short',
    platform: 'google',
    businessType: 'Food Delivery',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Hospitality & Travel
  {
    id: 'hotel-boutique-positive',
    name: 'Boutique Hotel - Unique Experience',
    description: 'For boutique hotels with personalized service',
    tone: 'professional',
    brandVoice: 'Intimate, personalized, and focused on unique guest experiences',
    length: 'medium',
    platform: 'tripadvisor',
    businessType: 'Boutique Hotel',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'hotel-chain-positive',
    name: 'Hotel Chain - Consistent Quality',
    description: 'For hotel chains maintaining consistent standards',
    tone: 'professional',
    brandVoice: 'Reliable, consistent, and committed to guest comfort',
    length: 'medium',
    platform: 'tripadvisor',
    businessType: 'Hotel Chain',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'airbnb-positive',
    name: 'Airbnb - Home Away From Home',
    description: 'For Airbnb hosts providing excellent stays',
    tone: 'friendly',
    brandVoice: 'Welcoming, hospitable, and focused on guest comfort',
    length: 'medium',
    platform: 'other',
    businessType: 'Vacation Rental',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Retail & E-commerce
  {
    id: 'retail-luxury-positive',
    name: 'Luxury Retail - Premium Experience',
    description: 'For high-end retail with exceptional customer service',
    tone: 'formal',
    brandVoice: 'Sophisticated, attentive, and committed to luxury experiences',
    length: 'medium',
    platform: 'google',
    businessType: 'Luxury Retail',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'retail-online-positive',
    name: 'E-commerce - Fast & Reliable',
    description: 'For online stores with great shipping and service',
    tone: 'friendly',
    brandVoice: 'Fast, reliable, and committed to customer satisfaction',
    length: 'short',
    platform: 'other',
    businessType: 'E-commerce',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'retail-local-positive',
    name: 'Local Shop - Community Focused',
    description: 'For local businesses serving their community',
    tone: 'friendly',
    brandVoice: 'Community-focused, friendly, and committed to local service',
    length: 'medium',
    platform: 'google',
    businessType: 'Local Retail',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Professional Services
  {
    id: 'legal-professional-positive',
    name: 'Legal Services - Trusted Expertise',
    description: 'For law firms and legal services',
    tone: 'formal',
    brandVoice: 'Professional, trustworthy, and committed to client success',
    length: 'long',
    platform: 'google',
    businessType: 'Legal Services',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'medical-professional-positive',
    name: 'Healthcare - Caring & Professional',
    description: 'For medical practices and healthcare providers',
    tone: 'professional',
    brandVoice: 'Caring, professional, and committed to patient health',
    length: 'medium',
    platform: 'google',
    businessType: 'Healthcare',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'consulting-professional-positive',
    name: 'Consulting - Results-Driven',
    description: 'For consulting firms and business services',
    tone: 'professional',
    brandVoice: 'Expert, results-driven, and committed to client success',
    length: 'medium',
    platform: 'google',
    businessType: 'Consulting',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Technology & Digital Services
  {
    id: 'tech-startup-friendly',
    name: 'Tech Startup - Innovative & Friendly',
    description: 'For technology startups and SaaS companies',
    tone: 'friendly',
    brandVoice: 'Innovative, approachable, and focused on solving problems',
    length: 'medium',
    platform: 'google',
    businessType: 'Technology',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'digital-agency-creative',
    name: 'Digital Agency - Creative & Professional',
    description: 'For marketing and digital agencies',
    tone: 'professional',
    brandVoice: 'Creative, professional, and committed to client growth',
    length: 'medium',
    platform: 'google',
    businessType: 'Digital Agency',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Beauty & Wellness
  {
    id: 'spa-wellness-relaxing',
    name: 'Spa & Wellness - Relaxing Experience',
    description: 'For spas, salons, and wellness centers',
    tone: 'friendly',
    brandVoice: 'Relaxing, rejuvenating, and committed to wellness',
    length: 'medium',
    platform: 'google',
    businessType: 'Spa & Wellness',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'fitness-motivational',
    name: 'Fitness - Motivational & Supportive',
    description: 'For gyms, fitness studios, and personal trainers',
    tone: 'friendly',
    brandVoice: 'Motivational, supportive, and committed to fitness goals',
    length: 'medium',
    platform: 'google',
    businessType: 'Fitness',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Automotive & Services
  {
    id: 'auto-repair-trustworthy',
    name: 'Auto Repair - Trustworthy & Reliable',
    description: 'For automotive repair and maintenance services',
    tone: 'professional',
    brandVoice: 'Trustworthy, reliable, and committed to vehicle safety',
    length: 'medium',
    platform: 'google',
    businessType: 'Automotive',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'home-services-reliable',
    name: 'Home Services - Reliable & Professional',
    description: 'For home improvement and maintenance services',
    tone: 'professional',
    brandVoice: 'Reliable, professional, and committed to quality work',
    length: 'medium',
    platform: 'google',
    businessType: 'Home Services',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Education & Training
  {
    id: 'education-supportive',
    name: 'Education - Supportive & Encouraging',
    description: 'For schools, training centers, and educational services',
    tone: 'friendly',
    brandVoice: 'Supportive, encouraging, and committed to learning success',
    length: 'medium',
    platform: 'google',
    businessType: 'Education',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },

  // Negative Review Templates
  {
    id: 'general-negative-empathic',
    name: 'Negative Review - Empathetic Response',
    description: 'For addressing negative feedback with empathy',
    tone: 'professional',
    brandVoice: 'Understanding, apologetic, and committed to improvement',
    length: 'long',
    platform: 'google',
    businessType: 'General',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'quality-issue-solution',
    name: 'Quality Issue - Solution Focused',
    description: 'For addressing product or service quality issues',
    tone: 'professional',
    brandVoice: 'Accountable, solution-focused, and committed to quality',
    length: 'long',
    platform: 'google',
    businessType: 'General',
    createdAt: new Date().toISOString(),
    usageCount: 0
  }
]

export default function TemplateSelector({ onSelectTemplate, className = '' }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [templates] = useState<Template[]>(defaultTemplates)

  // Group templates by category
  const templateCategories = {
    all: 'All Templates',
    restaurant: 'Restaurant & Food',
    hospitality: 'Hospitality & Travel',
    retail: 'Retail & E-commerce',
    professional: 'Professional Services',
    tech: 'Technology & Digital',
    wellness: 'Beauty & Wellness',
    services: 'Automotive & Services',
    education: 'Education & Training',
    negative: 'Negative Review Responses'
  }

  const getTemplateCategory = (template: Template): string => {
    const businessType = template.businessType.toLowerCase()
    if (businessType.includes('restaurant') || businessType.includes('food')) return 'restaurant'
    if (businessType.includes('hotel') || businessType.includes('airbnb') || businessType.includes('vacation')) return 'hospitality'
    if (businessType.includes('retail') || businessType.includes('e-commerce')) return 'retail'
    if (businessType.includes('legal') || businessType.includes('medical') || businessType.includes('consulting')) return 'professional'
    if (businessType.includes('technology') || businessType.includes('digital') || businessType.includes('agency')) return 'tech'
    if (businessType.includes('spa') || businessType.includes('wellness') || businessType.includes('fitness')) return 'wellness'
    if (businessType.includes('automotive') || businessType.includes('home')) return 'services'
    if (businessType.includes('education')) return 'education'
    if (template.id.includes('negative')) return 'negative'
    return 'all'
  }

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => getTemplateCategory(template) === selectedCategory)

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-left"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Select a template...</span>
        </div>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-20 max-h-96 overflow-hidden">
          {/* Category Filter */}
          <div className="border-b border-gray-200 p-3 bg-gray-50">
            <div className="flex flex-wrap gap-1">
              {Object.entries(templateCategories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-500 text-white font-medium'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates List */}
          <div className="max-h-64 overflow-y-auto">
            <div className="p-2">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm mb-1">{template.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{template.description}</div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          template.tone === 'formal' ? 'bg-purple-100 text-purple-700' :
                          template.tone === 'professional' ? 'bg-blue-100 text-blue-700' :
                          template.tone === 'friendly' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {template.tone}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          template.length === 'short' ? 'bg-gray-100 text-gray-700' :
                          template.length === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {template.length}
                        </span>
                        <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                          {template.platform}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
