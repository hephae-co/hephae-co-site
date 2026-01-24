const express = require('express');
const path = require('path');
const cors = require('cors'); // Import cors
const app = express();
const port = process.env.PROXY_PORT || 3000;
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'hephae-co'
});

const db = admin.firestore();
const fs = require('fs');

app.use(express.json());

// Setup CORS options to dynamically allow only the same host running the static JS
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      `http://localhost:${port}`,
      'https://hephae.co'
    ];
    const hephaeCoRegex = /^https?:\/\/([a-z0-9-]+\.)*hephae\.co$/;

    // Allow requests with no origin (same-origin requests) or from allowed origins or matching hephae.co subdomains
    if (!origin || allowedOrigins.includes(origin) || hephaeCoRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Middleware for basic validation of /api/submit-profile
const validateProfileData = (req, res, next) => {
  const { businessName, problem, tools, socials } = req.body;

  if (businessName === undefined) {
    return res.status(400).json({ success: false, error: 'Business name is required.' });
  }

  if (problem === undefined) {
    return res.status(400).json({ success: false, error: 'Problem description is required.' });
  }

  if (tools !== undefined && !Array.isArray(tools)) {
    return res.status(400).json({ success: false, error: 'Tools must be an array if provided.' });
  }

  if (socials !== undefined && !Array.isArray(socials)) {
    return res.status(400).json({ success: false, error: 'Socials must be an array if provided.' });
  }
  next();
};

// API Endpoint to save profile data, now with CORS protection
app.post('/api/submit-profile', cors(corsOptions), validateProfileData, async (req, res) => {
  try {
    const data = req.body;

    // Save to 'customer_profile' collection
    const docRef = db.collection('customer_profile').doc();
    await docRef.set({
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('Document written with ID: ', docRef.id);
    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any other request, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
