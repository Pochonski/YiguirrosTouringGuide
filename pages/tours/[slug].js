import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const tours = {
  volcano_hike: {
    title: 'Caminata al Volcán Arenal',
    description: 'Explora senderos volcánicos rodeados de naturaleza y disfruta de vistas impresionantes del Arenal.',
    image: '/assets/img/volcano_hike1.webp',
  },
  celeste_river_hike: {
    title: 'Caminata al Río Celeste',
    description: 'Visita el místico Río Celeste con sus aguas azul turquesa y senderos de bosque tropical.',
    image: '/assets/img/celeste_river.webp',
  },
  cahuita: {
    title: 'Parque Nacional Cahuita',
    description: 'Recorre senderos costeros y playas de aguas cristalinas en el Caribe costarricense.',
    image: '/assets/img/cahuita.webp',
  },
  canopy_monteverde: {
    title: 'Canopy en Monteverde',
    description: 'Vive una experiencia de aventura volando sobre el bosque nuboso.',
    image: '/assets/img/canopy.webp',
  },
  aguas_termales: {
    title: 'Aguas termales del Arenal',
    description: 'Relájate en piscinas naturales de aguas termales rodeadas de naturaleza.',
    image: '/assets/img/aguas_termales.webp',
  },
  snorkeling: {
    title: 'Snorkeling y buceo',
    description: 'Explora arrecifes y vida marina en aguas cristalinas del Pacífico.',
    image: '/assets/img/snorkeling.webp',
  },
};

export default function TourDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const tour = tours[slug];

  const [formData, setFormData] = useState({
    tour: tour ? tour.title : '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    adults: '',
    children: '',
    pickup: '',
    notes: '',
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
        setFormData({ ...formData, first_name: '', last_name: '', email: '', phone: '', country: '', date: '', adults: '', children: '', pickup: '', notes: '', 'g-recaptcha-response': '' });
      } else {
        setAlert({ show: true, type: 'danger', message: result.message });
      }
    } catch (error) {
      setAlert({ show: true, type: 'danger', message: 'Error submitting form.' });
    }
  };

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <>
      <Head>
        <title>{tour.title} | Yigüirros Touring Guide</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={tour.description} />
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
        <header className="tour-header" style={{ backgroundImage: `url(${tour.image})` }}>
          <div className="container text-center py-5">
            <h1 className="text-uppercase">{tour.title}</h1>
            <p className="lead">{tour.description}</p>
          </div>
        </header>
        <section className="tour-info-section py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="info-card bg-white p-4 rounded-3 shadow-sm h-100">
                  <h2 className="text-center mb-3">Descripción</h2>
                  <p>{tour.description}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info-card bg-white p-4 rounded-3 shadow-sm h-100">
                  <h2 className="text-center mb-3">Incluido</h2>
                  <ul className="list-unstyled text-start">
                    <li>Entrada al parque nacional</li>
                    <li>Guía turístico certificado</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info-card bg-white p-4 rounded-3 shadow-sm h-100">
                  <h2 className="text-center mb-3">Qué traer</h2>
                  <ul className="list-unstyled text-start">
                    <li>Zapatos cerrados</li>
                    <li>Ropa cómoda</li>
                    <li>Agua</li>
                    <li>Bloqueador solar</li>
                    <li>Repelente de insectos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-reserve" data-bs-toggle="modal" data-bs-target="#reservationModal">Reservar Tour</button>
              <a className="btn btn-success ms-2" target="_blank" href={`https://wa.me/50664779672?text=¡Hola! Quiero reservar ${tour.title}.`}>
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>
        </section>
        <div className="modal fade" id="reservationModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabel">Formulario de Reserva de Tour</h5>
                </div>
                <div className="modal-body">
                  {alert.show && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                      {alert.message}
                    </div>
                  )}
                  <div className="row">
                    <div className="text-center mb-3">
                      <label htmlFor="tour" className="form-label">Tour</label>
                      <input type="text" value={formData.tour} name="tour" id="tour" readOnly className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first_name" className="form-label">Nombre</label>
                      <input type="text" className="form-control" name="first_name" id="first_name" value={formData.first_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="last_name" className="form-label">Apellido</label>
                      <input type="text" className="form-control" name="last_name" id="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Correo Electrónico</label>
                      <input type="email" className="form-control" name="email" id="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">Teléfono</label>
                      <input type="text" className="form-control" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="country" className="form-label">País</label>
                      <select className="form-select" name="country" value={formData.country} onChange={handleChange} required>
                        <option value="">Seleccione su país</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="USA">USA</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="date" className="form-label">Fecha del Tour</label>
                      <input type="date" className="form-control" name="date" id="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="adults" className="form-label">Número de Adultos</label>
                      <input type="number" className="form-control" name="adults" id="adults" value={formData.adults} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="children" className="form-label">Número de Niños</label>
                      <input type="number" className="form-control" name="children" id="children" value={formData.children} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="pickup" className="form-label">Lugar de Recogida</label>
                      <input type="text" className="form-control" name="pickup" id="pickup" value={formData.pickup} onChange={handleChange} />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="notes" className="form-label">Notas Adicionales</label>
                      <textarea className="form-control" name="notes" id="notes" rows="3" value={formData.notes} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="g-recaptcha" data-sitekey="your-site-key"></div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-primary">Enviar Reserva</button>
                </div>
              </form>
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
        <script src="/js/translations.js"></script>
        <script src="/js/language-switcher.js"></script>
      </body>
    </>
  );
}
