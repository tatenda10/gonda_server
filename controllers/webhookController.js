const axios = require('axios');

const verifyWebhook = (req, res) => {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
};

const receiveMessage = async (req, res) => {
    const data = req.body;

    if (data.object) {
        if (data.entry && data.entry[0].changes && data.entry[0].changes[0].value.messages && data.entry[0].changes[0].value.messages[0]) {
            const message = data.entry[0].changes[0].value.messages[0];
            const userMessage = message.text.body.toLowerCase();

            let responseMessage;

            if (userMessage.includes('patient')) {
                responseMessage = 'Are you looking for a credit rating or a credit application form?';
            } else if (userMessage.includes('service provider')) {
                responseMessage = 'Would you like to register as a service provider or submit/download a form?';
            } else if (userMessage.includes('credit rating')) {
                responseMessage = 'Please select your institution.';
            } else if (userMessage.includes('credit application form')) {
                responseMessage = 'Would you like to download or submit the credit application form?';
            } else {
                responseMessage = 'Welcome to Gonda Clinic. Please choose: Patient or Service Provider.';
            }

            const response = {
                messaging_product: 'whatsapp',
                to: message.from,
                text: { body: responseMessage }
            };

            await axios.post(`https://graph.facebook.com/v12.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, response, {
                headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` }
            });

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
};

module.exports = {
    verifyWebhook,
    receiveMessage
};
