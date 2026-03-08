// Sistema de cambio de idioma para Sloth Adventures CR
(function() {
  'use strict';
  
  // Idioma por defecto
  const DEFAULT_LANG = 'es';
  
  // Obtener idioma actual desde localStorage, atributo <html lang> o usar default
  const savedLang = localStorage.getItem('siteLanguage');
  const htmlLangAttr = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  let currentLang = savedLang || (htmlLangAttr.startsWith('en') ? 'en' : (htmlLangAttr.startsWith('es') ? 'es' : DEFAULT_LANG));
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
    applyTranslations(currentLang);
  });
  
  // Inicializar botón de cambio de idioma
  function initLanguageSwitcher() {
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
      // Establecer texto inicial del botón
      updateToggleButton(langToggle);
      
      // Agregar evento de click
      langToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleLanguage();
      });
    }
  }
  
  // Cambiar entre idiomas
  function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('siteLanguage', currentLang);
    applyTranslations(currentLang);
    updateToggleButton();
  }
  
  // Actualizar texto del botón de idioma
  function updateToggleButton(button) {
    const langToggle = button || document.getElementById('languageToggle');
    if (langToggle) {
      const icon = langToggle.querySelector('i');
      const text = langToggle.querySelector('.lang-text');
      
      if (currentLang === 'es') {
        if (text) text.textContent = 'EN';
        langToggle.setAttribute('title', 'Switch to English');
      } else {
        if (text) text.textContent = 'ES';
        langToggle.setAttribute('title', 'Cambiar a Español');
      }
    }
  }
  
  // Aplicar traducciones a toda la página
  function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
      console.error('Translations not found for language:', lang);
      return;
    }
    
    const t = translations[lang];
    
    // Traducir elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (t[key]) {
        element.textContent = t[key];
      }
    });
    
    // Traducir placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      if (t[key]) {
        element.setAttribute('placeholder', t[key]);
      }
    });
    
    // Traducir títulos/tooltips
    document.querySelectorAll('[data-translate-title]').forEach(element => {
      const key = element.getAttribute('data-translate-title');
      if (t[key]) {
        element.setAttribute('title', t[key]);
      }
    });
    
    // Traducir valores de botones
    document.querySelectorAll('[data-translate-value]').forEach(element => {
      const key = element.getAttribute('data-translate-value');
      if (t[key]) {
        element.value = t[key];
      }
    });
    
    // Traducir atributos aria-label
    document.querySelectorAll('[data-translate-aria]').forEach(element => {
      const key = element.getAttribute('data-translate-aria');
      if (t[key]) {
        element.setAttribute('aria-label', t[key]);
      }
    });
    
    // Actualizar atributo lang del HTML
    document.documentElement.setAttribute('lang', lang);
    
    // Cambiar idioma de reCAPTCHA si existe
    updateRecaptchaLanguage(lang);
  }
  
  // Actualizar idioma de reCAPTCHA
  function updateRecaptchaLanguage(lang) {
    const recaptchaContainer = document.querySelector('.g-recaptcha');
    
    if (!recaptchaContainer) return;
    
    // Guardar el sitekey
    const sitekey = recaptchaContainer.getAttribute('data-sitekey');
    if (!sitekey) return;
    
    // Solo resetear si reCAPTCHA está completamente cargado y listo
    if (window.grecaptcha && window.grecaptcha.reset && typeof window.grecaptcha.getResponse === 'function') {
      try {
        // Verificar que hay un widget renderizado antes de resetear
        const response = window.grecaptcha.getResponse();
        if (response !== undefined) {
          window.grecaptcha.reset();
        }
      } catch (e) {
        // Silenciar el error si reCAPTCHA no está listo todavía
        // console.warn('Could not reset reCAPTCHA:', e);
      }
    }
    
    // No recargar el script completo para evitar problemas
    // El reCAPTCHA ya está cargado en el HTML principal
  }
  
  // Exponer función global para uso en otras partes
  window.getCurrentLanguage = function() {
    return currentLang;
  };
  
  window.changeLanguage = function(lang) {
    if (lang === 'es' || lang === 'en') {
      currentLang = lang;
      localStorage.setItem('siteLanguage', currentLang);
      applyTranslations(currentLang);
      updateToggleButton();
    }
  };
  
  // Obtener traducción por clave
  window.getTranslation = function(key) {
    if (!translations || !translations[currentLang]) {
      return key;
    }
    return translations[currentLang][key] || key;
  };
  
})();
