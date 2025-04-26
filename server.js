
const express = require('express');
const africastalking = require('africastalking');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Africa's Talking Setup
const AT = africastalking({
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
});

// Route to send SMS
app.post('/sendsms', async (req, res) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Phone number and message are required' });
    }

    try {
        const result = await AT.SMS.send({
            to: [phoneNumber],
            message: message,
            from: 'Sandbox'  // use your sandbox sender ID
        });

        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.toString() });
    }
});

// Home route
app.get('/', (req, res) => {
    res.send('SMS Backend is Running');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
