const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Africastalking = require('africastalking');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Africa's Talking
const africastalking = Africastalking({
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
});

const sms = africastalking.SMS;

// API endpoint to send SMS
app.post('/send-sms', async (req, res) => {
    const { phoneNumber, message } = req.body;
    try {
        const response = await sms.send({
            to: [phoneNumber],
            message
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
});

app.get('/', (req, res) => {
    res.send('SMS Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
