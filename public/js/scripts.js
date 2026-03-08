/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Ensure jQuery is available for the gallery code. If not present, load it dynamically.
function ensureJQuery(callback) {
  if (window.jQuery) return callback();
  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
  script.integrity = 'sha256-/xUj+3OJ+Y3k7R+6m0e1Z4f8aKq6bq6bY1fXb0Xr5Y8=';
  script.crossOrigin = 'anonymous';
  script.onload = function () { callback(); };
  script.onerror = function () { console.error('Failed to load jQuery. Gallery features may not work.'); };
  document.head.appendChild(script);
}

ensureJQuery(function () {
  var modalId = $('#image-gallery');

  $(document).ready(function () {
    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image').show();
      if (counter_max === counter_current) {
        $('#show-next-image').hide();
      } else if (counter_current === 1) {
        $('#show-previous-image').hide();
      }
    }

    function loadGallery(setIDs, setClickAttr) {
      let current_image, selector, counter = 0;

      $('#show-next-image, #show-previous-image').click(function () {
        if ($(this).attr('id') === 'show-previous-image') {
          current_image--;
        } else {
          current_image++;
        }

        selector = $('[data-image-id="' + current_image + '"]');
        updateGallery(selector);
      });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title').text($sel.data('title'));
        $('#image-gallery-image').attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]').each(function () {
          counter++;
          $(this).attr('data-image-id', counter);
        });
      }
      $(setClickAttr).on('click', function () { updateGallery($(this)); });
    }
  });

  // build key actions
  $(document).keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(':visible')) {
          $('#show-previous-image').click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(':visible')) {
          $('#show-next-image').click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault();
  });
});