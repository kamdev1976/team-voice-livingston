// server.cjs
const http = require('http');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

// Default static September data to seed into MongoDB if empty
const INITIAL_SEPTEMBER_DATA = {
  monthKey: 'Sep-26',
  carryForward: 1433,
  collections: [
    { id: 1, memberName: 'Kamdev Sahoo', amount: 1500, receivedBy: 'Sahoo' },
    { id: 2, memberName: 'Himanshu Gaur', amount: 1500, receivedBy: 'Sahoo' },
    { id: 3, memberName: 'Mahesh', amount: 1000, receivedBy: 'Sahoo' },
    { id: 4, memberName: 'Ankit Gupta', amount: 1500, receivedBy: 'Sahoo' },
    { id: 5, memberName: 'Kundan', amount: 1500, receivedBy: 'Sahoo' },
    { id: 6, memberName: 'Abhishek Sen', amount: 1500, receivedBy: 'Sahoo' },
    { id: 7, memberName: 'Mohanty', amount: 1500, receivedBy: 'Sahoo' },
    { id: 8, memberName: 'Ambuj', amount: 1500, receivedBy: 'Sahoo' },
    { id: 9, memberName: 'Anup', amount: 1500, receivedBy: 'Sahoo' },
    { id: 10, memberName: 'Amod Giri', amount: 1500, receivedBy: 'Sahoo' },
    { id: 11, memberName: 'Vivek', amount: 1500, receivedBy: 'Sahoo' },
    { id: 12, memberName: 'Madan', amount: 1500, receivedBy: '' }
  ],
  expenses: [
    { id: 101, description: '1 Court charge', amount: 9000 },
    { id: 102, description: '2nd court charge', amount: 8000 }
  ]
};

// MongoDB Schemas & Models
const CollectionSchema = new mongoose.Schema({
  id: Number,
  memberName: String,
  amount: Number,
  receivedBy: String
});

const ExpenseSchema = new mongoose.Schema({
  id: Number,
  description: String,
  amount: Number
});

const LedgerSchema = new mongoose.Schema({
  monthKey: { type: String, required: true, unique: true },
  carryForward: { type: Number, default: 0 },
  collections: [CollectionSchema],
  expenses: [ExpenseSchema]
}, { timestamps: true });

const Ledger = mongoose.model('Ledger', LedgerSchema);

// Auto-seed baseline September data if DB is completely empty
const seedDefaultData = async () => {
  try {
    const existingSep = await Ledger.findOne({ monthKey: 'Sep-26' });
    if (!existingSep) {
      await Ledger.create(INITIAL_SEPTEMBER_DATA);
      console.log('Sep-26 initial baseline data seeded to MongoDB successfully');
    }
  } catch (err) {
    console.error('Error seeding default data:', err);
  }
};

// Connect to MongoDB Atlas
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB Atlas Connected Successfully');
      seedDefaultData();
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
} else {
  console.warn('Warning: MONGODB_URI environment variable is missing!');
}

// Helper function to generate valid dynamic password (ddmmyy + lowercase 3-letter weekday)
const getExpectedPassword = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  const weekday = now.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
  
  return `${day}${month}${year}${weekday}`;
};

const server = http.createServer(async (req, res) => {
  // Enforce CORS headers on ALL responses immediately
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password, Authorization');

  // Handle browser preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // GET / (Health Check)
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'Pharmacy & Club Ledger Backend API is running' }));
    }

    // GET /ledger-months OR /clubledger
    else if ((req.url === '/clubledger' || req.url === '/ledger-months') && req.method === 'GET') {
      if (req.url === '/ledger-months') {
        const ledgers = await Ledger.find({}, 'monthKey').sort({ createdAt: 1 });
        const monthKeys = ledgers.map(l => l.monthKey);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(monthKeys.length > 0 ? monthKeys : ['Sep-26']));
      } else {
        const ledgers = await Ledger.find({});
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ledgers));
      }
    }

    // GET /clubledger/:monthKey OR /ledger/:monthKey
    else if ((req.url.startsWith('/clubledger/') || req.url.startsWith('/ledger/')) && req.method === 'GET') {
      const monthKey = req.url.split('/')[2];
      let ledger = await Ledger.findOne({ monthKey });
      if (!ledger) {
        ledger = { monthKey, carryForward: 0, collections: [], expenses: [] };
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(ledger));
    }

    // PROTECTED: POST/PUT /clubledger OR /ledger
    else if ((req.url === '/clubledger' || req.url === '/ledger') && (req.method === 'POST' || req.method === 'PUT')) {
      const providedPassword = req.headers['x-admin-password'];
      const expectedPassword = getExpectedPassword();

      if (!providedPassword || providedPassword.trim().toLowerCase() !== expectedPassword) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized: Invalid authentication password.' }));
        return;
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const payload = JSON.parse(body);
          
          // Upsert into MongoDB (Update if exists, insert if new)
          const updatedLedger = await Ledger.findOneAndUpdate(
            { monthKey: payload.monthKey },
            { 
              carryForward: payload.carryForward, 
              collections: payload.collections, 
              expenses: payload.expenses 
            },
            { new: true, upsert: true }
          );

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedLedger));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to save ledger to MongoDB' }));
        }
      });
    }

    // Fallback handlers for secondary POC endpoints
    else if (req.url === '/invoices' || req.url === '/medicines') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }

    // 404 Fallback
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend Server running on port ${PORT}`);
});