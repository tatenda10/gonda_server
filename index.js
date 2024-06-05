const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/service-providers', serviceProviderRoutes);
app.use('/payments', paymentRoutes);
app.use('/', webhookRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
