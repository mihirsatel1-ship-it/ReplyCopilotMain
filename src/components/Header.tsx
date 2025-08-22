'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-gradient-to-r from-green-300 to-blue-300 backdrop-blur-md border-b border-green-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4L20 12L12 20L4 12L12 4Z" opacity="0.9"/>
                  <path d="M12 6L18 12L12 18L6 12L12 6Z" opacity="0.7"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">ReplyPilot</span>
            </Link>
          </div>
          
                    <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/' 
                  ? 'bg-white/30 text-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
              }`}
            >
              Home
            </Link>
            <Link
              href="/generator"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/generator' 
                  ? 'bg-white/30 text-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
              }`}
            >
              Generator
            </Link>

            <Link
              href="/privacy"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/privacy' 
                  ? 'bg-white/30 text-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
              }`}
            >
              Privacy
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link 
              href="/generator"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Try Now
            </Link>
          </div>

          <div className="md:hidden">
            <button className="p-2 text-gray-700 hover:text-gray-900 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
