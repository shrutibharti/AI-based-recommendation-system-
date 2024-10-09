const express = require('express');
const Property = require('../models/property');
const router = express.Router();

// Fetch All Properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Add New Property
router.post('/properties', async (req, res) => {
  const { title, description, price, size, location, type } = req.body;

  try {
    const property = new Property({ title, description, price, size, location, type });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add property' });
  }
});

module.exports = router;
