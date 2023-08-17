import { createContext } from 'react';
import type { LocalBasketProduct, Product } from '../../client';

export type BasketCtx = {
  userBasket: LocalBasketProduct[] | undefined;
  totalBasketPrice: number | undefined;
  isBasketLoading: boolean;
  isFetching: boolean;
  isBasketPopUpOpen: boolean;
  isActiveBuyButton: number | null;
  toggleBasket: () => void;
  addBasketProduct: (product: Product) => Promise<void>;
  removeBasketProduct: (id: number, isDelete: boolean) => Promise<void>;
  createOrder: () => Promise<void>;
};

export const BasketContext = createContext<BasketCtx>({
  userBasket: [],
  totalBasketPrice: 0,
  isBasketLoading: false,
  isFetching: false,
  isBasketPopUpOpen: false,
  isActiveBuyButton: null,
  toggleBasket: () => {},
  addBasketProduct: async () => {},
  removeBasketProduct: async () => {},
  createOrder: async () => {},
});
