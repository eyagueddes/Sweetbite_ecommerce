const About = () => (
  <section className="text-center py-20 bg-white/50 rounded-3xl">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-6">Pourquoi choisir SweetBite ?</h2>
      <div className="grid md:grid-cols-3 gap-8 text-lg">
        <div>
          <div className="text-4xl mb-4">🥐</div>
          <h3 className="font-bold text-xl mb-2">Fait main</h3>
          <p>Chaque cookie est préparé quotidiennement avec des ingrédients tunisiens premium.</p>
        </div>
        <div>
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="font-bold text-xl mb-2">Livraison rapide</h3>
          <p>Partout en Tunisie en moins de 48h, emballage isotherme garanti.</p>
        </div>
        <div>
          <div className="text-4xl mb-4">💳</div>
          <h3 className="font-bold text-xl mb-2">Paiement TND</h3>
          <p>Carte bancaire, livraison payée, ou crypto via gateway tunisien.</p>
        </div>
      </div>
    </div>
  </section>
)

export default About
