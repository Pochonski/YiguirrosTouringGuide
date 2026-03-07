import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    phone: '',
    email: '',
    message: '',
    'g-recaptcha-response': ''
  });
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setAlert({ show: true, type: 'success', message: result.message });
        setFormData({ name: '', country: '', phone: '', email: '', message: '', 'g-recaptcha-response': '' });
      } else {
        setAlert({ show: true, type: 'danger', message: result.message });
      }
    } catch (error) {
      setAlert({ show: true, type: 'danger', message: 'Error submitting form.' });
    }
  };

  return (
    <>
      <Head>
        <title>Yigüirros Touring Guide | Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Discover the magic of Costa Rica with Yigüirros Touring Guide. Guided and personalized tours, wildlife, and eco-friendly hikes through different regions of Costa Rica. Book your adventure today!" />
        <meta name="keywords" content="Yigüirros Touring Guide Costa Rica, tours in Costa Rica, nature tours Costa Rica, wildlife watching, rainforest tours, eco tours Costa Rica, guided tours, tours in Costa Rica, Costa Rica tourism, guided nature walks" />
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon.ico" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <link href="/css/styles.css?v=20251213" rel="stylesheet" />
        <script src="https://www.google.com/recaptcha/api.js?hl=es" async defer></script>
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
        {/* Navigation - similar to index */}
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
        {/* Masthead */}
        <header className="contact">
          <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h1 className="mx-auto my-0 text-uppercase">Planifica Tu Aventura</h1>
                <h2 className="text-white-50 mx-auto mt-2 mb-5">Costarricense con Nosotros.</h2>
              </div>
            </div>
          </div>
        </header>
        {/* Contact Form */}
        <div className="container-fluid bg-light py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 d-none d-lg-block"></div>
              <div className="col-lg-6 col-md-10">
                <div className="card contact-card p-4 shadow-sm border-0 rounded-3">
                  <h2 className="text-center mb-4">Formulario de Contacto</h2>
                  {alert.show && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                      {alert.message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nombre Completo</label>
                      <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">País</label>
                      <select className="form-select" id="country" name="country" value={formData.country} onChange={handleChange} required>
                        <option value="">Seleccione su país</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="USA">USA</option>
                        {/* Add more countries */}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Teléfono</label>
                      <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo Electrónico</label>
                      <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Mensaje</label>
                      <textarea className="form-control" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <div className="mb-3">
                      <div className="g-recaptcha" data-sitekey="your-site-key"></div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 d-none d-lg-block"></div>
            </div>
          </div>
        </div>
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/js/scripts.js"></script>
        <script src="/js/translations.js"></script>
        <script src="/js/language-switcher.js"></script>
      </body>
    </>
  );
}
