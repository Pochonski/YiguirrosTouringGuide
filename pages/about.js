import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Yigüirros Touring Guide | About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Discover the magic of Costa Rica with Yigüirros Touring Guide. Guided and personalized tours, wildlife, and eco-friendly hikes through different regions of Costa Rica. Book your adventure today!" />
        <meta name="keywords" content="Yigüirros Touring Guide Costa Rica, tours in Costa Rica, nature tours Costa Rica, wildlife watching, rainforest tours, eco tours Costa Rica, guided tours, tours in Costa Rica, Costa Rica tourism, guided nature walks" />
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon.ico" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <link href="/css/styles.css?v=20251213" rel="stylesheet" />
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
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="/">Yigüirros Touring Guide</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="/tours">Tours</a></li>
                <li className="nav-item"><a className="nav-link" href="/about">Nosotros</a></li>
                <li className="nav-item"><a className="nav-link" href="/contact">Contacto</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <header className="about">
          <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h1 className="mx-auto my-0 text-uppercase">Guías Naturalistas</h1>
                <h2 className="text-white-50 mx-auto mt-2 mb-5">Aventuras Personalizadas en Costa Rica.</h2>
              </div>
            </div>
          </div>
        </header>
        <div className="container my-5" style={{background: '#B8E6E0', padding: '40px', borderRadius: '10px'}}>
          <hr className="featurette-divider" />
          <div className="row featurette align-items-center mb-5">
            <div className="col-md-7">
              <h2 className="featurette-heading">Quiénes Somos</h2>
              <p className="lead">Bienvenidos a Yigüirros Touring Guide. No somos solo un operador turístico; somos un equipo de aventureros locales apasionados que llamamos hogar a Costa Rica. Creemos que la mejor manera de experimentar nuestro hermoso país es a través de los ojos de quienes vivimos aquí. Por eso nos hemos dedicado a crear viajes auténticos e inolvidables, compartiendo las joyas ocultas y la vibrante cultura que hacen de Costa Rica un lugar tan especial. Estamos orgullosos de ser un negocio local y familiar, comprometidos con el turismo sostenible y la creación de recuerdos duraderos para cada viajero que explora con nosotros. Ven a descubrir la verdadera Costa Rica con Yigüirros Touring Guide.</p>
            </div>
            <div className="col-md-5 text-center">
              <img src="/assets/img/who_we_are.webp?v=20250202" className="featurette-image img-fluid mx-auto rounded" alt="Feature image 1" />
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette align-items-center mb-5">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">Misión</h2>
              <p className="lead">En Yigüirros Touring Guide Adventures nuestra misión es conectar a viajeros de todo el mundo con la incomparable belleza natural y la rica cultura de Costa Rica, ofreciendo experiencias turísticas auténticas, sostenibles y memorables. Estamos comprometidos con la creación de itinerarios personalizados que superen las expectativas de nuestros clientes, garantizando un servicio excepcional, seguridad y un profundo respeto por nuestro medio ambiente y comunidades locales. Aspiramos a ser embajadores de la "Pura Vida", fomentando la conservación, el desarrollo responsable y dejando una huella positiva en cada viaje que facilitamos.</p>
            </div>
            <div className="col-md-5 order-md-1 text-center">
              <img src="/assets/img/mision.webp" className="featurette-image img-fluid mx-auto rounded" alt="Feature image 2" />
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette align-items-center mb-5">
            <div className="col-md-7">
              <h2 className="featurette-heading">Visión</h2>
              <p className="lead">Ser el operador turístico líder en Costa Rica, reconocido por ofrecer experiencias de viaje inmersivas y transformadoras que conectan a nuestros visitantes con la auténtica esencia natural y cultural del país. Nos esforzamos por ser un referente en sostenibilidad y turismo responsable, contribuyendo activamente al bienestar de nuestras comunidades locales y a la conservación de la biodiversidad única de Costa Rica. Imaginamos un futuro donde cada viaje que facilitamos no solo crea recuerdos inolvidables, sino que también fomenta un profundo respeto y amor por nuestro paraíso tropical.</p>
            </div>
            <div className="col-md-5 text-center">
              <img src="/assets/img/vision.webp" className="featurette-image img-fluid mx-auto rounded" alt="Feature image 3" />
            </div>
          </div>
          <hr className="featurette-divider" />
        </div>
        <div className="album py-5" style={{background: '#B8E6E0'}}>
          <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <img className="card-img-top" src="/assets/img/logo.webp" alt="Card image cap" />
                  <div className="card-body">
                    <p>📜 Guías certificados por el ICT.</p>
                    <p>🗣️ Guías bilingües (Español/Inglés).</p>
                    <p>🌿 Tours en hábitats naturales.</p>
                    <p>🦥 Observación de vida silvestre en su ambiente natural, no en cautiverio.</p>
                    <p>✅ Ubicaciones y áreas aprobadas por el ICT.</p>
                    <p>🚐 Transporte autorizado y seguro.</p>
                    <p>📋 Vehículos con permisos ICT y CTP, en total cumplimiento con la normativa legal.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
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
        <a href="https://wa.me/50664779672?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20services." 
           className="whatsapp-button" target="_blank" aria-label="Chat with us on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
            <path d="M16 .4C7.3.4.1 7.5.1 16.2c0 2.9.8 5.6 2.3 7.9L.2 31.6l7.8-2c2.2 1.2 4.7 1.8 7.2 1.8 8.7 0 15.8-7.1 15.8-15.8S24.7.4 16 .4zm0 28.6c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.6 1.2 1.2-4.5-.3-.5c-1.4-2-2.2-4.3-2.2-6.7 0-7 5.7-12.7 12.7-12.7S28.7 9.2 28.7 16.2 23 29 16 29zm7.5-9.9c-.4-.2-2.5-1.2-2.9-1.3-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.2-.5.3-.9.1s-1.8-.7-3.5-2.2c-1.3-1.1-2.2-2.4-2.5-2.8-.3-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.2-.3.1-.6 0-.8s-1-2.4-1.3-3.2c-.3-.8-.7-.7-1-.7h-.9c-.3 0-.7.1-1 .4-.3.3-1.3 1.2-1.3 2.9 0 1.7 1.3 3.3 1.5 3.5.2.3 2.6 4 6.3 5.6.9.4 1.7.6 2.3.8.9.3 1.8.3 2.4.2.7-.1 2.5-1 2.9-2 .4-.9.4-1.7.3-1.9-.2-.1-.5-.2-1-.4z"/>
          </svg>
        </a>
        <script src="/js/translations.js"></script>
        <script src="/js/language-switcher.js"></script>
      </body>
    </>
  );
}
