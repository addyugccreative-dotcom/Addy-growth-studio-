import { useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'INR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$' },
  INR: { code: 'INR', symbol: '₹' },
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.USD);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Simple geo-detection using a free API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'IN') {
          setCurrency(CURRENCIES.INR);
        } else {
          setCurrency(CURRENCIES.USD);
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
        // Fallback to USD
      }
    };

    detectCurrency();
  }, []);

  const formatPrice = (usdPrice: number, inrPrice?: number) => {
    if (currency.code === 'INR' && inrPrice !== undefined) {
      return `${currency.symbol}${inrPrice.toLocaleString()}`;
    }
    return `${currency.symbol}${usdPrice.toLocaleString()}`;
  };

  return {
    currency,
    setCurrency: (code: CurrencyCode) => setCurrency(CURRENCIES[code]),
    formatPrice,
  };
};
