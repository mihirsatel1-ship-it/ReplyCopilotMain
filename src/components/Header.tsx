'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-green-300 to-blue-300 backdrop-blur-md border-b border-green-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Logo size="md" />
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
              href="/resources"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/resources' 
                  ? 'bg-white/30 text-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
              }`}
            >
              Resources
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
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-xl mt-2 p-4 border border-white/30 shadow-xl">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === '/' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                href="/generator"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === '/generator' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Generator
              </Link>
              <Link
                href="/resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === '/resources' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Resources
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === '/privacy' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Privacy
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <Link 
                  href="/generator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center w-full px-4 py-3 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Try Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
