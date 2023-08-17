import React, { type FC, useContext } from 'react';
import { type LocalBasketProduct } from '../../../client';
import Link from 'next/link';
import BasketQuantityButton from './BasketQuantityButton';
import { BasketContext } from '@/context/basketContext';

type BasketPageProductProps = {
  basketProduct: LocalBasketProduct;
};

export const BasketPageProduct: FC<BasketPageProductProps> = ({
  basketProduct,
}) => {
  const { removeBasketProduct, addBasketProduct, isFetching } =
    useContext(BasketContext);
  const { quantity, description, img, id, price } = basketProduct;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b py-2 sm:py-4 text-parS sm:text-parM lg:text-dispS3">
      <Link
        href={`/products/${description}`}
        className="flex flex-col md:flex-row w-full sm:w-1/2 md:w-2/3 items-center gap-1 sm:gap-3 hover:text-darkGray-10 hover:underline font-medium"
      >
        <img
          className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-contain"
          src={img}
          alt={description}
        />
        <p className="text-center md:text-left">{description}</p>
      </Link>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-3 w-1/2">
        <div className="flex gap-1">
          <BasketQuantityButton
            variant="decr"
            quantity={quantity}
            handleClick={() => removeBasketProduct(id, false)}
          />
          <p className="py-1 px-3 text-center border pointer-events-none border-darkGray-10">
            {quantity}
          </p>
          <BasketQuantityButton
            variant="incr"
            quantity={quantity}
            handleClick={() => addBasketProduct(basketProduct)}
          />
        </div>
        {price.discount ? (
          <div className="flex flex-col text-center whitespace-nowrap">
            <div className="flex items-center justify-between gap-2">
              <span className="line-through text-quot font-medium text-darkGray-60">
                {price.price} грн.шт
              </span>
              <span className="px-[3px] bg-error-80 bg-opacity-40 text-discountColor text-quot lg:text-parS">
                -{price.discount} грн
              </span>
            </div>
            <span className="text-discountColor font-bold">
              {price.price - price.discount} грн/шт
            </span>
          </div>
        ) : (
          <p className="text-center font-bold whitespace-nowrap">
            {price.price} грн/шт
          </p>
        )}
        <button
          disabled={isFetching}
          className="p-1 hover:scale-110 ease-out duration-200"
          onClick={() => removeBasketProduct(id, true)}
        >
          <img
            className="w-6 h-6 lg:w-10 min-w-[24px] lg:h-10"
            src="/icons/trash-logo.svg"
            alt="delete-product"
          />
        </button>
      </div>
    </div>
  );
};
