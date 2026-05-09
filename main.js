/* ══════════════════════════════════════════════
   ADDY GROWTH STUDIO — Main Script
   ══════════════════════════════════════════════ */
(function () {
  'use strict';

  const TOTAL_FRAMES = 96;
  const FRAME_PATH = '/frames/ezgif-frame-';

  // DOM
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  const heroContainer = document.getElementById('hero-scroll-container');
  const heroOverlay = document.getElementById('heroOverlay');
  const heroContent = document.getElementById('heroContent');
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
      // Movement
      s.x += s.vx;
      s.y += s.vy;
      
      // Wrap around screen
      if (s.x < 0) s.x = starsCanvas.width;
      if (s.x > starsCanvas.width) s.x = 0;
      if (s.y < 0) s.y = starsCanvas.height;
      if (s.y > starsCanvas.height) s.y = 0;

      // Twinkle effect
      const a = s.alpha * (0.3 + 0.7 * Math.sin(time * s.speed + s.flicker));
      starsCtx.beginPath();
      starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starsCtx.fillStyle = `rgba(180,220,255,${Math.max(0.1, a)})`;
      starsCtx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  // ═══ FRAME LOADING ═══
  function getFrameSrc(i) {
    return `${FRAME_PATH}${String(i + 1).padStart(3, '0')}.jpg`;
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

  // ═══ SCROLL HANDLER ═══
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // ── Progress bar ──
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    navProgress.style.width = scrollPct + '%';

    // ── Navbar bg ──
    navbar.classList.toggle('scrolled', scrollTop > 60);

    if (!isReady) return;

    // ── Frame animation ──
    const cTop = heroContainer.offsetTop;
    const cHeight = heroContainer.offsetHeight - window.innerHeight;
    const frac = Math.max(0, Math.min(1, (scrollTop - cTop) / cHeight));
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(frac * TOTAL_FRAMES));

    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      drawFrame(currentFrame);
    }

    // ── Hero Text Sequencing ──
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
        if (el.classList.contains('bottom-center')) {
          transform = `translate(-50%, ${yOffset + parallax}px) scale(${scale})`;
        } else {
          transform = `translate(-50%, calc(-50% + ${yOffset + parallax}px)) scale(${scale})`;
        }
      } else {
        if (el.classList.contains('bottom-center')) {
          transform = `translateX(-50%) translateY(${yOffset + parallax}px) scale(${scale})`;
        } else {
          transform = `translateY(calc(-50% + ${yOffset + parallax}px)) scale(${scale})`;
        }
      }
      
      el.style.opacity = opacity;
      el.style.filter = `blur(${blur}px)`;
      el.style.transform = transform;
    }

    animateText('heroText1', frac, 0.0, 0.35, true, false);
    animateText('heroText2', frac, 0.25, 0.65, false, false);
    animateText('heroText3', frac, 0.55, 0.9, false, false);
    animateText('heroText4', frac, 0.8, 1.0, false, true);

    if (scrollIndicator) scrollIndicator.style.opacity = Math.max(0, 1 - frac * 8);

    // ── Overlay ──
    const ov = frac < 0.5 ? 0.3 + frac * 0.6 : 0.6 - (frac - 0.5) * 0.4;
    heroOverlay.style.background = `radial-gradient(ellipse at center,rgba(5,5,8,${ov * 0.5}) 0%,rgba(5,5,8,${ov}) 60%,rgba(5,5,8,${ov + 0.1}) 100%)`;

    // ── Horizontal Scroll Sections ──
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
  }

  let ticking = false;
  function handleScroll() {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }

  // ═══ PRICING TABLE ═══
  let activeTab = 'cinematic';

  function renderPricing(tab) {
    const body = document.getElementById('pricingBody');
    const data = pricingData[tab];
    body.innerHTML = data.map((row, i) => `
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

    // Initial
    renderPricing('cinematic');
    requestAnimationFrame(() => positionBg(tabCinematic));
    window.addEventListener('resize', () => positionBg(activeTab === 'cinematic' ? tabCinematic : tabUgc));
  }

  // ═══ REVEAL OBSERVER ═══
  function initRevealObserver() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  }

  // ═══ MOBILE MENU ═══
  function initMobileMenu() {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link,.mobile-cta').forEach((l) => {
      l.addEventListener('click', () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('open'); document.body.style.overflow = ''; });
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

  // ═══ CARD TILT ═══
  function initCardHover() {
    document.querySelectorAll('.strategy-card,.testimonial-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4;
        const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // ═══ CURSOR GLOW ═══
  function initCursorGlow() {
    const g = document.createElement('div');
    g.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(77,208,225,.06) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:opacity .3s;opacity:0;';
    document.body.appendChild(g);
    let v = false;
    document.addEventListener('mousemove', (e) => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; if (!v) { g.style.opacity = '1'; v = true; } });
    document.addEventListener('mouseleave', () => { g.style.opacity = '0'; v = false; });
  }

  // ═══ INIT ═══
  async function init() {
    // Stars
    initStars();
    drawStars();
    window.addEventListener('resize', () => { starsCanvas.width = window.innerWidth; starsCanvas.height = window.innerHeight; initStars(); });

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

    // Features
    initRevealObserver();
    initMobileMenu();
    initSmoothScroll();
    initCardHover();
    initCursorGlow();
    initPricingTabs();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
