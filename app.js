require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 🔹 Important for frontend integration

const productRoutes = require('./routes/productRoutes');

const app = express();

// 🔹 Middleware
app.use(cors()); // Allow CORS for frontend (like React or Next.js)
app.use(express.json());

// 🔹 Routes
app.use('/', productRoutes);

// 🔹 Port
const PORT = process.env.PORT || 5000;

// 🔹 Database Connection + Server Start
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 API running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
    });
