import React, { useState, useCallback, memo } from 'react';

function Header({ onMenuClick, onNewAppointment }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Search bar and Burger menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 max-w-xl">
            <button
              onClick={onMenuClick}
              className="lg:hidden shrink-0 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  placeholder="ძებნა..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
                />
                <div className="absolute right-0 top-0 h-full px-2 sm:px-3 flex items-center justify-center text-gray-500">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://placehold.co/32x32/a78bfa/ffffff?text=U" 
                alt="User Avatar" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full shrink-0" 
              />
              <span className="hidden sm:inline text-xs sm:text-sm md:text-base text-gray-700 font-medium">User Name</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header); 