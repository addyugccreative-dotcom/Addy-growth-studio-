
  // Iframe precise scaling
  function initIframeScaling() {
    const containers = document.querySelectorAll('.browser-viewport');
    
    function scaleIframes() {
      containers.forEach(container => {
        const width = container.clientWidth;
        const scale = width / 1920;
        const iframe = container.querySelector('iframe');
        if (iframe) {
          iframe.style.transform = `scale(${scale})`;
        }
      });
    }

    // Attach onload fading
    containers.forEach(container => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        iframe.onload = () => {
          iframe.style.opacity = '1';
        };
      }
    });

    scaleIframes();
    window.addEventListener('resize', scaleIframes);
  }

/* ══════════════════════════════════════════════
   ADDY GROWTH STUDIO — Premium Script
   ══════════════════════════════════════════════ */
;(function () {
  'use strict';

  // DOM elements
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  const preloaderText = document.getElementById('preloaderText');
  const navbar = document.getElementById('navbar');
  const navProgress = document.getElementById('navProgress');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const starsCanvas = document.getElementById('starsCanvas');
  const starsCtx = starsCanvas ? starsCanvas.getContext('2d') : null;
  const heroArcStage = document.getElementById('heroArcStage');
  const heroArcTrack = document.getElementById('heroArcTrack');
  const scrollIndicator = document.getElementById('scrollIndicator');

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
    if (!starsCanvas || !starsCtx) return;
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
    if (!starsCanvas || !starsCtx) return;
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
      starsCtx.fillStyle = s.r > 1.2 ? `rgba(255,255,255,${Math.max(0.15, a)})` : `rgba(192,132,252,${Math.max(0.1, a)})`;
      starsCtx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  
function initHeroScrollSequence() {
  const sequence = document.querySelector('.hero-scroll-sequence');
  if (!sequence) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const logo = document.querySelector('.hero-logo');
  const boy = document.querySelector('.hero-boy-right');
  const ringSystem = document.querySelector('.hero-ring-system');
  const mobiles = document.querySelectorAll('.hero-mobile-card');
  const macRow = document.querySelector('.hero-mac-row');
  const tagline = document.querySelector('.hero-center-tagline');
  const macs = document.querySelectorAll('.hero-mac-card');
  const leftClouds = document.querySelectorAll('.cloud-scrub-wrapper.left-cloud');
  const rightClouds = document.querySelectorAll('.cloud-scrub-wrapper.right-cloud');
  const scrub1 = document.querySelector('.scrub-line-1');
  const scrub2 = document.querySelector('.scrub-line-2');

  document.querySelectorAll('.hero-scroll-sequence video').forEach(v => {
    v.muted = true; v.loop = true; v.playsInline = true;
    v.play().catch(()=>{});
  });

  const vw = window.innerWidth;
  // Tighter radius
  const radius = vw < 768 ? vw * 0.25 : Math.min(vw * 0.1, 140);
  // Safe padding logic: radius (140) + frame half-width (50) + safe margin (30) = 220px min.
  const anchorLeft = Math.max(vw * 0.15, 230) + 'px';

  // Initial sets (Stage 0)
  gsap.set(logo, { opacity: 0, scale: 0.5, left: '50%', top: '50%', xPercent: -50, yPercent: -50, transformOrigin: 'center center' });
  gsap.set(ringSystem, { left: anchorLeft, top: '50%', xPercent: -50, yPercent: -50 });
  gsap.set(mobiles, { opacity: 0, x: 0, y: 0, xPercent: -50, yPercent: -50, transformOrigin: 'center center' });
  
  // MacBooks invis at load
  gsap.set(macRow, { opacity: 0, y: 50, scale: 0.95 }); 
  
  // Boy invis at load
  gsap.set(boy, { opacity: 0, y: 50 }); 
  
  // Tagline invis at load (Bug 2 fix)
  gsap.set(tagline, { opacity: 0, y: 30 }); 
  
  // Tagline scrub texts set back to 0% (if user refreshed mid-scroll)
  gsap.set([scrub1, scrub2], { backgroundSize: '0% 100%' });

  // Ambient continuous loops for ring (always playing)
  gsap.to(ringSystem, { rotation: 360, duration: 30, repeat: -1, ease: 'none' });
  gsap.to(mobiles, { rotation: -360, duration: 30, repeat: -1, ease: 'none' });

  // 3D Tilt for MacBooks
  const applyTilt = (card, e) => {
    if (window.innerWidth <= 768) return;
    const inner = card.querySelector('.hero-macbook-inner');
    if (!inner) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    inner.style.transition = 'none';
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const resetTilt = (card) => {
    const inner = card.querySelector('.hero-macbook-inner');
    if (!inner) return;
    inner.style.transition = 'transform 0.4s ease-out';
    inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };
  macs.forEach(mac => {
    mac.addEventListener('mousemove', (e) => applyTilt(mac, e));
    mac.addEventListener('mouseleave', () => resetTilt(mac));
  });

  // Main Scrub Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-scroll-sequence',
      start: 'top top',
      end: '+=9000',
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  // Stage 0.5 (Starts immediately on scroll) -> Parting clouds
  tl.addLabel('stage0', 0);
  tl.to(leftClouds, { x: '-25vw', opacity: 0.15, duration: 1.5, ease: 'power1.inOut' }, 'stage0');
  tl.to(rightClouds, { x: '25vw', opacity: 0.15, duration: 1.5, ease: 'power1.inOut' }, 'stage0');
  tl.to('.ambient-sparkles', { opacity: 0.3, duration: 1.5 }, 'stage0');

  // Stage 1 (0.5 -> 2.5) Logo zooms in
  tl.addLabel('stage1', 0.5);
  tl.to(logo, { opacity: 1, scale: 1.5, duration: 2, ease: 'power1.inOut' }, 'stage1');

  // Stage 2 (2.5 -> 4) Logo zooms out & left
  tl.addLabel('stage2', 2.5);
  tl.to(logo, { left: anchorLeft, scale: 0.65, duration: 1.5, ease: 'power2.inOut' }, 'stage2');

  // Stage 3 (4 -> 6) Phones push out into tighter ring
  tl.addLabel('stage3', 4);
  tl.to(mobiles, {
    opacity: 1,
    x: (i) => Math.cos((i / 6) * Math.PI * 2 - Math.PI/2) * radius,
    y: (i) => Math.sin((i / 6) * Math.PI * 2 - Math.PI/2) * radius,
    duration: 2,
    ease: 'power2.out',
    stagger: 0.1
  }, 'stage3');

  // Stage 4 (5.5 -> 7.5) MacBooks fade in
  tl.addLabel('stage4', 5.5);
  tl.to(macRow, { y: 0, opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }, 'stage4');

  // Stage 5 (6.5 -> 8.5) Boy and Tagline appear
  tl.addLabel('stage5', 6.5);
  tl.to(boy, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 'stage5');
  tl.to(tagline, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 'stage5');
  
  // Tagline text fill wipes left-to-right
  tl.to(scrub1, { backgroundSize: '100% 100%', duration: 1.5, ease: 'none' }, 'stage5+=0.5');
  tl.to(scrub2, { backgroundSize: '100% 100%', duration: 1.5, ease: 'none' }, 'stage5+=0.5');

  // Stage 6 (8.5 -> 9.5) Clouds return to ambient
  tl.addLabel('stage6', 8.5);
  tl.to([leftClouds, rightClouds], { x: 0, opacity: 1, duration: 1 }, 'stage6');
  tl.to('.ambient-sparkles', { opacity: 1, duration: 1 }, 'stage6');

  tl.to({}, { duration: 0.5 });
}
// DUMMY PRODUCTS & MODAL
  function getBottleHTML(style, name) {
    const acronym = name.split(' ').map(w => w[0]).join('').substring(0,2);
    return `
      <div class="bottle-3d ${style}">
        <div class="b-face b-front"><div class="b-label">${acronym}</div></div>
        <div class="b-face b-back"></div>
        <div class="b-face b-left"></div>
        <div class="b-face b-right"></div>
        <div class="b-face b-top"></div>
        <div class="b-face b-bottom"></div>
        <div class="b-cap"><div class="b-face b-cap-front"></div></div>
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
        <div class="prod-visual-area">${getBottleHTML(p.style, p.name)}</div>
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
    if (!modal || !modalScene || !modalInfo) return;
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
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

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

  // ═══ SCROLL LOGIC ═══
  let ticking = false;

  
  let lastScrollTop = 0;
  function onScroll() {
    const scrollTop = window.scrollY;
    
    // Smart Header hide/show logic
    const header = document.getElementById('header');
    if (header) {
      if (scrollTop > lastScrollTop && scrollTop > 80) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    if (navProgress && docHeight > 0) {
      const pct = (scrollTop / docHeight) * 100;
      navProgress.style.width = pct + '%';
    }

    // Navbar Scrolled State
    if (navbar) {
      if (scrollTop > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    // Hide scroll indicator as user scrolls down
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - scrollTop / 250);
    }

    // Horizontal Scroll Sections
    document.querySelectorAll('.hscroll-section').forEach(section => {
      const track = section.querySelector('.hscroll-track');
      if (!track) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const vh = window.innerHeight;
      
      let scrollFraction = 0;
      if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight - vh) {
        scrollFraction = (scrollTop - sectionTop) / (sectionHeight - vh);
        const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        track.style.transform = `translate3d(-${scrollFraction * maxScroll}px, 0, 0)`;
      } else if (scrollTop < sectionTop) {
        scrollFraction = 0;
        track.style.transform = `translate3d(0px, 0, 0)`;
      } else {
        scrollFraction = 1;
        const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        track.style.transform = `translate3d(-${maxScroll}px, 0, 0)`;
      }
      
      // Strategy Enhancements
      if (section.dataset.hscroll === 'strategy') {
        const progress = section.querySelector('.strategy-progress-bar');
        if (progress) progress.style.width = (scrollFraction * 100) + '%';
        
        const cards = track.querySelectorAll('.strategy-card');
        const viewportCenter = window.innerWidth / 2;
        
        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          
          if (dist < minDistance) {
            minDistance = dist;
            closestCard = card;
          }
          
          if (rect.right < window.innerWidth * 0.15) {
            card.classList.add('strategy-exit');
          } else {
            card.classList.remove('strategy-exit');
          }
          
          const icon = card.querySelector('.card-icon');
          if (icon && typeof gsap !== 'undefined') {
             const iconOffset = (cardCenter - viewportCenter) * -0.15;
             gsap.set(icon, { x: iconOffset });
          }
        });
        
        if (typeof gsap !== 'undefined') {
          
        cards.forEach(card => {
          const line = parseInt(card.dataset.benefitLine, 10) || 1;
          let start = 0.2 + ((line - 1) * 0.1);
          let end = 0.45 + ((line - 1) * 0.1);
          
          if(end > 1.0) end = 1.0; // clamp just in case
const opacity = interpolate(p, start, end, 0, 1);
        const translateY = interpolate(p, start, end, 50, 0);
        const blur = interpolate(p, start, end, 8, 0);
        
        card.style.opacity = opacity;
        card.style.transform = `translateY(${translateY}px)`;
        card.style.filter = `blur(${blur}px)`;
      });
    }
  }

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ═══ REVEAL ON SCROLL ═══
  function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ═══ MOBILE MENU ═══
  function initMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ═══ SMOOTH SCROLL FOR NAV LINKS ═══
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ─── VIDEO PLAY/PAUSE CONTROLS ───
  function initVideoControls() {
    const video = document.getElementById('hSalonVideo');
    const btn = document.getElementById('videoPlayPause');
    if (!video || !btn) return;

    const iconPause = btn.querySelector('.icon-pause');
    const iconPlay = btn.querySelector('.icon-play');

    function togglePlay(e) {
      e.stopPropagation();
      if (video.paused) {
        video.play();
        if (iconPause) iconPause.style.display = '';
        if (iconPlay) iconPlay.style.display = 'none';
        btn.setAttribute('aria-label', 'Pause video');
      } else {
        video.pause();
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = '';
        btn.setAttribute('aria-label', 'Play video');
      }
    }

    btn.addEventListener('click', togglePlay);

    const videoCard = video.closest('.premium-card-inner.video-card');
    if (videoCard) {
      videoCard.addEventListener('click', function(e) {
        if (e.target === btn || btn.contains(e.target)) return;
        togglePlay(e);
      });
    }
  }

  // ═══ FAST PRELOADER ═══
  function initPreloader() {
    if (!preloader) return;
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      if (preloaderFill) preloaderFill.style.width = Math.min(100, p) + '%';
      if (preloaderText) preloaderText.textContent = `Loading ${Math.min(100, p)}%`;
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          initHeroScrollSequence();
        }, 150);
      }
    }, 25);
  }

  // ═══ INIT ═══
  
  // Mockup 3D Tilt Logic
  function initMockupTilt() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const iphones = document.querySelectorAll('.niche-video-card');
    const macbooks = document.querySelectorAll('.macbook-mockup');
    
    function applyTilt(el, e, maxTilt, targetSelector) {
      if (isTouch) return;
      const target = el.querySelector(targetSelector) || el;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      
      target.style.transition = 'none';
      target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Shadow shift
      if (target.classList.contains('iphone-mockup')) {
         const shadowX = -rotateY * 2;
         const shadowY = rotateX * 2 + 20;
         target.style.boxShadow = `0 0 0 4px #000, 0 0 0 7px #d5d5d5, ${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.2)`;
      }
      
      // Mac brightness
      if (target.classList.contains('macbook-mockup')) {
         const screen = target.querySelector('.macbook-screen');
         if (screen) {
            const brightness = 1 + ((y / rect.height) * 0.1);
            screen.style.filter = `brightness(${brightness})`;
         }
      }
    }
    
    function resetTilt(el, targetSelector) {
      if (isTouch) {
        el.style.transform = 'scale(1)';
        return;
      }
      const target = el.querySelector(targetSelector) || el;
      target.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
      target.style.transform = 'rotateX(0deg) rotateY(0deg)';
      
      if (target.classList.contains('iphone-mockup')) {
         target.style.boxShadow = `0 0 0 4px #000, 0 0 0 7px #d5d5d5, 0 20px 40px rgba(0,0,0,0.15)`;
      }
      if (target.classList.contains('macbook-mockup')) {
         const screen = target.querySelector('.macbook-screen');
         if (screen) screen.style.filter = 'brightness(1)';
      }
    }

    iphones.forEach(card => {
      if (isTouch) {
         card.addEventListener('touchstart', () => { card.style.transform = 'scale(0.95)'; card.style.transition = 'transform 0.2s'; });
         card.addEventListener('touchend', () => { card.style.transform = 'scale(1)'; });
      } else {
         card.addEventListener('mousemove', (e) => applyTilt(card, e, 8, '.iphone-mockup'));
         card.addEventListener('mouseleave', () => resetTilt(card, '.iphone-mockup'));
      }
    });

    macbooks.forEach(card => {
      if (isTouch) {
         card.addEventListener('touchstart', () => { card.style.transform = 'scale(0.95)'; card.style.transition = 'transform 0.2s'; });
         card.addEventListener('touchend', () => { card.style.transform = 'scale(1)'; });
      } else {
         card.addEventListener('mousemove', (e) => applyTilt(card, e, 8, null));
         card.addEventListener('mouseleave', () => resetTilt(card, null));
      }
    });
  }

  function init() {

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isExpanded = item.getAttribute('aria-expanded') === 'true';
      
      // Close all other accordions
      faqItems.forEach(otherItem => {
        otherItem.setAttribute('aria-expanded', 'false');
        const otherAnswer = otherItem.nextElementSibling;
        otherAnswer.style.maxHeight = null;
      });
      
      // Toggle current accordion
      if (!isExpanded) {
        item.setAttribute('aria-expanded', 'true');
        const answer = item.nextElementSibling;
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });


  // Pricing Cards 3D Tilt
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `scale(1.04) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  });


  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('contactFormContainer').style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
    });
  }

    initIframeScaling();
    initMockupTilt();
    initStars();
    drawStars();
    window.addEventListener('resize', initStars);

    // Icon Entrance Observer
    if (typeof IntersectionObserver !== 'undefined' && typeof gsap !== 'undefined') {
      const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const icon = entry.target.querySelector('.card-icon');
            if (icon && !icon.dataset.animated) {
              icon.dataset.animated = 'true';
              gsap.fromTo(icon, 
                { rotationY: 90, opacity: 0 },
                { rotationY: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)', delay: 0.08 }
              );
            }
          }
        });
      }, { threshold: 0.1, rootMargin: '0px' });
      
      document.querySelectorAll('.strategy-card').forEach(card => {
        iconObserver.observe(card);
      });
    }

    // Products & Modal
    renderProducts();
    initProductTabs();

    // Pricing
    initPricingTabs();

    // Scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    onScroll();

    // UI
    initRevealObserver();
    initMobileMenu();
    initSmoothScroll();
    initVideoControls();

    // Preloader and Hero entrance
    initPreloader();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

