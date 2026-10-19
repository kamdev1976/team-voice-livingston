import React, { useState, useEffect } from 'react';

export default function VoteResultsPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [results, setResults] = useState({ totalVotes: 0, tally: {} });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const fetchResults = async (adminPass) => {
    setStatus({ loading: true, error: '' });
    try {
      const response = await fetch('https://pharmacy-backend-poc.onrender.com/api/votes/results', {
        headers: { 'x-admin-password': adminPass }
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to load election results');

      setResults(data);
      setAuthenticated(true);
      setStatus({ loading: false, error: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchResults(password);
  };

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg text-white">
        <h2 className="text-xl font-bold mb-2 text-center text-blue-400">Election Results Access</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Enter Admin Password to View Tallies</p>

        {status.error && <div className="p-3 bg-red-900/50 border border-red-700 text-red-200 rounded text-sm mb-4">{status.error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Admin Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
          >
            {status.loading ? 'Verifying...' : 'View Results'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-slate-900 border border-slate-800 rounded-xl text-white shadow-xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Election Live Results</h2>
          <p className="text-xs text-slate-400">Supertech Livingston AOA Elections</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-indigo-400">{results.totalVotes}</span>
          <span className="block text-xs text-slate-400">Total Votes Cast</span>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(results.tally).length === 0 ? (
          <p className="text-center text-slate-400 py-8">No votes have been recorded yet.</p>
        ) : (
          Object.entries(results.tally).map(([candidate, count]) => {
            const percentage = results.totalVotes > 0 ? ((count / results.totalVotes) * 100).toFixed(1) : 0;
            return (
              <div key={candidate} className="space-y-1">
                <div className="flex justify-between text-sm font-semibold">
                  <span>{candidate}</span>
                  <span className="text-slate-400">{count} votes ({percentage}%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => fetchResults(password)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition"
        >
          🔄 Refresh Tallies
        </button>
      </div>
    </div>
  );
}