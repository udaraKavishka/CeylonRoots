"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { TravelPackage } from "../types/travel";

interface CompareContextType {
  compareList: TravelPackage[];
  addToCompare: (pkg: TravelPackage) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType>({
  compareList: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  isInCompare: () => false,
  clearCompare: () => {},
  canAdd: true,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<TravelPackage[]>([]);

  const addToCompare = (pkg: TravelPackage) => {
    if (compareList.length >= 3) return;
    if (compareList.some((p) => String(p.id) === String(pkg.id))) return;
    setCompareList((prev) => [...prev, pkg]);
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => String(p.id) !== id));
  };

  const isInCompare = (id: string) =>
    compareList.some((p) => String(p.id) === id);

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        canAdd: compareList.length < 3,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
