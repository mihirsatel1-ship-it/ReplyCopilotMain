'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Resources() {
  const [activeSection, setActiveSection] = useState('tutorial')

  const tutorialSteps = [
    {
      step: 1,
      title: "Choose Your AI Model",
      description: "Select from ChatGPT-5, Gemini 2.5, Grok AI, or Claude 3 for optimal results",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      details: [
        "ChatGPT-5: Best for creative, conversational responses",
        "Gemini 2.5: Excellent for professional, structured replies", 
        "Grok AI: Great for casual, friendly interactions",
        "Claude 3: Perfect for detailed, analytical responses"
      ]
    },
    {
      step: 2,
      title: "Select the Perfect Template",
      description: "Choose from 100+ industry-specific templates for instant optimization",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      details: [
        "Restaurant & Food: Luxury dining, casual restaurants, food delivery",
        "Hospitality & Travel: Boutique hotels, hotel chains, vacation rentals",
        "Retail & E-commerce: Luxury retail, online stores, local shops",
        "Professional Services: Legal, medical, consulting",
        "Technology & Digital: Tech startups, digital agencies",
        "Beauty & Wellness: Spas, fitness centers, wellness services"
      ]
    },
    {
      step: 3,
      title: "Paste Your Customer Review",
      description: "Simply copy and paste the review you want to respond to",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      details: [
        "Copy the review text from Google, Yelp, Facebook, or any platform",
        "Include the star rating if available for better context",
        "The AI will automatically detect sentiment and tone",
        "Minimum 5 characters required for processing"
      ]
    },
    {
      step: 4,
      title: "Customize Your Brand Voice",
      description: "Set your tone, length, and brand personality",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      details: [
        "Tone: Professional, Friendly, Casual, or Formal",
        "Length: Short (under 50 words), Medium (50-100 words), or Long (100-150 words)",
        "Brand Voice: Describe your business personality",
        "Platform: Specify where the review was posted"
      ]
    },
    {
      step: 5,
      title: "Generate & Choose",
      description: "Get 3 professional response options and select the best one",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      details: [
        "AI generates 3 different response styles (A, B, C)",
        "Each response matches your brand voice and tone",
        "One-click copy to clipboard functionality",
        "Sentiment analysis and suggestions included"
      ]
    },
    {
      step: 6,
      title: "Review & Optimize",
      description: "Fine-tune your response and post with confidence",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "Review the generated response for accuracy",
        "Make minor adjustments if needed",
        "Copy and paste to your review platform",
        "Track your response performance over time"
      ]
    }
  ]

  const bestPractices = [
    {
      category: "Response Timing",
      tips: [
        "Respond within 24 hours for positive reviews",
        "Address negative reviews within 2-4 hours",
        "Set up notifications for new reviews",
        "Use bulk processing for multiple reviews"
      ]
    },
    {
      category: "Tone & Voice",
      tips: [
        "Match your brand personality consistently",
        "Use industry-appropriate language",
        "Be authentic and avoid generic responses",
        "Address customers by name when possible"
      ]
    },
    {
      category: "Content Strategy",
      tips: [
        "Acknowledge specific details from the review",
        "Offer solutions for negative feedback",
        "Encourage return visits for positive reviews",
        "Include relevant business information"
      ]
    },
    {
      category: "Platform Optimization",
      tips: [
        "Adapt responses for different platforms",
        "Use platform-specific features (photos, links)",
        "Monitor response metrics and engagement",
        "Stay updated with platform guidelines"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-green-300 to-teal-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Resources & Tutorials
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Master the art of professional review responses with our comprehensive guides and best practices.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/30">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSection('tutorial')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === 'tutorial'
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
                }`}
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Tutorial
              </button>
              <button
                onClick={() => setActiveSection('best-practices')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === 'best-practices'
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
                }`}
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Best Practices
              </button>
              <button
                onClick={() => setActiveSection('templates')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === 'templates'
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
                }`}
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Template Guide
              </button>
            </div>
          </div>
        </div>

        {/* Tutorial Section */}
        {activeSection === 'tutorial' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                How to Write Better Review Responses with AI
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Follow this step-by-step guide to create professional, engaging responses that strengthen your customer relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tutorialSteps.map((step, index) => (
                <div 
                  key={step.step}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {step.step}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Start CTA */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                Put these steps into practice with our AI-powered review response generator. Create professional responses in seconds!
              </p>
              <Link 
                href="/generator"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Generating Now
              </Link>
            </div>
          </div>
        )}

        {/* Best Practices Section */}
        {activeSection === 'best-practices' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Review Response Best Practices
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn the proven strategies that successful businesses use to maintain excellent online reputations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bestPractices.map((practice, index) => (
                <div 
                  key={practice.category}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    {practice.category}
                  </h3>
                  <ul className="space-y-3">
                    {practice.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Template Guide Section */}
        {activeSection === 'templates' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Template Selection Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the perfect template for your business type and review scenario.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "Restaurant & Food",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                    </svg>
                  ),
                  templates: ["Luxury Restaurant", "Casual Dining", "Food Delivery", "Service Recovery"],
                  description: "Perfect for dining establishments of all types"
                },
                {
                  category: "Hospitality & Travel",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  templates: ["Boutique Hotel", "Hotel Chain", "Airbnb", "Vacation Rental"],
                  description: "Ideal for accommodation and travel services"
                },
                {
                  category: "Retail & E-commerce",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  ),
                  templates: ["Luxury Retail", "E-commerce", "Local Shop", "Online Store"],
                  description: "Great for shopping and retail experiences"
                },
                {
                  category: "Professional Services",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  ),
                  templates: ["Legal Services", "Healthcare", "Consulting", "Medical Practice"],
                  description: "Perfect for professional and medical services"
                },
                {
                  category: "Technology & Digital",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  templates: ["Tech Startup", "Digital Agency", "SaaS Company", "Web Services"],
                  description: "Ideal for technology and digital businesses"
                },
                {
                  category: "Beauty & Wellness",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  templates: ["Spa & Wellness", "Fitness Center", "Beauty Salon", "Wellness Services"],
                  description: "Great for health and beauty businesses"
                }
              ].map((template, index) => (
                <div 
                  key={template.category}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg hover-lift animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white">
                      {template.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.category}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <div className="space-y-2">
                    {template.templates.map((temp, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{temp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-purple-100 mb-6">
                Our AI automatically suggests the best template based on your business type and review content.
              </p>
              <Link 
                href="/generator"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Try Template Selector
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
