import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VotePage from './pages/VotePage';
import VoteResultsPage from './pages/VoteResultsPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/vote-results" element={<VoteResultsPage />} />
      </Routes>
    </div>
  );
}