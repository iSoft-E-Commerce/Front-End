import { BasketContext } from '@/context/basketContext';
import Link from 'next/link';
import { type FC, useContext } from 'react';
import { WarningMessage } from './WarningMessage';
import clsx from 'clsx';

export const BasketPopUp: FC = () => {
  const { isBasketPopUpOpen, userBasket, totalBasketPrice, isBasketLoading } =
    useContext(BasketContext);

  return (
    <div
      className={clsx(
        'hidden flex-col gap-3 w-[550px] absolute top-[100%] -right-5 p-3 border border-darkGray-80 shadow-md bg-white z-50',
        isBasketPopUpOpen ? 'md:flex' : null,
      )}
    >
      {userBasket?.length && !isBasketLoading ? (
        <>
          <div className="flex flex-col gap-3 max-h-basketPopUpProducts overflow-auto pr-2">
            {userBasket.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center gap-5 border-b py-1.5 text-parS"
              >
                <Link
                  href={`/products/${product.description}`}
                  className="flex items-center gap-2 hover:text-darkGray-10 hover:underline font-medium"
                >
                  <img
                    className="w-10 h-10"
                    src={product.img}
                    alt={product.description}
                  />
                  <p className="text-center lg:text-left">
                    {product.description}
                  </p>
                </Link>
                {product.price.discount ? (
                  <div className="flex flex-col items-center gap-1  whitespace-nowrap">
                    <span className="line-through text-quot font-medium text-darkGray-60">
                      {product.price.price} грн/шт
                    </span>
                    <span className="text-discountColor text-parS font-bold">
                      {product.quantity} X{' '}
                      {product.price.price - product.price.discount} грн/шт
                    </span>
                  </div>
                ) : (
                  <p className="text-parS font-bold whitespace-nowrap">
                    {product.quantity} X {product.price.price} грн/шт
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-parS">
              <span className="font-bold">До сплати: </span>
              {totalBasketPrice} грн
            </p>
            <Link
              href="/basket"
              className="w-52 text-center px-3 py-1 border border-black hover:bg-black hover:text-white font-medium ease-out duration-500"
            >
              Перейти до кошика
            </Link>
          </div>
        </>
      ) : !isBasketLoading ? (
        <WarningMessage classNameModificator="relative text-center">
          Кошик порожній!
        </WarningMessage>
      ) : (
        <div className="w-10 h-10 rounded-full mx-auto border-t-4 border-b-4 border-4 border-transparent border-t-darkGray-60 border-b-darkGray-20 animate-spin" />
      )}
    </div>
  );
};
