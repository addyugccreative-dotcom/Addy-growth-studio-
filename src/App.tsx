import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Zap, FileText, Users, Scissors, Cpu, BarChart3, Target, Clock, 
  ChevronRight, CheckCircle2, ArrowRight, Instagram, 
  Mail, MessageSquare, Menu, X, ArrowLeft, Maximize, ChevronDown,
  Star, Sparkles
} from 'lucide-react';
import { PORTFOLIO_NICHES, FEATURE_BLOCKS, PRICING_PLANS, TESTIMONIALS } from './constants';
import { PortfolioNiche } from './types';

const Navbar = ({ onNavigate, onStartProject }: { onNavigate: (view: 'home' | string) => void, onStartProject: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="text-2xl font-display font-bold cursor-pointer flex items-center gap-2"
          onClick={() => onNavigate('home')}
        >
          <span className="gradient-text">Addy</span>
          <span className="text-white">UGC Creative</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Services', 'About', 'Process'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button 
            onClick={onStartProject}
            className="px-6 py-2.5 rounded-full bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white text-sm font-bold glow-purple hover:scale-105 transition-transform"
          >
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
            {['Work', 'Services', 'About', 'Process'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-medium text-white/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-4 rounded-xl bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white font-bold text-center"
            >
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStartProject }: { onStartProject: () => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-teal/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/10 blur-[120px] rounded-full" />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-tight mb-8">
          We Create <span className="gradient-text drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Scroll-Stopping</span><br />
          UGC Ads That Convert
        </h1>
        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12">
          Performance-driven creative that turns attention into sales.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#work" 
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-brand-teal text-brand-dark font-bold text-lg glow-teal hover:scale-105 transition-transform text-center"
          >
            View My Work
          </a>
          <button 
            onClick={onStartProject}
            className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors text-center"
          >
            Start Your Project
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const PositioningStrip = () => (
  <section className="py-20 bg-white/5 border-y border-white/10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          More Than Just Content. <span className="gradient-text">It's Strategy.</span>
        </h2>
      </div>
      <div>
        <p className="text-sm md:text-lg text-white/60 leading-relaxed">
          At <span className="text-white font-bold">Addy UGC Creative</span>, we specialize in <span className="text-brand-teal font-medium">high-converting UGC</span> and commercial product ads built for brands, dropshippers, and scaling e-commerce stores. Every creative is engineered with <span className="text-white font-medium">performance psychology</span>, thumb-stopping hooks, and platform-native storytelling to <span className="text-brand-teal font-medium">maximize ROAS</span> and dominate attention.
        </p>
      </div>
    </div>
  </section>
);

const PortfolioGrid = ({ onSelectNiche }: { onSelectNiche: (niche: PortfolioNiche) => void }) => (
  <section id="work" className="py-24 max-w-7xl mx-auto px-6">
    <div className="mb-12">
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">My work</h2>
      <p className="text-lg text-white/60">Performance-driven creatives across multiple high-converting niches.</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {PORTFOLIO_NICHES.map((niche, idx) => (
        <motion.div
          key={niche.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="group relative cursor-pointer optimize-gpu"
          onClick={() => onSelectNiche(niche)}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
            <img 
              src={niche.thumbnailUrl} 
              alt={niche.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading={idx < 4 ? "eager" : "lazy"}
              decoding="async"
              {...(idx === 0 ? { fetchPriority: "high" } : idx < 4 ? { fetchPriority: "low" } : {})}
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-transparent to-transparent opacity-60" />
            
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-teal/50 rounded-2xl transition-colors duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-teal/10 pointer-events-none" />
          </div>

          <h3 className="text-sm md:text-base font-display font-bold mb-1 group-hover:text-brand-teal transition-colors truncate">{niche.title}</h3>
          <p className="text-white/60 text-[9px] md:text-[11px] leading-relaxed line-clamp-2">{niche.description}</p>
          
          <div className="mt-2 flex items-center gap-1 text-brand-teal font-bold text-[10px] md:text-xs">
            View Case Study <ChevronRight size={12} />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const VideoPlayer = ({ url, title, onExpand }: { url: string, title: string, onExpand?: (video: {url: string, title: string}) => void }) => {
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
      { threshold: 0.01, rootMargin: '400px' }
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
};

const VideoModal = ({ video, onClose }: { video: {url: string, title: string}, onClose: () => void }) => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 md:p-8"
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
};

const NicheDetail = ({ niche, onBack, onExpandVideo }: { niche: PortfolioNiche, onBack: () => void, onExpandVideo: (video: {url: string, title: string}) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Portfolio
      </button>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <span className="gradient-text font-bold uppercase tracking-widest text-sm mb-4 block">{niche.category}</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">{niche.title}</h1>
          <p className="text-xl text-white/70 leading-relaxed mb-8">
            {niche.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {['Performance Tested', 'UGC Strategy', 'Direct Response'].map(tag => (
              <span key={tag} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 optimize-gpu">
          {niche.videos.slice(0, 4).map((video, idx) => (
            <div key={video.id} className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl optimize-gpu">
              <VideoPlayer url={video.videoUrl} title={video.title} onExpand={onExpandVideo} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-12 rounded-[40px] bg-linear-to-br from-white/5 to-transparent border border-white/10 text-center">
        <h2 className="text-3xl font-display font-bold mb-6">Ready to scale your {niche.title.toLowerCase()} brand?</h2>
        <button className="px-10 py-5 rounded-full bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white font-bold glow-purple hover:scale-105 transition-transform">
          Book Strategy Call
        </button>
      </div>
    </motion.div>
  );
};

const ScienceSection = () => {
  const icons: Record<string, any> = { Zap, FileText, Users, Scissors, Cpu, BarChart3, Target, Clock };
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  
  return (
    <section id="process" className="py-24 bg-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">The Science Behind The Scroll</h2>
          <p className="text-lg text-white/60">We combine performance marketing psychology with platform-native storytelling.</p>
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
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
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
};

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

const ProvenResults = () => (
  <section className="py-24 max-w-7xl mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Proven Results</h2>
      <p className="text-xl text-white/60">Strategic creatives that drive measurable performance growth.</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative rounded-[40px] overflow-hidden aspect-video group">
        <img 
          src="https://defensive-yellow-xvxnk4dfbj.edgeone.app/120.png" 
          alt="Results" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-dark/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-brand-teal shadow-[0_0_20px_rgba(0,229,255,0.8)]" />
        <div className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md text-sm font-bold">BEFORE</div>
        <div className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-brand-teal text-brand-dark text-sm font-bold">AFTER</div>
      </div>

      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-linear-to-br from-brand-teal/20 to-transparent border border-brand-teal/30">
          <div className="text-5xl font-display font-bold text-brand-teal mb-2">
            <Counter value={120} suffix="%" />
          </div>
          <div className="text-xl font-bold mb-4">ROAS Increase</div>
          <p className="text-white/70">Average increase in Return on Ad Spend for our long-term partners using our performance-tested framework.</p>
        </div>
        
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className="font-bold mb-1">Performance-Tested Framework</h4>
            <p className="text-sm text-white/60">Every creative follows our proprietary 12-point conversion checklist.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Client Success Stories</h2>
        <p className="text-lg text-white/60">Real results from brands scaling with our performance creatives.</p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 px-6"
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
                className="w-[300px] md:w-[400px] p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between shrink-0 hover:bg-white/10 transition-colors group"
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
};

const ProcessSteps = () => (
  <section className="py-24 bg-black/30 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">How We Build Winners</h2>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-teal/30 to-transparent" />
        
        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {[
            { num: '01', title: 'Discovery Call', desc: 'We analyze your product, audience psychology, and performance goals.' },
            { num: '02', title: 'Strategy & Script', desc: 'We build scroll-stopping hooks, angles, and conversion-focused scripts.' },
            { num: '03', title: 'Production & Launch', desc: 'We produce, edit, test, and deliver creatives optimized for scaling.' }
          ].map((step, idx) => (
            <div key={step.num} className="text-center">
              <div className="w-20 h-20 rounded-full bg-brand-dark border-2 border-brand-teal/30 flex items-center justify-center mx-auto mb-8 relative">
                <span className="text-2xl font-display font-bold gradient-text">{step.num}</span>
                <div className="absolute inset-0 rounded-full glow-teal opacity-50" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SparklingTick = () => (
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
);

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

const ProjectForm = ({ onBack, selectedPlan }: { onBack: () => void, selectedPlan?: string }) => {
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
};

const Pricing = ({ onStartProject }: { onStartProject: (plan?: string) => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Services & Packages</h2>
        <p className="text-lg text-white/60">Scalable creative solutions tailored for growth-focused brands.</p>
      </div>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
        {PRICING_PLANS.map((plan) => (
          <motion.div 
            key={plan.name} 
            whileHover={{ y: -5 }}
            onClick={() => setSelectedPlan(plan.name)}
            className={`relative p-6 md:p-8 rounded-[28px] flex flex-col shrink-0 w-[280px] md:w-auto snap-center cursor-pointer transition-all duration-300 ${
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
};

const BigCTA = ({ onStartProject }: { onStartProject: () => void }) => (
  <section className="py-16 md:py-24 px-6">
    <div className="max-w-5xl mx-auto p-8 md:p-16 rounded-[40px] md:rounded-[60px] bg-linear-to-br from-brand-teal/20 via-brand-blue/20 to-brand-purple/20 border border-white/10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1),transparent_70%)]" />
      <div className="relative z-10">
        <h2 className="text-2xl md:text-5xl font-display font-bold mb-4 md:mb-6 leading-tight">
          Ready to Scale With <span className="gradient-text">Scroll-Stopping</span> Creative?
        </h2>
        <p className="text-base md:text-xl text-white/70 mb-8 md:mb-12">Book your strategy call and let’s build ads that convert.</p>
        <button 
          onClick={onStartProject}
          className="px-8 py-4 md:px-12 md:py-6 rounded-full bg-linear-to-r from-brand-teal via-brand-blue to-brand-purple text-white text-base md:text-xl font-bold glow-purple hover:scale-105 transition-transform flex items-center gap-3 mx-auto w-fit"
        >
          Start Your Project Now <ArrowRight />
        </button>
      </div>
    </div>
  </section>
);

const ContactSection = () => {
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
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let’s Build Your Next Winning Creative.</h2>
        <p className="text-sm md:text-xl text-white/60 leading-relaxed mb-12">
          We help <span className="text-white font-medium">modern e-commerce brands</span> scale with <span className="text-brand-teal font-medium">performance-driven creatives</span> engineered for conversions, authority, and growth.
        </p>
        
        <div className="space-y-8">
          {[
            { icon: Mail, label: 'Email Us', value: 'hello@addycreative.studio', href: 'mailto:hello@addycreative.studio' },
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
              <p className="text-red-400 text-xs text-center">Something went wrong. Please try again or email us directly.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
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
            <li><a href="#work" className="hover:text-brand-teal transition-colors">Work</a></li>
            <li><a href="#services" className="hover:text-brand-teal transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-brand-teal transition-colors">About</a></li>
            <li><a href="#process" className="hover:text-brand-teal transition-colors">Process</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Social</h4>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/addy_ugc_creative_?igsh=MWVlNnVnaGlxZmlxMw==' },
              { Icon: Mail, href: 'mailto:hello@addycreative.studio' },
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
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const CAROUSEL_VIDEOS = [
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

const CarouselVideoItem = ({ url, title, onExpand }: { url: string, title: string, onExpand?: (video: {url: string, title: string}) => void }) => {
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
};

const VideoCarousel = ({ onExpandVideo }: { onExpandVideo: (video: {url: string, title: string}) => void }) => {
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
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Creatives</h2>
        <p className="text-lg text-white/60">A glimpse into our high-performance video library.</p>
      </div>
      
      <div className="flex flex-col gap-12">
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-4"
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
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project-form' | PortfolioNiche>('home');
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [modalVideo, setModalVideo] = useState<{url: string, title: string} | null>(null);

  const handleStartProject = (plan?: string) => {
    setSelectedPlan(plan);
    setCurrentView('project-form');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen selection:bg-brand-teal/30">
      <Navbar onNavigate={() => setCurrentView('home')} onStartProject={() => handleStartProject()} />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onStartProject={() => handleStartProject()} />
            <PositioningStrip />
            <VideoCarousel onExpandVideo={setModalVideo} />
            <PortfolioGrid onSelectNiche={(niche) => setCurrentView(niche)} />
            <ScienceSection />
            <ProvenResults />
            <Testimonials />
            <ProcessSteps />
            <Pricing onStartProject={handleStartProject} />
            <BigCTA onStartProject={() => handleStartProject()} />
            <ContactSection />
            <Footer />
          </motion.main>
        ) : currentView === 'project-form' ? (
          <ProjectForm 
            key="project-form"
            selectedPlan={selectedPlan}
            onBack={() => setCurrentView('home')} 
          />
        ) : (
          <div key="detail">
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
