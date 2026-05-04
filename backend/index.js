const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const Product = require('./models/Product');
const Order = require('./models/Order');
const Settings = require('./models/Settings');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB Atlas');
        // Initialize default settings if not exists
        const shippingSetting = await Settings.findOne({ key: 'shipping_charge' });
        if (!shippingSetting) {
            await Settings.create({
                key: 'shipping_charge',
                value: { amount: 60, threshold: 999 },
                description: 'Standard shipping charge and free shipping threshold'
            });
            console.log('Default shipping settings initialized');
        }
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- PRODUCT ROUTES ---

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a product with multiple image uploads
app.post('/api/products', upload.array('images', 10), async (req, res) => {
    try {
        const productData = { ...req.body };
        
        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => `http://localhost:9200/uploads/${file.filename}`);
            productData.image = imageUrls[0]; // First image as main
            productData.images = imageUrls;    // All images in array
        }
        
        // Handle sizes if sent as a string (from FormData)
        if (typeof productData.sizes === 'string') {
            productData.sizes = productData.sizes.split(',').map(s => s.trim());
        }

        const product = new Product(productData);
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Update a product with multiple image uploads
app.put('/api/products/:id', upload.array('images', 10), async (req, res) => {
    try {
        const productData = { ...req.body };
        
        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => `http://localhost:9200/uploads/${file.filename}`);
            productData.image = imageUrls[0];
            productData.images = imageUrls;
        }

        // Handle sizes if sent as a string
        if (typeof productData.sizes === 'string') {
            productData.sizes = productData.sizes.split(',').map(s => s.trim());
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- ORDER ROUTES ---

// Create Razorpay Order
app.post('/api/orders/create', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency,
            receipt,
        });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Razorpay order');
    }
});

// Verify Payment and Save Order
app.post('/api/orders/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;
    
    try {
        // Save Order to MongoDB
        const newOrder = new Order({
            orderId: orderDetails.orderId,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            customerName: orderDetails.customerName,
            customerEmail: orderDetails.customerEmail,
            customerPhone: orderDetails.customerPhone,
            customerAddress: orderDetails.customerAddress,
            items: orderDetails.items,
            totalAmount: orderDetails.totalAmount,
            status: 'Confirmed'
        });
        await newOrder.save();

        // Send Confirmation Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: orderDetails.customerEmail,
            cc: process.env.EMAIL_USER, // Admin gets a copy
            subject: `NEW ORDER - ${orderDetails.orderId} - ${orderDetails.customerName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
                    <h1 style="color: #c5a059; text-align: center;">Order Confirmed!</h1>
                    <p>Hi ${orderDetails.customerName}, thank you for shopping with AS Fashion.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Order Information</h3>
                        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
                        <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                        <p><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</p>
                    </div>

                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Shipping Details</h3>
                        <p><strong>Name:</strong> ${orderDetails.customerName}</p>
                        <p><strong>Phone:</strong> ${orderDetails.customerPhone}</p>
                        <p><strong>Email:</strong> ${orderDetails.customerEmail}</p>
                        <p><strong>Address:</strong><br>${orderDetails.customerAddress}</p>
                    </div>

                    <h3>Items Ordered</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background-color: #eee;">
                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
                                <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Qty</th>
                                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderDetails.items.map(item => `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name} (${item.selectedSize})</td>
                                    <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">₹${item.price}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <p style="margin-top: 30px; text-align: center; font-size: 12px; color: #777;">
                        AS Fashion - Premium Quality Apparel
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.json({ status: 'success', message: 'Order saved and email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying payment or saving order');
    }
});

// Get all orders (for admin)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- CONTACT ROUTE ---

app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sends to admin
            subject: `Contact Form Submission - ${firstName} ${lastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #c5a059;">New Contact Inquiry</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                        ${message}
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.json({ status: 'success', message: 'Inquiry sent to admin' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending inquiry');
    }
});

// --- ADMIN STATS ---

app.get('/api/admin/stats', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const orders = await Order.find().sort({ createdAt: -1 });
        
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const orderCount = orders.length;
        
        // Count unique customers by email
        const uniqueEmails = new Set(orders.map(o => o.customerEmail));
        const customerCount = uniqueEmails.size;

        res.json({
            stats: [
                { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "DollarSign", change: "Lifetime earnings" },
                { title: "Orders", value: orderCount.toString(), icon: "ShoppingBag", change: "Total orders placed" },
                { title: "Customers", value: customerCount.toString(), icon: "Users", change: "Unique buyers" },
                { title: "Active Products", value: productCount.toString(), icon: "Package", change: "Available in store" },
            ],
            recentSales: orders.slice(0, 5).map(order => ({
                name: order.customerName,
                email: order.customerEmail,
                amount: `+₹${order.totalAmount.toLocaleString()}`
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- SETTINGS ROUTES ---

// Get all settings
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await Settings.find();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a setting
app.put('/api/settings/:key', async (req, res) => {
    try {
        const updatedSetting = await Settings.findOneAndUpdate(
            { key: req.params.key },
            { value: req.body.value, updatedAt: Date.now() },
            { new: true }
        );
        res.json(updatedSetting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`MERN Server running on port ${port}`);
});
