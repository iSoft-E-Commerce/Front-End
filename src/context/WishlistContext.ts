import { createContext, useContext } from 'react';
import { type Product } from '../../client';

type WishlistContextType = {
  isWishlistLoading: boolean;
  isFetching: boolean;
  userWishlist: Product[] | undefined;
  addWishlistProduct: (product: Product) => Promise<void>;
  removeWishlistProduct: (id: number) => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
};
