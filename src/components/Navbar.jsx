import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
          <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span>Team Voice of Livingston</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
          <Link to="/panel" className="hover:text-blue-600 transition">Our Panel</Link>
          <Link to="/manifesto" className="hover:text-blue-600 transition">Manifesto</Link>
          <Link to="/updates" className="hover:text-blue-600 transition">Election Updates</Link>
          <Link to="/clubledger" className="hover:text-blue-600 transition">Club Ledger</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          
          {/* Vote Now */}
          <Link
            to="/vote"
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm transition"
          >
            🗳️ Vote Now
          </Link>

          {/* View Results */}
          <Link
            to="/vote-results"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg border border-slate-300 transition"
          >
            📊 View Results
          </Link>

          {/* Join WhatsApp */}
          <a
            href="https://chat.whatsapp.com/your-group-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg shadow-sm transition"
          >
            <span>💬</span>
            <span>Join WhatsApp</span>
          </a>

        </div>

      </div>
    </header>
  );
}