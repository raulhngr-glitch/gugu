Talhado Turismo — Full Project (frontend + backend)

Structure:
- frontend/  => Next.js + Tailwind (app router)
- backend/   => Express API (Stripe, PagSeguro, SendGrid, CRM, PDF generation)

How to use:
- Start backend: cd backend && npm install && cp .env.example .env && edit .env && npm run dev
- Start frontend: cd frontend && npm install && npm run dev

Security:
- Never commit .env with secrets.
- Use HTTPS, S3 for files in production.

