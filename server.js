const express = require('express');
const path = require('path');
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

// API Endpoint to save profile data
app.post('/api/submit-profile', async (req, res) => {
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
