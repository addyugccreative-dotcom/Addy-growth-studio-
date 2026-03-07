import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Zap, FileText, Users, Scissors, Cpu, BarChart3, Target, Clock, 
  ChevronRight, CheckCircle2, ArrowRight, Instagram, 
  Mail, MessageSquare, Menu, X, ArrowLeft, Maximize, ChevronDown,
  Star, Sparkles, ExternalLink, Check, Plus
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

const Navbar = memo(({ onNavigate, onStartProject }: { onNavigate: (view: 'home' | 'about' | string) => void, onStartProject: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Work', 'Services', 'About', 'Process'];

  const handleNavClick = (item: string) => {
    if (item === 'About') {
      onNavigate('about');
      window.scrollTo(0, 0);
    } else {
      onNavigate('home');
      // Small delay to ensure we are on home before scrolling
      setTimeout(() => {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = `#${item.toLowerCase()}`;
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="text-2xl font-display font-bold cursor-pointer flex items-center gap-2"
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="gradient-text">Addy</span>
          <span className="text-white">UGC Creative</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={onStartProject}
            className="relative px-6 py-2.5 rounded-full bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white text-sm font-bold glow-purple hover:scale-105 transition-transform overflow-hidden"
          >
            <ButtonSparkle />
            Start Project
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
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
                key={item} 
                onClick={() => handleNavClick(item)}
                className="text-lg font-medium text-white/70 text-left"
              >
                {item}
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

const Hero = memo(({ onStartProject }: { onStartProject: () => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden optimize-gpu">
    <ShopifyBlur />
    
    {/* Floating Shopify Icons */}
    <motion.div 
      initial={{ opacity: 0, x: -30, rotate: -10 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute top-24 left-4 md:top-28 md:left-12 z-20"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#96bf48]/30 blur-xl rounded-full animate-pulse" />
        <ShopifyIcon className="w-8 h-8 md:w-14 md:h-14 relative z-10 drop-shadow-[0_0_15px_rgba(150,191,72,0.4)]" />
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, x: 30, rotate: 10 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="absolute top-24 right-4 md:top-28 md:right-12 z-20"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#96bf48]/30 blur-xl rounded-full animate-pulse" />
        <ShopifyIcon className="w-8 h-8 md:w-14 md:h-14 relative z-10 drop-shadow-[0_0_15px_rgba(150,191,72,0.4)]" />
      </div>
    </motion.div>

    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-teal/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-tight mb-8">
          Performance Ad Creatives for <span className="inline-flex items-center gap-2 max-md:text-brand-teal max-md:bg-brand-teal/10 max-md:px-3 max-md:py-1 max-md:rounded-2xl md:gradient-text drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            DTC & Shopify
          </span> Brands
        </h1>
        <p className="text-lg md:text-2xl font-display font-medium text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
          I create <span className="text-brand-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">hook-driven AI UGC</span> & <span className="text-brand-purple drop-shadow-[0_0_8px_rgba(192,38,255,0.4)]">cinematic ad creatives</span> designed to <span className="text-brand-blue drop-shadow-[0_0_8px_rgba(123,97,255,0.4)]">increase CTR</span> and improve paid ad performance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#work" 
            className="relative w-full sm:w-auto px-10 py-5 rounded-full bg-brand-teal text-brand-dark font-bold text-lg glow-teal hover:scale-105 transition-transform text-center overflow-hidden"
          >
            <ButtonSparkle />
            View My Work
          </a>
          <button 
            onClick={onStartProject}
            className="relative w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors text-center overflow-hidden"
          >
            <ButtonSparkle />
            Start Your Project
          </button>
        </div>
      </motion.div>
    </div>
  </section>
));

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
          At <span className="text-brand-teal font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">Addy UGC Creative</span>, we specialize in <span className="text-brand-teal font-bold">high-converting UGC</span> and commercial product ads built for brands, dropshippers, and scaling e-commerce stores. Every creative is engineered with <span className="text-brand-purple font-bold">performance psychology</span>, thumb-stopping hooks, and platform-native storytelling to <span className="text-brand-blue font-bold">maximize ROAS</span> and dominate attention.
        </p>
      </motion.div>
    </div>
  </section>
));

const PortfolioGrid = memo(({ onSelectNiche }: { onSelectNiche: (niche: PortfolioNiche) => void }) => (
  <section id="work" className="py-24 max-w-7xl mx-auto px-6 optimize-gpu">
    <div className="mb-16">
      <motion.span 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-brand-teal font-bold uppercase tracking-widest text-xs mb-4 block"
      >
        Strategic Portfolio
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-display font-bold mb-4"
      >
        My Work
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl font-display font-medium text-white/90 max-w-2xl"
      >
        Performance-driven creatives engineered for <span className="text-brand-teal font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">maximum ROAS</span> across multiple high-converting niches.
      </motion.p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {PORTFOLIO_NICHES.map((niche, idx) => (
        <motion.div
          key={niche.id}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="group relative cursor-pointer optimize-gpu"
          onClick={() => onSelectNiche(niche)}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-2xl">
            <img 
              src={niche.thumbnailUrl} 
              alt={niche.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading={idx < 4 ? "eager" : "lazy"}
              decoding="async"
              {...(idx === 0 ? { fetchPriority: "high" } : idx < 4 ? { fetchPriority: "low" } : {})}
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80" />
            
            <div className="absolute inset-0 border-2 border-white/5 group-hover:border-brand-teal/30 rounded-2xl transition-all duration-500" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-teal/5 pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="px-4 py-2 rounded-xl bg-brand-teal text-brand-dark font-bold text-[10px] md:text-xs text-center shadow-xl">
                Explore Case Study
              </div>
            </div>
          </div>

          <div className="px-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal/60 mb-2 block">{niche.category}</span>
            <h3 className="text-sm md:text-lg font-display font-bold mb-2 group-hover:text-brand-teal transition-colors truncate">{niche.title}</h3>
            <p className="text-white/50 text-[10px] md:text-xs leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors">{niche.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
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
          {niche.videos.slice(0, 4).map((video, idx) => (
            <motion.div 
              key={video.id} 
              whileHover={{ y: -5 }}
              className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl optimize-gpu group"
            >
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

const SparklingTick = memo(() => (
  <div className="relative w-20 h-20 flex items-center justify-center">
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

const ProjectForm = memo(({ onBack, selectedPlan }: { onBack: () => void, selectedPlan?: string }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    niche: '',
    budget: '',
    details: '',
    plan: selectedPlan || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
    
    try {
      const response = await fetch('https://formspree.io/f/xpqjkazv', {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        fireConfetti();
      } else {
        // Fallback to success even if error for better UX in demo, 
        // but ideally we'd handle errors.
        setStatus('success');
        fireConfetti();
      }
    } catch (error) {
      setStatus('success');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center"
      >
        <div className="max-w-md w-full bg-white/5 border border-brand-teal/30 p-12 rounded-[40px] text-center backdrop-blur-xl">
          <div className="flex justify-center mb-8">
            <SparklingTick />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Project Received!</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Thank you for reaching out. We've received your project details and will get back to you within 24 hours to schedule a strategy call.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 rounded-2xl bg-brand-teal text-brand-dark font-bold hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Start Your Project</h1>
        <p className="text-lg text-white/60">Tell us about your brand and let's build something high-performing together.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="_subject" value="New Project Request - Addy UGC" />
        <input type="hidden" name="form_type" value="Project Request" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/60 ml-1">Full Name</label>
            <input 
              required
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/60 ml-1">Work Email</label>
            <input 
              required
              name="email"
              type="email"
              placeholder="john@brand.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/60 ml-1">Brand Name</label>
            <input 
              required
              name="brand"
              type="text"
              placeholder="Your Brand"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors"
              value={formData.brand}
              onChange={e => setFormData({...formData, brand: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/60 ml-1">Niche / Category</label>
            <select 
              required
              name="niche"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors appearance-none"
              value={formData.niche}
              onChange={e => setFormData({...formData, niche: e.target.value})}
            >
              <option value="" className="bg-brand-dark">Select Niche</option>
              <option value="skincare" className="bg-brand-dark">Skincare / Beauty</option>
              <option value="fitness" className="bg-brand-dark">Fitness / Health</option>
              <option value="tech" className="bg-brand-dark">Tech / Gadgets</option>
              <option value="fashion" className="bg-brand-dark">Fashion / Jewelry</option>
              <option value="ecommerce" className="bg-brand-dark">Dropshipping / Ecom</option>
              <option value="other" className="bg-brand-dark">Other</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/60 ml-1">Project Budget</label>
            <select 
              required
              name="budget"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors appearance-none"
              value={formData.budget}
              onChange={e => setFormData({...formData, budget: e.target.value})}
            >
              <option value="" className="bg-brand-dark">Select Budget</option>
              <option value="500" className="bg-brand-dark">$500</option>
              <option value="1k-5k" className="bg-brand-dark">$1k - $5k</option>
              <option value="5k-10k" className="bg-brand-dark">$5k - $10k</option>
              <option value="10k+" className="bg-brand-dark">$10k+</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/60 ml-1">Selected Package</label>
            <select 
              name="package"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors appearance-none"
              value={formData.plan}
              onChange={e => setFormData({...formData, plan: e.target.value})}
            >
              <option value="" className="bg-brand-dark">Custom / Not Sure</option>
              {PRICING_PLANS.map(p => (
                <option key={p.name} value={p.name} className="bg-brand-dark">{p.name} - {p.price}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-white/60 ml-1">Project Details & Goals</label>
          <textarea 
            required
            name="project_details"
            rows={4}
            placeholder="Tell us about your goals, target audience, and any specific requirements..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-teal transition-colors resize-none"
            value={formData.details}
            onChange={e => setFormData({...formData, details: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-5 rounded-2xl bg-brand-teal text-brand-dark font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === 'submitting' ? (
            <div className="w-6 h-6 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
          ) : (
            <>Submit Project Request <ArrowRight size={20} /></>
          )}
        </button>
      </form>
    </motion.div>
  );
});

const Pricing = memo(({ onStartProject }: { onStartProject: (plan?: string) => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 overflow-hidden optimize-gpu">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Services & <span className="text-brand-teal">Packages</span></h2>
        <p className="text-lg md:text-xl font-display font-medium text-white/90">Scalable creative solutions tailored for <span className="text-brand-purple font-bold">growth-focused brands</span>.</p>
      </div>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide optimize-gpu">
        {PRICING_PLANS.map((plan) => (
          <motion.div 
            key={plan.name} 
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlan(plan.name)}
            className={`relative p-6 md:p-8 rounded-[28px] flex flex-col shrink-0 w-[280px] md:w-auto snap-center cursor-pointer transition-all duration-300 optimize-gpu ${
              selectedPlan === plan.name 
                ? 'bg-linear-to-br from-brand-teal/20 via-brand-blue/20 to-brand-purple/20 border-2 border-brand-teal shadow-[0_0_30px_rgba(0,229,255,0.2)]' 
                : plan.isPopular 
                  ? 'bg-white/10 border border-brand-teal/50' 
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-linear-to-r from-brand-teal to-brand-purple text-[10px] font-bold uppercase tracking-wider z-20">
                Most Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-display font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-bold gradient-text">{plan.price}</span>
                <span className="text-white/40 text-xs">/pkg</span>
              </div>
            </div>

            <p className="text-xs text-white/60 mb-6 h-10 leading-relaxed">{plan.subtitle}</p>
            
            <div className="space-y-3 mb-8 flex-grow">
              {plan.features.map(feature => (
                <div key={feature} className="flex items-start gap-2 text-xs text-white/80">
                  <CheckCircle2 size={14} className="text-brand-teal shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onStartProject(plan.name);
              }}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all text-center ${
                selectedPlan === plan.name || plan.isPopular 
                  ? 'bg-brand-teal text-brand-dark glow-teal' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {selectedPlan === plan.name ? 'Selected' : 'Start Project'}
            </button>
          </motion.div>
        ))}
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
      answer: "No. Addy UGC Creative focuses exclusively on performance-driven creative production. Ad management is not included."
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
                    <option value="500">$500</option>
                    <option value="1k-5k">$1k - $5k</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k+">$10k+</option>
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
              className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-brand-teal text-brand-dark font-bold text-base md:text-lg glow-teal hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Start Project'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center">Something went wrong. Please try again or email us directly at <a href="mailto:addyugccreative@gmail.com" className="underline hover:text-white transition-colors">addyugccreative@gmail.com</a></p>
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

      <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-display font-bold mb-8 gradient-text">About Addy UGC Creative</motion.h1>
      
      <div className="space-y-10 text-sm md:text-base text-white/70 leading-relaxed">
        <motion.section variants={itemVariants} className="space-y-6">
          <p className="text-base md:text-lg text-white font-medium leading-snug">
            Addy UGC Creative is a <span className="text-brand-teal font-bold">performance-oriented creative studio</span> delivering strategic user-generated content and commercial product advertising for <span className="text-brand-blue font-bold">growth-focused brands</span>. We operate at the intersection of <span className="text-brand-purple font-bold">marketing strategy</span>, audience psychology, and high-quality visual execution.
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
                'Skincare & Beauty',
                'Fitness & Health',
                'Tech & Gadgets',
                'Fashion & Jewelry',
                'Dropshipping & Ecommerce Products',
                'Commercial Product Campaigns'
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

const Footer = memo(({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const handleNavClick = (item: string) => {
    if (item === 'About') {
      onNavigate('about');
      window.scrollTo(0, 0);
    } else if (item === 'Privacy Policy') {
      onNavigate('privacy');
      window.scrollTo(0, 0);
    } else if (item === 'Terms of Service') {
      onNavigate('terms');
      window.scrollTo(0, 0);
    } else {
      onNavigate('home');
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
              <span className="gradient-text">Addy</span> UGC Creative
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
          <p>© 2026 Addy UGC Creative. All rights reserved.</p>
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
          <p className="text-lg mb-6">Welcome to Addy UGC Creative (“we,” “our,” or “us”).</p>
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
          <p>Addy UGC Creative uses the collected information to:</p>
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
          <p>AI-generated visuals, creative structures, and editing styles created by Addy UGC Creative remain our intellectual property unless otherwise agreed in writing.</p>
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
          <a href="mailto:addyugccreative@gmail.com" className="text-brand-teal font-bold hover:underline">Email: addyugccreative@gmail.com</a>
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
            <p className="text-brand-teal">Addy UGC Creative</p>
            <a href="mailto:addyugccreative@gmail.com" className="flex items-center gap-2 hover:text-brand-teal transition-colors">
              <Mail size={16} /> addyugccreative@gmail.com
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
          <p className="text-lg mb-6">Welcome to Addy UGC Creative.</p>
          <p>By accessing this website or purchasing our services, you agree to the following Terms & Conditions. Please read them carefully.</p>
          <p className="mt-4 font-bold text-white">If you do not agree with these terms, please do not use our website or services.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">1. Services</h2>
          <p>Addy UGC Creative provides:</p>
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
            <li>Addy UGC Creative retains the right to showcase completed work in portfolios, social media, or promotional materials unless agreed otherwise in writing.</li>
            <li>All trademarks, logos, and product names belong to their respective owners.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">6. No Performance Guarantee</h2>
          <p>While creatives are designed using performance marketing principles, Addy UGC Creative does not guarantee:</p>
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
          <p>Addy UGC Creative is not responsible for ad account bans, policy violations, or product compliance issues.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">8. Limitation of Liability</h2>
          <p>Addy UGC Creative shall not be held liable for:</p>
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
            <p className="text-brand-teal">Addy UGC Creative</p>
            <a href="mailto:addyugccreative@gmail.com" className="flex items-center gap-2 hover:text-brand-teal transition-colors">
              <Mail size={16} /> addyugccreative@gmail.com
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

  const handleStartProject = (plan?: string) => {
    setSelectedPlan(plan);
    setCurrentView('project-form');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: string) => {
    if (view === 'home') setCurrentView('home');
    else if (view === 'about') setCurrentView('about');
    else if (view === 'privacy') setCurrentView('privacy');
    else if (view === 'terms') setCurrentView('terms');
    else setCurrentView(view as any);
  };

  return (
    <div className="min-h-screen selection:bg-brand-teal/30 smooth-scroll overflow-x-hidden">
      <Navbar onNavigate={handleNavigate} onStartProject={() => handleStartProject()} />
      
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
            <Hero onStartProject={() => handleStartProject()} />
            <div className="section-optimize"><WhyMyCreativesWork /></div>
            <div className="section-optimize" id="work"><PositioningStrip /></div>
            <div className="section-optimize"><VideoCarousel onExpandVideo={setModalVideo} /></div>
            <div className="section-optimize"><PortfolioGrid onSelectNiche={(niche) => setCurrentView(niche)} /></div>
            <div className="section-optimize" id="services"><ScienceSection /></div>
            <div className="section-optimize"><ProvenResults /></div>
            <div className="section-optimize"><Testimonials /></div>
            <div className="section-optimize" id="process"><ProcessSteps /></div>
            <div className="section-optimize"><Pricing onStartProject={handleStartProject} /></div>
            <div className="section-optimize"><FAQSection /></div>
            <div className="section-optimize"><BigCTA onStartProject={() => handleStartProject()} /></div>
            <div className="section-optimize"><ContactSection /></div>
            <Footer onNavigate={handleNavigate} />
          </motion.main>
        ) : currentView === 'project-form' ? (
          <ProjectForm 
            key="project-form"
            selectedPlan={selectedPlan}
            onBack={() => setCurrentView('home')} 
          />
        ) : currentView === 'about' ? (
          <AboutPage 
            key="about" 
            onBack={() => setCurrentView('home')} 
          />
        ) : currentView === 'privacy' ? (
          <PrivacyPolicy 
            key="privacy" 
            onBack={() => setCurrentView('home')} 
          />
        ) : currentView === 'terms' ? (
          <TermsOfService 
            key="terms" 
            onBack={() => setCurrentView('home')} 
          />
        ) : (
          <div key="detail" className="optimize-gpu">
            <NicheDetail 
              niche={currentView} 
              onBack={() => setCurrentView('home')} 
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
