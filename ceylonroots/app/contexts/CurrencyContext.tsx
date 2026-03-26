"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Currency = "USD" | "EUR" | "GBP" | "AUD" | "LKR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Record<Currency, number>;
  format: (usdAmount: number) => string;
  symbol: string;
}

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  LKR: "Rs",
};

// Fallback rates in case the API is unavailable
const FALLBACK_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.54,
  LKR: 305,
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  rates: FALLBACK_RATES,
  format: (amount) => `$${amount.toLocaleString()}`,
  symbol: "$",
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);

  useEffect(() => {
    // Restore saved currency preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferredCurrency") as Currency;
      if (saved && Object.keys(FALLBACK_RATES).includes(saved)) {
        setCurrencyState(saved);
      }
    }

    // Fetch live exchange rates (free API, no key required)
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates) {
          setRates({
            USD: 1,
            EUR: data.rates.EUR ?? FALLBACK_RATES.EUR,
            GBP: data.rates.GBP ?? FALLBACK_RATES.GBP,
            AUD: data.rates.AUD ?? FALLBACK_RATES.AUD,
            LKR: data.rates.LKR ?? FALLBACK_RATES.LKR,
          });
        }
      })
      .catch(() => {
        // Keep fallback rates on error
      });
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredCurrency", c);
    }
  };

  const format = (usdAmount: number): string => {
    const converted = usdAmount * rates[currency];
    const symbol = SYMBOLS[currency];
    // Use fixed locale 'en-US' to avoid SSR/client hydration mismatch
    const rounded = Math.round(converted);
    const formatted = rounded.toLocaleString("en-US");
    if (currency === "LKR") return `${symbol} ${formatted}`;
    return `${symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        format,
        symbol: SYMBOLS[currency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export type { Currency };
