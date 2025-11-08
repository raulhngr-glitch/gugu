require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const stripeRoutes = require('./routes/stripe');
const pagSeguroRoutes = require('./routes/pagseguro');
const reservationRoutes = require('./routes/reservations');
const crmRoutes = require('./routes/crm');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: true }));
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pdfDir = process.env.PDF_STORAGE || './data/pdfs';
fs.mkdirSync(pdfDir, { recursive: true });

app.use('/api/stripe', stripeRoutes);
app.use('/api/pagseguro', pagSeguroRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/crm', crmRoutes);

app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV }));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Talhado backend running on ${PORT}`);
});
