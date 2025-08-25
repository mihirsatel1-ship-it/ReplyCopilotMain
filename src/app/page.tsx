import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-300 via-green-300 to-teal-400 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-8 animate-float">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in-up">
              FREE AI-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Review Reply Generator
              </span>
              for Small Businesses
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
              Transform your online reputation with professional, AI-generated responses to customer reviews. 
              <span className="font-semibold text-emerald-700"> Completely free</span> - no signup, no credit card, 30 reviews per day.
            </p>
            
            {/* Social Proof */}
            <div className="mb-10 animate-fade-in-up stagger-2">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">300+</span>
                    <span>Small Businesses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold">10,000+</span>
                    <span>Reviews Processed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">4.9/5</span>
                    <span>User Rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up stagger-3">
              <Link 
                href="/generator"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Generating FREE
              </Link>
              <div className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No signup required
              </div>
            </div>
            
            {/* Trust Strip */}
            <div className="max-w-2xl mx-auto animate-fade-in-up stagger-4">
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

      {/* Why Small Businesses Need This */}
      <section className="py-20 bg-white/5 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Small Businesses Choose ReplyPilot
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In today's digital world, your online reputation can make or break your business. 
              We're here to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up stagger-1">
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Problem</h3>
              <p className="text-gray-600 leading-relaxed">
                88% of customers read reviews before making a purchase. Poor responses can damage your reputation and cost you customers.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up stagger-2">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                FREE AI-powered responses that sound professional, authentic, and help you build stronger customer relationships.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover-lift animate-fade-in-up stagger-3">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Result</h3>
              <p className="text-gray-600 leading-relaxed">
                Better online reputation, increased customer trust, and more business growth - all without spending a dime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Trusted by Small Businesses Across Industries
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From local restaurants to family-owned retail stores, businesses of all sizes use our FREE tool to maintain their online reputation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: 'Restaurants', 
                count: '120+',
                icon: (
                  <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                )
              },
              { 
                name: 'Retail Stores', 
                count: '85+',
                icon: (
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11l3 3m0 0l3-3m-3 3V9" />
                  </svg>
                )
              },
              { 
                name: 'Hotels & Travel', 
                count: '45+',
                icon: (
                  <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              { 
                name: 'Professional Services', 
                count: '50+',
                icon: (
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((business, index) => (
              <div key={business.name} className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 shadow-lg hover-lift animate-fade-in-up" style={{animationDelay: `${(index + 1) * 0.1}s`}}>
                <div className="flex justify-center mb-3">
                  {business.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{business.name}</h3>
                <p className="text-sm text-gray-600">{business.count} businesses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional responses that reflect your brand voice and strengthen customer relationships - completely FREE.
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
                Generate 3 professional response options in under 10 seconds. No waiting, no delays, no cost.
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

      {/* Enhanced Example Preview */}
      <section className="py-20 bg-white/10 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              See How Easy It Is
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Watch how our FREE AI transforms customer feedback into professional responses across different industries.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Restaurant Example */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/30 animate-fade-in-up stagger-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Restaurant Review</h3>
                  <p className="text-sm text-gray-600">Luxury Restaurant - Exceptional Experience</p>
                </div>
          </div>
          
            <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Customer Review:</h4>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <p className="text-gray-700 italic">
                    "The wagyu steak was absolutely divine! Perfectly cooked medium-rare with truffle mashed potatoes. Our sommelier's wine pairing was spot-on. The service was impeccable - our server remembered our anniversary and brought us a complimentary dessert. This is fine dining at its best!"
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                    <span className="ml-2 text-sm text-gray-500">5 stars</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4">Generated Responses (FREE):</h4>
                <div className="space-y-4">
                  {[
                    {
                      label: 'A',
                      response: 'Thank you for choosing us to celebrate your special anniversary! We\'re delighted that our wagyu steak and truffle mashed potatoes exceeded your expectations. Our sommelier takes great pride in crafting the perfect wine pairings, and we\'re thrilled it enhanced your dining experience. It\'s moments like these that make our work truly rewarding. We look forward to welcoming you back for many more memorable celebrations.',
                      tone: 'Sophisticated & Grateful'
                    },
                    {
                      label: 'B', 
                      response: 'What a wonderful way to celebrate your anniversary! We\'re honored that our culinary team\'s attention to detail with the wagyu steak and our sommelier\'s expertise in wine pairing created such a memorable experience. Your kind words about our service team mean the world to us. We hope to have the pleasure of serving you again soon for another exceptional dining experience.',
                      tone: 'Elegant & Appreciative'
                    },
                    {
                      label: 'C',
                      response: 'We\'re absolutely thrilled that your anniversary dinner was everything you hoped for! Our chef takes immense pride in sourcing the finest wagyu and crafting dishes that create lasting memories. Thank you for recognizing our sommelier\'s expertise and our team\'s dedication to exceptional service. We can\'t wait to welcome you back for another extraordinary dining experience.',
                      tone: 'Warm & Enthusiastic'
                    }
                  ].map((option) => (
                    <div key={option.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover-lift">
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

            {/* Hotel Example */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/30 animate-fade-in-up stagger-3">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Hotel Review</h3>
                  <p className="text-sm text-gray-600">Boutique Hotel - Unique Experience</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Customer Review:</h4>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-400">
                  <p className="text-gray-700 italic">
                    "The room was beautiful and the location is perfect, but the air conditioning wasn't working properly and the staff seemed overwhelmed. For the price we paid, I expected better service and maintenance."
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(2)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">2 stars</span>
                </div>
              </div>
            </div>
            
            <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4">Generated Responses (FREE):</h4>
              <div className="space-y-4">
                {[
                  {
                    label: 'A',
                      response: 'We sincerely apologize for the issues you experienced during your stay. While we\'re glad you appreciated our beautiful rooms and prime location, we understand that the air conditioning problem and service delays fell short of your expectations. We\'ve immediately addressed the maintenance issue and are reviewing our staffing to ensure better service delivery. Please contact our general manager directly at gm@hotel.com so we can make this right for you.',
                      tone: 'Professional & Apologetic'
                  },
                  {
                    label: 'B', 
                      response: 'Thank you for your feedback, and we\'re truly sorry that your experience didn\'t meet our usual high standards. We\'re disappointed to hear about the air conditioning issue and service concerns. Our maintenance team has been notified, and we\'re implementing additional staff training to prevent such issues. We\'d love the opportunity to welcome you back with a complimentary upgrade to ensure you experience the exceptional service we\'re known for.',
                      tone: 'Sincere & Solution-Focused'
                  },
                  {
                    label: 'C',
                      response: 'We appreciate you taking the time to share your experience, and we\'re genuinely sorry for the problems you encountered. Your feedback about the air conditioning and service is valuable and helps us improve. We\'ve already scheduled maintenance for all units and are enhancing our staff training program. Please reach out to us at guestservices@hotel.com so we can discuss how to make your next stay exceptional.',
                      tone: 'Understanding & Committed'
                  }
                ].map((option) => (
                    <div key={option.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover-lift">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/15 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              Everything You Need to Grow Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Powerful features designed for small businesses - all completely FREE.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '100+ Industry-specific templates',
              'Smart tone detection based on star ratings',
              'Customizable brand voice and personality',
              'Multiple response lengths (short, medium, long)',
              'One-click copy to clipboard',
              'Bulk processing for multiple reviews',
              'Rate limiting to prevent abuse',
              'AI model selection (ChatGPT-5, Gemini, Grok)',
              'Real-time sentiment analysis'
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

      {/* CTA Section */}
      <section className="py-20 bg-white/10 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Ready to Transform Your Online Reputation?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Join 300+ small businesses that trust our FREE tool to maintain their online reputation with professional, thoughtful responses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
          <Link 
            href="/generator"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover-lift"
          >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
              Start Generating FREE
            </Link>
            <Link 
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learn More
          </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
