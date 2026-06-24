/* ══════════════════════════════════════════════
   ADDY GROWTH STUDIO — Premium Script
   ══════════════════════════════════════════════ */
(function () {
  'use strict';

  const TOTAL_FRAMES = 192;
  const FRAME_PATH = '/frames/';

  // DOM
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  const heroContainer = document.getElementById('hero-scroll-container');
  const heroOverlay = document.getElementById('heroOverlay');
  const scrollIndicator = document.getElementById('scrollIndicator');
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  const preloaderText = document.getElementById('preloaderText');
  const navbar = document.getElementById('navbar');
  const navProgress = document.getElementById('navProgress');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const starsCanvas = document.getElementById('starsCanvas');
  const starsCtx = starsCanvas.getContext('2d');

  const images = [];
  let currentFrame = 0;
  let isReady = false;

  // ─── PRICING DATA ───
  const pricingData = {
    cinematic: [
      { duration: '15 Seconds', per: '$60', bundles: [{ price: '$170', save: 'Save $10' }, { price: '$290', save: 'Save $10' }, { price: '$540', save: 'Save $60' }] },
      { duration: '20–25 Seconds', per: '$75', bundles: [{ price: '$210', save: 'Save $15' }, { price: '$360', save: 'Save $15' }, { price: '$690', save: 'Save $60' }] },
      { duration: '30 Seconds', per: '$90', bundles: [{ price: '$255', save: 'Save $10' }, { price: '$435', save: 'Save $15' }, { price: '$840', save: 'Save $60' }] }
    ],
    ugc: [
      { duration: '15 Seconds', per: '$45', bundles: [{ price: '$125', save: 'Save $10' }, { price: '$210', save: 'Save $15' }, { price: '$400', save: 'Save $50' }] },
      { duration: '20–25 Seconds', per: '$60', bundles: [{ price: '$170', save: 'Save $10' }, { price: '$285', save: 'Save $15' }, { price: '$550', save: 'Save $50' }] },
      { duration: '30 Seconds', per: '$75', bundles: [{ price: '$210', save: 'Save $15' }, { price: '$360', save: 'Save $15' }, { price: '$700', save: 'Save $50' }] }
    ]
  };

  // ─── DUMMY PRODUCTS DATA ───
  const productsData = [
    { id: 1, name: "Luminous Peptide Serum", category: "serum", price: "$120", style: "bottle-glass",
      desc: "A clinical-grade formula that instantly brightens and visibly firms the skin using advanced peptide technology.",
      benefits: ["Visibly firms skin", "Reduces fine lines", "Enhances radiance", "Deeply hydrates"]
    },
    { id: 2, name: "Velvet Night Repair", category: "moisturiser", price: "$85", style: "bottle-dark",
      desc: "An ultra-rich overnight recovery cream infused with ceramides to rebuild the skin barrier while you sleep.",
      benefits: ["Repairs skin barrier", "Intense overnight moisture", "Soothes redness", "Plumps skin"]
    },
    { id: 3, name: "Radiance Exfoliating Mask", category: "mask", price: "$65", style: "bottle-rose",
      desc: "A gentle yet effective resurfacing mask that sweeps away dead skin cells to reveal a glowing complexion.",
      benefits: ["Gentle exfoliation", "Unclogs pores", "Evens skin tone", "Boosts glow"]
    },
    { id: 4, name: "Hydro-Plump Moisture Surge", category: "moisturiser", price: "$75", style: "bottle-glass",
      desc: "A lightweight water-cream that floods the skin with continuous hydration lasting up to 72 hours.",
      benefits: ["72h hydration", "Lightweight texture", "Non-comedogenic", "Cooling effect"]
    },
    { id: 5, name: "C-Firma Brightening Essence", category: "serum", price: "$110", style: "bottle-rose",
      desc: "A potent Vitamin C complex that targets dark spots and hyperpigmentation for an even, luminous tone.",
      benefits: ["Fades dark spots", "Potent antioxidant", "Protects from pollution", "Brightens overall tone"]
    },
    { id: 6, name: "Clarifying Clay Detox", category: "mask", price: "$55", style: "bottle-dark",
      desc: "A mineral-rich clay mask that deeply purifies pores without stripping the skin of its natural moisture.",
      benefits: ["Draws out impurities", "Minimizes pores", "Absorbs excess oil", "Non-drying formula"]
    }
  ];

  // ═══ STARS BACKGROUND ═══
  const stars = [];
  const STAR_COUNT = 180;

  function initStars() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        flicker: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
  }

  function drawStars() {
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    const time = Date.now() * 0.001;
    for (const s of stars) {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = starsCanvas.width;
      if (s.x > starsCanvas.width) s.x = 0;
      if (s.y < 0) s.y = starsCanvas.height;
      if (s.y > starsCanvas.height) s.y = 0;
      const a = s.alpha * (0.3 + 0.7 * Math.sin(time * s.speed + s.flicker));
      starsCtx.beginPath();
      starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starsCtx.fillStyle = `rgba(77,208,225,${Math.max(0.1, a)})`;
      starsCtx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  // ═══ FRAME LOADING ═══
  function getFrameSrc(i) {
    return `${FRAME_PATH}${String(i + 1).padStart(4, '0')}.jpg`;
  }

  function preloadImages() {
    return new Promise((resolve) => {
      let loaded = 0;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = img.onerror = () => {
          loaded++;
          const pct = Math.round((loaded / TOTAL_FRAMES) * 100);
          preloaderFill.style.width = pct + '%';
          preloaderText.textContent = `Loading ${pct}%`;
          if (loaded === TOTAL_FRAMES) resolve();
        };
        images[i] = img;
      }
    });
  }

  // ═══ CANVAS RENDER ═══
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrame);
  }

  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.width, ch = canvas.height;
    const ir = img.width / img.height, cr = cw / ch;
    let dw, dh, dx, dy;
    if (cr > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    else { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2; }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  // ═══ DUMMY PRODUCTS & MODAL ═══
  function getBottleHTML(style, name) {
    const acronym = name.split(' ').map(w => w[0]).join('').substring(0,2);
    return `
      <div class="bottle-3d ${style}">
        <div class="b-face b-front">
          <div class="b-label">${acronym}</div>
        </div>
        <div class="b-face b-back"></div>
        <div class="b-face b-left"></div>
        <div class="b-face b-right"></div>
        <div class="b-face b-top"></div>
        <div class="b-face b-bottom"></div>
        <div class="b-cap">
          <div class="b-face b-cap-front"></div>
        </div>
      </div>
    `;
  }

  function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    const filtered = filter === 'all' ? productsData : productsData.filter(p => p.category === filter);
    
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'prod-card reveal in-view';
      card.innerHTML = `
        <div class="prod-visual-area">
          ${getBottleHTML(p.style, p.name)}
        </div>
        <div class="prod-info">
          <span class="prod-cat">${p.category}</span>
          <h3 class="prod-name">${p.name}</h3>
          <div class="prod-price">${p.price}</div>
          <button class="prod-buy-btn">View Details</button>
        </div>
      `;
      card.addEventListener('click', () => openModal(p));
      grid.appendChild(card);
    });
  }

  function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.filter);
      });
    });
  }

  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalScene = document.getElementById('modalScene');
  const modalInfo = document.getElementById('modalInfo');

  function openModal(product) {
    modalScene.innerHTML = getBottleHTML(product.style, product.name);
    
    const benefitsHTML = product.benefits.map(b => `
      <div class="m-benefit-item">
        <svg class="m-benefit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
        <span>${b}</span>
      </div>
    `).join('');

    modalInfo.innerHTML = `
      <div class="m-cat">${product.category}</div>
      <h2 class="m-title shimmer-heading">${product.name}</h2>
      <div class="m-price">${product.price}</div>
      <p class="m-desc">${product.desc}</p>
      <div class="m-benefits">${benefitsHTML}</div>
      <button class="m-btn">Add to Cart — ${product.price}</button>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scrolling
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });


  // ═══ SCROLL HANDLER ═══
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    navProgress.style.width = scrollPct + '%';

    // Navbar bg
    navbar.classList.toggle('scrolled', scrollTop > 60);

    if (!isReady) return;

    // Frame animation calculation
    const cTop = heroContainer.offsetTop;
    const cHeight = heroContainer.offsetHeight - window.innerHeight;
    const frac = Math.max(0, Math.min(1, (scrollTop - cTop) / cHeight));
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(frac * TOTAL_FRAMES));

    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      drawFrame(currentFrame);
    }

    // Hero Text Sequencing
    function animateText(id, f, start, end, isFirst = false, isLast = false) {
      const el = document.getElementById(id);
      if (!el) return;
      if (f < start || f > end) {
        el.style.opacity = 0;
        el.style.pointerEvents = 'none';
        return;
      }
      el.style.pointerEvents = 'auto';
      const p = (f - start) / (end - start);
      
      let opacity = 1;
      let yOffset = 0;
      let blur = 0;
      let scale = 1;
      
      if (p < 0.2 && !isFirst) {
        const inP = p / 0.2;
        opacity = inP;
        yOffset = 40 * (1 - inP);
        blur = 10 * (1 - inP);
        scale = 0.95 + 0.05 * inP;
      } else if (p > 0.8 && !isLast) {
        const outP = (p - 0.8) / 0.2;
        opacity = 1 - outP;
        yOffset = -40 * outP;
        blur = 10 * outP;
        scale = 1 + 0.05 * outP;
      }
      
      const parallax = (p - 0.5) * 60;
      
      let transform = '';
      if (window.innerWidth <= 768) {
        transform = el.classList.contains('bottom-center') 
          ? `translate(-50%, ${yOffset + parallax}px) scale(${scale})`
          : `translate(-50%, calc(-50% + ${yOffset + parallax}px)) scale(${scale})`;
      } else {
        transform = el.classList.contains('bottom-center')
          ? `translate(-50%, ${yOffset + parallax}px) scale(${scale})`
          : `translateY(calc(-50% + ${yOffset + parallax}px)) scale(${scale})`;
      }
      
      el.style.opacity = opacity;
      el.style.filter = `blur(${blur}px)`;
      el.style.transform = transform;
    }

    animateText('heroText1', frac, 0.0, 0.3, true, true);

    if (scrollIndicator) scrollIndicator.style.opacity = Math.max(0, 1 - frac * 8);

    // Overlay darkness based on scroll
    const ov = frac < 0.5 ? 0.3 + frac * 0.6 : 0.6 - (frac - 0.5) * 0.4;
    heroOverlay.style.background = `radial-gradient(ellipse at center,rgba(5,5,8,${ov * 0.5}) 0%,rgba(5,5,8,${ov}) 60%,rgba(5,5,8,${ov + 0.1}) 100%)`;

    // Horizontal Scroll Sections
    document.querySelectorAll('.hscroll-section').forEach(section => {
      const track = section.querySelector('.hscroll-track');
      if (!track) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const vh = window.innerHeight;
      if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight - vh) {
        const scrollFraction = (scrollTop - sectionTop) / (sectionHeight - vh);
        const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        track.style.transform = `translate3d(-${scrollFraction * maxScroll}px, 0, 0)`;
      } else if (scrollTop < sectionTop) {
        track.style.transform = `translate3d(0px, 0, 0)`;
      } else {
        const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        track.style.transform = `translate3d(-${maxScroll}px, 0, 0)`;
      }
    });

    // Premium Cards Neon Highlight
    const premiumCards = document.querySelectorAll('.premium-card');
    const viewportCenter = window.innerWidth / 2;
    premiumCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      if (Math.abs(cardCenter - viewportCenter) < window.innerWidth * 0.25) {
        card.classList.add('neon-highlight');
      } else {
        card.classList.remove('neon-highlight');
      }
    });

    // Vertical Timeline Process
    const vTimeline = document.getElementById('processVTimeline');
    const vLineFill = document.getElementById('vLineFill');
    if (vTimeline && vLineFill) {
      const vh = window.innerHeight;
      const tRect = vTimeline.getBoundingClientRect();
      
      let fillPct = 0;
      if (tRect.top < vh * 0.75) {
         fillPct = (vh * 0.75 - tRect.top) / (tRect.height * 0.8);
      }
      fillPct = Math.max(0, Math.min(1, fillPct));
      vLineFill.style.height = `${fillPct * 100}%`;
      
      const steps = vTimeline.querySelectorAll('.v-step');
      steps.forEach(step => {
        const sRect = step.getBoundingClientRect();
        if (sRect.top < vh * 0.8) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }

    // Benefits Section Scroll Animation
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      const bRect = benefitsSection.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Calculate active scroll progress percentage for benefits section (sticky scroll pinning)
      const bTop = benefitsSection.offsetTop;
      const bHeight = benefitsSection.offsetHeight - vh;
      const currentScroll = window.scrollY;
      const p = bHeight > 0 ? Math.min(1, (currentScroll - bTop) / bHeight) : 0;

      // Helper function to interpolate values
      function interpolate(val, start, end, fromVal, toVal) {
        if (val <= start) return fromVal;
        if (val >= end) return toVal;
        const pct = (val - start) / (end - start);
        return fromVal + (toVal - fromVal) * pct;
      }

      // 1. Heading Reveal
      const header = benefitsSection.querySelector('.reveal-benefit-header');
      if (header) {
        const opacity = interpolate(p, -0.4, 0.05, 0, 1);
        const translateY = interpolate(p, -0.4, 0.05, 30, 0);
        const blur = interpolate(p, -0.4, 0.05, 8, 0);
        header.style.opacity = opacity;
        header.style.transform = `translateY(${translateY}px)`;
        header.style.filter = `blur(${blur}px)`;
      }

      // 2. Standing Addy Image Reveal (from bottom with neon blue blur/glow)
      const imageWrap = benefitsSection.querySelector('.reveal-benefit-image');
      if (imageWrap) {
        const opacity = interpolate(p, -0.2, 0.25, 0, 1);
        const translateY = interpolate(p, -0.2, 0.25, 100, 0);
        const blur = interpolate(p, -0.2, 0.25, 15, 0);
        const glow = interpolate(p, -0.2, 0.25, 30, 0);
        imageWrap.style.opacity = opacity;
        imageWrap.style.transform = `translateY(${translateY}px)`;
        imageWrap.style.filter = `blur(${blur}px) drop-shadow(0 0 ${glow}px rgba(77,208,225,0.4))`;
      }

      // 3. 6 Cards Reveal Staggered Top-to-Bottom (Row by Row)
      const cards = benefitsSection.querySelectorAll('.reveal-benefit');
      cards.forEach(card => {
        const line = parseInt(card.dataset.benefitLine, 10) || 1;
        let start = 0.2;
        let end = 0.5;
        if (line === 2) {
          start = 0.45;
          end = 0.75;
        } else if (line === 3) {
          start = 0.7;
          end = 1.0;
        }

        const opacity = interpolate(p, start, end, 0, 1);
        const translateY = interpolate(p, start, end, 50, 0);
        const blur = interpolate(p, start, end, 8, 0);
        
        card.style.opacity = opacity;
        card.style.transform = `translateY(${translateY}px)`;
        card.style.filter = `blur(${blur}px)`;
      });
    }
  }

  let ticking = false;
  function handleScroll() {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }

  // ═══ PRICING TABLE ═══
  let activeTab = 'cinematic';

  function renderPricing(tab) {
    const body = document.getElementById('pricingBody');
    if(!body) return;
    const data = pricingData[tab];
    body.innerHTML = data.map((row) => `
      <tr>
        <td>${row.duration}</td>
        <td><span class="price-per">${row.per}</span></td>
        <td><span class="price-bundle">${row.bundles[0].price}</span><span class="price-save">${row.bundles[0].save}</span></td>
        <td><span class="price-bundle">${row.bundles[1].price}</span><span class="price-save">${row.bundles[1].save}</span></td>
        <td><span class="price-bundle">${row.bundles[2].price}</span><span class="price-save">${row.bundles[2].save}</span></td>
      </tr>
    `).join('');
  }

  function initPricingTabs() {
    const tabCinematic = document.getElementById('tabCinematic');
    const tabUgc = document.getElementById('tabUgc');
    const bg = document.getElementById('pricingTabBg');
    if(!tabCinematic || !tabUgc || !bg) return;

    function positionBg(el) {
      bg.style.left = el.offsetLeft + 'px';
      bg.style.width = el.offsetWidth + 'px';
    }

    tabCinematic.addEventListener('click', () => {
      activeTab = 'cinematic';
      tabCinematic.classList.add('active');
      tabUgc.classList.remove('active');
      positionBg(tabCinematic);
      renderPricing('cinematic');
    });

    tabUgc.addEventListener('click', () => {
      activeTab = 'ugc';
      tabUgc.classList.add('active');
      tabCinematic.classList.remove('active');
      positionBg(tabUgc);
      renderPricing('ugc');
    });

    renderPricing('cinematic');
    requestAnimationFrame(() => positionBg(tabCinematic));
    window.addEventListener('resize', () => positionBg(activeTab === 'cinematic' ? tabCinematic : tabUgc));
  }

  // ═══ REVEAL OBSERVER ═══
  function initRevealObserver() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { 
        if (e.isIntersecting) { 
          e.target.classList.add('in-view'); 
          obs.unobserve(e.target); 
        } 
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  }

  // ═══ MOBILE MENU ═══
  function initMobileMenu() {
    if(!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link,.mobile-cta').forEach((l) => {
      l.addEventListener('click', () => { 
        hamburger.classList.remove('active'); 
        mobileMenu.classList.remove('open'); 
        document.body.style.overflow = ''; 
      });
    });
  }

  // ═══ SMOOTH SCROLL ═══
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ═══ INIT ═══
  async function init() {
    // Stars
    initStars();
    drawStars();
    window.addEventListener('resize', () => { 
      starsCanvas.width = window.innerWidth; 
      starsCanvas.height = window.innerHeight; 
      initStars(); 
    });

    // Preload frames
    await preloadImages();
    preloaderText.textContent = 'Ready';
    setTimeout(() => preloader.classList.add('hidden'), 400);

    // Canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    isReady = true;
    drawFrame(0);

    // Scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    onScroll();

    // Init UI
    initRevealObserver();
    initMobileMenu();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
