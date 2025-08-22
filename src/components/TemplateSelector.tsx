'use client'

import { useState } from 'react'
import { Template } from '@/types'

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
  className?: string
}

// Predefined templates
const defaultTemplates: Template[] = [
  {
    id: 'restaurant-positive',
    name: 'Restaurant - Positive',
    description: 'For positive restaurant reviews',
    tone: 'friendly',
    brandVoice: 'Warm, welcoming, and passionate about food quality',
    length: 'medium',
    platform: 'google',
    businessType: 'Restaurant',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'restaurant-negative',
    name: 'Restaurant - Service Issue',
    description: 'For negative reviews about service',
    tone: 'professional',
    brandVoice: 'Apologetic, solution-focused, and committed to improvement',
    length: 'long',
    platform: 'google',
    businessType: 'Restaurant',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'hotel-positive',
    name: 'Hotel - Great Stay',
    description: 'For positive hotel experiences',
    tone: 'professional',
    brandVoice: 'Hospitable, attentive, and dedicated to guest satisfaction',
    length: 'medium',
    platform: 'tripadvisor',
    businessType: 'Hotel',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'retail-neutral',
    name: 'Retail - General',
    description: 'For general retail feedback',
    tone: 'friendly',
    brandVoice: 'Customer-focused and helpful',
    length: 'short',
    platform: 'other',
    businessType: 'Retail',
    createdAt: new Date().toISOString(),
    usageCount: 0
  },
  {
    id: 'service-professional',
    name: 'Service - Professional',
    description: 'For professional service businesses',
    tone: 'professional',
    brandVoice: 'Expert, reliable, and results-oriented',
    length: 'medium',
    platform: 'google',
    businessType: 'Professional Service',
    createdAt: new Date().toISOString(),
    usageCount: 0
  }
]

export default function TemplateSelector({ onSelectTemplate, className = '' }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [templates] = useState<Template[]>(defaultTemplates)

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl transition-colors text-left"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm text-gray-600">Use Template</span>
        </div>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
          <div className="p-2">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelectTemplate(template)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {template.tone}
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {template.length}
                      </span>
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {template.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
