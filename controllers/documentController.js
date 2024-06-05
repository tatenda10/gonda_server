// controllers/documentController.js
const db = require('../config');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });

const uploadDocument = upload.single('document');

const saveDocument = async (req, res) => {
    try {
        const { patientId, serviceProviderId, documentType } = req.body;
        const documentPath = req.file.path; 

        const [result] = await db.execute(
            'INSERT INTO documents (patient_id, service_provider_id, document_type, document_path) VALUES (?, ?, ?, ?)',
            [patientId, serviceProviderId, documentType, documentPath]
        );

        res.status(200).json({ message: 'Document uploaded and saved.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const [rows] = await db.execute('SELECT * FROM documents WHERE id = ?', [documentId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const document = rows[0];
        res.download(document.document_path);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    uploadDocument,
    saveDocument,
    getDocument
};
