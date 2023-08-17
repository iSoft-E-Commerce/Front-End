import { type FC } from 'react';
import { type Product } from '../../../client';
import { ProductCard } from './ProductCard';
import clsx from 'clsx';

type ProductCardsListGridProps = {
  products: Product[];
  gridModificator?: string;
};

const ProductCardsListGrid: FC<ProductCardsListGridProps> = ({
  products,
  gridModificator,
}) => {
  return (
    <>
      <div
        className={clsx(
          'grid gap-4 pb-8',
          gridModificator ||
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        )}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductCardsListGrid;
