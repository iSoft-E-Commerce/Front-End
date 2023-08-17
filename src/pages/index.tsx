import { SliderBannerAds } from '@/components/home/SliderBannerAds';
import { SliderProducts } from '@/components/home/SliderProducts';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { type GetServerSideProps } from 'next';
import type { FC } from 'react';
import { type PaginatedProducts, iSoftClient } from '../../client';
import Link from 'next/link';

type HomeProps = {
  newProducts: PaginatedProducts | null;
  discountProducts: PaginatedProducts | null;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx,
) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
  );
  const limit = 8;
  const skip = 0;
  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const newProducts =
      await client.productEndpoints.productControllerGetPaginatedNewProducts({
        limit,
        skip,
      });
    const discountProducts =
      await client.productEndpoints.productControllerGetPaginatedDiscountProducts(
        { limit, skip },
      );
    return {
      props: { newProducts, discountProducts },
    };
  } catch (err) {
    return {
      props: { newProducts: null, discountProducts: null },
    };
  }
};

const Home: FC<HomeProps> = ({ newProducts, discountProducts }) => {
  return (
    <>
      <SliderBannerAds />
      <Link
        href={'/products/new-products'}
        className="block text-center w-fit mx-auto hover:font-light transition-all duration-500"
      >
        <Title
          titleTag={'h2'}
          classNameModificator="text-center text-darkGray-100 pt-8 md:pt-12 uppercase tracking-wider"
        >
          Новинки
        </Title>
        <span className=" text-darkGray-60  underline">Переглянути всі</span>
      </Link>
      {newProducts?.itemsPerPage.length ? (
        <SliderProducts products={newProducts?.itemsPerPage} />
      ) : (
        <WarningMessage classNameModificator="text-center p-8 md-p-12 border-b">
          Наразі немає товарів у цій категорії
        </WarningMessage>
      )}
      <Link
        href={'/products/discount-products'}
        className="block text-center w-fit mx-auto hover:font-light transition-all duration-500"
      >
        <Title
          titleTag={'h2'}
          classNameModificator="text-center text-darkGray-100 pt-8 md:pt-12 uppercase tracking-widest"
        >
          Акційні товари
        </Title>
        <span className=" text-darkGray-60  underline">Переглянути всі</span>
      </Link>
      {discountProducts?.itemsPerPage.length ? (
        <SliderProducts products={discountProducts?.itemsPerPage} />
      ) : (
        <WarningMessage classNameModificator="text-center p-8 md-p-12">
          Наразі немає товарів у цій категорії
        </WarningMessage>
      )}
    </>
  );
};

export default Home;
