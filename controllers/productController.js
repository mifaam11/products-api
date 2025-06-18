const Product = require('../models/Product');

// GET all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
};

// GET single product by ID
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
};

// POST create product
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};

// PUT update product
exports.updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
};
