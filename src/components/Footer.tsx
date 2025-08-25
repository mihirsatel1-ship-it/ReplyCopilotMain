import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo size="sm" />
              <span className="text-lg font-bold text-gray-900">ReplyPilot</span>
            </div>
            <p className="text-gray-600 text-sm">
              Generate professional, on-brand replies to customer reviews in seconds. FREE AI-powered tool for small businesses.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/generator" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Generator
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Trust & Privacy</h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <p className="text-xs text-emerald-800">
                🔒 We don't store your reviews. All processing is transient and anonymous.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 ReplyPilot. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-2 md:mt-0">
              Powered by ChatGPT-5, Gemini, Grok AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
