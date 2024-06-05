const db = require('../config/config');

const initiatePayment = (req, res) => {
    const { amount, idNumber } = req.body;

    const query = 'INSERT INTO payments (idNumber, amount, status) VALUES (?, ?, ?)';
    db.query(query, [idNumber, amount, 'Pending'], (err, result) => {
        if (err) return res.status(500).send('Error initiating payment');

        const paynowResponse = {
            status: 'OK',
            redirectUrl: 'https://paynow.co.zw/payment-gateway'
        };

        res.status(200).send(paynowResponse);
    });
};

module.exports = {
    initiatePayment
};
