import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform } from 'motion/react';
import Spline from '@splinetool/react-spline';
import confetti from 'canvas-confetti';
import { 
  Zap, FileText, Users, Scissors, Cpu, BarChart3, Target, Clock, 
  ChevronRight, CheckCircle2, ArrowRight, Instagram, 
  Mail, MessageSquare, Menu, X, ArrowLeft, Maximize, ChevronDown,
  Star, Sparkles, ExternalLink, Check, Plus, Play
} from 'lucide-react';
import { PORTFOLIO_NICHES, FEATURE_BLOCKS, PRICING_PLANS, TESTIMONIALS } from './constants';
import { PortfolioNiche } from './types';

const ButtonSparkle = () => (
  <div className="button-sparkle-container">
    <div className="sparkle-particle animate-sparkle-move" />
    <div className="sparkle-particle animate-sparkle-move" style={{ animationDelay: '1.5s' }} />
  </div>
);

const ShopifyIcon = ({ className }: { className?: string }) => (
  <img 
    src="https://cdn.worldvectorlogo.com/logos/shopify.svg" 
    alt="Shopify" 
    className={className}
    referrerPolicy="no-referrer"
  />
);

const ShopifyBlur = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 left-1/4 w-[60%] h-[60%] bg-[#96bf48]/20 blur-[120px] rounded-full"
    />
  </div>
);

import { useCurrency, CurrencyCode, Currency } from './hooks/useCurrency';
import CurrencySwitcher from './components/CurrencySwitcher';

const Navbar = memo(({ onNavigate, onStartProject, activeSection }: { 
  onNavigate: (view: 'home' | 'about' | string, shouldScrollToTop?: boolean) => void, 
  onStartProject: () => void,
  activeSection?: string
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', id: 'work' },
    { name: 'Pricing', id: 'services' },
    { name: 'Protocol', id: 'protocol' },
    { name: 'About', id: 'about' }
  ];

  const handleNavClick = (item: { name: string, id: string }) => {
    if (item.id === 'about') {
      onNavigate('about');
    } else {
      onNavigate('home', false);
      // Small delay to ensure we are on home before scrolling
      setTimeout(() => {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = `#${item.id}`;
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-brand-teal/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="text-2xl font-display font-bold cursor-pointer flex items-center gap-3"
          onClick={() => {
            onNavigate('home', true);
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Cpu size={24} className="text-brand-dark" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-white text-lg leading-tight italic">Addy</span>
            <span className="text-brand-teal text-[10px] uppercase tracking-widest font-black">Growth Studio</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item)}
              className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
                activeSection === item.id 
                  ? 'text-brand-teal' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-teal rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          
          <button 
            onClick={onStartProject}
            className="px-8 py-3 rounded-full bg-brand-teal text-brand-dark font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Start Project
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item)}
                className={`text-lg font-medium text-left transition-colors ${
                  activeSection === item.id ? 'text-brand-teal' : 'text-white/70'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartProject();
              }}
              className="relative w-full py-4 rounded-xl bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white font-bold text-center overflow-hidden"
            >
              <ButtonSparkle />
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

const Hero = memo(({ onStartProject }: { onStartProject: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden optimize-gpu">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-left order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-brand-teal text-[10px] font-black uppercase tracking-[0.2em]">Skincare Specialist</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Premium Cinematic <br />
              & UGC Ads for <br />
              <span className="gradient-text drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Skincare</span> Brands.
            </h1>
            
            <p className="text-base md:text-xl font-display font-medium text-white/50 max-w-xl mb-10 leading-relaxed">
              At <span className="text-white">Addy Growth Studio</span>, we engineer high-converting skincare ads and performance-driven websites that turn attention into revenue.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={onStartProject}
                className="w-full sm:w-auto px-10 py-5 rounded-xl bg-brand-teal text-brand-dark font-black text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all text-center uppercase tracking-widest"
              >
                Launch Project
              </button>
              <a 
                href="#work" 
                className="w-full sm:w-auto px-10 py-5 rounded-xl border border-white/10 bg-white/5 text-white font-black text-lg hover:bg-white/10 hover:border-white/20 transition-all text-center uppercase tracking-widest"
              >
                View Work
              </a>
            </div>
          </motion.div>

          <motion.div 
            style={{ 
              y: scrollY, 
              opacity, 
              scale,
              translateX: mousePosition.x,
              translateY: mousePosition.y
            }}
            className="relative z-0 order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[300px] md:max-w-[450px] aspect-square rounded-full">
              <div className="absolute inset-0 bg-brand-teal/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative w-full h-full">
                <Spline scene="https://prod.spline.design/j9pRqjdNekwaWXIs/scene.splinecode" className="w-full h-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

const WhyMyCreativesWork = memo(() => {
  const points = [
    { text: "Hook-first structure", highlight: "(strong first 3 seconds)" },
    { text: "Built for", highlight: "Meta & TikTok ad placements" },
    { text: "Multiple testing angles", highlight: "(problem, benefit, testimonial)" },
    { text: "Captions optimized", highlight: "for scroll retention" },
    { text: "Ad-ready", highlight: "export format" }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-teal/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[100px] rounded-full" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-teal font-bold uppercase tracking-widest text-xs mb-4 block"
          >
            Why These Creatives Perform
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Why My <span className="gradient-text">Creatives Work</span>
          </h2>
          <p className="text-lg md:text-xl font-display font-medium text-white/90 mb-10 leading-relaxed">
            I don't just make videos; I engineer <span className="text-brand-purple font-bold">performance assets</span>. Every second is calculated to <span className="text-brand-teal font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">stop the scroll</span> and drive action.
          </p>
          <div className="space-y-4">
            {points.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal shrink-0 group-hover:bg-brand-teal group-hover:text-brand-dark transition-all duration-300">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-base text-white/80 group-hover:text-white transition-colors">
                  {point.text} <span className="text-brand-teal font-medium">{point.highlight}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative lg:pl-12"
        >
          <div className="aspect-[4/3] max-w-sm mx-auto rounded-[32px] bg-brand-dark/40 border border-white/10 flex items-center justify-center overflow-hidden group backdrop-blur-xl relative shadow-[0_0_50px_-12px_rgba(0,229,255,0.2)]">
            {/* Rotating Glow Background */}
            <div className="absolute inset-[-50%] rotating-glow animate-spin-slow opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-3xl" />
            
            {/* Sparkle effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-brand-teal rounded-full animate-ping opacity-60" />
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-brand-purple rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-brand-teal rounded-full animate-ping opacity-60" style={{ animationDelay: '1.2s' }} />
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-70" />
              <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-brand-teal rounded-full animate-ping opacity-40" style={{ animationDelay: '0.8s' }} />
              <ButtonSparkle />
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-brand-teal/10 via-transparent to-brand-purple/10 opacity-40" />
            
            <div className="relative z-10 text-center p-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="text-5xl md:text-6xl font-display font-bold mb-3 gradient-text drop-shadow-[0_0_30px_rgba(0,229,255,0.6)]"
              >
                <Counter value={93} suffix="%" />
              </motion.div>
              <p className="text-lg font-bold text-brand-teal mb-1 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">Average Retention Increase</p>
              <p className="text-[10px] text-brand-teal/50 uppercase tracking-[0.2em] font-black">Based on client data</p>
            </div>

            {/* Decorative elements with enhanced blur */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-teal/20 blur-[60px] rounded-full animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-purple/20 blur-[80px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const PositioningStrip = memo(() => (
  <section className="py-20 bg-white/5 border-y border-white/10 optimize-gpu">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          More Than Just Content. <span className="gradient-text">It's Strategy.</span>
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <p className="text-base md:text-xl font-display font-medium text-white/90 leading-relaxed">
          At <span className="text-brand-teal font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">Addy Growth Studio</span>, we specialize in <span className="text-brand-teal font-bold">high-converting cinematic skincare ads</span> and high-performance websites built for niche beauty brands. Every asset is engineered with <span className="text-brand-purple font-bold">performance psychology</span>, aesthetic hooks, and platform-native storytelling to <span className="text-brand-blue font-bold">maximize ROAS</span>.
        </p>
      </motion.div>
    </div>
  </section>
));

const PortfolioGrid = memo(({ onExpandVideo }: { onExpandVideo: (video: {url: string, title: string}) => void }) => (
  <section id="work" className="py-24 max-w-7xl mx-auto px-6 mb-24 optimize-gpu">
    <div className="mb-24 text-center">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-brand-teal font-black uppercase tracking-[0.3em] text-[10px] mb-4"
      >
        Showcase
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-display font-bold mb-6 italic"
      >
        Strategy in <span className="gradient-text">Motion.</span>
      </motion.h2>
    </div>

    {PORTFOLIO_NICHES.map((niche, sectIdx) => (
      <div key={niche.id} className="mb-24 last:mb-0">
        <div className="mb-8 md:mb-16">
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-4xl font-display font-bold mb-2 md:mb-4"
          >
            {niche.category}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-white/50 max-w-xl leading-relaxed"
          >
            {niche.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-7xl mx-auto">
          {niche.videos.map((video, vidIdx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: vidIdx * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => onExpandVideo({ url: video.videoUrl, title: video.title })}
            >
              <div className="relative aspect-[9/16] rounded-xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all duration-500">
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 scale-75 md:scale-90 group-hover:scale-100">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)]">
                    <Play size={24} className="text-brand-dark ml-0.5 md:ml-1 md:w-8 md:h-8" fill="currentColor" />
                  </div>
                </div>
                <div className="w-full h-full">
                  <VideoPlayer url={video.videoUrl} title={video.title} />
                </div>
                <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 z-20 pointer-events-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <p className="text-[#D4AF37] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1">{niche.title}</p>
                   <h4 className="text-white text-xs md:text-xl font-display font-bold">{video.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ))}
  </section>
));

const VideoPlayer = memo(({ url, title, onExpand }: { url: string, title: string, onExpand?: (video: {url: string, title: string}) => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const getYoutubeId = (url: string) => {
    if (!url || url === '#') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(url);

  useEffect(() => {
    if (!videoId) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '600px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div ref={containerRef} className="w-full relative group" style={{ paddingTop: '177.77%' }}>
      {onExpand && (
        <button 
          onClick={() => onExpand({ url, title })}
          className="absolute top-3 right-3 z-30 p-2 bg-brand-teal/20 backdrop-blur-md rounded-full border border-brand-teal/30 text-brand-teal hover:bg-brand-teal hover:text-brand-dark transition-all shadow-lg"
          title="Expand Video"
        >
          <Maximize size={16} />
        </button>
      )}
      {!isLoaded ? (
        <div className="absolute inset-0 bg-brand-dark/50 flex items-center justify-center rounded-2xl overflow-hidden">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="lazy"
            decoding="async"
          />
          <div className="animate-pulse w-12 h-12 bg-brand-teal/20 rounded-full" />
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&fs=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&widget_referrer=${encodeURIComponent(window.location.href)}`}
          className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl shadow-2xl z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="lazy"
          title={title}
        />
      )}
    </div>
  );
});

const VideoModal = memo(({ video, onClose }: { video: {url: string, title: string}, onClose: () => void }) => {
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(video.url);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 md:p-8 optimize-gpu"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X size={24} />
      </button>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-[450px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&fs=1&playsinline=0`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            title={video.title}
          />
        )}
      </motion.div>
    </motion.div>
  );
});

const NicheDetail = memo(({ niche, onBack, onExpandVideo }: { niche: PortfolioNiche, onBack: () => void, onExpandVideo: (video: {url: string, title: string}) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20 }}
      variants={containerVariants}
      className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto"
    >
      <motion.button 
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-brand-teal transition-colors mb-12 group text-sm font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Portfolio
      </motion.button>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <motion.div variants={itemVariants}>
          <span className="gradient-text font-bold uppercase tracking-widest text-xs mb-4 block">{niche.category}</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">{niche.title}</h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
            {niche.description.split(' ').map((word, i) => (
              <span key={i} className={i % 5 === 0 ? 'text-white font-medium' : ''}>
                {word}{' '}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Performance Tested', color: 'brand-teal' },
              { label: 'UGC Strategy', color: 'brand-blue' },
              { label: 'Direct Response', color: 'brand-purple' }
            ].map(tag => (
              <span key={tag.label} className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:border-${tag.color}/30 transition-colors flex items-center gap-2`}>
                <div className={`w-1 h-1 rounded-full bg-${tag.color}`} />
                {tag.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 md:gap-4 optimize-gpu">
          {niche.videos.slice(0, 12).map((video, idx) => (
            <motion.div 
              key={video.id} 
              whileHover={{ y: -5 }}
              className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl optimize-gpu group"
            >
              <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white/90 uppercase tracking-wider pointer-events-none">
                Video {idx + 1}
              </div>
              <VideoPlayer url={video.videoUrl} title={video.title} onExpand={onExpandVideo} />
              <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="p-10 md:p-16 rounded-[40px] bg-linear-to-br from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-r from-brand-teal/5 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-8 relative z-10">Ready to scale your <span className="gradient-text">{niche.title.toLowerCase()}</span> brand?</h2>
        <a 
          href="https://wa.me/qr/ALMKIEKM6SOGO1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block relative z-10 px-10 py-5 rounded-full bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white font-bold glow-purple hover:scale-105 transition-transform text-sm md:text-base"
        >
          Book Strategy Call
        </a>
      </motion.div>
    </motion.div>
  );
});

const ScienceSection = memo(() => {
  const icons: Record<string, any> = { Zap, FileText, Users, Scissors, Cpu, BarChart3, Target, Clock };
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  
  return (
    <section id="process" className="py-24 bg-black/30 optimize-gpu">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">The Science Behind The <span className="text-brand-teal">Scroll</span></h2>
          <p className="text-lg md:text-xl font-display font-medium text-white/90">We combine <span className="text-brand-teal font-bold">performance marketing psychology</span> with platform-native storytelling.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURE_BLOCKS.map((block, idx) => {
            const Icon = icons[block.icon];
            const isExpanded = expandedBlock === block.title;

            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.4, ease: "circOut" }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => setExpandedBlock(isExpanded ? null : block.title)}
                className={`p-5 md:p-6 rounded-2xl glass-card transition-all duration-300 cursor-pointer group flex flex-col items-start relative overflow-hidden optimize-gpu ${
                  isExpanded ? 'ring-2 ring-brand-teal bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isExpanded ? 'bg-brand-teal text-brand-dark' : 'bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-dark'
                }`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-base md:text-lg font-display font-bold mb-2">{block.title}</h3>
                
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.p 
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-white/80 text-[10px] md:text-xs leading-relaxed"
                    >
                      {block.details}
                    </motion.p>
                  ) : (
                    <motion.p 
                      key="desc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white/50 text-[10px] md:text-xs leading-relaxed line-clamp-3"
                    >
                      {block.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-1 text-brand-teal font-bold text-[10px] md:text-xs">
                  {isExpanded ? 'Show Less' : 'Learn More'} <ChevronRight size={12} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const PriceCounter = ({ basePrice, inrPrice, currency }: { basePrice: number, inrPrice: number, currency: Currency }) => {
  const targetValue = currency.code === 'INR' ? inrPrice : basePrice;
  const [displayValue, setDisplayValue] = useState(targetValue);
  const prevValueRef = useRef(targetValue);

  useEffect(() => {
    const controls = animate(prevValueRef.current, targetValue, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    prevValueRef.current = targetValue;
    return () => controls.stop();
  }, [targetValue]);

  return (
    <motion.span
      key={currency.code}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-block"
    >
      {currency.symbol}{displayValue.toLocaleString()}
    </motion.span>
  );
};

const ProvenResults = memo(() => (
  <section className="py-24 optimize-gpu overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Proven <span className="text-brand-blue">Results</span></h2>
      <p className="text-xl md:text-2xl font-display font-medium text-white/90">Strategic creatives that drive <span className="text-brand-teal font-bold">measurable performance growth</span>.</p>
    </div>

    {/* View Full Result Button */}
    <div className="flex justify-center mb-24">
      <motion.a
        href="https://drive.google.com/file/d/1D3V2LUZZj2Yq3rN47icTWNVwRRMEEsD4/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 rounded-full bg-brand-teal text-brand-dark font-bold text-lg flex items-center gap-3 shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)] transition-all"
      >
        View Full Client Result <ExternalLink size={20} />
      </motion.a>
    </div>

    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-linear-to-br from-brand-teal/20 to-transparent border border-brand-teal/30">
          <div className="text-5xl font-display font-bold text-brand-teal mb-2">
            <Counter value={120} suffix="%" />
          </div>
          <div className="text-xl font-bold mb-4">ROAS Increase</div>
          <p className="text-white/70">Average increase in Return on Ad Spend for our long-term partners using our performance-tested framework.</p>
        </div>
        
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <div className="text-5xl font-display font-bold text-brand-blue mb-2">
            <Counter value={15} suffix="M+" />
          </div>
          <div className="text-xl font-bold mb-4">Views Generated</div>
          <p className="text-white/70">Total organic and paid views across client campaigns this year using our creatives.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <div className="text-5xl font-display font-bold text-brand-purple mb-2">
            <Counter value={50} suffix="+" />
          </div>
          <div className="text-xl font-bold mb-4">Brands Scaled</div>
          <p className="text-white/70">Successful partnerships with brands across 12+ different high-converting niches.</p>
        </div>
      </div>
    </div>
  </section>
));

const Testimonials = memo(() => {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden border-y border-white/5 optimize-gpu">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Client <span className="text-brand-purple">Success Stories</span></h2>
        <p className="text-lg md:text-xl font-display font-medium text-white/90">Real results from brands <span className="text-brand-teal font-bold">scaling</span> with our performance creatives.</p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 px-6 optimize-gpu"
            style={{ willChange: 'transform' }}
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
              <div 
                key={`${testimonial.id}-${idx}`} 
                className="w-[300px] md:w-[400px] p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between shrink-0 hover:bg-white/10 transition-colors group optimize-gpu"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-teal text-brand-teal" />
                    ))}
                  </div>
                  <p className="text-white/80 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-brand-teal/30"
                    />
                    <div>
                      <div className="text-sm font-bold">{testimonial.name}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{testimonial.role} @ {testimonial.company}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[10px] font-bold">
                    {testimonial.stats}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});


const ProcessSteps = memo(() => (
  <section className="py-24 bg-black/30 overflow-hidden optimize-gpu">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">How We Build <span className="text-brand-teal">Winners</span></h2>
        <p className="text-lg md:text-xl font-display font-medium text-white/90 mt-4">Our <span className="text-brand-purple font-bold">performance-driven</span> process for scaling DTC brands.</p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-teal/30 to-transparent" />
        
        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {[
            { num: '01', title: 'Discovery Call', desc: 'We analyze your product, audience psychology, and performance goals.' },
            { num: '02', title: 'Strategy & Script', desc: 'We build scroll-stopping hooks, angles, and conversion-focused scripts.' },
            { num: '03', title: 'Production & Launch', desc: 'We produce, edit, test, and deliver creatives optimized for scaling.' }
          ].map((step, idx) => (
            <motion.div 
              key={step.num} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "circOut" }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-brand-dark border-2 border-brand-teal/30 flex items-center justify-center mx-auto mb-8 relative">
                <span className="text-2xl font-display font-bold gradient-text">{step.num}</span>
                <div className="absolute inset-0 rounded-full glow-teal opacity-50" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

const SparklingTick = memo(({ className }: { className?: string }) => (
  <div className={`relative w-20 h-20 flex items-center justify-center ${className || ''}`}>
    {/* Rotating Glow Ring */}
    <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-teal/30 animate-rotate-glow" />
    
    {/* Pulsing Background */}
    <motion.div 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-2 bg-brand-teal/20 rounded-full blur-xl" 
    />
    
    {/* Sparkles */}
    {[...Array(6)].map((_, i) => (
      <div 
        key={i}
        className="absolute animate-sparkle"
        style={{
          top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
          left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
          animationDelay: `${i * 0.2}s`
        }}
      >
        <Sparkles size={12} className="text-brand-teal fill-brand-teal" />
      </div>
    ))}
    
    {/* Main Tick */}
    <div className="relative z-10 w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.5)]">
      <CheckCircle2 size={32} className="text-brand-dark" />
    </div>
  </div>
));

const fireConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

const ProjectForm = memo(({ onBack }: { onBack: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    niche: '',
    details: '',
    serviceType: 'Cinematic Product Video',
    duration: '15 Seconds',
    videoCount: '1'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    try {
      await fetch('https://formspree.io/f/xpqjkazv', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      setStatus('success');
      fireConfetti();
      window.scrollTo(0, 0);
    } catch (e) {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/5 border border-brand-teal/30 p-12 rounded-[40px] text-center backdrop-blur-xl">
          <SparklingTick className="mx-auto mb-8" />
          <h2 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">Growth Await!</h2>
          <p className="text-white/60 mb-8 leading-relaxed">We've received your brief. Our team will analyze your brand and reach out within 24 hours.</p>
          <button onClick={onBack} className="w-full py-4 rounded-2xl bg-brand-teal text-brand-dark font-black uppercase tracking-widest hover:scale-105 transition-transform">Back Home</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group uppercase text-[10px] font-black tracking-[0.3em]"><ArrowLeft size={16} /> Return to Home</button>
      <div className="mb-16"><h1 className="text-4xl md:text-7xl font-display font-bold mb-4 tracking-tighter">Start Your <span className="text-brand-teal">Project</span></h1><p className="text-lg text-white/50 font-display">Tell us about your brand and let's engineer something iconic.</p></div>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[40px] backdrop-blur-3xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
            <input required name="name" type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-teal outline-hidden transition-all text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
          <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Work Email</label>
            <input required name="email" type="email" placeholder="john@brand.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-teal outline-hidden transition-all text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Video Technique</label>
            <select name="video_type" className="w-full bg-brand-dark border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-teal outline-hidden appearance-none cursor-pointer text-white" value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
              <option value="Cinematic Product Video">Cinematic Product Video</option>
              <option value="UGC Testimonial Video">UGC Testimonial Video</option>
            </select></div>
          <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Target Duration</label>
            <select name="duration" className="w-full bg-brand-dark border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-teal outline-hidden appearance-none cursor-pointer text-white" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}>
              <option value="15 Seconds">15 Seconds</option>
              <option value="20-25 Seconds">20-25 Seconds</option>
              <option value="30 Seconds">30 Seconds</option>
            </select></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Bulk Quantity</label>
            <select name="quantity" className="w-full bg-brand-dark border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-teal outline-hidden appearance-none cursor-pointer text-white" value={formData.videoCount} onChange={e => setFormData({...formData, videoCount: e.target.value})}>
              <option value="1">1 Creative</option>
              <option value="3">3 Creatives (Bundled)</option>
              <option value="5">5 Creatives (Growth Pack)</option>
              <option value="10">10 Creatives (Dominance Pack)</option>
            </select></div>
          <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Brand Niche</label>
            <input required name="brand_niche" type="text" placeholder="e.g. Beauty, Fitness" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-teal outline-hidden transition-all text-white" value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} /></div>
        </div>
        <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Project Details</label>
          <textarea required name="details" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-teal outline-hidden transition-all text-white" placeholder="Goals, target audience, etc." value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} /></div>
        <button type="submit" disabled={status === 'submitting'} className="w-full py-6 rounded-2xl bg-brand-teal text-brand-dark font-black text-xl uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-50">
          {status === 'submitting' ? 'Processing...' : <>Launch Project <Zap size={24} /></>}
        </button>
      </form>
    </motion.div>
  );
});

const Pricing = memo(({ onStartProject }: { 
  onStartProject: (plan?: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<'cinematic' | 'ugc'>('cinematic');

  const cinematicPricing = [
    { duration: '15 Seconds', prices: { '1': 60, '3': 170, '5': 290, '10': 540 }, savings: { '3': 10, '5': 10, '10': 60 } },
    { duration: '20-25 Seconds', prices: { '1': 75, '3': 210, '5': 360, '10': 690 }, savings: { '3': 15, '5': 15, '10': 60 } },
    { duration: '30 Seconds', prices: { '1': 90, '3': 255, '5': 435, '10': 840 }, savings: { '3': 15, '5': 15, '10': 60 } },
  ];

  const ugcPricing = [
    { duration: '15 Seconds', prices: { '1': 45, '3': 125, '5': 210, '10': 400 }, savings: { '3': 10, '5': 15, '10': 50 } },
    { duration: '20-25 Seconds', prices: { '1': 60, '3': 170, '5': 285, '10': 550 }, savings: { '3': 10, '5': 15, '10': 50 } },
    { duration: '30 Seconds', prices: { '1': 75, '3': 210, '5': 360, '10': 700 }, savings: { '3': 15, '5': 15, '10': 50 } },
  ];

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 overflow-hidden optimize-gpu">
      <div className="text-center mb-16">
        <span className="text-brand-teal text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-4 block">Service Pricing Guide</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Scalable <span className="text-brand-teal">Creative</span> Solutions</h2>
        <p className="text-lg md:text-xl font-display font-medium text-white/50">Premium visual assets tailored for growth-focused brands.</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex gap-1">
          <button 
            onClick={() => setActiveTab('cinematic')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'cinematic' ? 'bg-brand-teal text-brand-dark shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            Cinematic Product Videos
          </button>
          <button 
            onClick={() => setActiveTab('ugc')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ugc' ? 'bg-brand-teal text-brand-dark shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            UGC Testimonial Videos
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 bg-white/10 p-3 border-b border-white/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Qty</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 text-center">15s</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 text-center">20-25s</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 text-center">30s</div>
          </div>
          {[1, 3, 5, 10].map((qty) => (
            <div key={qty} className="grid grid-cols-4 p-3 border-b border-white/5 last:border-0 items-center">
              <div className="text-xs font-black text-brand-teal">{qty} {qty === 1 ? 'Vid' : 'Vids'}</div>
              {(activeTab === 'cinematic' ? cinematicPricing : ugcPricing).map((item) => (
                <div key={item.duration} className="text-[11px] font-bold text-white text-center">
                  ${item.prices[qty as unknown as keyof typeof item.prices]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/30 mt-4 text-center italic">*All prices in USD. Content usage rights included.</p>
      </div>

      <div className="hidden md:block overflow-x-auto pb-4 scrollbar-hide">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-6 px-4 text-left text-[10px] uppercase tracking-widest text-white/40 font-black">Duration</th>
              <th className="py-6 px-4 text-center text-[10px] uppercase tracking-widest text-white/40 font-black">Per Video</th>
              <th className="py-6 px-4 text-center text-[10px] uppercase tracking-widest text-white/40 font-black">3 Videos</th>
              <th className="py-6 px-4 text-center text-[10px] uppercase tracking-widest text-white/40 font-black">5 Videos</th>
              <th className="py-6 px-4 text-center text-[10px] uppercase tracking-widest text-white/40 font-black">10 Videos</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'cinematic' ? cinematicPricing : ugcPricing).map((item, idx) => (
              <tr key={idx} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                <td className="py-8 px-4 font-display font-bold text-lg text-white/90">{item.duration}</td>
                <td className="py-8 px-4 text-center">
                  <div className="text-2xl font-display font-black text-white">${item.prices['1']}</div>
                </td>
                <td className="py-8 px-4 text-center">
                  <div className="text-2xl font-display font-black text-brand-teal">${item.prices['3']}</div>
                  <div className="text-[10px] text-brand-teal/60 font-bold uppercase tracking-wider mt-1">(save ${item.savings['3']})</div>
                </td>
                <td className="py-8 px-4 text-center">
                  <div className="text-2xl font-display font-black text-brand-teal">${item.prices['5']}</div>
                  <div className="text-[10px] text-brand-teal/60 font-bold uppercase tracking-wider mt-1">(save ${item.savings['5']})</div>
                </td>
                <td className="py-8 px-4 text-center">
                  <div className="text-2xl font-display font-black text-brand-teal">${item.prices['10']}</div>
                  <div className="text-[10px] text-brand-teal/60 font-bold uppercase tracking-wider mt-1">(save ${item.savings['10']})</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-[28px] text-center group hover:border-brand-teal/30 transition-all">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Additional revisions</div>
          <div className="text-2xl font-display font-bold text-brand-teal">$20/video</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-[28px] text-center group hover:border-brand-teal/30 transition-all">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Rush delivery (48hrs)</div>
          <div className="text-2xl font-display font-bold text-brand-teal">+20%</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-[28px] text-center group hover:border-brand-teal/30 transition-all">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Paid ad usage rights</div>
          <div className="text-2xl font-display font-bold text-brand-teal">+30%</div>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/10">
        <div className="flex flex-wrap gap-4 text-xs text-white/40 font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> Up to 2 revision rounds</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> Watermarked previews</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> Final delivery in MP4</span>
        </div>
        <button 
          onClick={() => onStartProject()}
          className="px-10 py-5 rounded-2xl bg-brand-teal text-brand-dark font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
        >
          Start Your Project Now
        </button>
      </div>
    </section>
  );
});

const FAQItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="mb-4"
    >
      <div 
        className={`
          rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
          ${isOpen ? 'bg-white/10 border-brand-teal/30 shadow-[0_0_20px_rgba(0,229,255,0.1)]' : 'bg-white/5 border-white/10 hover:border-brand-teal/20'}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-6 flex items-center justify-between gap-4">
          <h3 className="text-base font-bold text-white/90 group-hover:text-brand-teal transition-colors">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'bg-brand-teal text-brand-dark' : 'bg-white/10 text-white/60'}`}
          >
            <Plus size={20} />
          </motion.div>
        </div>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProjectProtocol = memo(() => {
  const protocols = [
    {
      title: "Before Project Starts",
      items: [
        "Confirm video count, duration & type",
        "Client shares product details & brief",
        "Reference videos or examples shared",
        "Written script or bullet points provided",
        "50% deposit paid upfront",
        "Brief approved before production begins"
      ]
    },
    {
      title: "During Production",
      items: [
        "Watermarked preview shared via Drive",
        "Client reviews and gives feedback",
        "Up to 2 revision rounds per video",
        "Changes outside brief = extra (+25% fee)",
        "7-day standard delivery turnaround",
        "Rush delivery available for scale"
      ]
    },
    {
      title: "Delivery & Close",
      items: [
        "Final 50% payment before file release",
        "Final video sent without watermark",
        "Client confirms satisfaction in writing",
        "File stored 30 days after delivery",
        "Portfolio use with client permission",
        "Testimonial / review appreciated"
      ]
    },
    {
      title: "Revision Policy",
      items: [
        "2 revision rounds included per video",
        "Each extra revision = $20 per video",
        "Changes after brief approval = extra",
        "No full refund after production starts",
        "50% refund if cancelled before preview",
        "AI-generated — realistic not 100% real"
      ]
    }
  ];

  return (
    <section id="protocol" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Project <span className="text-brand-teal">Protocol</span></h2>
          <p className="text-lg md:text-xl font-display font-medium text-white/50 tracking-wide uppercase text-sm">What to expect when working with Addy Growth Studio</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {protocols.map((protocol, idx) => (
            <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-[32px] p-4 md:p-8 hover:border-brand-teal/30 transition-all group overflow-hidden">
              <div className="text-[8px] md:text-[10px] font-black text-brand-teal/40 uppercase mb-2 md:mb-4 tracking-widest">Protocol 0{idx + 1}</div>
              <h3 className="text-brand-teal font-display font-bold text-xs md:text-lg mb-4 md:mb-6 uppercase tracking-widest leading-tight">{protocol.title}</h3>
              <ul className="space-y-2 md:space-y-4">
                {protocol.items.map((item, i) => (
                  <li key={i} className="flex gap-2 md:gap-3 text-[9px] md:text-sm text-white/50 leading-relaxed font-medium">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-teal mt-1.5 md:mt-2 shrink-0 opacity-40" />
                    <span className="line-clamp-2 md:line-clamp-none">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-[32px] bg-brand-teal/5 border border-brand-teal/20 text-center">
          <p className="text-brand-teal text-sm font-bold uppercase tracking-[0.2em]">
            Payment Terms: 50% upfront before production · 50% on final delivery · 7-day turnaround per video
          </p>
        </div>
      </div>
    </section>
  );
});

const FAQSection = memo(() => {
  const faqs = [
    {
      question: "When does work begin?",
      answer: "Work begins after payment confirmation and once final project details are received."
    },
    {
      question: "How many revisions are included?",
      answer: "Each creative includes 1–2 minor revisions. Major concept or structural changes may require additional charges."
    },
    {
      question: "Do you manage ads?",
      answer: "No. Addy Growth Studio focuses exclusively on performance-driven creative production. Ad management is not included."
    },
    {
      question: "What is the turnaround time?",
      answer: "Standard delivery time is 3–4 business days per creative, depending on scope and complexity."
    }
  ];

  return (
    <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Frequently Asked <span className="text-brand-teal drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold"
          >
            Everything you need to know before starting a <span className="text-brand-teal">creative project</span>.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

const BigCTA = memo(({ onStartProject }: { onStartProject: () => void }) => (
  <section className="py-16 md:py-24 px-6 optimize-gpu">
    <div className="max-w-5xl mx-auto p-8 md:p-16 rounded-[40px] md:rounded-[60px] bg-linear-to-br from-brand-teal/20 via-brand-blue/20 to-brand-purple/20 border border-white/10 text-center relative overflow-hidden optimize-gpu">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1),transparent_70%)]" />
      <div className="relative z-10">
        <h2 className="text-2xl md:text-5xl font-display font-bold mb-4 md:mb-6 leading-tight">
          Ready to Scale With <span className="gradient-text">Scroll-Stopping</span> Creative?
        </h2>
        <p className="text-lg md:text-2xl font-display font-medium text-white/90 mb-8 md:mb-12">Book your strategy call and let’s build <span className="text-brand-teal font-bold">ads that convert</span>.</p>
        <a 
          href="https://wa.me/qr/ALMKIEKM6SOGO1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative px-8 py-4 md:px-12 md:py-6 rounded-full bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white text-base md:text-xl font-bold glow-purple hover:scale-105 transition-transform flex items-center gap-3 mx-auto w-fit overflow-hidden"
        >
          <ButtonSparkle />
          Book Your Strategy Call Now <ArrowRight />
        </a>
      </div>
    </div>
  </section>
));

const ContactSection = memo(() => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/xpqjkazv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        fireConfetti();
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let’s Build Your Next <span className="text-brand-teal">Winning Creative</span>.</h2>
        <p className="text-lg md:text-xl font-display font-medium text-white/90 leading-relaxed mb-12">
          We help <span className="text-brand-purple font-bold">modern e-commerce brands</span> scale with <span className="text-brand-teal font-bold">performance-driven creatives</span> engineered for conversions, authority, and growth.
        </p>
        
        <div className="space-y-8">
          {[
            { icon: Mail, label: 'Email Us', value: 'addyugccreative@gmail.com', href: 'mailto:addyugccreative@gmail.com' },
            { icon: Instagram, label: 'Instagram', value: '@addy_ugc_creative_', href: 'https://www.instagram.com/addy_ugc_creative_?igsh=MWVlNnVnaGlxZmlxMw==' },
            { icon: MessageSquare, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/qr/ALMKIEKM6SOGO1' }
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-dark transition-all">
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 font-bold uppercase tracking-widest">{item.label}</p>
                <p className="text-lg font-medium group-hover:text-brand-teal transition-colors">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-10 rounded-[32px] md:rounded-[40px] glass-card border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-brand-teal/5 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {status === 'success' ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 relative z-10">
            <div className="flex justify-center mb-4">
              <SparklingTick />
            </div>
            <h3 className="text-2xl font-display font-bold">Message Sent!</h3>
            <p className="text-white/60">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-brand-teal font-bold hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="space-y-4 md:space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest">Name</label>
                <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-hidden transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest">Email</label>
                <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-hidden transition-all" placeholder="john@brand.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest">Brand Name</label>
                <input name="brand" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-hidden transition-all" placeholder="Your Brand" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest">Project Budget</label>
                <div className="relative">
                  <select name="budget" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-hidden transition-all appearance-none cursor-pointer">
                    <option value="500">$500 - $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k+">$10,000+</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest">Select Service</label>
              <div className="relative">
                <select name="service" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-hidden transition-all appearance-none cursor-pointer">
                  <option value="UGC Ads">UGC Ads</option>
                  <option value="Commercial Ads">Commercial Ads</option>
                  <option value="Full Strategy">Full Strategy</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest">Message</label>
              <textarea name="contact_message" rows={3} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 outline-hidden transition-all resize-none" placeholder="Tell us about your goals..." />
            </div>
            <button 
              disabled={status === 'submitting'}
              className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-brand-teal text-brand-dark font-black text-base md:text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
            >
              {status === 'submitting' ? 'Engineering...' : 'Start Your Project'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest text-center mt-4">Something went wrong. Email us directly at <a href="mailto:hello@addygrowth.studio" className="underline hover:text-white transition-colors">hello@addygrowth.studio</a></p>
            )}
          </form>
        )}
      </div>
    </section>
  );
});

const AboutPage = memo(({ onBack }: { onBack: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20 }}
      variants={containerVariants}
      className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <motion.button 
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-brand-teal transition-colors mb-12 group text-sm font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </motion.button>

      <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-display font-bold mb-8 gradient-text">About Addy Growth Studio</motion.h1>
      
      <div className="space-y-10 text-sm md:text-base text-white/70 leading-relaxed">
        <motion.section variants={itemVariants} className="space-y-6">
          <p className="text-base md:text-lg text-white font-medium leading-snug">
            Addy Growth Studio is a <span className="text-brand-teal font-bold">performance-oriented creative studio</span> delivering strategic visual assets and high-impact websites for <span className="text-brand-blue font-bold">growth-focused brands</span>. We operate at the intersection of <span className="text-brand-purple font-bold">marketing strategy</span>, audience psychology, and high-quality visual execution.
          </p>
          <p>
            Our objective is clear: to produce <span className="text-white font-bold">structured, platform-native creatives</span> that strengthen brand positioning while driving <span className="text-brand-teal font-bold underline decoration-brand-teal/30 underline-offset-4">measurable performance outcomes</span>.
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/30 transition-all group">
            <h2 className="text-xl font-bold text-brand-teal mb-4 flex items-center gap-3">
              <Target size={20} /> Our Expertise
            </h2>
            <p className="mb-4 text-xs text-white/40 font-bold uppercase tracking-widest">We develop creative assets across:</p>
            <ul className="space-y-2.5 text-sm">
              {[
                'Vitamin C & Glow Serums',
                'Hydrating Face Creams',
                'Cleansers & Facewash',
                'Night Routine Moisturizers',
                'Texture & Ingredient Close-ups',
                'Aesthetic Beauty Campaigns'
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  <div className="w-1 h-1 rounded-full bg-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[10px] text-white/30 italic border-t border-white/5 pt-4 leading-tight">
              Each category is approached with industry-specific insights, ensuring that content aligns with both audience expectations and brand objectives.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all group">
            <h2 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-3">
              <Cpu size={20} /> Our Methodology
            </h2>
            <p className="mb-4 text-xs text-white/40 font-bold uppercase tracking-widest">Our process is built on strategic precision:</p>
            <ul className="space-y-2.5 text-sm">
              {[
                'In-depth audience and market understanding',
                'Platform-specific creative optimization',
                'Clear messaging frameworks',
                'Conversion-focused storytelling',
                'Performance tracking and iterative refinement'
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  <div className="w-1 h-1 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[10px] text-white/30 italic border-t border-white/5 pt-4 leading-tight">
              We treat every creative asset as a strategic business tool, not just visual content.
            </p>
          </motion.div>
        </div>

        <motion.section variants={itemVariants} className="p-8 rounded-[32px] bg-linear-to-br from-brand-purple/10 to-transparent border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <CheckCircle2 size={100} />
          </div>
          <h2 className="text-2xl font-bold text-brand-purple mb-6 flex items-center gap-3">
            <CheckCircle2 size={24} /> Our Standard
          </h2>
          <p className="mb-6 text-xs text-white/40 font-bold uppercase tracking-widest">We maintain a strong commitment to:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Structured creative systems',
              'Premium production quality',
              'Brand consistency',
              'Long-term scalability',
              'Data-informed decision making'
            ].map(item => (
              <div key={item} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs font-bold hover:bg-white/10 transition-colors">
                <div className="w-1 h-1 rounded-full bg-brand-purple" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="pt-10 border-t border-white/10 text-center">
          <p className="font-display font-medium text-white italic leading-relaxed text-lg md:text-xl max-w-2xl mx-auto">
            "We believe sustainable growth is achieved when creativity is supported by strategy. Through disciplined execution and refined storytelling, we help brands build authority, improve engagement, and scale with confidence."
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
});

const Footer = memo(({ onNavigate }: { onNavigate: (view: string, shouldScrollToTop?: boolean) => void }) => {
  const handleNavClick = (item: string) => {
    if (item === 'About') {
      onNavigate('about');
    } else if (item === 'Privacy Policy') {
      onNavigate('privacy');
    } else if (item === 'Terms of Service') {
      onNavigate('terms');
    } else {
      onNavigate('home', false);
      setTimeout(() => {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="pt-24 pb-12 border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-2xl font-display font-bold mb-6">
              <span className="gradient-text">Addy</span> Growth Studio
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed">
              Performance-driven creative studio for modern e-commerce brands. We engineer ads that convert, scale, and dominate attention.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-white/50">
              {['Work', 'Services', 'About', 'Process'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNavClick(item)}
                    className="hover:text-brand-teal transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Social</h4>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/addy_ugc_creative_?igsh=MWVlNnVnaGlxZmlxMw==' },
                { Icon: Mail, href: 'mailto:addyugccreative@gmail.com' },
                { Icon: MessageSquare, href: 'https://wa.me/qr/ALMKIEKM6SOGO1' }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-teal hover:text-brand-dark transition-all">
                  <item.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <p>© 2026 Addy Growth Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => handleNavClick('Privacy Policy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavClick('Terms of Service')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
});

const CAROUSEL_VIDEOS = [
  { id: 'c0', url: 'https://youtube.com/shorts/nMFw460QEFQ', coverUrl: 'https://picsum.photos/seed/c0/400/711' },
  { id: 'c1', url: 'https://youtube.com/shorts/CrQaD25hJUM', coverUrl: 'https://picsum.photos/seed/c1/400/711' },
  { id: 'c2', url: 'https://youtube.com/shorts/-6nk2lzfUiY', coverUrl: 'https://picsum.photos/seed/c2/400/711' },
  { id: 'c3', url: 'https://youtube.com/shorts/v84LuiHpJrE', coverUrl: 'https://picsum.photos/seed/c3/400/711' },
  { id: 'c4', url: 'https://youtube.com/shorts/SOlfTi_BV8o', coverUrl: 'https://picsum.photos/seed/c4/400/711' },
  { id: 'c5', url: 'https://youtube.com/shorts/0Y0g6zEtTpc', coverUrl: 'https://picsum.photos/seed/c5/400/711' },
  { id: 'c6', url: 'https://youtube.com/shorts/2uaYce9ywGM', coverUrl: 'https://picsum.photos/seed/c6/400/711' },
  { id: 'c7', url: 'https://youtube.com/shorts/QNC6QNscRSQ', coverUrl: 'https://picsum.photos/seed/c7/400/711' },
  { id: 'c8', url: 'https://youtube.com/shorts/CrQaD25hJUM', coverUrl: 'https://picsum.photos/seed/c8/400/711' },
  { id: 'c9', url: 'https://youtube.com/shorts/-6nk2lzfUiY', coverUrl: 'https://picsum.photos/seed/c9/400/711' },
  { id: 'c10', url: 'https://youtube.com/shorts/v84LuiHpJrE', coverUrl: 'https://picsum.photos/seed/c10/400/711' },
];

const CarouselVideoItem = memo(({ url, title, onExpand }: { url: string, title: string, onExpand?: (video: {url: string, title: string}) => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getYoutubeId = (url: string) => {
    if (!url || url === '#') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(url);

  useEffect(() => {
    if (!videoId) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '600px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div ref={containerRef} className="w-full relative group" style={{ paddingTop: '177.77%' }}>
      {onExpand && (
        <button 
          onClick={() => onExpand({ url, title })}
          className="absolute top-3 right-3 z-30 p-2 bg-brand-teal/20 backdrop-blur-md rounded-full border border-brand-teal/30 text-brand-teal hover:bg-brand-teal hover:text-brand-dark transition-all shadow-lg"
          title="Expand Video"
        >
          <Maximize size={16} />
        </button>
      )}
      {!isLoaded ? (
        <div className="absolute inset-0 bg-brand-dark/50 flex items-center justify-center rounded-2xl overflow-hidden">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&fs=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`}
          className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl shadow-2xl z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="lazy"
          title={title}
        />
      )}
    </div>
  );
});

const VideoCarousel = memo(({ onExpandVideo }: { onExpandVideo: (video: {url: string, title: string}) => void }) => {
  useEffect(() => {
    // Preconnect to YouTube domains for faster iframe initialization
    const domains = ['https://www.youtube.com', 'https://www.google.com', 'https://googleads.g.doubleclick.net'];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <section className="py-24 overflow-hidden bg-brand-dark/30">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-brand-purple">Creatives</span></h2>
        <p className="text-lg md:text-xl font-display font-medium text-white/90">A glimpse into our <span className="text-brand-teal font-bold">high-performance</span> video library.</p>
      </motion.div>
      
      <div className="flex flex-col gap-12">
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-4 optimize-gpu"
            style={{ willChange: 'transform' }}
            animate={{ x: [0, -2440] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...CAROUSEL_VIDEOS, ...CAROUSEL_VIDEOS].map((video, idx) => (
              <div key={`${video.id}-carousel-${idx}`} className="w-[160px] md:w-[220px] aspect-[9/16] shrink-0 optimize-gpu">
                <CarouselVideoItem url={video.url} title={`Creative ${idx}`} onExpand={onExpandVideo} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

const PrivacyPolicy = memo(({ onBack }: { onBack: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Privacy Policy</h1>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Last Updated: 2 Mar, 2026</p>
      </motion.div>

      <div className="space-y-12 text-white/70 leading-relaxed">
        <motion.section variants={itemVariants}>
          <p className="text-lg mb-6">Welcome to Addy Growth Studio (“we,” “our,” or “us”).</p>
          <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or contact us regarding our AI-powered UGC and performance ad creative services.</p>
          <p className="mt-4">By using this website, you agree to the terms outlined in this Privacy Policy.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">1. Information We Collect</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-teal">A. Personal Information</h3>
            <p>When you contact us through forms, email, or direct messages, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name</li>
              <li>Email address</li>
              <li>Business or brand name</li>
              <li>Project details or requirements</li>
              <li>Any additional information you voluntarily provide</li>
            </ul>
            <p className="italic text-sm">We only collect personal information that you choose to share with us.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-teal">B. Non-Personal Information (Usage Data)</h3>
            <p>We may automatically collect limited non-personal data such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type</li>
              <li>Device type</li>
              <li>IP address</li>
              <li>Pages visited</li>
              <li>Time spent on the website</li>
            </ul>
            <p className="italic text-sm">This information helps us improve website functionality and user experience.</p>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">2. How We Use Your Information</h2>
          <p>Addy Growth Studio uses the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to inquiries and project requests</li>
            <li>Provide quotes, proposals, and service information</li>
            <li>Communicate about ongoing or potential projects</li>
            <li>Improve our website, services, and portfolio presentation</li>
            <li>Analyze website performance</li>
          </ul>
          <p className="font-bold text-white">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">3. Cookies</h2>
          <p>Our website may use cookies or similar tracking technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enhance browsing experience</li>
            <li>Analyze traffic and engagement</li>
            <li>Improve website functionality</li>
          </ul>
          <p>You may disable cookies through your browser settings if preferred.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">4. Data Protection & Security</h2>
          <p>We implement reasonable technical and organizational measures to protect your personal information.</p>
          <p>However, no online transmission or storage system can be guaranteed to be 100% secure. By using this website, you acknowledge this risk.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">5. Third-Party Platforms & Links</h2>
          <p>Our portfolio may include links to third-party platforms such as Instagram, YouTube, or other tools used for showcasing creative work.</p>
          <p>We are not responsible for the privacy practices or content of these external websites. We recommend reviewing their privacy policies separately.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">6. Client Work & Intellectual Property</h2>
          <p>Creative samples displayed on this website may include projects developed for brands or conceptual performance demonstrations.</p>
          <p>All product names, logos, and trademarks belong to their respective owners.</p>
          <p>AI-generated visuals, creative structures, and editing styles created by Addy Growth Studio remain our intellectual property unless otherwise agreed in writing.</p>
          <p>Portfolio content is displayed strictly for demonstration and professional showcasing purposes.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your information</li>
          </ul>
          <p>To exercise any of these rights, please contact us at:</p>
          <a href="mailto:hello@addygrowth.studio" className="text-brand-teal font-bold hover:underline">Email: hello@addygrowth.studio</a>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">8. Policy Updates</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in services or legal requirements.</p>
          <p>All updates will be reflected by revising the “Last Updated” date at the top of this page.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-display font-bold text-white">9. Contact Information</h2>
          <p>If you have any questions about this Privacy Policy or how your information is handled, please contact:</p>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-2">
            <p className="font-bold text-white text-xl">Addy</p>
            <p className="text-brand-teal">Addy Growth Studio</p>
            <a href="mailto:hello@addygrowth.studio" className="flex items-center gap-2 hover:text-brand-teal transition-colors">
              <Mail size={16} /> hello@addygrowth.studio
            </a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
});

const TermsOfService = memo(({ onBack }: { onBack: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Terms & Conditions</h1>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Last Updated: 2 March, 2026</p>
      </motion.div>

      <div className="space-y-12 text-white/70 leading-relaxed">
        <motion.section variants={itemVariants}>
          <p className="text-lg mb-6">Welcome to Addy Growth Studio.</p>
          <p>By accessing this website or purchasing our services, you agree to the following Terms & Conditions. Please read them carefully.</p>
          <p className="mt-4 font-bold text-white">If you do not agree with these terms, please do not use our website or services.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">1. Services</h2>
          <p>Addy Growth Studio provides:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-powered UGC video ads</li>
            <li>Performance marketing creatives</li>
            <li>Short-form ad content for social platforms (Meta, Instagram, YouTube, etc.)</li>
            <li>Creative strategy and scripting</li>
          </ul>
          <p>All services are delivered digitally unless otherwise agreed in writing.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">2. Project Process</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Work begins only after project confirmation and payment agreement.</li>
            <li>Clients must provide necessary product details, references, brand assets, and requirements before production starts.</li>
            <li>Delays in client communication may affect delivery timelines.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">3. Pricing & Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are communicated clearly before project confirmation.</li>
            <li>Payment terms (full advance or partial advance) will be agreed upon before starting.</li>
            <li>Payments once made are generally non-refundable unless otherwise discussed.</li>
            <li>Custom packages or bulk pricing must be agreed upon in writing.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">4. Revisions Policy</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Each project includes a limited number of revisions (as mentioned in the proposal).</li>
            <li>Revisions apply to minor edits (text changes, small adjustments).</li>
            <li>Major changes (new script, new concept, new angle) may require additional charges.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">5. Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Final delivered video creatives become the client’s usage asset after full payment.</li>
            <li>Addy Growth Studio retains the right to showcase completed work in portfolios, social media, or promotional materials unless agreed otherwise in writing.</li>
            <li>All trademarks, logos, and product names belong to their respective owners.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">6. No Performance Guarantee</h2>
          <p>While creatives are designed using performance marketing principles, Addy Growth Studio does not guarantee:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Specific sales results</li>
            <li>ROAS targets</li>
            <li>Ad account performance</li>
          </ul>
          <p>Results depend on multiple factors including ad spend, targeting, product-market fit, and platform algorithms.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">7. Client Responsibilities</h2>
          <p>The client agrees to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate product information</li>
            <li>Ensure they have legal rights to sell and advertise their product</li>
            <li>Comply with advertising platform policies</li>
          </ul>
          <p>Addy Growth Studio is not responsible for ad account bans, policy violations, or product compliance issues.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">8. Limitation of Liability</h2>
          <p>Addy Growth Studio shall not be held liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indirect or incidental damages</li>
            <li>Business losses due to ad performance</li>
            <li>Platform-related technical issues</li>
          </ul>
          <p>Our liability is limited to the amount paid for the specific service.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">9. Third-Party Tools</h2>
          <p>We may use AI tools, editing software, and third-party platforms to create and deliver services. We are not responsible for outages, tool limitations, or third-party policy changes.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">10. Termination</h2>
          <p>We reserve the right to refuse or terminate services if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Misuse of content occurs</li>
            <li>Payment terms are violated</li>
            <li>Communication becomes abusive or unprofessional</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">11. Changes to Terms</h2>
          <p>These Terms & Conditions may be updated at any time. Updates will be reflected with a revised “Last Updated” date.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-display font-bold text-white">12. Contact Information</h2>
          <p>For questions regarding these Terms & Conditions, please contact:</p>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-2">
            <p className="font-bold text-white text-xl">Addy</p>
            <p className="text-brand-teal">Addy Growth Studio</p>
            <a href="mailto:hello@addygrowth.studio" className="flex items-center gap-2 hover:text-brand-teal transition-colors">
              <Mail size={16} /> hello@addygrowth.studio
            </a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
});

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project-form' | 'about' | 'privacy' | 'terms' | PortfolioNiche>('home');
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [modalVideo, setModalVideo] = useState<{url: string, title: string} | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const scrollPositions = useRef<Record<string, number>>(
    JSON.parse(sessionStorage.getItem('scrollPositions') || '{}')
  );

  useEffect(() => {
    sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions.current));
  }, [currentView]);

  const getViewId = (view: any): string => {
    if (typeof view === 'string') return view;
    return view.id;
  };

  const handleNavigate = (view: string | PortfolioNiche, shouldScrollToTop = true) => {
    const viewId = getViewId(view);
    const currentViewId = getViewId(currentView);

    // Save current scroll position before navigating away
    scrollPositions.current[currentViewId] = window.scrollY;
    sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions.current));

    setCurrentView(view as any);
    
    // Update history state
    const path = viewId === 'home' ? '/' : `/${viewId}`;
    if (window.location.pathname !== path) {
      history.pushState({ view: viewId }, '', path);
    }

    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (scrollPositions.current[viewId] !== undefined) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPositions.current[viewId], behavior: 'instant' });
      }, 0);
    }
  };

  const handleStartProject = (plan?: string) => {
    setSelectedPlan(plan);
    handleNavigate('project-form');
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const viewId = event.state?.view || 'home';
      const niche = PORTFOLIO_NICHES.find(n => n.id === viewId);
      const targetView = niche || viewId;
      
      setCurrentView(targetView);

      // Restore scroll position if saved
      if (scrollPositions.current[viewId] !== undefined) {
        setTimeout(() => {
          window.scrollTo({ top: scrollPositions.current[viewId], behavior: 'instant' });
        }, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial history state
    const initialViewId = getViewId(currentView);
    history.replaceState({ view: initialViewId }, '', window.location.pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  // Active section detection
  useEffect(() => {
    if (currentView === 'about') {
      setActiveSection('about');
      return;
    }
    if (currentView !== 'home') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          
          // Update hash without reload
          if (id !== 'hero') {
            history.replaceState(history.state, '', `#${id}`);
          } else {
            history.replaceState(history.state, '', '/');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('.section-optimize');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [currentView]);

  return (
    <div className="min-h-screen selection:bg-brand-teal/30 smooth-scroll overflow-x-hidden">
      <Navbar 
        onNavigate={handleNavigate} 
        onStartProject={() => handleStartProject()} 
        activeSection={activeSection}
      />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="optimize-gpu"
          >
            <div id="hero" className="section-optimize"><Hero onStartProject={() => handleStartProject()} /></div>
            <div id="why" className="section-optimize"><WhyMyCreativesWork /></div>
            <div id="work" className="section-optimize"><PositioningStrip /></div>
            <div id="portfolio" className="section-optimize"><PortfolioGrid onExpandVideo={setModalVideo} /></div>
            <div id="services" className="section-optimize"><ScienceSection /></div>
            <div id="testimonials" className="section-optimize"><Testimonials /></div>
            <div id="process" className="section-optimize"><ProcessSteps /></div>
            <div id="pricing" className="section-optimize"><Pricing onStartProject={handleStartProject} /></div>
            <div id="protocol" className="section-optimize"><ProjectProtocol /></div>
            <div id="faq" className="section-optimize"><FAQSection /></div>
            <div id="cta" className="section-optimize"><BigCTA onStartProject={() => handleStartProject()} /></div>
            <div id="contact" className="section-optimize"><ContactSection /></div>
            <Footer onNavigate={handleNavigate} />
          </motion.main>
        ) : currentView === 'project-form' ? (
          <ProjectForm 
            key="project-form"
            onBack={() => handleNavigate('home', false)} 
          />
        ) : currentView === 'about' ? (
          <AboutPage 
            key="about" 
            onBack={() => handleNavigate('home', false)} 
          />
        ) : currentView === 'privacy' ? (
          <PrivacyPolicy 
            key="privacy" 
            onBack={() => handleNavigate('home', false)} 
          />
        ) : currentView === 'terms' ? (
          <TermsOfService 
            key="terms" 
            onBack={() => handleNavigate('home', false)} 
          />
        ) : (
          <div key="detail" className="optimize-gpu">
            <NicheDetail 
              niche={currentView} 
              onBack={() => handleNavigate('home', false)} 
              onExpandVideo={setModalVideo}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal / Lightbox */}
      <AnimatePresence>
        {modalVideo && (
          <VideoModal 
            video={modalVideo} 
            onClose={() => setModalVideo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
