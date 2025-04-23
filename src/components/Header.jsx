import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ onMenuClick }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Burger menu and search */}
          <div className="flex items-center space-x-4">
            {/* Burger menu - visible under 1090px */}
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="ძებნა..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6.002 6.002 0 00-4 2.341V20a2 2 0 104 0v-.659c1.318-.66 2.34-1.795 2.914-3.159z" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <img src="https://placehold.co/32x32/a78bfa/ffffff?text=U" alt="User Avatar" className="rounded-full" />
              <span className="text-gray-700 font-medium">User Name</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 