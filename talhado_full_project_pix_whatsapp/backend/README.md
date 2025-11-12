Backend (Express)
- Run: npm install && npm run dev
- Copy .env.example to .env and fill credentials (Stripe, PagSeguro, SendGrid, CRM)
- Endpoints:
  POST /api/reservations/create  -> create reservation & send voucher email
  POST /api/stripe/create-session -> create stripe checkout session
  POST /api/stripe/webhook -> stripe webhook (requires raw body)
  POST /api/pagseguro/notification -> pagseguro notification
  POST /api/crm/lead -> forward lead to CRM
- For production: use S3 for PDFs, secure environment, TLS, WAF
