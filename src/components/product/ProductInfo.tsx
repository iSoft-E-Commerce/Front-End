import { calculateRate } from '@/utils/calculateRate';
import { productMatcher } from '@/utils/productMatcher';
import clsx from 'clsx';
import { useMemo, useState, type FC } from 'react';
import type { Product } from '../../../client';
import Tab from '../ui/Tab';
import { AllCharacteristics } from './AllCharacteristics';
import { MainCharacteristics } from './MainCharacteristics';
import { ProductFilter } from './ProductFilter';
import { ProductPrice } from './ProductPrice';
import { Question } from './Question';
import { Reviews } from './Reviews';
import { StarRating } from './StarRating';
import { AddToWishlistButton } from '../ui/AddToWishlistButton';
import { AddToCompare } from './AddToCompare';

export type ProductInfoProps = {
  product: Product;
  theSameProducts: Product[];
};

export const ProductInfo: FC<ProductInfoProps> = ({
  product,
  theSameProducts,
}) => {
  const {
    color,
    id,
    img,
    price,
    isAvailable,
    isNewProduct,
    memory,
    name,
    description,
    characteristics,
    additionalCharacteristics,
    rating: { rating },
  } = product;

  const [activeTab, setActiveTab] = useState(1);
  const { memory: matchedMemory, colors } = useMemo(
    () => productMatcher(theSameProducts, color),
    [theSameProducts, color],
  );

  const average = useMemo(() => calculateRate(rating), [rating]);
  return (
    <div>
      <div className="border-b border-opacity-40 border-darkGray-10 my-5" />
      <div className="flex justify-between items-center lg:flex-row flex-col lg:items-start mt-0 lg:mt-10 mb-10">
        <div className="min-w-[280px] w-full max-w-[420px] p-2.5 mb-8 lg:mb-0 relative z-[1]">
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
            className={clsx('max-w-full', isAvailable ? null : 'opacity-50')}
            src={img}
            alt={name}
          />
        </div>
        <div className="max-w-full lg:max-w-[900px] w-full md:mx-0 mx-auto grow">
          <div className="shadow-productInfo p-4 mb-4">
            <div className="flex items-center justify-between pointer-events-none">
              {isAvailable ? (
                <span className="text-quot font-medium">Є в наявності</span>
              ) : (
                <span className="text-quot font-medium">Немає в наявності</span>
              )}
              <div className="flex items-center gap-1">
                <StarRating classNameModificator="w-4 h-4" rating={average} />
                {average > 0 ? (
                  <span className="text-parM font-medium">{average}</span>
                ) : null}
              </div>
            </div>
            <h1 className="text-dispS2 lg:text-dispS1 font-medium  pointer-events-none">
              {description}
            </h1>
            <div className="flex gap-4 items-center max-[450px]:justify-center mb-3 mt-1 max-[450px]:mt-3">
              <AddToWishlistButton
                classNameModificator="max-[450px]:flex-col-reverse"
                wishlistProduct={product}
              />
              <AddToCompare
                modificator="max-[450px]:flex-col-reverse"
                product={product}
              />
            </div>
            <ProductFilter
              color={color}
              colors={colors}
              matchedMemory={matchedMemory}
              memory={memory}
            />
            <ProductPrice product={product} />
          </div>
          <MainCharacteristics characteristics={characteristics} />
        </div>
      </div>
      <div className="border-b border-opacity-40 border-darkGray-10 my-5" />
      <div className="flex flex-col sm:flex-row items-center justify-start gap-0.5 mb-7">
        <Tab
          label="Характеристики"
          onClick={() => setActiveTab(1)}
          classNameModificator="py-1.5 px-5 border border-black max-w-full sm:max-w-productBtn w-full text-center"
          isActive={activeTab === 1 ? 'bg-black text-white' : null}
        />
        <Tab
          label="Відгуки"
          onClick={() => setActiveTab(2)}
          classNameModificator="py-1.5 px-5 border border-black max-w-full sm:max-w-productBtn w-full text-center"
          isActive={activeTab === 2 ? 'bg-black text-white' : null}
        />
        <Tab
          label="Питання"
          onClick={() => setActiveTab(3)}
          classNameModificator="py-1.5 px-5 border border-black max-w-full sm:max-w-productBtn w-full text-center"
          isActive={activeTab === 3 ? 'bg-black text-white' : null}
        />
      </div>
      {activeTab === 1 ? (
        <AllCharacteristics
          additionalCharacteristics={additionalCharacteristics}
          characteristics={characteristics}
        />
      ) : null}
      {activeTab === 2 ? <Reviews productId={id} rate={rating} /> : null}
      {activeTab === 3 ? <Question productId={id} rate={rating} /> : null}
    </div>
  );
};
