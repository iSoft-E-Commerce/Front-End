import { createContext } from 'react';
import type { Product } from '../../client';

export type CompareCtx = {
  compareProducts: Product[];
  compareProductHandler: (product: Product) => void;
};

export const CompareContext = createContext<CompareCtx | null>(null);
