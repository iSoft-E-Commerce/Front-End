import { useCompareContext } from '@/context/CompareContextProvider';
import React, { type FC } from 'react';
import type { Product } from '../../../client';
import clsx from 'clsx';

export type AddToCompareProps = {
  product: Product;
  modificator?: string;
};
export const AddToCompare: FC<AddToCompareProps> = ({
  product,
  modificator,
}) => {
  const { compareProductHandler, compareProducts } = useCompareContext();
  const isCompare = compareProducts.find((pr) => pr.id === product.id);
  return (
    <button
      onClick={() => compareProductHandler(product)}
      className={clsx('flex items-center gap-1 text-quot', modificator)}
    >
      <span>{isCompare ? 'У порівнянні' : 'До порівняння'}</span>
      <img
        className={clsx('w-5 h-5', isCompare ? 'sepia' : null)}
        src={'/icons/compare-logo.svg'}
        alt="compare-logo"
      />
    </button>
  );
};
