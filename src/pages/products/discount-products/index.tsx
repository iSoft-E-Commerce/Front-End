import ProductCardsListGrid from '@/components/product/ProductCardsListGrid';
import { Pagination } from '@/components/ui/Pagination';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { type PaginatedProducts, iSoftClient } from '../../../../client';
import { SectionLayout } from '@/components/layout/SectionLayout';

type DiscountProductsProps = {
  discountProducts: PaginatedProducts | null;
  pageNum: number;
  pagesCount?: number;
};

export const getServerSideProps: GetServerSideProps<
  DiscountProductsProps
> = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
  );
  let pageNum = 1;
  const limit = 12;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);
  const skip = (pageNum - 1) * limit;

  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const discountProducts =
      await client.productEndpoints.productControllerGetPaginatedDiscountProducts(
        { limit, skip },
      );

    const pagesCount = Math.ceil(discountProducts.total / limit);

    return {
      props: { discountProducts, pagesCount, pageNum },
    };
  } catch (err) {
    return {
      props: { discountProducts: null, pageNum },
    };
  }
};

const DiscountProducts: FC<DiscountProductsProps> = ({
  discountProducts,
  pagesCount,
  pageNum,
}) => {
  return (
    <SectionLayout classNameModificator="pt-8">
      <Title
        titleTag={'h2'}
        classNameModificator="text-center text-darkGray-100 md:pt-12 uppercase tracking-widest pointer-events-none"
      >
        Акційні товари
      </Title>
      <Link
        href={'/'}
        className="block mb-4 md:mb-8 text-darkGray-60 underline hover:font-light transition-all duration-500"
      >
        На головну
      </Link>
      {discountProducts && pagesCount ? (
        <>
          <ProductCardsListGrid products={discountProducts.itemsPerPage} />
          {pagesCount > 1 ? (
            <Pagination activePageNumber={pageNum} pagesCount={pagesCount} />
          ) : null}
        </>
      ) : (
        <WarningMessage>
          Нажаль товарів у цій категорії не знайдено
        </WarningMessage>
      )}
    </SectionLayout>
  );
};

export default DiscountProducts;
