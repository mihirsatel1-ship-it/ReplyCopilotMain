'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { GenerateRequest, GenerateResponse } from '@/types'
import SentimentIndicator from '@/components/SentimentIndicator'
import TemplateSelector from '@/components/TemplateSelector'
import BulkProcessor from '@/components/BulkProcessor'

export default function Generator() {
  const [formData, setFormData] = useState<GenerateRequest>({
    review: '',
    stars: undefined,
    tone: 'professional',
    brandVoice: '',
    length: 'medium',
    platform: 'other',
    businessType: '',
    aiModel: 'chatgpt-5'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.review.trim() || formData.review.trim().length < 5) {
      toast.error('Please enter a review with at least 5 characters')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate responses')
      }

      setResults(data)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Response copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const getModelDisplayName = (model: string) => {
    const modelNames: Record<string, string> = {
      'chatgpt-5': 'ChatGPT-5',
      'gemini-2.5': 'Gemini 2.5',
      'grok-ai': 'Grok AI',
      'claude-3': 'Claude 3'
    }
    return modelNames[model] || model
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-200 to-red-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trust Notice */}
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>We don't store your reviews - all processing is transient and anonymous</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Details</h2>
              
              {/* Review Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Review *
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste the customer review here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 5 characters required
                </p>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Star Rating (Optional)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, stars: rating })}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-all ${
                        formData.stars === rating
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-600'
                      }`}
                    >
                      <span>{rating}</span>
                      <span className="text-yellow-400">⭐</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, stars: undefined })}
                    className={`px-3 py-2 rounded-lg border transition-all ${
                      formData.stars === undefined
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-600'
                    }`}
                  >
                    None
                  </button>
                </div>
              </div>

              {/* AI Model Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Model *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  value={formData.aiModel}
                  onChange={(e) => setFormData({ ...formData, aiModel: e.target.value as any })}
                  required
                >
                  <option value="chatgpt-5">ChatGPT-5 (Recommended)</option>
                  <option value="gemini-2.5">Gemini 2.5</option>
                  <option value="grok-ai">Grok AI</option>
                  <option value="claude-3">Claude 3</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose your preferred AI model for response generation
                </p>
              </div>

              {/* Template Selector - Moved above Brand Voice */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Use Template (Optional)
                </label>
                <TemplateSelector
                  onSelectTemplate={(template) => {
                    setFormData({
                      ...formData,
                      tone: template.tone,
                      brandVoice: template.brandVoice,
                      length: template.length,
                      platform: template.platform,
                      businessType: template.businessType
                    })
                    toast.success(`Applied ${template.name} template`)
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select a template to auto-fill other fields
                </p>
              </div>

              {/* Brand Voice */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Voice (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Warm and approachable..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.brandVoice}
                  onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
                />
              </div>

              {/* Tone and Length Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                    required
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value as any })}
                    required
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                >
                  <option value="other">Other</option>
                  <option value="google">Google Reviews</option>
                  <option value="yelp">Yelp</option>
                  <option value="facebook">Facebook</option>
                  <option value="tripadvisor">TripAdvisor</option>
                </select>
              </div>

              {/* Business Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Restaurant, Hotel, Service..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.review.trim()}
                className="w-full bg-gradient-to-r from-green-800 to-blue-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-900 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Generating with {getModelDisplayName(formData.aiModel || '')}...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Generate Responses</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {isLoading && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  <span className="text-gray-600">Generating responses with {getModelDisplayName(formData.aiModel || '')}...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-red-800">Generation Failed</h3>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && !error && !results && (
              <div className="space-y-6">
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4L20 12L12 20L4 12L12 4Z" opacity="0.9"/>
                      <path d="M12 6L18 12L12 18L6 12L12 6Z" opacity="0.7"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h3>
                  <p className="text-gray-600">Enter a review and click generate to see AI-powered response options</p>
                </div>

                {/* Bulk Processor */}
                <BulkProcessor defaultSettings={formData} />
              </div>
            )}

            {results && (
              <div className="space-y-6">
                {/* Sentiment Analysis */}
                {results.sentiment && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
                    <SentimentIndicator sentiment={results.sentiment} showDetails={true} />
                  </div>
                )}

                {/* AI Suggestions */}
                {results.suggestions && results.suggestions.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h3>
                    <div className="space-y-2">
                      {results.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generated Responses */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Responses</h3>
                    {results.metadata && (
                      <div className="text-sm text-gray-500">
                        Generated in {results.metadata.processingTime}ms
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {Object.entries(results.options).map(([key, response]) => (
                      <div key={key} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors group hover-lift animate-fade-in-up" style={{animationDelay: `${(key === 'A' ? 0.1 : key === 'B' ? 0.2 : 0.3)}s`}}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                                {key}
                              </span>
                              <span className="text-sm text-gray-500">Option {key}</span>
                              {results.metadata && (
                                <span className="ml-auto text-xs text-gray-400">
                                  ~{response.split(' ').length} words
                                </span>
                              )}
                            </div>
                            <p className="text-gray-800 leading-relaxed">{response}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(response)}
                            className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            title="Copy to clipboard"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metadata */}
                  {results.metadata && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-gray-500">Avg Words</div>
                          <div className="font-semibold text-gray-900">{results.metadata.wordCount}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">Readability</div>
                          <div className="font-semibold text-gray-900">{results.metadata.readabilityScore}/100</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">AI Model</div>
                          <div className="font-semibold text-gray-900">{getModelDisplayName(formData.aiModel || '')}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">Generated</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(results.metadata.generatedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
