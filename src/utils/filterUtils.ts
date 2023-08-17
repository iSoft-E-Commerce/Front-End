import type { Product } from '../../client';

export const priceFilter = (products: Product[], priceQuery: string) => {
  if (priceQuery) {
    return priceQuery === 'desc'
      ? products.sort((a, b) => a.price.price - b.price.price)
      : products.sort((a, b) => b.price.price - a.price.price);
  }
};
