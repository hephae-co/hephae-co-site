const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// For any other request, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const admin = require('firebase-admin');

// Initialize Firebase Admin
// Using applicationDefault() allows it to pick up credentials from GOOGLE_APPLICATION_CREDENTIALS env var
// or metadata server if on GCP.
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// API Endpoint to save profile data
app.post('/api/submit-profile', async (req, res) => {
  try {
    const data = req.body;
    // Save to 'customer_profile' collection
    if (!data.businessName && !data.email) {
      // Basic validation
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const docRef = db.collection('customer_profile').doc();
    await docRef.set({
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
