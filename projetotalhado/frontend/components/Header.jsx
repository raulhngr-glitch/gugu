'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Header(){
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[])
  return (
    <header className={`fixed w-full z-40 transition ${scrolled? 'bg-white/95 shadow':'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-talhadoBlue to-talhadoOrange text-white flex items-center justify-center">T</div><div className="hidden md:block"><strong style={{fontFamily:'Poppins'}}>Talhado Turismo</strong><small className="text-xs text-gray-600">Roteiros & Experiências</small></div></Link>
        <nav className="hidden md:flex gap-6"><a href="#pacotes">Pacotes</a><Link href="/blog">Blog</Link><Link href="/contato">Contato</Link></nav>
        <div className="flex gap-3"><a href="https://wa.me/" aria-label="WhatsApp" className="p-2 rounded bg-green-600 text-white">WA</a></div>
      </div>
    </header>
  )
}
