const express = require('express');
const router = express.Router();
const { registerServiceProvider, getServiceProviders } = require('../controllers/serviceProviderController');

router.post('/register', registerServiceProvider);
router.get('/list', getServiceProviders);

module.exports = router;
 