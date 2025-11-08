const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

router.post('/notification', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const notificationCode = req.body.notificationCode || req.query.notificationCode;
    if (!notificationCode) return res.status(400).send('No notification code');

    const email = process.env.PAGSEGURO_EMAIL;
    const token = process.env.PAGSEGURO_TOKEN;
    const url = `https://ws.pagseguro.uol.com.br/v3/transactions/notifications/${notificationCode}?email=${email}&token=${token}`;
    const resp = await axios.get(url);
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(resp.data);
    console.log('PagSeguro parsed notification:', parsed);
    // TODO: map parsed to your reservation and update status
    res.send('OK');
  } catch (err) {
    console.error('PagSeguro error', err?.response?.data || err.message);
    res.status(500).send('Error');
  }
});

module.exports = router;
