const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/upload");

// POST with image upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
        let imageUrl = "";

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "funk" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            status: req.body.status,
            image: imageUrl, // ✅ save image URL
        });

        const saved = await product.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
