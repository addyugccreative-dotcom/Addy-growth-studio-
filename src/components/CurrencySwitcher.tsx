import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe } from 'lucide-react';
import { CurrencyCode, CURRENCIES } from '../hooks/useCurrency';

interface CurrencySwitcherProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
}

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ currentCurrency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencies: CurrencyCode[] = ['USD', 'INR'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold text-white/80 hover:text-white"
      >
        <Globe size={14} className="text-brand-teal" />
        <span>{currentCurrency}</span>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-32 bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="py-1">
              {currencies.map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    onCurrencyChange(code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-white/10 flex items-center justify-between ${
                    currentCurrency === code ? 'text-brand-teal bg-brand-teal/5' : 'text-white/70'
                  }`}
                >
                  <span>{code}</span>
                  <span className="text-[10px] opacity-50">{CURRENCIES[code].symbol}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySwitcher;
