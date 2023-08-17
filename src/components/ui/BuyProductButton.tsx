import { BasketContext } from '@/context/basketContext';
import clsx from 'clsx';
import { type FC, useContext } from 'react';
import { type Product } from '../../../client';

export type BuyProductButton = {
  product: Product;
  classNameModificator?: string;
};
export const BuyProductButton: FC<BuyProductButton> = ({
  classNameModificator,
  product,
}) => {
  const {
    userBasket,
    isFetching,
    addBasketProduct,
    isActiveBuyButton,
    isBasketLoading,
  } = useContext(BasketContext);
  const { isAvailable } = product;

  const isProductInBasket = userBasket?.some((item) => item.id === product.id);

  const disabled =
    !isAvailable ||
    isActiveBuyButton === product.id ||
    isProductInBasket ||
    isBasketLoading;

  return (
    <button
      disabled={disabled}
      className={clsx(
        'flex justify-center items-center text-dispS3 lg:text-dispS3 font-medium border border-black transition-all duration-150 h-productBtn',
        disabled
          ? 'bg-darkSkyBlue-10 hover:bg-darkSkyBlue-10 hover:text-black opacity-60'
          : 'hover:bg-black hover:text-white',
        classNameModificator,
      )}
      onClick={() => addBasketProduct(product)}
      type="button"
    >
      {(isFetching && isActiveBuyButton === product.id) || isBasketLoading ? (
        <span className="w-8 h-8 rounded-full border-t-2 border-b-2 border-2 border-transparent border-t-darkGray-60 border-b-darkGray-20 animate-spin" />
      ) : (
        <>{isProductInBasket ? 'У кошику' : 'Купити'}</>
      )}
    </button>
  );
};
