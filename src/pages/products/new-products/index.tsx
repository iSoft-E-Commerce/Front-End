import ProductCardsListGrid from '@/components/product/ProductCardsListGrid';
import { Pagination } from '@/components/ui/Pagination';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { type PaginatedProducts, iSoftClient } from '../../../../client';
import { SectionLayout } from '@/components/layout/SectionLayout';

type NewProductsProps = {
  newProducts: PaginatedProducts | null;
  pageNum: number;
  pagesCount?: number;
};

const limit = 12;

export const getServerSideProps: GetServerSideProps<NewProductsProps> = async (
  ctx,
) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
  );
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const skip = (pageNum - 1) * 9;

  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const newProducts =
      await client.productEndpoints.productControllerGetPaginatedNewProducts({
        limit,
        skip,
      });

    const pagesCount = Math.ceil(newProducts.total / limit);

    return {
      props: { newProducts, pagesCount, pageNum },
    };
  } catch (err) {
    return {
      props: { newProducts: null, pageNum },
    };
  }
};

const NewProducts: FC<NewProductsProps> = ({
  newProducts,
  pagesCount,
  pageNum,
}) => {
  return (
    <SectionLayout classNameModificator="pt-8">
      <Title
        titleTag={'h2'}
        classNameModificator="text-center text-darkGray-100 md:pt-12 uppercase tracking-widest pointer-events-none"
      >
        Новинки
      </Title>
      <Link
        href={'/'}
        className="block text-darkGray-60 underline mb-4 md:mb-8 hover:font-light transition-all duration-500"
      >
        На головну
      </Link>
      {newProducts && pagesCount ? (
        <>
          <ProductCardsListGrid products={newProducts.itemsPerPage} />
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

export default NewProducts;
