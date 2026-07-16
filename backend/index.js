const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Imperial Estates Backend is fully functional' });
});

// Contact Submission API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    console.log('Received inquiry:', { name, email, phone, interest, message });

    // Try to save to User model if database is configured
    try {
      await prisma.user.create({
        data: {
          name,
          email,
        }
      });
      console.log('Successfully saved contact as user in database.');
    } catch (dbErr) {
      console.log('Database save skipped or failed (optional user logging):', dbErr.message);
    }

    return res.json({
      success: true,
      message: 'Inquiry received. Our team will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Get properties mock
app.get('/api/properties', (req, res) => {
  res.json({ success: true, message: 'Properties API' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
