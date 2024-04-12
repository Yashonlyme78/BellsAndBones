const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

// Endpoint to submit a pet sitting request
router.post('/requests', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { petId, details } = req.body;
    const userId = req.session.userId; // Assuming you have stored userId in the session
    const petSittingRequest = {
      user: userId,
      pet: ObjectId(petId),
      details,
      status: 'pending' // You can add a status field to track the status of the request
    };
    await db.collection("petSittingRequests").insertOne(petSittingRequest);
    res.status(201).json({ message: 'Pet sitting request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit pet sitting request' });
  }
});

// Endpoint to get all pet sitting requests
router.get('/requests', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const petSittingRequests = await db.collection("petSittingRequests").find().toArray();
    res.json(petSittingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pet sitting requests' });
  }
});

// Endpoint to respond to a pet sitting request
router.post('/requests/:id/respond', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { response } = req.body;
    const requestId = req.params.id;
    // Update the request with the response
    await db.collection("petSittingRequests").updateOne({ _id: ObjectId(requestId) }, { $set: { status: response } });
    res.json({ message: 'Pet sitting request responded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to respond to pet sitting request' });
  }
});

module.exports = router;
