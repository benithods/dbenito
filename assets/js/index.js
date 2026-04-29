(function() {
"use strict";

// Helpers
const select = (el, all = false) => {
  el = el.trim();
  return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
};

const on = (type, el, listener, all = false) => {
  const elSelected = select(el, all);
  if (!elSelected) return;
  if (all) elSelected.forEach(e => e.addEventListener(type, listener));
  else elSelected.addEventListener(type, listener);
};

// ================= HEADER TOGGLE =================
const headerToggleBtn = select('.header-toggle');
if (headerToggleBtn) {
  headerToggleBtn.addEventListener('click', () => {
    select('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  });
}

// ================= SCROLL TOP =================
const scrollTop = select('.scroll-top');
if (scrollTop) {
  const toggleScrollTop = () => {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  };
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  scrollTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================= PRELOADER =================
const preloader = select('#preloader');
if (preloader) {
  window.addEventListener('load', () => preloader.remove());
}

// ================= TYPED =================
const typed = select('.typed');
if (typed) {
  let items = typed.getAttribute('data-typed-items').split(',');
  new Typed('.typed', {
    strings: items,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

// ================= AOS =================
window.addEventListener('load', () => {
  AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
});

// ================= SKILLS (Waypoint) =================
const skills = select('.skills-content');
if (skills) {
  new Waypoint({
    element: skills,
    offset: '80%',
    handler: () => {
      select('.progress .progress-bar', true).forEach(el => {
        el.style.width = el.getAttribute('aria-valuenow') + '%';
      });
    }
  });
}

// ================= ISOTOPE =================
window.addEventListener('load', () => {
  const container = select('.portfolio-container');
  if (!container) return;

  const iso = new Isotope(container, { itemSelector: '.portfolio-item' });

  on('click', '#portfolio-flters li', function(e) {
    e.preventDefault();
    select('#portfolio-flters li', true).forEach(el => el.classList.remove('filter-active'));
    this.classList.add('filter-active');

    iso.arrange({ filter: this.getAttribute('data-filter') });
  }, true);
});

// ================= LIGHTBOX =================
GLightbox({ selector: '.portfolio-lightbox' });
GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' });

// ================= SWIPER =================
new Swiper('.portfolio-details-slider', {
  speed: 400,
  loop: true,
  autoplay: { delay: 5000 },
  pagination: { el: '.swiper-pagination', clickable: true }
});

new Swiper('.testimonials-slider', {
  speed: 600,
  loop: true,
  autoplay: { delay: 5000 },
  slidesPerView: 'auto',
  pagination: { el: '.swiper-pagination', clickable: true }
});

// ================= PURECOUNTER =================
new PureCounter();

// ================= NAV ACTIVE (SCROLLSPY) =================
const navlinks = select('.navmenu a', true);
const navActive = () => {
  const position = window.scrollY + 200;
  navlinks.forEach(link => {
    if (!link.hash) return;
    const section = select(link.hash);
    if (!section) return;

    if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('load', navActive);
document.addEventListener('scroll', navActive);

})();
