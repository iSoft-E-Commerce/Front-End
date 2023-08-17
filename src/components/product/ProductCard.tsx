import { calculateRate } from '@/utils/calculateRate';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo, type FC } from 'react';
import { type Product } from '../../../client';
import { AddToWishlistButton } from '../ui/AddToWishlistButton';
import { ProductCardPrice } from './ProductCardPrice';
import { StarRating } from './StarRating';
import Image from 'next/image';
import { AddToCompare } from './AddToCompare';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { img, price, isAvailable, isNewProduct, name, description, rating } =
    product;
  const average = useMemo(() => calculateRate(rating.rating), [rating.rating]);

  return (
    <div className="h-full my-1 flex flex-col justify-stretch shadow-productInfo px-4 py-2.5 hover:scale-[0.98] transition-all duration-500 max-w- w-full mx-auto">
      <Link
        href={`/products/${description}`}
        className="block w-full mx-auto mb-3 border-b pb-3 relative h-[170px]"
      >
        {isNewProduct ? (
          <span className="absolute z-[2] top-0 left-0 block bg-green-400 rounded-sm text-parS p-1.5 text-white font-semibold">
            Новинка
          </span>
        ) : null}
        {isAvailable && price.discount ? (
          <span className="absolute z-[2] top-0 right-0 block bg-error-100 rounded-sm text-parS p-1.5 text-white font-semibold">
            Знижка
          </span>
        ) : null}
        <img
          className={clsx(
            'max-w-[170px] mx-auto w-full',
            isAvailable ? null : 'opacity-50',
          )}
          src={img}
          loading="lazy"
          alt={name}
        />
      </Link>
      <div>
        <Link
          href={`/products/${description}`}
          className="flex h-[65px] items-center justify-center"
        >
          <h3 className="block max-h-[65px] overflow-hidden text-darkGray-80 text-parS text-center font-medium mb-1">
            {description}
          </h3>
        </Link>
        <div className="flex justify-between items-center border-b w-full mb-1 pb-1">
          <div className="flex items-center gap-1">
            <StarRating classNameModificator="w-3 h-3" rating={average} />
            {average > 0 ? (
              <span className="text-quot font-medium mt-0.5 text-darkGray-40">
                {average}
              </span>
            ) : null}
          </div>
          <AddToWishlistButton wishlistProduct={product} />
        </div>
        <div className="flex justify-end mb-3">
          <AddToCompare product={product} />
        </div>
        <ProductCardPrice product={product} />
      </div>
    </div>
  );
};
