// Smooth scroll for internal links and navbar collapse handling
(function () {
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('#mainNavbar a.nav-link, a[href^="#"]');

  function collapseNavbar() {
    const collapseEl = document.getElementById('navContent');
    if (!collapseEl) return;
    const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
    if (window.getComputedStyle(collapseEl).display !== 'none') {
      bsCollapse.hide();
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = navbar ? navbar.offsetHeight : 0;
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - (offset - 1);
          window.scrollTo({ top, behavior: 'smooth' });
          collapseNavbar();
          history.replaceState(null, '', targetId);
        }
      }
    });
  });
})();

// IntersectionObserver for reveal animations and staggered cards
(function () {
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if (revealEls.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delayAttr = el.getAttribute('data-reveal-delay');
        if (delayAttr) {
          el.style.transitionDelay = `${parseInt(delayAttr, 10)}ms`;
        }
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));
})();

// Enhance project card stagger using data-reveal-delay
(function () {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const d = card.getAttribute('data-reveal-delay');
    if (d) card.style.transitionDelay = `${parseInt(d, 10)}ms`;
  });
})();

// Simple demo handling for contact form (no backend)
(function () {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (statusEl) {
      statusEl.textContent = 'Thanks! Your message has been noted.';
      setTimeout(() => (statusEl.textContent = ''), 4000);
    }
    form.reset();
  });
})();


