# 🦥 Yiguirros Touring Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PHP Version](https://img.shields.io/badge/PHP-8.0%2B-blue.svg)](https://www.php.net/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

> Una guía turística completa para explorar las maravillas de Costa Rica, especializada en tours de observación de perezosos y vida silvestre.

## 🌟 Descripción del Proyecto

**Yiguirros Touring Guide** es una aplicación web responsiva diseñada para promover tours ecoturísticos en Costa Rica. El proyecto ofrece una plataforma intuitiva para que los visitantes descubran experiencias únicas en la selva tropical, con especial énfasis en la observación de perezosos, aves exóticas y la rica biodiversidad del país.

### 🎯 Características Principales

- **🌍 Sitio Web Multiidioma**: Soporte completo para español e inglés con cambio de idioma dinámico
- **📱 Diseño Responsivo**: Experiencia optimizada para todos los dispositivos (desktop, tablet, mobile)
- **🦥 Tours Especializados**: Catálogo completo de tours temáticos (observación de perezosos, aves, caminatas nocturnas)
- **📧 Sistema de Contacto**: Formulario de contacto funcional con validación reCAPTCHA
- **🎨 UI/UX Moderna**: Interfaz elegante basada en Bootstrap 5 con animaciones fluidas
- **⚡ Rendimiento Optimizado**: Imágenes optimizadas en formato WebP y carga rápida

## 🏗️ Arquitectura del Proyecto

```
Yiguirros-Touring-Guide/
├── 📁 assets/                 # Recursos estáticos
│   └── 📁 img/                # Imágenes optimizadas (.webp, .jpg)
├── 📁 backend/                # Lógica del servidor (PHP)
│   ├── 📄 config.php          # Configuración centralizada
│   ├── 📄 enviar.php          # Procesador de formularios
│   ├── 📄 Mailer.php          # Clase para envío de emails
│   └── 📁 PHPMailer/          # Biblioteca de correo
├── 📁 css/                    # Hojas de estilo
│   └── 📄 styles.css          # Estilos principales (Bootstrap + personalizados)
├── 📁 js/                     # Scripts del cliente
│   ├── 📄 scripts.js          # Funcionalidades principales
│   ├── 📄 translations.js     # Sistema de traducción
│   └── 📄 language-switcher.js # Selector de idioma
├── 📁 pages/                  # Páginas adicionales
│   ├── 📄 about.html          # Acerca de nosotros
│   ├── 📄 contact.html        # Formulario de contacto
│   ├── 📄 tours.html          # Catálogo de tours
│   └── 📁 tours/              # Detalles de tours individuales
└── 📁 examples/               # Ejemplos y plantillas
    ├── 📄 Data.html           # Galería de tours
    └── 📄 ejemplo.html        # Plantilla base
```

## 🚀 Tecnologías Utilizadas

### Frontend

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con animaciones
- **Bootstrap 5** - Framework CSS responsivo
- **JavaScript ES6+** - Interactividad y funcionalidades dinámicas
- **Font Awesome 6** - Iconos vectoriales
- **Google Fonts** - Tipografía personalizada (Varela Round, Nunito)

### Backend

- **PHP 8.0+** - Lógica del servidor
- **PHPMailer** - Envío de correos electrónicos via SMTP
- **reCAPTCHA v2** - Protección contra spam
- **JSON API** - Comunicación asíncrona

### Servicios Externos

- **Google reCAPTCHA** - Validación de formularios
- **Gmail SMTP** - Envío de correos
- **Google Analytics** - Análisis de tráfico
- **Google Fonts** - Tipografías web

## 🛠️ Configuración del Entorno de Desarrollo

### Opción 1: GitHub Pages (Despliegue estático - Recomendado)

**Prerrequisitos:**

- **Git** para control de versiones
- Cuenta en **GitHub**
- Cuenta en **Formspree** (para formularios)

**Pasos para deploy:**

1. **Fork del repositorio**

   ```bash
   # Visita: https://github.com/Pochonski/YiguirrosTouringGuide
   # Click en "Fork"
   ```

2. **Activar GitHub Pages**
   - En tu fork: Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / folder: `/root`
   - Click "Save"

3. **Configurar Formspree**
   - Crea cuenta en [Formspree](https://formspree.io/)
   - Nuevo formulario → Email: `Reservation@yiguirrostouringuide.com`
   - Copia el ID del formulario y actualízalo en `pages/contact.html`

4. **Listo!** Tu sitio estará en: `https://[tu-usuario].github.io/YiguirrosTouringGuide`

### Opción 2: Desarrollo Local (XAMPP)

- **XAMPP** (Apache + MySQL + PHP) o servidor web compatible
- **PHP 8.0 o superior**
- **Composer** (opcional, para gestión de dependencias)
- **Git** para control de versiones

### Instalación Local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/Yiguirros-Touring-Guide.git
   cd Yiguirros-Touring-Guide
   ```

2. **Configurar servidor local**
   - Iniciar Apache y MySQL desde XAMPP
   - Copiar proyecto a `htdocs/` o configurar virtual host

3. **Configurar variables de entorno**

   ```php
   // backend/config.php
   define('EMAIL_TO', 'tu-email@gmail.com');
   define('SMTP_USERNAME', 'tu-gmail@gmail.com');
   define('SMTP_PASSWORD', 'tu-app-password');
   define('RECAPTCHA_SECRET_KEY', 'tu-clave-recaptcha');
   ```

4. **Configurar reCAPTCHA**
   - Registrar sitio en [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - Obtener claves de sitio y secreta
   - Actualizar `config.php` con las claves

5. **Configurar Gmail SMTP**
   - Habilitar verificación en dos pasos
   - Generar contraseña de aplicación
   - Configurar credenciales en `config.php`

### Estructura de Base de Datos (Opcional)

Si se requiere persistencia de datos:

```sql
CREATE DATABASE yiguirros_touring;

USE yiguirros_touring;

CREATE TABLE contact_form_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    tour_interest VARCHAR(100),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);

CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);
```

## 📱 Funcionalidades Detalladas

### 🌐 Sistema Multiidioma

- **Soporte completo**: Español e inglés
- **Traducción dinámica**: Cambio instantáneo sin recargar página
- **Persistencia**: Preferencia de idioma guardada en localStorage
- **SEO optimizado**: Meta etiquetas por idioma

### 🦥 Catálogo de Tours

- **Birdwatching Tour**: Observación de aves con guías especializados
- **Sloth Watching**: Experiencia responsable con perezosos
- **Night Walk Adventure**: Exploración nocturna de la selva
- **Cultural Tour**: Inmersión en cultura local
- **Volcano Hike**: Caminatas en volcanes icónicos
- **Hanging Bridges**: Puentes colgantes y dosel forestal

### 📧 Sistema de Contacto

- **Validación reCAPTCHA**: Protección contra bots
- **Envío SMTP**: Correos confiables via Gmail
- **Respuesta JSON**: Comunicación asíncrona
- **Manejo de errores**: Retroalimentación clara al usuario

### 🎨 Diseño y UX

- **Mobile-First**: Diseño optimizado para móviles
- **Animaciones fluidas**: Transiciones CSS y JavaScript
- **Imágenes optimizadas**: Formato WebP para mejor rendimiento
- **Accesibilidad**: Cumplimiento WCAG 2.1

## 🔧 Personalización

### Cambiar Colores y Tema

Editar `css/styles.css`:

```css
:root {
  --primary-color: #28a745;
  --secondary-color: #6c757d;
  --accent-color: #ffc107;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
}
```

### Agregar Nuevo Tour

1. Crear archivo en `pages/tours/nuevo-tour.html`
2. Agregar entrada en `pages/tours.html`
3. Añadir imágenes en `assets/img/`
4. Actualizar traducciones en `js/translations.js`

### Configurar Email Template

Personalizar plantilla en `backend/Mailer.php`:

```php
private static function createEmailTemplate($data) {
    return "
    <html>
    <body style='font-family: Arial, sans-serif;'>
        <h2>Nuevo contacto de {$data['name']}</h2>
        <p><strong>Email:</strong> {$data['email']}</p>
        <p><strong>Teléfono:</strong> {$data['phone']}</p>
        <p><strong>Tour de interés:</strong> {$data['tour_interest']}</p>
        <p><strong>Mensaje:</strong></p>
        <p>{$data['message']}</p>
    </body>
    </html>";
}
```

## 🚀 Despliegue en Producción

### GitHub Pages (Recomendado para sitios estáticos)

El proyecto está configurado para despliegue automático en GitHub Pages:

1. **Hacer fork del repositorio**

   ```bash
   # Fork en GitHub: https://github.com/Pochonski/YiguirrosTouringGuide
   ```

2. **Activar GitHub Pages**
   - Ir a Settings → Pages
   - Seleccionar "Deploy from a branch"
   - Elegir rama `main` y carpeta `/root`
   - Guardar configuración

3. **Configurar Formspree (formulario de contacto)**
   - Registrarse en [Formspree](https://formspree.io/)
   - Crear nuevo formulario con el email: `Reservation@yiguirrostouringuide.com`
   - Actualizar el ID del formulario en `pages/contact.html`
   - El formulario funcionará sin backend PHP

4. **URL del sitio**
   - Tu sitio estará disponible en: `https://[tu-usuario].github.io/YiguirrosTouringGuide`

### Configuración de Servidor Tradicional

1. **Apache/Nginx**: Configurar virtual host
2. **PHP 8.0+**: Asegurar versión compatible
3. **SSL**: Certificado HTTPS (Let's Encrypt recomendado)
4. **Caching**: Configurar headers de caché estáticos

### Optimización

- **Minificación**: Comprimir CSS y JS
- **Imágenes**: Optimizar y servir en formatos modernos
- **CDN**: Considerar CDN para recursos estáticos
- **Lazy Loading**: Implementar carga diferida de imágenes

### Seguridad

```php
// Deshabilitar modo debug en producción
define('DEBUG_MODE', false);

// Configurar headers de seguridad
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
```

## 🧪 Testing

### Tests Funcionales

```bash
# Test de envío de email
curl -X POST http://localhost/backend/enviar.php \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test&email=test@example.com&message=Test message"

# Test de reCAPTCHA
php backend/test_recaptcha.php
```

### Validación HTML/CSS

- [W3C Validator](https://validator.w3.org/)
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 📊 Monitoreo y Analytics

### Google Analytics

Configurado en todas las páginas:

```javascript
gtag("config", "G-56CV47Z61R", {
  page_title: document.title,
  page_location: window.location.href,
});
```

### Métricas Recomendadas

- Tasa de rebote
- Tiempo en página
- Conversiones de formulario
- Tráfico por dispositivo
- Localización geográfica

## 🤝 Contribución

### Flujo de Trabajo

1. **Fork** del repositorio
2. **Branch** feature/nueva-funcionalidad
3. **Commit** con mensajes descriptivos
4. **Push** al branch
5. **Pull Request** con descripción detallada

### Estándares de Código

- **PHP**: PSR-12
- **JavaScript**: ES6+ con ESLint
- **CSS**: BEM methodology
- **HTML**: Semántico y accesible

### Mensajes de Commit

```
feat: agregar sistema de reservas
fix: corregir validación de formulario
docs: actualizar README
style: mejorar formato de CSS
refactor: optimizar código JavaScript
test: agregar tests unitarios
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **Bootstrap Team** - Por el excelente framework CSS
- **PHPMailer Community** - Por la robusta biblioteca de correo
- **Font Awesome** - Por los increíbles iconos
- **Unsplash** - Por las imágenes de alta calidad
- **Google Fonts** - Por las tipografías web

## 📞 Contacto

- **Proyecto**: Yiguirros Touring Guide
- **Email**: joseph19102005@gmail.com
- **GitHub**: [pochonski](https://github.com/tu-usuario)

---

<div align="center">
  <p>Hecho con ❤️ en Costa Rica</p>
  <p>© 2025 Yiguirros Touring Guide - Todos los derechos reservados</p>
</div>
