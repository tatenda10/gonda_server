const db = require('../config/config');

const registerServiceProvider = (req, res) => {
    const { name, type, contact } = req.body;
    const query = 'INSERT INTO serviceProviders (name, type, contact) VALUES (?, ?, ?)';
    db.query(query, [name, type, contact], (err, result) => {
        if (err) return res.status(500).send('Error registering service provider');
        res.status(201).send('Service Provider registered successfully');
    });
};

const getServiceProviders = (req, res) => {
    const query = 'SELECT * FROM serviceProviders';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error fetching service providers');
        res.status(200).send(results);
    });
};

module.exports = {
    registerServiceProvider,
    getServiceProviders
};
