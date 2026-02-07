const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 pt-24 pb-20">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6 leading-tight">
        Cookies Frais
        <br />
        <span className="text-4xl md:text-5xl">Livrés en Tunisie</span>
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
        Artisanaux, croustillants, irrésistibles. Payez en TND, livré en 48h partout en Tunisie.
      </p>
      <a href="#products" className="btn-primary text-xl px-12 py-4 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 inline-block">
        Voir nos cookies →
      </a>
    </div>
  </section>
)

export default Hero
