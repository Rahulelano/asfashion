const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    was: { type: Number, default: null },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    tag: { type: String, default: null },
    description: { type: String, required: true },
    sizes: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
