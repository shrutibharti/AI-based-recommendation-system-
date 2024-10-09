const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const recommendationRoutes = require('./routes/recommendation');  // Import recommendation routes

const app = express();
connectDB();  // Connect to MongoDB

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', recommendationRoutes);  // Use recommendation routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
