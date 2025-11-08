const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

router.post('/create-session', async (req, res) => {
  try {
    const { packageId, amount, currency = 'brl', customerEmail } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency,
          product_data: { name: `Reserva: ${packageId}` },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1
      }],
      customer_email: customerEmail,
      metadata: { packageId },
      success_url: `${process.env.PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_URL}/cancel`
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe create-session error', err);
    res.status(500).json({ error: 'Erro ao criar sessão' });
  }
});

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Pagamento concluído para sessão:', session.id, session.metadata);
      // TODO: marcar reserva como paga no DB, gerar voucher e enviar email
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
