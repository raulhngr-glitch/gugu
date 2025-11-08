'use client'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
export const metadata = { title: 'Talhado Turismo', description: 'Roteiros, pacotes e experiências — Talhado Turismo' }
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
