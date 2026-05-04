const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    name: "Essential Crew Tee",
    category: "T-Shirts",
    price: 599,
    was: 899,
    image: "https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-tshirt-white.jpg", // Example URL
    images: ["https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-tshirt-white.jpg"],
    tag: "New",
    description: "Our signature crew neck t-shirt, crafted from 100% premium combed cotton. Features a relaxed fit and durable double-needle stitching. Perfect for everyday wear or layering.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    name: "Heavyweight Hoodie",
    category: "Hoodies",
    price: 1499,
    was: 1999,
    image: "https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-hoodie-black.jpg",
    images: ["https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-hoodie-black.jpg"],
    tag: "Best Seller",
    description: "Premium heavyweight fleece hoodie designed for ultimate comfort and durability. Features a double-lined hood, kangaroo pocket, and ribbed cuffs and hem.",
    sizes: ["M", "L", "XL"]
  },
  {
    name: "Tapered Track Pant",
    category: "Track Pants",
    price: 999,
    was: null,
    image: "https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-track-grey.jpg",
    images: ["https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-track-grey.jpg"],
    tag: null,
    description: "Sleek and functional track pants with a modern tapered fit. Made from moisture-wicking fabric with four-way stretch for maximum mobility.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Coastline Shorts",
    category: "Shorts",
    price: 749,
    was: 999,
    image: "https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-shorts-navy.jpg",
    images: ["https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-shorts-navy.jpg"],
    tag: "-25%",
    description: "Lightweight and versatile shorts perfect for the coast or the gym. Features quick-dry fabric and secure zip pockets.",
    sizes: ["S", "M", "L"]
  },
  {
    name: "Pocket Tee — Onyx",
    category: "T-Shirts",
    price: 649,
    was: null,
    image: "https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-tshirt-black.jpg",
    images: ["https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/p-tshirt-black.jpg"],
    tag: null,
    description: "Minimalist pocket tee in a deep onyx black. Made from our softest cotton jersey for a premium feel.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Marl Pullover Hoodie",
    category: "Hoodies",
    price: 1399,
    was: 1799,
    image: "https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/cat-hoodies.jpg",
    images: ["https://raw.githubusercontent.com/lovable-ai/as-fashion-premium/main/public/cat-hoodies.jpg"],
    tag: "New",
    description: "Classic marl grey pullover hoodie with a soft brushed interior. A timeless essential for any wardrobe.",
    sizes: ["M", "L", "XL", "XXL"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded mock products!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
