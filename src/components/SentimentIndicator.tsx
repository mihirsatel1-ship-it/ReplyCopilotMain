'use client'

import { SentimentAnalysis } from '@/types'
import { getSentimentColor, getSentimentIcon } from '@/lib/sentiment'

interface SentimentIndicatorProps {
  sentiment: SentimentAnalysis
  showDetails?: boolean
}

export default function SentimentIndicator({ sentiment, showDetails = false }: SentimentIndicatorProps) {
  const getScoreColor = (score: number) => {
    if (score > 0.2) return 'bg-green-500'
    if (score < -0.2) return 'bg-red-500'
    return 'bg-gray-500'
  }

  const getScoreWidth = (score: number) => {
    return Math.abs(score) * 100
  }

  return (
    <div className="space-y-3">
      {/* Main Sentiment */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{getSentimentIcon(sentiment)}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className={`font-medium capitalize ${getSentimentColor(sentiment)}`}>
              {sentiment.label}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(sentiment.confidence * 100)}% confidence
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreColor(sentiment.score)}`}
              style={{ width: `${getScoreWidth(sentiment.score)}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-mono text-gray-600">
          {sentiment.score > 0 ? '+' : ''}{sentiment.score.toFixed(2)}
        </span>
      </div>

      {/* Detailed Emotions */}
      {showDetails && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Emotional Breakdown</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sentiment.emotions).map(([emotion, value]) => (
              <div key={emotion} className="flex items-center justify-between text-sm">
                <span className="capitalize text-gray-600">{emotion}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-gray-200 rounded-full h-1">
                    <div 
                      className="h-1 bg-blue-500 rounded-full"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">
                    {Math.round(value * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {showDetails && sentiment.keywords.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Key Sentiment Words</h4>
          <div className="flex flex-wrap gap-1">
            {sentiment.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
