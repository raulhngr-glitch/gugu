'use client'
export default function Hero(){
  return (
    <section className="pt-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 p-6">
        <div>
          <h1 className="text-4xl font-bold" style={{fontFamily:'Poppins'}}>Viaje com quem entende: roteiros completos, suporte 24/7 e preços transparentes.</h1>
          <p className="mt-4" style={{fontFamily:'Lato'}}>Decole amanhã. Planejamos cada detalhe. Parcelamos sem juros e oferecemos suporte 24/7 — viajar é só alegria.</p>
          <div className="mt-6 flex gap-3"><a className="px-4 py-2 bg-talhadoBlue text-white rounded" href="#pacotes">Buscar pacotes</a><a className="px-4 py-2 border rounded" href="#simulador">Simular orçamento</a></div>
        </div>
        <div><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" alt="Praia" loading="lazy" className="w-full h-80 object-cover rounded"/></div>
      </div>
    </section>
  )
}
