import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
          <span className="text-blue-500">🗳️</span>
          <span>Team Voice of Livingston</span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About Us</Link>
          <Link to="/panel" className="hover:text-blue-400 transition">Our Panel</Link>
          <Link to="/manifesto" className="hover:text-blue-400 transition">Manifesto</Link>
          <Link to="/clubledger" className="hover:text-blue-400 transition">Club Ledger</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          
          {/* Vote Now Button */}
          <Link
            to="/vote"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-lg shadow-md transition"
          >
            🗳️ Vote Now
          </Link>

          {/* Results Link Button */}
          <Link
            to="/vote-results"
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 transition"
          >
            📊 View Results
          </Link>

        </div>

      </div>
    </header>
  );
}