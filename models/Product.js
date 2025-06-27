const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    price: Number,
    stock: Number,
    description: String,
    status: String,
    image: { type: String, required: true }, // ✅ image url
});

module.exports = mongoose.model("Product", productSchema);
