const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/lead', async (req, res) => {
  try {
    const lead = req.body;
    const hubspotUrl = process.env.CRM_ENDPOINT;
    const resp = await axios.post(hubspotUrl, {
      properties: [
        { property: 'email', value: lead.email },
        { property: 'firstname', value: lead.nome },
        { property: 'phone', value: lead.telefone || '' },
        { property: 'notes', value: `Pacote: ${lead.pacote} — ${lead.mensagem || ''}` }
      ]
    }, { headers: { 'Content-Type': 'application/json' }});
    res.json({ ok: true, crm: resp.data });
  } catch (err) {
    console.error('CRM error', err?.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao enviar lead ao CRM' });
  }
});

module.exports = router;
