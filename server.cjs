const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://your_connection_string_here';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ------------------------------------------------------------------
// Vote Schema & Model
// ------------------------------------------------------------------
const voteSchema = new mongoose.Schema({
  flatNo: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  mobileNo: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  aadhaarNo: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  selectedCandidates: { 
    type: [String], 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Vote = mongoose.model('Vote', voteSchema);

// ------------------------------------------------------------------
// API Endpoints
// ------------------------------------------------------------------

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 1. Submit Vote Endpoint
app.post('/api/votes', async (req, res) => {
  try {
    const { flatNo, mobileNo, aadhaarNo, selectedCandidates } = req.body;

    // Basic Validation
    if (!flatNo || !mobileNo || !aadhaarNo || !selectedCandidates || selectedCandidates.length === 0) {
      return res.status(400).json({ error: 'Flat number, mobile number, Aadhaar number, and candidate selection are required.' });
    }

    // Check for existing duplicate records in database
    const existingVote = await Vote.findOne({
    or: [
        { flatNo: flatNo.trim() },
        { mobileNo: mobileNo.trim() },
        { aadhaarNo: aadhaarNo.trim() }
      ]
    });

    if (existingVote) {
      return res.status(400).json({ 
        error: 'A vote has already been recorded for this Flat, Mobile number, or Aadhaar card.' 
      });
    }

    // Create and save new vote
    const newVote = new Vote({
      flatNo: flatNo.trim(),
      mobileNo: mobileNo.trim(),
      aadhaarNo: aadhaarNo.trim(),
      selectedCandidates
    });

    await newVote.save();

    res.status(201).json({ 
      message: 'Your vote has been cast successfully!',
      voteId: newVote._id 
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate voting detected. Each resident can only vote once.' 
      });
    }
    console.error('Error recording vote:', err);
    res.status(500).json({ error: 'Server error processing your vote: ' + err.message });
  }
});

// 2. Fetch Live Election Tallies & Results
app.get('/api/votes/results', async (req, res) => {
  try {
    const votes = await Vote.find();
    const totalVotes = votes.length;
    const tally = {};

    // Aggregate counts for each candidate
    votes.forEach((voteRecord) => {
      if (Array.isArray(voteRecord.selectedCandidates)) {
        voteRecord.selectedCandidates.forEach((candidate) => {
          tally[candidate] = (tally[candidate] || 0) + 1;
        });
      }
    });

    res.json({
      totalVotes,
      tally,
      updatedAt: new Date()
    });

  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Failed to retrieve election tallies.' });
  }
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});