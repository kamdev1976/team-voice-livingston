import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const CANDIDATES = [
  { id: 'c1', name: 'Vikash Kumar', title: 'President Candidate', tower: 'Tower 4' },
  { id: 'c2', name: 'Ankit Gupta', title: 'Secretary Candidate', tower: 'Tower 2' },
  { id: 'c3', name: 'Amod Giri', title: 'Treasurer Candidate', tower: 'Tower 1' },
];

export default function VotePage() {
  const navigate = useNavigate(); // 2. Initialize navigate hook
  const [formData, setFormData] = useState({ flatNo: '', mobileNo: '', aadhaarNo: '' });
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    if (!selectedCandidate) {
      setStatus({ loading: false, message: '', error: 'Please select a candidate to vote.' });
      return;
    }

    try {
      const response = await fetch('https://pharmacy-backend-poc.onrender.com/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedCandidates: [selectedCandidate]
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit vote');

      // 3. Set success message and redirect after 1.5 seconds
      setStatus({ loading: false, message: 'Your vote has been recorded! Redirecting to results...', error: '' });
      setFormData({ flatNo: '', mobileNo: '', aadhaarNo: '' });
      setSelectedCandidate('');

      setTimeout(() => {
        navigate('/vote-results'); // Redirects to the Results Page
      }, 1500);

    } catch (err) {
      setStatus({ loading: false, message: '', error: err.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-2 text-center text-blue-400">Cast Your Vote</h2>
      <p className="text-sm text-slate-400 text-center mb-6">Supertech Livingston AOA Elections</p>

      {status.message && <div className="p-3 bg-green-800 text-green-200 rounded mb-4 text-center">{status.message}</div>}
      {status.error && <div className="p-3 bg-red-800 text-red-200 rounded mb-4 text-center">{status.error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Flat Number (e.g. T4-1002)</label>
          <input
            type="text"
            required
            value={formData.flatNo}
            onChange={(e) => setFormData({ ...formData, flatNo: e.target.value })}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Tower & Flat No."
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Mobile Number</label>
          <input
            type="tel"
            required
            pattern="[0-9]{10}"
            value={formData.mobileNo}
            onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Aadhaar Card Number</label>
          <input
            type="text"
            required
            value={formData.aadhaarNo}
            onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="xxxx-xxxx-xxxx"
          />
        </div>

        <div className="pt-2">
          <label className="block text-sm font-semibold text-slate-200 mb-2">Select Candidate</label>
          <div className="space-y-2">
            {CANDIDATES.map((c) => (
              <label
                key={c.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                  selectedCandidate === c.name
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.title} • {c.tower}</div>
                </div>
                <input
                  type="radio"
                  name="candidate"
                  value={c.name}
                  checked={selectedCandidate === c.name}
                  onChange={() => setSelectedCandidate(c.name)}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition mt-4 disabled:opacity-50"
        >
          {status.loading ? 'Submitting Vote...' : 'Submit Vote'}
        </button>
      </form>
    </div>
  );
}