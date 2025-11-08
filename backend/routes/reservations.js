const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../utils/sendgrid');

const RESERVATIONS = [];

router.post('/create', async (req, res) => {
  try {
    const { packageId, nome, email, cpf, adultos = 2, criancas = 0, ocupacao = 'double', total } = req.body;
    if (!packageId || !nome || !email) return res.status(400).json({ error: 'Missing fields' });

    const ref = 'REF' + Date.now();
    const reservation = { id: uuidv4(), ref, packageId, nome, email, cpf, adultos, criancas, ocupacao, total, status: 'Pendente' };
    RESERVATIONS.push(reservation);

    const pdfPath = path.join(process.env.PDF_STORAGE || './data/pdfs', `${reservation.id}.pdf`);
    await generateVoucherPDF(reservation, pdfPath);

    const subject = `Reserva confirmada — Talhado Turismo (${reservation.ref})`;
    const text = `Olá ${nome},\n\nRecebemos sua reserva. Ref: ${reservation.ref}\nTotal: ${total}\n\nAnexo: voucher.`;
    await sendEmail(email, subject, text, [{ filename: 'voucher.pdf', path: pdfPath }]);

    res.json({ ok: true, reservation: { ref: reservation.ref, id: reservation.id }, pdfUrl: `${process.env.PUBLIC_URL}/files/${reservation.id}.pdf` });
  } catch (err) {
    console.error('Create reservation error', err);
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
});

router.get('/voucher/:id.pdf', (req, res) => {
  const id = req.params.id;
  const pdfPath = path.join(process.env.PDF_STORAGE || './data/pdfs', `${id}.pdf`);
  if (fs.existsSync(pdfPath)) {
    res.sendFile(path.resolve(pdfPath));
  } else {
    res.status(404).send('Not found');
  }
});

async function generateVoucherPDF(reservation, outPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);
    doc.fontSize(18).text('Talhado Turismo — Voucher de Reserva', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Ref: ${reservation.ref}`);
    doc.text(`Nome: ${reservation.nome}`);
    doc.text(`Email: ${reservation.email}`);
    doc.text(`Pacote: ${reservation.packageId}`);
    doc.text(`Ocupação: ${reservation.ocupacao}`);
    doc.text(`Adultos: ${reservation.adultos} - Crianças: ${reservation.criancas}`);
    doc.text(`Total: ${reservation.total}`);
    doc.moveDown();
    doc.fontSize(10).text('Contato de emergência: suporte@talhadoturismo.com | +55 (11) 99999-9999');
    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

module.exports = router;
