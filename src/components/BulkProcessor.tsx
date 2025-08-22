'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { GenerateRequest, GenerateResponse } from '@/types'

interface BulkProcessorProps {
  defaultSettings: Partial<GenerateRequest>
}

interface BulkReview {
  id: string
  review: string
  stars?: number
  processed: boolean
  result?: GenerateResponse
  error?: string
}

export default function BulkProcessor({ defaultSettings }: BulkProcessorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reviews, setReviews] = useState<BulkReview[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [reviewsText, setReviewsText] = useState('')

  const parseReviews = (text: string): BulkReview[] => {
    const lines = text.split('\n').filter(line => line.trim())
    return lines.map((line, index) => {
      // Try to parse format: "rating|review" or just "review"
      const parts = line.split('|')
      if (parts.length === 2) {
        const rating = parseInt(parts[0].trim())
        return {
          id: `review-${index}`,
          review: parts[1].trim(),
          stars: isNaN(rating) ? undefined : Math.max(1, Math.min(5, rating)),
          processed: false
        }
      }
      return {
        id: `review-${index}`,
        review: line.trim(),
        processed: false
      }
    }).filter(review => review.review.length >= 5)
  }

  const handleAddReviews = () => {
    if (!reviewsText.trim()) {
      toast.error('Please enter reviews to process')
      return
    }

    const parsedReviews = parseReviews(reviewsText)
    if (parsedReviews.length === 0) {
      toast.error('No valid reviews found (minimum 5 characters each)')
      return
    }

    setReviews(parsedReviews)
    setReviewsText('')
    toast.success(`Added ${parsedReviews.length} reviews for processing`)
  }

  const processReviews = async () => {
    if (reviews.length === 0) return

    setIsProcessing(true)
    const unprocessedReviews = reviews.filter(r => !r.processed)
    
    for (let i = 0; i < unprocessedReviews.length; i++) {
      const review = unprocessedReviews[i]
      
      try {
        const requestData: GenerateRequest = {
          review: review.review,
          stars: review.stars,
          tone: defaultSettings.tone || 'professional',
          brandVoice: defaultSettings.brandVoice || '',
          length: defaultSettings.length || 'medium',
          platform: defaultSettings.platform || 'other',
          businessType: defaultSettings.businessType || ''
        }

        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate responses')
        }

        setReviews(prev => prev.map(r => 
          r.id === review.id 
            ? { ...r, processed: true, result: data }
            : r
        ))

        // Add delay between requests to respect rate limits
        if (i < unprocessedReviews.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Processing failed'
        setReviews(prev => prev.map(r => 
          r.id === review.id 
            ? { ...r, processed: true, error: errorMessage }
            : r
        ))
        
        if (errorMessage.includes('rate limit')) {
          toast.error('Rate limit reached. Please wait before processing more reviews.')
          break
        }
      }
    }

    setIsProcessing(false)
    toast.success('Bulk processing completed!')
  }

  const exportResults = () => {
    const processedReviews = reviews.filter(r => r.processed && r.result)
    if (processedReviews.length === 0) {
      toast.error('No processed reviews to export')
      return
    }

    const csvContent = [
      'Original Review,Stars,Response A,Response B,Response C,Sentiment',
      ...processedReviews.map(review => {
        const result = review.result!
        return [
          `"${review.review.replace(/"/g, '""')}"`,
          review.stars || '',
          `"${result.options.A.replace(/"/g, '""')}"`,
          `"${result.options.B.replace(/"/g, '""')}"`,
          `"${result.options.C.replace(/"/g, '""')}"`,
          result.sentiment?.label || ''
        ].join(',')
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `review-responses-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Results exported to CSV!')
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors text-purple-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span className="text-sm font-medium">Bulk Process Reviews</span>
      </button>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bulk Review Processing</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reviews to Process
          </label>
          <textarea
            rows={6}
            placeholder="Enter reviews, one per line. Optional format: rating|review&#10;Example:&#10;5|Great service!&#10;2|Food was cold&#10;Amazing experience, will come back!"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
            value={reviewsText}
            onChange={(e) => setReviewsText(e.target.value)}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Supports rating|review format or plain text reviews
            </p>
            <button
              onClick={handleAddReviews}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Reviews
            </button>
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">
                Reviews ({reviews.length}) - {reviews.filter(r => r.processed).length} processed
              </h4>
              <div className="flex space-x-2">
                <button
                  onClick={processReviews}
                  disabled={isProcessing || reviews.every(r => r.processed)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Process All'}
                </button>
                <button
                  onClick={exportResults}
                  disabled={reviews.filter(r => r.processed && r.result).length === 0}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Export CSV
                </button>
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {reviews.map((review, index) => (
                <div key={review.id} className={`p-3 rounded-lg border ${
                  review.processed 
                    ? review.error 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
                        {review.stars && (
                          <span className="text-xs text-yellow-600">{review.stars}⭐</span>
                        )}
                        {review.processed && (
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            review.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {review.error ? 'Error' : 'Done'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{review.review}</p>
                      {review.error && (
                        <p className="text-xs text-red-600 mt-1">{review.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-sm text-blue-700">
              Processing reviews... Please wait between requests to respect rate limits.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
