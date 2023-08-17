import { type FC } from 'react';
import { type Product } from '../../../client';
import { BuyProductButton } from '../ui/BuyProductButton';

export type ProductPriceProps = {
  product: Product;
};

export const ProductPrice: FC<ProductPriceProps> = ({ product }) => {
  const { isAvailable, price } = product;

  return (
    <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
      {isAvailable ? (
        <>
          {price.discount ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="line-through text-parS font-medium text-darkGray-60">
                  {price.price} грн
                </span>
                <span className="px-[3px] bg-error-80 bg-opacity-40 text-discountColor text-parS">
                  -{price.discount} грн
                </span>
              </div>
              <span className="text-discountColor text-dispS1 font-bold">
                {price.price - price.discount} грн
              </span>
            </div>
          ) : (
            <div>
              <span className="text-dispS1 font-bold">{price.price} грн</span>
            </div>
          )}
        </>
      ) : (
        <>
          {price.discount ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="line-through text-parS font-medium text-darkGray-20">
                  {price.price} грн
                </span>
              </div>
              <span className="text-darkGray-20 text-dispS1 font-bold">
                {price.price - price.discount} грн
              </span>
            </div>
          ) : (
            <div>
              <span className="text-dispS1 font-bold text-darkGray-20">
                {price.price} грн
              </span>
            </div>
          )}
        </>
      )}
      <BuyProductButton
        product={product}
        classNameModificator="p-1.5 max-w-productBtn w-full"
      />
    </div>
  );
};
