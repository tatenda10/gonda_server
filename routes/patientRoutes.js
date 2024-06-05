const express = require('express');
const router = express.Router(); 
const { registerPatient, getCreditRating, uploadDocument } = require('../controllers/patientController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/register', registerPatient);
router.post('/credit-rating', getCreditRating);
router.post('/upload-document', uploadMiddleware.single('document'), uploadDocument);

module.exports = router;
