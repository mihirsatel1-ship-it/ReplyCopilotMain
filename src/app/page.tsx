import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-300 via-green-300 to-teal-400 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl mb-8 animate-float">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4L20 12L12 20L4 12L12 4Z" opacity="0.9"/>
                <path d="M12 6L18 12L12 18L6 12L12 6Z" opacity="0.7"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in-up">
              AI-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Review Replies
              </span>
              Made Simple
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
              Transform customer reviews into thoughtful, on-brand responses that strengthen your business relationships and online reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up stagger-2">
              <Link 
                href="/generator"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Generating
              </Link>
              <div className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No signup required
              </div>
            </div>
            
            {/* Trust Strip */}
            <div className="max-w-2xl mx-auto animate-fade-in-up stagger-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-emerald-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>We don't store your reviews - all processing is transient and anonymous</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm relative">
        {/* Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose ReplyPilot?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional responses that reflect your brand voice and strengthen customer relationships.
            </p>
          </div>
          
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up stagger-1">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate 3 professional response options in under 10 seconds. No waiting, no delays.
              </p>
            </div>
            
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up stagger-2">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Brand Consistent</h3>
              <p className="text-gray-600 leading-relaxed">
                Customize tone and brand voice to ensure every response aligns with your business identity.
              </p>
            </div>
            
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up stagger-3">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed">
                Your reviews are never stored. All processing is transient and completely anonymous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/15 backdrop-blur-sm relative">
        {/* Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Powerful features designed for modern businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Smart tone detection based on star ratings',
              'Customizable brand voice and personality',
              'Multiple response lengths (short, medium, long)',
              'One-click copy to clipboard',
              'Rate limiting to prevent abuse'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 animate-fade-in-up" style={{animationDelay: `${(index + 1) * 0.1}s`}}>
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Preview */}
      <section className="py-20 bg-white/10 backdrop-blur-sm relative">
        {/* Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              See It In Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Here's how ReplyPilot transforms customer feedback into professional responses.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-white/30 animate-fade-in-up stagger-2">
            <div className="mb-6">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Review:</h3>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <p className="text-gray-700 italic">
                  "Great service but the delivery was a bit slow. Food was delicious though!"
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">4 stars</span>
                </div>
              </div>
            </div>
            
            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Responses:</h3>
              <div className="space-y-4">
                {[
                  {
                    label: 'A',
                    response: 'Thank you for your feedback! We\'re glad you enjoyed the food quality. We\'re working on improving our delivery times to ensure a better experience for all our customers.',
                    tone: 'Professional & Grateful'
                  },
                  {
                    label: 'B', 
                    response: 'We appreciate your kind words about our food! Your feedback about delivery timing is valuable and helps us improve. We\'re implementing new processes to speed up delivery.',
                    tone: 'Friendly & Responsive'
                  },
                  {
                    label: 'C',
                    response: 'Thanks for the 4-star review! We\'re thrilled you loved the food. We\'ve noted your delivery feedback and are actively working to enhance our service speed.',
                    tone: 'Casual & Appreciative'
                  }
                ].map((option) => (
                  <div key={option.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover-lift animate-fade-in-up" style={{animationDelay: `${(option.label === 'A' ? 0.3 : option.label === 'B' ? 0.4 : 0.5)}s`}}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                            {option.label}
                          </span>
                          <span className="text-sm text-gray-500">{option.tone}</span>
                        </div>
                        <p className="text-gray-700">{option.response}</p>
                      </div>
                      <button className="ml-4 text-emerald-600 hover:text-emerald-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/10 backdrop-blur-sm relative">
        {/* Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Ready to Transform Your Review Responses?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Join businesses that trust ReplyPilot to maintain their online reputation with professional, thoughtful responses.
          </p>
          <Link 
            href="/generator"
            className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg animate-fade-in-up stagger-2 hover-lift"
          >
            Start Generating Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
