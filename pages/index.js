import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <>
      <Head>
        <title>Yigüirros Touring Guide | Tours</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Discover the magic of Costa Rica with Yigüirros Touring Guide. Guided and personalized tours, wildlife, and eco-friendly hikes through different regions of Costa Rica. Book your adventure today!" />
        <meta name="keywords" content="Yigüirros Touring Guide Costa Rica, tours in Costa Rica, nature tours Costa Rica, wildlife watching, rainforest tours, eco tours Costa Rica, guided tours, tours in Costa Rica, Costa Rica tourism, guided nature walks" />
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon.ico" />
        {/* Font Awesome */}
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        {/* Google fonts */}
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        {/* Core theme CSS */}
        <link href="/css/styles.css?v=20251213" rel="stylesheet" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-56CV47Z61R"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-56CV47Z61R');
          `,
        }} />
      </Head>
      <body id="page-top">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#">Yigüirros Touring Guide</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="/tours">Tours</a></li>
                <li className="nav-item"><a className="nav-link" href="/about">Nosotros</a></li>
                <li className="nav-item"><a className="nav-link" href="/contact">Contacto</a></li>
                <li className="nav-item">
                  <a className="nav-link" href="#" id="languageToggle" title="Change language" onClick={toggleLanguage}>
                    <i className="fas fa-globe"></i>
                    <span className="lang-text">{language === 'en' ? 'EN' : 'ES'}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Masthead */}
        <header className="tours">
          <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h1 className="mx-auto my-0 text-uppercase">Aventura en Costa Rica</h1>
                <h2 className="text-white-50 mx-auto mt-2 mb-5">Eco tours con vida silvestre en Costa Rica</h2>
              </div>
            </div>
          </div>
        </header>

        {/* Tours Section */}
        <br />
        <section className="text-center" id="tours">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-8">
                <h2>Lista de Tours</h2>
                <p className="text-black-50">
                  <strong><i className="fas fa-leaf"></i> "Todas nuestras excursiones amigables con la naturaleza están diseñadas para proteger <i className="fas fa-globe-americas"></i> la rica biodiversidad de Costa Rica <i className="fas fa-binoculars"></i>, ofreciendo una experiencia ecológica única y personalizada." <i className="fas fa-tree"></i></strong>
                </p>
              </div>
            </div>
          </div>

          <div className="container py-5">
            <div className="container">
              <div className="row gy-4 justify-content-center">
                {/* Card: Caminata al Volcán Arenal */}
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src="/assets/img/volcano_hike.webp" alt="Caminata al Volcán Arenal" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Caminata al Volcán Arenal</h5>
                      <p className="card-text">Explora senderos volcánicos rodeados de naturaleza y disfruta de vistas impresionantes del Arenal.</p>
                      <a href="/tours/volcano_hike" className="btn btn-outline-secondary">Más información</a>
                    </div>
                  </div>
                </div>
                {/* Card: Caminata al Río Celeste */}
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src="/assets/img/celeste_river.webp" alt="Caminata al Río Celeste" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Caminata al Río Celeste</h5>
                      <p className="card-text">Visita el místico Río Celeste con sus aguas azul turquesa y senderos de bosque tropical.</p>
                      <a href="/tours/celeste_river_hike" className="btn btn-outline-secondary">Más información</a>
                    </div>
                  </div>
                </div>
                {/* Card: Parque Nacional Cahuita */}
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src="/assets/img/cahuita.webp" alt="Parque Nacional Cahuita" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Parque Nacional Cahuita</h5>
                      <p className="card-text">Recorre senderos costeros y playas de aguas cristalinas en el Caribe costarricense.</p>
                      <a href="/tours/cahuita" className="btn btn-outline-secondary">Más información</a>
                    </div>
                  </div>
                </div>
                {/* Card: Canopy en Monteverde */}
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src="/assets/img/canopy.webp" alt="Canopy Monteverde" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Canopy en Monteverde</h5>
                      <p className="card-text">Vive una experiencia de aventura volando sobre el bosque nuboso.</p>
                      <a href="/tours/canopy_monteverde" className="btn btn-outline-secondary">Más información</a>
                    </div>
                  </div>
                </div>
                {/* Card: Aguas termales del Arenal */}
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src="/assets/img/aguas_termales.webp" alt="Aguas Termales Arenal" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Aguas termales del Arenal</h5>
                      <p className="card-text">Relájate en piscinas naturales de aguas termales rodeadas de naturaleza.</p>
                      <a href="/tours/aguas_termales" className="btn btn-outline-secondary">Más información</a>
                    </div>
                  </div>
                </div>
                {/* Card: Snorkeling y buceo */}
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src="/assets/img/snorkeling.webp" alt="Snorkeling Islas Catalina" />
                    <div className="card-body text-center">
                      <h5 className="card-title">Snorkeling y buceo</h5>
                      <p className="card-text">Explora arrecifes y vida marina en aguas cristalinas del Pacífico.</p>
                      <a href="/tours/snorkeling" className="btn btn-outline-secondary">Más información</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signup */}
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="card mb-4 box-shadow">
                  <img className="card-img-top" src="/assets/img/transport.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <p align="center">📍✈️🚌🏝️🌄🏨🎟️</p>
                    <p className="card-text"></p>
                    <ul className="text-start" style={{listStyle: 'none', paddingLeft: 0}}>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <p></p>
                    <p></p>
                    <div className="text-center mt-3">
                      <a href="/contact" className="btn btn-danger">contact us</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="footer">
          <section className="contact-section --verde-selva">
            <div className="container px-4 px-lg-5">
              <div className="row gx-4 gx-lg-5">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card py-4 h-100">
                    <div className="card-body text-center">
                      <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                      <h4 className="text-uppercase m-0">Dirección</h4>
                      <hr className="my-4 mx-auto" />
                      <div className="small text-black-50">Costa Rica</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card py-4 h-100">
                    <div className="card-body text-center">
                      <i className="fas fa-envelope text-primary mb-2"></i>
                      <h4 className="text-uppercase m-0">Correo</h4>
                      <hr className="my-4 mx-auto" />
                      <div className="small text-black-50"><a href="mailto:Reservation@yiguirrostouringuide.com">Reservation@yiguirrostouringuide.com</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card py-4 h-100">
                    <div className="card-body text-center">
                      <i className="fas fa-mobile-alt text-primary mb-2"></i>
                      <h4 className="text-uppercase m-0">Teléfono</h4>
                      <hr className="my-4 mx-auto" />
                      <div className="small text-black-50">+ (506) 6477-9672</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="social d-flex justify-content-center">
                <a className="mx-2" href="https://www.instagram.com/YigüirrosTouringGuide/" target="_blank" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a className="mx-2" href="https://wa.me/50664779672" target="_blank" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </section>
          <p>&copy; 2026 Yigüirros Touring Guide. Todos los derechos reservados.</p>
        </footer>
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/js/scripts.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (document.querySelector('form[data-sb-form-api-token]')) {
              var sb = document.createElement('script');
              sb.src = 'https://cdn.startbootstrap.com/sb-forms-latest.js';
              document.head.appendChild(sb);
            }
          `,
        }} />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        {/* WhatsApp Floating Button */}
        <a href="https://wa.me/50664779672?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20services." 
           className="whatsapp-button" target="_blank" aria-label="Chat with us on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
            <path d="M16 .4C7.3.4.1 7.5.1 16.2c0 2.9.8 5.6 2.3 7.9L.2 31.6l7.8-2c2.2 1.2 4.7 1.8 7.2 1.8 8.7 0 15.8-7.1 15.8-15.8S24.7.4 16 .4zm0 28.6c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.6 1.2 1.2-4.5-.3-.5c-1.4-2-2.2-4.3-2.2-6.7 0-7 5.7-12.7 12.7-12.7S28.7 9.2 28.7 16.2 23 29 16 29zm7.5-9.9c-.4-.2-2.5-1.2-2.9-1.3-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.2-.5.3-.9.1s-1.8-.7-3.5-2.2c-1.3-1.1-2.2-2.4-2.5-2.8-.3-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.2-.3.1-.6 0-.8s-1-2.4-1.3-3.2c-.3-.8-.7-.7-1-.7h-.9c-.3 0-.7.1-1 .4-.3.3-1.3 1.2-1.3 2.9 0 1.7 1.3 3.3 1.5 3.5.2.3 2.6 4 6.3 5.6.9.4 1.7.6 2.3.8.9.3 1.8.3 2.4.2.7-.1 2.5-1 2.9-2 .4-.9.4-1.7.3-1.9-.2-.1-.5-.2-1-.4z"/>
          </svg>
        </a>
        {/* Translation System */}
        <script src="/js/translations.js"></script>
        <script src="/js/language-switcher.js"></script>
      </body>
    </>
  );
}
