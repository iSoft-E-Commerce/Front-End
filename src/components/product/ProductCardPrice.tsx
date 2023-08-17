import { type FC } from 'react';
import { type Product } from '../../../client';
import { BuyProductButton } from '../ui/BuyProductButton';

export type ProductPriceProps = {
  product: Product;
};

export const ProductCardPrice: FC<ProductPriceProps> = ({ product }) => {
  const { isAvailable, price } = product;

  return (
    <div className="flex justify-between items-center flex-col gap-1 w-full">
      {isAvailable ? (
        <>
          {price.discount ? (
            <div className="flex flex-col h-12">
              <div className="flex items-center gap-2">
                <span className="line-through text-quot font-medium text-darkGray-60">
                  {price.price} грн
                </span>
                <span className="px-[3px] bg-error-80 bg-opacity-40 text-discountColor text-quot">
                  -{price.discount} грн
                </span>
              </div>
              <span className="text-discountColor text-dispS3 font-bold">
                {price.price - price.discount} грн
              </span>
            </div>
          ) : (
            <div className="flex justify-center items-center h-12">
              <span className="text-dispS3 font-bold text-darkGray-90">
                {price.price} грн
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          {price.discount ? (
            <div className="flex flex-col h-12">
              <div className="flex items-center gap-2">
                <span className="line-through text-quot font-medium text-darkGray-20">
                  {price.price} грн
                </span>
              </div>
              <span className="text-darkGray-20 text-dispS3 font-bold">
                {price.price - price.discount} грн
              </span>
            </div>
          ) : (
            <div className="h-12">
              <span className="text-dispS3 font-bold text-darkGray-20">
                {price.price} грн
              </span>
            </div>
          )}
        </>
      )}
      <BuyProductButton
        product={product}
        classNameModificator="max-w-productBtn w-full text-parM"
      />
      {isAvailable ? (
        <p className="text-quot font-medium text-center pb-2">Є в наявності</p>
      ) : (
        <p className="text-quot font-medium text-center pb-2">
          Немає в наявності
        </p>
      )}
    </div>
  );
};
