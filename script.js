/* =========================================================================
   GLAMORA BEAUTY STUDIO — Premium Salon Website
   js/script.js
   -------------------------------------------------------------------------
   Vanilla JavaScript only. No frameworks, no libraries.

   TABLE OF CONTENTS
   01. CONFIG              — editable brand / contact / hours / social
   02. DATA                — services, packages, gallery, team, reviews, products
   03. STATE & STORAGE     — cart, theme
   04. UTILITIES           — helpers, toast, debounce
   05. THEME               — dark / light
   06. PRELOADER
   07. HEADER / NAV        — sticky, scroll spy, mobile menu
   08. REVEAL ANIMATIONS   — IntersectionObserver
   09. STATS COUNTER
   10. SERVICES            — render + filter
   11. PRICING             — render
   12. GALLERY + LIGHTBOX
   13. BEFORE & AFTER       — draggable sliders
   14. TEAM                — render
   15. TESTIMONIALS        — slider
   16. PRODUCTS            — render
   17. CART                — add / remove / qty / localStorage
   18. COUNTDOWN
   19. BOOKING FORM        — validation + confirmation
   20. CONTACT FORM        — validation
   21. NEWSLETTER          — validation
   22. MISC                — back to top, WhatsApp, keyboard, claim offers
   23. INIT
   ========================================================================= */


/* =========================================================================
   01. CONFIG  —  EDIT YOUR SALON DETAILS HERE
   ========================================================================= */
const CONFIG = {
  /* ---- Brand ---- */
  brandName:  'GLAMORA BEAUTY STUDIO',
  tagline:    'BEAUTY. CONFIDENCE. YOU.',

  /* ---- Contact ---- */
  phone:      '0300 3014052',
  phoneRaw:   '03003014052',
  whatsapp:   '923003014052',          // digits only, no +
  email:      'hello@glamorabeauty.com',
  address:    'Main Market, Hyderabad, Sindh, Pakistan',

  /* ---- Hours ---- */
  hoursWeek:   'Monday – Saturday: 10:00 AM – 9:00 PM',
  hoursSunday: 'Sunday: 12:00 PM – 8:00 PM',

  /* ---- Social links (change the '#' to your real URLs) ---- */
  social: {
    instagram: '#',
    facebook:  '#',
    tiktok:    '#',
    youtube:   '#'
  },

  /* ---- Commerce ---- */
  currency:  'Rs.',
  shipping:  150,          // flat shipping on product orders

  /* ---- Offer countdown target (change to any future date) ---- */
  offerEnd: '2026-12-31T23:59:59'
};


/* =========================================================================
   02. DATA  —  EDIT YOUR SERVICES / PACKAGES / GALLERY / TEAM / PRODUCTS
   ========================================================================= */

/* ---- SERVICES ----
   category options: 'Hair' | 'Makeup' | 'Nails' | 'Facial' | 'Skin Care' | 'Spa' | 'Bridal'
   ---------------------------------------------------------------- */
const SERVICES = [
  {
    id: 1,
    name: 'Haircut & Styling',
    category: 'Hair',
    price: 1500,
    duration: '45 min',
    desc: 'Professional haircut and personalized styling tailored to your face shape.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Hair Coloring',
    category: 'Hair',
    price: 4000,
    duration: '2 hrs',
    desc: 'Professional color treatment using premium, ammonia-free products.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Party Makeup',
    category: 'Makeup',
    price: 3500,
    duration: '60 min',
    desc: 'Long-wear party makeup designed to look flawless on camera and in person.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Facial Treatment',
    category: 'Facial',
    price: 2500,
    duration: '60 min',
    desc: 'Deep cleansing and refreshing facial treatment for a healthy glow.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Manicure & Nail Art',
    category: 'Nails',
    price: 1800,
    duration: '50 min',
    desc: 'Classic manicure finished with custom nail art of your choice.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Pedicure Deluxe',
    category: 'Nails',
    price: 2200,
    duration: '60 min',
    desc: 'Relaxing foot soak, scrub, massage and polish for soft, cared-for feet.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Advanced Skin Care',
    category: 'Skin Care',
    price: 4500,
    duration: '75 min',
    desc: 'Targeted treatment for pigmentation, dullness and uneven texture.',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Aroma Spa Therapy',
    category: 'Spa',
    price: 5500,
    duration: '90 min',
    desc: 'Full-body aromatic massage with essential oils for total relaxation.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Bridal Makeup',
    category: 'Bridal',
    price: 15000,
    duration: '2–3 hrs',
    desc: 'Complete bridal makeup and beauty preparation for your big day.',
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=900&q=80'
  }
];

/* ---- PRICING PACKAGES ---- */
const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Beauty',
    tag: 'Perfect for a quick refresh',
    price: 3999,
    popular: false,
    features: ['Hair Styling', 'Basic Facial', 'Manicure']
  },
  {
    id: 'premium',
    name: 'Premium Glam',
    tag: 'Our most-loved experience',
    price: 7999,
    popular: true,
    features: ['Hair Styling', 'Premium Facial', 'Manicure', 'Pedicure', 'Makeup']
  },
  {
    id: 'bridal',
    name: 'Bridal Package',
    tag: 'Complete bridal preparation',
    price: 24999,
    popular: false,
    features: [
      'Bridal Makeup', 'Hair Styling', 'Facial',
      'Manicure', 'Pedicure', 'Pre-Bridal Consultation'
    ]
  }
];

/* ---- GALLERY ----
   The first and sixth items appear larger in the grid on desktop.
   ----------------------------------------------------------------- */
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80', title: 'Salon Interior',   sub: 'Our Studio' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', title: 'Hair Styling',    sub: 'Precision Cuts' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=80', title: 'Makeup Artistry', sub: 'Signature Looks' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80', title: 'Nail Art',        sub: 'Custom Design' },
  { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80', title: 'Facial Care',     sub: 'Skin Therapy' },
  { src: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1400&q=80', title: 'Bridal Look',     sub: 'Wedding Day' },
  { src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80', title: 'Beauty Products', sub: 'Salon Grade' },
  { src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80', title: 'Transformation',  sub: 'Client Result' }
];

/* ---- BEFORE & AFTER ----
   Swap the before/after image URLs with your real transformation photos.
   ----------------------------------------------------------------- */
const TRANSFORMATIONS = [
  {
    title: 'Hair Transformation',
    service: 'Hair Coloring & Styling',
    before: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    after:  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Makeup Transformation',
    service: 'Party Makeup',
    before: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    after:  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Nail Transformation',
    service: 'Manicure & Nail Art',
    before: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=800&q=80',
    after:  'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80'
  }
];

/* ---- TEAM ---- */
const TEAM = [
  {
    name: 'Ayesha Khan',
    role: 'Senior Hair Stylist',
    desc: 'Specialist in modern cuts, coloring and styling.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    social: { instagram: '#', facebook: '#', tiktok: '#' }
  },
  {
    name: 'Maria Ahmed',
    role: 'Makeup Artist',
    desc: 'Specialist in bridal and event makeup.',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80',
    social: { instagram: '#', facebook: '#', tiktok: '#' }
  },
  {
    name: 'Sana Iqbal',
    role: 'Skin Care Specialist',
    desc: 'Focused on advanced facials and skin therapy.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80',
    social: { instagram: '#', facebook: '#', tiktok: '#' }
  },
  {
    name: 'Hina Rehman',
    role: 'Nail Artist',
    desc: 'Custom nail art, manicures and pedicures.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    social: { instagram: '#', facebook: '#', tiktok: '#' }
  }
];

/* ---- TESTIMONIALS ---- */
const REVIEWS = [
  {
    name: 'Amna Siddiqui',
    role: 'Bridal Client',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'The service was amazing. The staff was professional and the salon atmosphere was beautiful. I felt like a princess on my wedding day.'
  },
  {
    name: 'Fatima Rizvi',
    role: 'Regular Client',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'I have been coming here for over a year. My hair has never looked better and the team always makes me feel at home.'
  },
  {
    name: 'Zara Ali',
    role: 'Bridal Client',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    text: 'The bridal package was worth every rupee. Professional, punctual and the makeup lasted all night long without a single touch-up.'
  },
  {
    name: 'Mahnoor Sheikh',
    role: 'Skin Care Client',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 4.5,
    text: 'My skin has improved noticeably after their advanced facial. They took the time to understand my concerns before starting.'
  },
  {
    name: 'Nida Hassan',
    role: 'Regular Client',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    rating: 5,
    text: 'Beautiful studio, super clean and the prices are very reasonable for the quality. Highly recommended!'
  }
];

/* ---- BEAUTY PRODUCTS ---- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Nourishing Hair Serum',
    price: 1800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    name: 'Vitamin C Face Serum',
    price: 2400,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    name: 'Hydrating Shampoo',
    price: 1500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 4,
    name: 'Silk Conditioner',
    price: 1600,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 5,
    name: 'Daily Glow Moisturizer',
    price: 1950,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 6,
    name: 'Repair Hair Mask',
    price: 2200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80'
  }
];


/* =========================================================================
   03. STATE & STORAGE
   ========================================================================= */
const STORAGE = {
  cart:  'glamora_cart_v1',
  theme: 'glamora_theme_v1'
};

let cart = [];   /* [{ id, qty }] */


/* =========================================================================
   04. UTILITIES
   ========================================================================= */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function money(n) {
  return CONFIG.currency + ' ' + Number(n || 0).toLocaleString('en-US');
}

function starsHTML(rating) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return `<span class="stars" role="img" aria-label="${rating} out of 5 stars"><span style="width:${pct}%"></span></span>`;
}

let toastTimer = null;
function toast(message, type = '') {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast ' + type; }, 2800);
}

function debounce(fn, wait = 200) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}


/* =========================================================================
   05. THEME
   ========================================================================= */
function initTheme() {
  const saved = localStorage.getItem(STORAGE.theme);
  const prefersDark = window.matchMedia &&
                      window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  $('#themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE.theme, next);
    toast(next === 'dark' ? 'Dark mode on' : 'Light mode on');
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}


/* =========================================================================
   06. PRELOADER
   ========================================================================= */
function initPreloader() {
  const preloader = $('#preloader');
  if (!preloader) return;

  const hide = () => {
    preloader.classList.add('hide');
    setTimeout(() => { preloader.style.display = 'none'; }, 900);
  };

  if (document.readyState === 'complete') setTimeout(hide, 500);
  else {
    window.addEventListener('load', () => setTimeout(hide, 500));
    setTimeout(hide, 4500);
  }
}


/* =========================================================================
   07. HEADER / NAV  —  sticky, scroll spy, mobile menu
   ========================================================================= */
const uiState = {
  menu: false,
  cart: false,
  lightbox: false
};

function updateScrollLock() {
  const anyOpen = uiState.menu || uiState.cart || uiState.lightbox;
  document.body.classList.toggle('no-scroll', anyOpen);

  const overlay = $('#overlay');
  if (overlay) overlay.classList.toggle('show', uiState.menu || uiState.cart);
}

function initHeader() {
  const header = $('#header');

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);

    const btt = $('#backToTop');
    if (btt) btt.classList.toggle('show', window.scrollY > 600);

    updateActiveNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/** Highlight the nav link whose section is currently in view */
function updateActiveNav() {
  const links = $$('.main-nav a, .mobile-nav a');
  const sections = links
    .map(a => a.getAttribute('href'))
    .filter(h => h && h.startsWith('#'))
    .map(h => document.getElementById(h.slice(1)))
    .filter(Boolean);

  const y = window.scrollY + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 78) + 40;

  let current = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= y) current = sec.id;
  });

  $$('[data-nav]').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === current);
  });
}

function initMobileMenu() {
  const menu = $('#mobileMenu');
  const toggle = $('#menuToggle');

  const open = () => {
    uiState.menu = true;
    menu?.classList.add('open');
    toggle?.classList.add('active');
    toggle?.setAttribute('aria-expanded', 'true');
    menu?.setAttribute('aria-hidden', 'false');
    updateScrollLock();
  };
  const close = () => {
    uiState.menu = false;
    menu?.classList.remove('open');
    toggle?.classList.remove('active');
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
    updateScrollLock();
  };

  toggle?.addEventListener('click', () => uiState.menu ? close() : open());
  $('#menuClose')?.addEventListener('click', close);
  $('#overlay')?.addEventListener('click', () => { close(); closeCart(); });

  /* Close when a nav link is tapped */
  $$('#mobileMenu .mobile-nav a, #mobileMenu #mobileBook')
    .forEach(a => a.addEventListener('click', close));

  window.__closeMobileMenu = close;
}

function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();

    const headerH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h')) || 78;

    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;

    window.scrollTo({ top, behavior: 'smooth' });
  });
}


/* =========================================================================
   08. REVEAL ANIMATIONS
   ========================================================================= */
let revealObserver = null;

function initRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('in'));
    return;
  }

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
}

function observeReveals() {
  if (!revealObserver) return;
  $$('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
}


/* =========================================================================
   09. STATS COUNTER
   ========================================================================= */
function initStats() {
  const grid = $('#statsGrid');
  if (!grid) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      $$('.stat-num', grid).forEach(el => {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';

        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1700;
        const start = performance.now();

        function step(now) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  observer.observe(grid);
}


/* =========================================================================
   10. SERVICES  —  render + filter
   ========================================================================= */
function renderServices(filter = 'all') {
  const grid = $('#serviceGrid');
  if (!grid) return;

  const list = filter === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === filter);

  if (!list.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);font-family:var(--font-display);font-size:1.3rem">No services found in this category.</p>`;
    return;
  }

  grid.innerHTML = list.map(s => `
    <article class="service-card">
      <div class="service-media">
        <img src="${esc(s.image)}" alt="${esc(s.name)}" loading="lazy" onerror="__imgFallback(this)">
        <span class="service-cat-badge">${esc(s.category)}</span>
      </div>
      <div class="service-body">
        <h3 class="service-name">${esc(s.name)}</h3>
        <p class="service-desc">${esc(s.desc)}</p>
        <div class="service-meta">
          <span class="service-price">From ${money(s.price)}</span>
          <span>${esc(s.duration)}</span>
        </div>
        <button class="btn btn-primary btn-sm" data-book-service="${esc(s.name)}">BOOK NOW</button>
      </div>
    </article>
  `).join('');
}

function initServiceFilters() {
  const wrap = $('#serviceFilters');
  if (!wrap) return;

  wrap.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    $$('.chip', wrap).forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    renderServices(chip.dataset.cat);
  });

  /* Delegated "Book Now" on service cards → prefill booking form */
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-book-service]');
    if (!btn) return;
    const service = btn.dataset.bookService;
    prefillBooking(service);
  });
}

function prefillBooking(serviceName) {
  const select = $('#bkService');
  if (!select) return;

  /* Map service name → dropdown option (best effort) */
  const option = Array.from(select.options).find(o =>
    o.text.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0]) ||
    serviceName.toLowerCase().includes(o.text.toLowerCase().split(' ')[0])
  );
  if (option) select.value = option.value;

  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  toast(`Selected: ${serviceName}`);
}


/* =========================================================================
   11. PRICING
   ========================================================================= */
function renderPricing() {
  const grid = $('#pricingGrid');
  if (!grid) return;

  grid.innerHTML = PACKAGES.map(p => `
    <article class="pricing-card ${p.popular ? 'popular' : ''}">
      ${p.popular ? '<span class="pricing-badge">POPULAR</span>' : ''}
      <h3 class="pricing-name">${esc(p.name)}</h3>
      <p class="pricing-tag">${esc(p.tag)}</p>
      <div class="pricing-price">
        <span class="cur">Rs.</span>
        <span class="amt">${p.price.toLocaleString()}</span>
      </div>
      <ul class="pricing-features">
        ${p.features.map(f => `<li>${esc(f)}</li>`).join('')}
      </ul>
      <button class="btn ${p.popular ? 'btn-primary' : 'btn-outline'}"
              data-book-package="${esc(p.name)}">BOOK PACKAGE</button>
    </article>
  `).join('');

  grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-book-package]');
    if (!btn) return;
    prefillBooking(btn.dataset.bookPackage);
  });
}


/* =========================================================================
   12. GALLERY + LIGHTBOX
   ========================================================================= */
let lightboxIndex = 0;

function renderGallery() {
  const grid = $('#galleryGrid');
  if (!grid) return;

  grid.innerHTML = GALLERY.map((g, i) => `
    <figure class="gallery-item" data-gallery="${i}" tabindex="0" role="button"
            aria-label="Open image: ${esc(g.title)}">
      <img src="${esc(g.src)}" alt="${esc(g.title)}" loading="lazy" onerror="__imgFallback(this)">
      <figcaption class="gallery-caption">
        <h4>${esc(g.title)}</h4>
        <span>${esc(g.sub)}</span>
      </figcaption>
    </figure>
  `).join('');
}

function openLightbox(i) {
  lightboxIndex = Math.max(0, Math.min(GALLERY.length - 1, i));
  const g = GALLERY[lightboxIndex];

  $('#lbImage').src = g.src;
  $('#lbImage').alt = g.title;
  $('#lbCaption').textContent = `${g.title} — ${g.sub}`;

  uiState.lightbox = true;
  const modal = $('#lightbox');
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
  updateScrollLock();
}

function closeLightbox() {
  uiState.lightbox = false;
  const modal = $('#lightbox');
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
  updateScrollLock();
}

function lightboxNext() { openLightbox((lightboxIndex + 1) % GALLERY.length); }
function lightboxPrev() { openLightbox((lightboxIndex - 1 + GALLERY.length) % GALLERY.length); }

function initGallery() {
  renderGallery();

  document.addEventListener('click', e => {
    const item = e.target.closest('[data-gallery]');
    if (item) openLightbox(Number(item.dataset.gallery));
  });

  document.addEventListener('keydown', e => {
    const item = e.target.closest?.('[data-gallery]');
    if (item && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openLightbox(Number(item.dataset.gallery));
    }
  });

  $('#lbPrev')?.addEventListener('click', lightboxPrev);
  $('#lbNext')?.addEventListener('click', lightboxNext);

  document.addEventListener('keydown', e => {
    if (!uiState.lightbox) return;
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft')  lightboxPrev();
    if (e.key === 'Escape')     closeLightbox();
  });

  /* Close button delegation */
  $('#lightbox')?.querySelector('[data-close-modal]')
    ?.addEventListener('click', closeLightbox);
  $('#lightbox')?.querySelector('.modal-close')
    ?.addEventListener('click', closeLightbox);
}


/* =========================================================================
   13. BEFORE & AFTER  —  draggable sliders
   ========================================================================= */
function renderBeforeAfter() {
  const grid = $('#baGrid');
  if (!grid) return;

  grid.innerHTML = TRANSFORMATIONS.map((t, i) => `
    <article class="ba-card">
      <div class="ba-slider" data-ba="${i}">
        <img src="${esc(t.before)}" alt="Before: ${esc(t.title)}" loading="lazy" onerror="__imgFallback(this)">
        <img class="ba-after" src="${esc(t.after)}" alt="After: ${esc(t.title)}" loading="lazy" onerror="__imgFallback(this)">
        <span class="ba-label before">Before</span>
        <span class="ba-label after">After</span>
        <div class="ba-handle"></div>
      </div>
      <div class="ba-info">
        <h3>${esc(t.title)}</h3>
        <span>${esc(t.service)}</span>
      </div>
    </article>
  `).join('');

  $$('.ba-slider').forEach(slider => initBASlider(slider));
}

function initBASlider(slider) {
  const after = slider.querySelector('.ba-after');
  const handle = slider.querySelector('.ba-handle');
  let dragging = false;

  const setPosition = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));

    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + '%';
  };

  const onDown = (e) => {
    dragging = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(x);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(x);
    if (e.cancelable) e.preventDefault();
  };
  const onUp = () => { dragging = false; };

  slider.addEventListener('mousedown', onDown);
  slider.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);
}


/* =========================================================================
   14. TEAM
   ========================================================================= */
function renderTeam() {
  const grid = $('#teamGrid');
  if (!grid) return;

  grid.innerHTML = TEAM.map(m => `
    <article class="team-card">
      <div class="team-photo">
        <img src="${esc(m.photo)}" alt="${esc(m.name)}, ${esc(m.role)}" loading="lazy" onerror="__imgFallback(this)">
        <div class="team-social">
          <a href="${esc(m.social.instagram)}" aria-label="${esc(m.name)} on Instagram">IG</a>
          <a href="${esc(m.social.facebook)}"  aria-label="${esc(m.name)} on Facebook">FB</a>
          <a href="${esc(m.social.tiktok)}"    aria-label="${esc(m.name)} on TikTok">TT</a>
        </div>
      </div>
      <div class="team-info">
        <h3>${esc(m.name)}</h3>
        <span class="team-role">${esc(m.role)}</span>
        <p>${esc(m.desc)}</p>
      </div>
    </article>
  `).join('');
}


/* =========================================================================
   15. TESTIMONIALS  —  slider
   ========================================================================= */
let reviewIndex = 0;
let reviewAuto = null;

function renderReviews() {
  const track = $('#reviewsTrack');
  const dots = $('#reviewsDots');
  if (!track) return;

  track.innerHTML = REVIEWS.map(r => `
    <article class="review-card">
      <div class="review-stars">${'★'.repeat(Math.round(r.rating))}${'☆'.repeat(5 - Math.round(r.rating))}</div>
      <p class="review-text">${esc(r.text)}</p>
      <div class="review-author">
        <img class="review-avatar" src="${esc(r.avatar)}" alt="${esc(r.name)}"
             loading="lazy" onerror="this.style.visibility='hidden'">
        <div>
          <span class="review-name">${esc(r.name)}</span>
          <span class="review-role">${esc(r.role)}</span>
        </div>
      </div>
    </article>
  `).join('');

  if (dots) {
    dots.innerHTML = REVIEWS.map((_, i) =>
      `<button data-review="${i}" aria-label="Go to review ${i + 1}"></button>`
    ).join('');
  }
}

function initReviewsSlider() {
  const track = $('#reviewsTrack');
  const dots = $('#reviewsDots');
  if (!track) return;

  const cards = () => $$('.review-card', track);
  const maxIndex = () => Math.max(0, cards().length - 1);

  function goTo(i) {
    const list = cards();
    if (!list.length) return;
    i = Math.max(0, Math.min(maxIndex(), i));
    reviewIndex = i;

    const card = list[i];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }
    updateDots();
  }

  function updateDots() {
    if (!dots) return;
    $$('button', dots).forEach((d, i) =>
      d.classList.toggle('active', i === reviewIndex));
  }

  $('#reviewPrev')?.addEventListener('click', () => {
    goTo(reviewIndex <= 0 ? maxIndex() : reviewIndex - 1);
    restartAuto();
  });
  $('#reviewNext')?.addEventListener('click', () => {
    goTo(reviewIndex >= maxIndex() ? 0 : reviewIndex + 1);
    restartAuto();
  });
  dots?.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    goTo(Number(btn.dataset.review));
    restartAuto();
  });

  track.addEventListener('scroll', debounce(() => {
    const list = cards();
    if (!list.length) return;
    let closest = 0, minDist = Infinity;
    list.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft - track.offsetLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== reviewIndex) {
      reviewIndex = closest;
      updateDots();
    }
  }, 90), { passive: true });

  function startAuto() {
    stopAuto();
    reviewAuto = setInterval(() => {
      goTo(reviewIndex >= maxIndex() ? 0 : reviewIndex + 1);
    }, 5500);
  }
  function stopAuto() {
    if (reviewAuto) clearInterval(reviewAuto);
    reviewAuto = null;
  }
  function restartAuto() { stopAuto(); startAuto(); }

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  track.addEventListener('focusin', stopAuto);
  track.addEventListener('focusout', startAuto);
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAuto() : startAuto();
  });

  updateDots();
  startAuto();
}


/* =========================================================================
   16. PRODUCTS
   ========================================================================= */
function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card">
      <div class="product-media">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="__imgFallback(this)">
      </div>
      <div class="product-body">
        <h3 class="product-name">${esc(p.name)}</h3>
        <div class="product-rating">
          ${starsHTML(p.rating)}
          <span>${p.rating.toFixed(1)}</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${money(p.price)}</span>
          <button class="btn btn-primary" data-add-product="${p.id}">ADD TO CART</button>
        </div>
      </div>
    </article>
  `).join('');
}


/* =========================================================================
   17. CART
   ========================================================================= */
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE.cart);
    cart = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(cart)) cart = [];
  } catch { cart = []; }
}

function saveCart() {
  try { localStorage.setItem(STORAGE.cart, JSON.stringify(cart)); } catch {}
}

function getProduct(id) { return PRODUCTS.find(p => p.id === Number(id)); }

function cartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function addToCart(id) {
  const p = getProduct(id);
  if (!p) return;

  const existing = cart.find(i => i.id === Number(id));
  if (existing) existing.qty = Math.min(10, existing.qty + 1);
  else cart.push({ id: Number(id), qty: 1 });

  saveCart();
  renderCart();
  updateCounts();
  toast(`${p.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== Number(id));
  saveCart();
  renderCart();
  updateCounts();
}

function changeCartQty(id, delta) {
  const item = cart.find(i => i.id === Number(id));
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  item.qty = Math.min(10, item.qty);

  saveCart();
  renderCart();
  updateCounts();
}

function cartTotals() {
  let subtotal = 0;
  cart.forEach(item => {
    const p = getProduct(item.id);
    if (p) subtotal += p.price * item.qty;
  });
  const shipping = subtotal > 0 ? CONFIG.shipping : 0;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}

function renderCart() {
  const body = $('#cartItems');
  const foot = $('#cartFoot');
  if (!body || !foot) return;

  if (!cart.length) {
    body.innerHTML = `
      <div class="drawer-empty">
        <svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor"
             stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>
        </svg>
        <h3>Your cart is empty</h3>
        <p>Browse our beauty essentials and add your favourites.</p>
        <a href="#products" class="btn btn-primary btn-sm" data-close-drawer>SHOP PRODUCTS</a>
      </div>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="__imgFallback(this)">
        <div class="cart-item-info">
          <h4>${esc(p.name)}</h4>
          <span class="ci-cat">Beauty Essential</span>
          <span class="ci-price">${money(p.price)}</span>
        </div>
        <div class="cart-item-side">
          <button class="remove-btn" data-remove="${p.id}">Remove</button>
          <div class="cart-qty">
            <button data-cqty="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button data-cqty="1" data-id="${p.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const t = cartTotals();

  foot.innerHTML = `
    <div class="cart-totals">
      <div class="cart-row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      <div class="cart-row"><span>Shipping</span><span>${t.shipping === 0 ? 'Free' : money(t.shipping)}</span></div>
      <div class="cart-row total"><span>Total</span><span>${money(t.total)}</span></div>
    </div>
    <button class="btn btn-primary btn-block" id="checkoutBtn">PLACE ORDER</button>
    <p class="cart-note">Cash on delivery available in Hyderabad</p>
  `;

  $('#checkoutBtn')?.addEventListener('click', () => {
    toast('Order placed successfully — we will call to confirm', 'gold');
    cart = [];
    saveCart();
    renderCart();
    updateCounts();
    closeCart();
  });
}

function updateCounts() {
  const n = cartCount();
  const el = $('#cartCount');
  const drawerEl = $('#cartDrawerCount');
  if (el) {
    el.textContent = n;
    el.style.display = n ? '' : 'none';
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
  }
  if (drawerEl) drawerEl.textContent = n;
}

function openCart() {
  uiState.cart = true;
  renderCart();
  $('#cartDrawer')?.classList.add('open');
  $('#cartDrawer')?.setAttribute('aria-hidden', 'false');
  updateScrollLock();
}

function closeCart() {
  uiState.cart = false;
  $('#cartDrawer')?.classList.remove('open');
  $('#cartDrawer')?.setAttribute('aria-hidden', 'true');
  updateScrollLock();
}

function initCart() {
  $('#cartToggle')?.addEventListener('click', openCart);

  $$('[data-close-drawer]').forEach(btn =>
    btn.addEventListener('click', closeCart));

  document.addEventListener('click', e => {
    /* Add to cart buttons on product cards */
    const addBtn = e.target.closest('[data-add-product]');
    if (addBtn) {
      addToCart(addBtn.dataset.addProduct);
      return;
    }

    /* Quantity control inside cart */
    const qtyBtn = e.target.closest('[data-cqty]');
    if (qtyBtn) {
      changeCartQty(qtyBtn.dataset.id, Number(qtyBtn.dataset.cqty));
      return;
    }

    /* Remove */
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      removeFromCart(removeBtn.dataset.remove);
      toast('Item removed');
    }
  });
}


/* =========================================================================
   18. COUNTDOWN
   ========================================================================= */
let countdownTimer = null;

function initCountdown() {
  const target = new Date(CONFIG.offerEnd).getTime();
  const els = { d: $('#cdDays'), h: $('#cdHours'), m: $('#cdMins'), s: $('#cdSecs') };
  const box = $('#countdown');
  if (!els.d || !box) return;

  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      clearInterval(countdownTimer);
      els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = '00';
      box.classList.add('ended');
      const title = $('.countdown-title');
      if (title) title.textContent = 'OFFER ENDED';
      return;
    }

    let d = Math.floor(diff / 86400000);
    let h = Math.floor((diff -= d * 86400000) / 3600000);
    let m = Math.floor((diff -= h * 3600000) / 60000);
    let s = Math.floor((diff -= m * 60000) / 1000);

    els.d.textContent = pad(d);
    els.h.textContent = pad(h);
    els.m.textContent = pad(m);
    els.s.textContent = pad(s);
  }

  tick();
  countdownTimer = setInterval(tick, 1000);
}


/* =========================================================================
   19. BOOKING FORM  —  validation + confirmation
   ========================================================================= */
function generateBookingId() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `GLM-${year}-${rand}`;
}

function validateBookingField(el) {
  const errEl = document.querySelector(`[data-error-for="${el.id}"]`);
  const value = (el.value || '').trim();
  let message = '';

  if (el.required && !value) {
    message = 'This field is required.';
  } else if (el.id === 'bkEmail' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = 'Enter a valid email address.';
  } else if (el.id === 'bkPhone' && value && value.replace(/\D/g, '').length < 10) {
    message = 'Enter a valid phone number.';
  } else if (el.id === 'bkName' && value && value.length < 3) {
    message = 'Please enter your full name.';
  } else if (el.id === 'bkDate' && value) {
    const selected = new Date(value);
    const today = new Date(); today.setHours(0,0,0,0);
    if (selected < today) message = 'Please select a future date.';
  }

  if (message) {
    el.classList.add('invalid');
    if (errEl) errEl.textContent = message;
    return false;
  }
  el.classList.remove('invalid');
  if (errEl) errEl.textContent = '';
  return true;
}

function initBookingForm() {
  const form = $('#bookingForm');
  if (!form) return;

  const fields = ['bkName', 'bkPhone', 'bkEmail', 'bkService', 'bkDate', 'bkTime'];

  /* Prevent selecting a past date */
  const dateInput = $('#bkDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  fields.forEach(id => {
    const el = $('#' + id);
    if (!el) return;
    el.addEventListener('blur', () => validateBookingField(el));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateBookingField(el);
    });
    el.addEventListener('change', () => {
      if (el.classList.contains('invalid')) validateBookingField(el);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    fields.forEach(id => {
      const el = $('#' + id);
      if (el && !validateBookingField(el)) valid = false;
    });

    const msgEl = $('#bookingMsg');
    if (!valid) {
      if (msgEl) {
        msgEl.textContent = 'Please complete all required fields correctly.';
        msgEl.className = 'form-msg err';
      }
      const firstInvalid = form.querySelector('.invalid');
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid?.focus({ preventScroll: true });
      return;
    }

    if (msgEl) { msgEl.textContent = ''; msgEl.className = 'form-msg'; }
    submitBooking(form);
  });
}

function submitBooking(form) {
  const data = new FormData(form);
  const bookingId = generateBookingId();

  const name    = (data.get('name') || '').trim();
  const phone   = (data.get('phone') || '').trim();
  const email   = (data.get('email') || '').trim();
  const service = (data.get('service') || '').trim();
  const date    = (data.get('date') || '').trim();
  const time    = (data.get('time') || '').trim();
  const guests  = (data.get('guests') || '1').trim();
  const request = (data.get('request') || '').trim();

  const prettyDate = date ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  }) : '';

  const summary = $('#bookingSummary');
  if (!summary) return;

  summary.innerHTML = `
    <div class="booking-confirm">
      <span class="bc-badge">✓ APPOINTMENT REQUEST RECEIVED</span>
      <h3>Thank you, ${esc(name.split(' ')[0])}!</h3>
      <p>Our team will contact you shortly to confirm your appointment.</p>

      <div class="booking-id">
        <span>Booking ID</span>
        <strong>${bookingId}</strong>
      </div>

      <dl class="bc-list">
        <div><dt>Service</dt><dd>${esc(service)}</dd></div>
        <div><dt>Date</dt><dd>${esc(prettyDate)}</dd></div>
        <div><dt>Time</dt><dd>${esc(time)}</dd></div>
        <div><dt>Guests</dt><dd>${esc(guests)}</dd></div>
        <div><dt>Phone</dt><dd>${esc(phone)}</dd></div>
        <div><dt>Email</dt><dd>${esc(email)}</dd></div>
        ${request ? `<div><dt>Special Request</dt><dd>${esc(request)}</dd></div>` : ''}
      </dl>

      <button type="button" class="btn btn-outline btn-block" id="newBooking">
        BOOK ANOTHER APPOINTMENT
      </button>

      <p class="bc-note">Save this booking ID for reference.</p>
    </div>
  `;

  form.reset();

  /* Reset any lingering error states */
  form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  form.querySelectorAll('.error').forEach(el => el.textContent = '');

  toast('Appointment request received', 'gold');

  $('#newBooking')?.addEventListener('click', () => {
    summary.innerHTML = `
      <div class="bs-placeholder">
        <span class="bs-icon">✦</span>
        <h3>Your Booking Summary</h3>
        <p>Once you submit the form, your appointment details and booking ID will appear here.</p>
        <ul class="bs-perks">
          <li>Instant confirmation request</li>
          <li>Personal call-back within 2 hours</li>
          <li>Free rescheduling up to 24 hrs before</li>
        </ul>
      </div>`;
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}


/* =========================================================================
   20. CONTACT FORM
   ========================================================================= */
function validateContactField(el) {
  const errEl = document.querySelector(`[data-error-for="${el.id}"]`);
  const value = (el.value || '').trim();
  let message = '';

  if (!value) message = 'This field is required.';
  else if (el.id === 'ctEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    message = 'Enter a valid email address.';
  else if (el.id === 'ctPhone' && value.replace(/\D/g, '').length < 10)
    message = 'Enter a valid phone number.';
  else if (el.id === 'ctName' && value.length < 3)
    message = 'Please enter your full name.';
  else if (el.id === 'ctMessage' && value.length < 10)
    message = 'Please write a slightly longer message.';

  if (message) {
    el.classList.add('invalid');
    if (errEl) errEl.textContent = message;
    return false;
  }
  el.classList.remove('invalid');
  if (errEl) errEl.textContent = '';
  return true;
}

function initContactForm() {
  const form = $('#contactForm');
  const msg = $('#contactMsg');
  if (!form) return;

  const ids = ['ctName', 'ctEmail', 'ctPhone', 'ctMessage'];

  ids.forEach(id => {
    const el = $('#' + id);
    el?.addEventListener('blur', () => validateContactField(el));
    el?.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateContactField(el);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    ids.forEach(id => {
      const el = $('#' + id);
      if (el && !validateContactField(el)) valid = false;
    });

    if (!valid) {
      if (msg) { msg.textContent = 'Please correct the highlighted fields.'; msg.className = 'form-msg err'; }
      return;
    }

    if (msg) { msg.textContent = 'Thank you! Your message has been sent.'; msg.className = 'form-msg ok'; }

    form.reset();
    ids.forEach(id => {
      const el = $('#' + id);
      el?.classList.remove('invalid');
      const err = document.querySelector(`[data-error-for="${id}"]`);
      if (err) err.textContent = '';
    });

    toast('Message sent successfully', 'gold');
  });
}


/* =========================================================================
   21. NEWSLETTER
   ========================================================================= */
function initNewsletter() {
  const form = $('#newsletterForm');
  const msg = $('#newsletterMsg');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const input = $('#newsletterEmail');
    const email = (input?.value || '').trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      input?.classList.add('invalid');
      if (msg) { msg.textContent = 'Please enter a valid email address.'; msg.className = 'form-msg err'; }
      return;
    }

    input.classList.remove('invalid');
    if (msg) { msg.textContent = 'Thank you for subscribing!'; msg.className = 'form-msg ok'; }

    form.reset();
    toast('Thank you for subscribing!', 'gold');
  });

  $('#newsletterEmail')?.addEventListener('input', e => {
    e.target.classList.remove('invalid');
    if (msg) { msg.textContent = ''; msg.className = 'form-msg'; }
  });
}


/* =========================================================================
   22. MISC  —  back to top, WhatsApp, keyboard, offer claims
   ========================================================================= */
function initBackToTop() {
  $('#backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initWhatsApp() {
  const link = document.querySelector('.whatsapp-float');
  if (link) {
    link.href = `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent('Hello, I would like to book an appointment at Glamora Beauty Studio.');
  }
}

function initOfferClaims() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-claim]');
    if (!btn) return;
    const offer = btn.dataset.claim;

    /* Prefill the booking form and jump down */
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast(`Offer applied: ${offer}`);

    const requestField = $('#bkRequest');
    if (requestField) {
      requestField.value = `Claiming offer: ${offer}`;
    }
  });
}

function initGlobalShortcuts() {
  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

    /* Escape closes open UI */
    if (e.key === 'Escape') {
      if (uiState.lightbox) closeLightbox();
      else if (uiState.cart) closeCart();
      else if (uiState.menu) window.__closeMobileMenu?.();
      return;
    }

    /* "/" focuses newsletter email (a nice convenience) */
    if (e.key === '/' && !typing) {
      e.preventDefault();
      $('#newsletterEmail')?.focus();
    }
  });
}


/* =========================================================================
   23. INIT
   ========================================================================= */
function init() {
  /* Theme + storage */
  initTheme();
  loadCart();

  /* Static content */
  renderServices();
  renderPricing();
  renderBeforeAfter();
  renderTeam();
  renderReviews();
  renderProducts();

  /* UI systems */
  initPreloader();
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initServiceFilters();
  initGallery();
  initReviewsSlider();
  initCart();
  initCountdown();
  initBookingForm();
  initContactForm();
  initNewsletter();
  initBackToTop();
  initWhatsApp();
  initOfferClaims();
  initGlobalShortcuts();

  /* Reveal + counters */
  initRevealObserver();
  observeReveals();
  initStats();

  /* Counters + initial cart render */
  updateCounts();
  renderCart();

  /* Re-check reveals after images finish loading */
  window.addEventListener('load', () => {
    observeReveals();
    updateActiveNav();
  });

  /* Subtle parallax on hero background */
  window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const y = Math.min(window.scrollY, 600);
    heroBg.style.transform = `translateY(${y * 0.18}px) scale(1.07)`;
  }, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}