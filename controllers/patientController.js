const db = require('../config/config');
const fs = require('fs');
const path = require('path');

const registerPatient = (req, res) => {
    const { fullName, idNumber, serviceProviderId } = req.body;
    const query = 'INSERT INTO patients (fullName, idNumber, serviceProviderId) VALUES (?, ?, ?)';
    db.query(query, [fullName, idNumber, serviceProviderId], (err, result) => {
        if (err) return res.status(500).send('Error registering patient');
        res.status(201).send('Patient registered successfully');
    });
};

const getCreditRating = (req, res) => {
    const { idNumber } = req.body;
    const query = 'SELECT creditRating FROM patients WHERE idNumber = ?';
    db.query(query, [idNumber], (err, result) => {
        if (err) return res.status(500).send('Error fetching credit rating');
        if (result.length === 0) return res.status(404).send('Patient not found');
        res.status(200).send({ rating: result[0].creditRating });
    });
};

const uploadDocument = (req, res) => {
    const { idNumber, documentType } = req.body;
    const document = req.file;

    const uploadPath = path.join(__dirname, '..', 'documents', `${idNumber}-${documentType}.pdf`);
    fs.writeFileSync(uploadPath, document.buffer);

    res.status(200).send('Document uploaded successfully');
};

module.exports = {
    registerPatient,
    getCreditRating,
    uploadDocument
};
