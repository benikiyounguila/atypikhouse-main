import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/ui/Header';

const InfosProprietaires = () => {
  const infoCards = [
    {
      title: 'Pourquoi nous rejoindre ?',
      content:
        'Atypikhouse vous offre une plateforme unique pour partager votre bien insolite avec des voyageurs du monde entier. Augmentez vos revenus et faites vivre des expériences inoubliables.',
      image:
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      title: 'Types de biens acceptés',
      content:
        'Cabanes dans les arbres, yourtes, tiny houses, bulles, péniches... Tout logement atypique et confortable est le bienvenu !',
      image:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      title: 'Accompagnement personnalisé',
      content:
        'Notre équipe vous guide à chaque étape : de la création de votre annonce à la gestion de vos réservations. Un support dédié 7j/7.',
      image:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    },
    {
      title: 'Visibilité maximale',
      content:
        "Bénéficiez de notre forte présence en ligne et de nos partenariats pour attirer des voyageurs en quête d'expériences uniques.",
      image:
        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    },
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      property: 'Cabane dans les arbres',
      quote:
        "Grâce à Atypikhouse, ma cabane est occupée presque toute l'année. Le processus est simple et l'équipe est toujours là pour m'aider.",
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      name: 'Pierre D.',
      property: 'Yourte moderne',
      quote:
        "J'apprécie la flexibilité qu'offre Atypikhouse. Je peux gérer mes réservations facilement et les voyageurs sont toujours respectueux.",
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mt-16 mb-12 text-blue-800">
            Devenez hôte sur Atypikhouse
          </h1>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
              Pourquoi choisir Atypikhouse ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">{card.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
              Comment ça marche ?
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <ol className="list-decimal list-inside space-y-4">
                <li className="text-lg">
                  Inscrivez-vous gratuitement sur notre plateforme
                </li>
                <li className="text-lg">
                  Créez une annonce détaillée de votre bien atypique
                </li>
                <li className="text-lg">
                  Définissez vos tarifs et disponibilités
                </li>
                <li className="text-lg">Recevez des demandes de réservation</li>
                <li className="text-lg">
                  Accueillez vos voyageurs et partagez des expériences uniques
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
              Témoignages d'hôtes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 flex items-center"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mr-6 object-cover"
                  />
                  <div>
                    <p className="text-gray-600 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.property}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link
              to="/register#register-title"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block"
            >
              Commencer l'aventure maintenant
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfosProprietaires;
