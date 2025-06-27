const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// CREATE: POST - receives image URL from frontend (already uploaded to Cloudinary)
router.post("/", async (req, res) => {
    try {
        const { name, category, price, stock, description, status, image } = req.body;

        // Basic validation
        if (!name || !price || !stock || !image) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const product = new Product({
            name,
            category,
            price,
            stock,
            description,
            status,
            image,
        });

        const saved = await product.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ: Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ: Get product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE product
router.put("/:id", async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE product
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
