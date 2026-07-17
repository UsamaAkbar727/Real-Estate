const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const fs = require('fs');
const path = require('path');

// Authentication System
const crypto = require('crypto');
const activeSessions = new Map();

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Missing email or password' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Expected credentials from env (with secure fallback)
    const adminEmail = process.env.ADMIN_EMAIL || 'owner@imperial.com';
    const adminHash = process.env.ADMIN_PASSWORD_HASH || '43a0d17178a9d26c9e0fe9a74b0b45e38d32f27aed887a008a54bf6e033bf7b9'; // owner123

    const staffEmail = process.env.STAFF_EMAIL || 'employee@imperial.com';
    const staffHash = process.env.STAFF_PASSWORD_HASH || '5b2f8e27e2e5b4081c03ce70b288c87bd1263140cbd1bd9ae078123509b7caff'; // employee123

    let role = null;

    if (email === adminEmail && hashedPassword === adminHash) {
      role = 'owner';
    } else if (email === staffEmail && hashedPassword === staffHash) {
      role = 'employee';
    }

    if (!role) {
      return res.status(401).json({ success: false, error: 'Invalid email or security password' });
    }

    // Generate secure session token
    const token = crypto.randomBytes(32).toString('hex');
    activeSessions.set(token, { email, role });

    res.json({
      success: true,
      token,
      role,
      message: 'Logged in successfully'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Internal auth error' });
  }
});

app.post('/api/auth/session', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, error: 'Missing token' });
  }
  const session = activeSessions.get(token);
  if (!session) {
    return res.status(401).json({ success: false, error: 'Invalid session' });
  }
  res.json({
    success: true,
    role: session.role,
    email: session.email
  });
});

// Middleware to require authentication on modify actions
const requireAuth = (roleRequired) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Authorization header missing' });
    }
    const token = authHeader.replace('Bearer ', '');
    const session = activeSessions.get(token);
    if (!session) {
      return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' });
    }
    if (roleRequired && roleRequired === 'owner' && session.role !== 'owner') {
      return res.status(403).json({ success: false, error: 'Forbidden: Owner level access required.' });
    }
    req.user = session;
    next();
  };
};


// Image upload API (Authenticated)
app.post('/api/upload', requireAuth(), (req, res) => {
  try {
    const { name, base64 } = req.body;
    if (!name || !base64) {
      return res.status(400).json({ success: false, error: 'Missing name or base64 data' });
    }

    // Clean base64 prefix if exists (e.g. "data:image/png;base64,")
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let dataBuffer;
    if (matches && matches.length === 3) {
      dataBuffer = Buffer.from(matches[2], 'base64');
    } else {
      dataBuffer = Buffer.from(base64, 'base64');
    }

    // Path to the frontend public uploads directory
    const uploadDir = path.join(__dirname, '../frontend/public/images/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(name) || '.png';
    const baseName = path.basename(name, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${Date.now()}-${baseName}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, dataBuffer);

    console.log(`Saved uploaded image: ${fileName}`);

    res.json({
      success: true,
      url: `/images/uploads/${fileName}`
    });
  } catch (error) {
    console.error('Upload API error:', error);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
});


// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Imperial Estates Backend is fully functional' });
});

// ================= PROPERTIES API =================

// Get all properties with optional filtering
app.get('/api/properties', async (req, res) => {
  try {
    const { category, area, type, search, featured } = req.query;

    const where = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (type) {
      where.type = type;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (area && area !== 'All Areas') {
      where.OR = [
        { areaName: { contains: area } },
        { location: { contains: area } }
      ];
    }

    if (search) {
      const searchLower = search.toLowerCase();
      // If we already have OR from area, we can structure it carefully
      const searchConditions = [
        { title: { contains: searchLower } },
        { location: { contains: searchLower } }
      ];
      if (where.OR) {
        where.AND = [
          { OR: where.OR },
          { OR: searchConditions }
        ];
        delete where.OR;
      } else {
        where.OR = searchConditions;
      }
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        agent: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format list gallery & features back to array for frontend
    const formatted = properties.map(p => ({
      ...p,
      gallery: p.gallery ? p.gallery.split(',') : [],
      features: p.features ? p.features.split(',') : [],
      coordinates: { x: p.coordinatesX, y: p.coordinatesY }
    }));

    res.json({ success: true, properties: formatted });
  } catch (error) {
    console.error('Fetch properties error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch properties' });
  }
});

// Get single property by slug
app.get('/api/properties/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const property = await prisma.property.findUnique({
      where: { slug },
      include: { agent: true }
    });

    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    const formatted = {
      ...property,
      gallery: property.gallery ? property.gallery.split(',') : [],
      features: property.features ? property.features.split(',') : [],
      coordinates: { x: property.coordinatesX, y: property.coordinatesY }
    };

    res.json({ success: true, property: formatted });
  } catch (error) {
    console.error('Fetch property error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch property' });
  }
});

// Create property (Admin)
app.post('/api/properties', requireAuth(), async (req, res) => {
  try {
    const data = req.body;
    
    // Auto slug if not provided
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const property = await prisma.property.create({
      data: {
        slug,
        title: data.title,
        location: data.location,
        areaName: data.areaName,
        price: data.price,
        priceValue: parseFloat(data.priceValue),
        pricePerSqft: data.pricePerSqft || null,
        type: data.type,
        category: data.category,
        beds: parseInt(data.beds) || 0,
        baths: parseInt(data.baths) || 0,
        area: data.area,
        image: data.image,
        gallery: Array.isArray(data.gallery) ? data.gallery.join(',') : (data.gallery || ''),
        tag: data.tag || null,
        featured: data.featured || false,
        coordinatesX: parseFloat(data.coordinatesX || data.coordinates?.x || 20),
        coordinatesY: parseFloat(data.coordinatesY || data.coordinates?.y || 40),
        description: data.description,
        features: Array.isArray(data.features) ? data.features.join(',') : (data.features || ''),
        agentId: parseInt(data.agentId),
        yearBuilt: parseInt(data.yearBuilt) || 2024,
        parking: data.parking ? parseInt(data.parking) : null,
      }
    });

    res.status(201).json({ success: true, property });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ success: false, error: 'Failed to create property' });
  }
});

// Update property (Admin)
app.put('/api/properties/:id', requireAuth(), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const property = await prisma.property.update({
      where: { id },
      data: {
        title: data.title,
        location: data.location,
        areaName: data.areaName,
        price: data.price,
        priceValue: parseFloat(data.priceValue),
        pricePerSqft: data.pricePerSqft || null,
        type: data.type,
        category: data.category,
        beds: parseInt(data.beds) || 0,
        baths: parseInt(data.baths) || 0,
        area: data.area,
        image: data.image,
        gallery: Array.isArray(data.gallery) ? data.gallery.join(',') : (data.gallery || ''),
        tag: data.tag || null,
        featured: data.featured || false,
        coordinatesX: parseFloat(data.coordinatesX || data.coordinates?.x || 20),
        coordinatesY: parseFloat(data.coordinatesY || data.coordinates?.y || 40),
        description: data.description,
        features: Array.isArray(data.features) ? data.features.join(',') : (data.features || ''),
        agentId: parseInt(data.agentId),
        yearBuilt: parseInt(data.yearBuilt) || 2024,
        parking: data.parking ? parseInt(data.parking) : null,
      }
    });

    res.json({ success: true, property });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ success: false, error: 'Failed to update property' });
  }
});

// Delete property (Admin)
app.delete('/api/properties/:id', requireAuth('owner'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.property.delete({
      where: { id }
    });
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete property' });
  }
});


// ================= AGENTS API =================

// Get all agents
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { id: 'asc' }
    });

    const formatted = agents.map(a => ({
      ...a,
      specialties: a.specialties ? a.specialties.split(',') : [],
      languages: ['Urdu', 'English', 'Punjabi'],
      social: { facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
    }));

    res.json({ success: true, agents: formatted });
  } catch (error) {
    console.error('Fetch agents error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch agents' });
  }
});

// Get single agent by slug
app.get('/api/agents/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const agent = await prisma.agent.findUnique({
      where: { slug }
    });

    if (!agent) {
      return res.status(404).json({ success: false, error: 'Agent not found' });
    }

    const formatted = {
      ...agent,
      specialties: agent.specialties ? agent.specialties.split(',') : [],
      languages: ['Urdu', 'English', 'Punjabi'],
      social: { facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
    };

    res.json({ success: true, agent: formatted });
  } catch (error) {
    console.error('Fetch agent error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch agent' });
  }
});

// Create agent (Admin)
app.post('/api/agents', requireAuth('owner'), async (req, res) => {
  try {
    const data = req.body;
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const agent = await prisma.agent.create({
      data: {
        slug,
        name: data.name,
        role: data.role,
        bio: data.bio || '',
        experience: data.experience || '1 Year',
        deals: parseInt(data.deals) || 0,
        sales: data.sales || 'PKR 0 sold',
        specialties: Array.isArray(data.specialties) ? data.specialties.join(',') : (data.specialties || ''),
        image: data.image || '/images/agent_1.png',
        phone: data.phone,
        email: data.email,
      }
    });

    res.status(201).json({ success: true, agent });
  } catch (error) {
    console.error('Create agent error:', error);
    res.status(500).json({ success: false, error: 'Failed to create agent' });
  }
});

// Update agent (Admin)
app.put('/api/agents/:id', requireAuth('owner'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const agent = await prisma.agent.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio || '',
        experience: data.experience || '1 Year',
        deals: parseInt(data.deals) || 0,
        sales: data.sales || 'PKR 0 sold',
        specialties: Array.isArray(data.specialties) ? data.specialties.join(',') : (data.specialties || ''),
        image: data.image || '/images/agent_1.png',
        phone: data.phone,
        email: data.email,
      }
    });

    res.json({ success: true, agent });
  } catch (error) {
    console.error('Update agent error:', error);
    res.status(500).json({ success: false, error: 'Failed to update agent' });
  }
});

// Delete agent (Admin)
app.delete('/api/agents/:id', requireAuth('owner'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.agent.delete({
      where: { id }
    });
    res.json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Delete agent error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete agent' });
  }
});


// ================= INQUIRIES API (Leads) =================

// Submit inquiry (Contact Page & Properties detail contact forms)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || '',
        interest: interest || 'General Inquiry',
        message
      }
    });

    console.log('Saved inquiry in SQLite:', inquiry);

    res.json({
      success: true,
      message: 'Inquiry received. Our team will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    res.status(500).json({ success: false, error: 'Failed to save lead inquiry' });
  }
});

// Fetch all inquiries (Admin)
app.get('/api/inquiries', requireAuth(), async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, inquiries });
  } catch (error) {
    console.error('Fetch inquiries error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch inquiries' });
  }
});

// Update inquiry status (Admin/Staff)
app.put('/api/inquiries/:id/status', requireAuth(), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });

    res.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Update inquiry status error:', error);
    res.status(500).json({ success: false, error: 'Failed to update inquiry status' });
  }
});

// Delete inquiry (Admin)
app.delete('/api/inquiries/:id', requireAuth('owner'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.inquiry.delete({
      where: { id }
    });
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
