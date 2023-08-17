import { sliderProductsSettings } from '@/utils/sliderProductsSettings';
import { type FC } from 'react';
import Slider from 'react-slick';
import { type Product } from '../../../client';
import { ProductCard } from '../product/ProductCard';

type SliderProductsProps = {
  products: Product[];
};

export const SliderProducts: FC<SliderProductsProps> = ({ products }) => {
  return (
    <div className="product-slider-container md:max-w-medium lg:max-w-xl px-1.5 py-4 sm:px-8 mx-auto">
      <Slider {...sliderProductsSettings}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
};
