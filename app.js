require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const app = express();

// 🔹 Middlewares
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies

// 🔹 Routes
app.use('/', productRoutes);

// 🔹 Port
const PORT = process.env.PORT || 5000;

// 🔹 Connect to MongoDB and Start Server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // ✅ Cleaned-up connection
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 API running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
    }
};

startServer();
