import { FilterPanel } from '@/components/category/FilterPanel';
import { ProductsPanel } from '@/components/category/ProductsPanel';
import { Pagination } from '@/components/ui/Pagination';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import {
  iSoftClient,
  type FilteredProducts,
  type Product,
} from '../../../client';
import { SectionLayout } from '@/components/layout/SectionLayout';

export type CategoryProductsProps = {
  products: Product[] | null;
  pageNum: number;
  pagesCount?: number;
  filteredProducts: FilteredProducts | null;
};

export const getServerSideProps: GetServerSideProps<
  CategoryProductsProps
> = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
  );
  function convertObjectToQueryString(obj: Record<string, string>) {
    const queryString = Object.entries(obj)
      .filter(([key]) => key !== 'name' && key !== 'page')
      .map(([key, value]) => {
        return `${key}=${value};`;
      })
      .join('');

    return queryString;
  }
  const filter = convertObjectToQueryString(
    ctx.query as Record<string, string>,
  );

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const skip = (pageNum - 1) * 6;
  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const products =
      await client.productEndpoints.productControllerGetProductsByName({
        nameTypeId: ctx.query.name as string,
        limit: 6,
        skip,
        filter,
      });
    const pagesCount = Math.ceil(products.total / 6);
    return {
      props: {
        products: products.itemsPerPage,
        pageNum,
        pagesCount,
        filteredProducts: products.filteredProducts,
      },
    };
  } catch (err) {
    return {
      props: { products: null, pageNum, filteredProducts: null },
    };
  }
};

const Category: FC<CategoryProductsProps> = ({
  pageNum,
  products,
  pagesCount,
  filteredProducts,
}) => {
  const router = useRouter();
  return (
    <SectionLayout classNameModificator="pt-5">
      <h1 className="text-dispS1 font-medium mb-3">{router.query.name}</h1>
      <div className="flex items-start">
        <div className="max-w-[250px] w-full mr-4 md:block hidden">
          <FilterPanel products={filteredProducts} />
        </div>
        <div className="grow">
          <ProductsPanel
            filteredProducts={filteredProducts}
            pageNum={pageNum}
            products={products}
            pagesCount={pagesCount}
          />
          {pagesCount! > 1 ? (
            <Pagination
              activePageNumber={pageNum}
              pagesCount={pagesCount as number}
            />
          ) : null}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Category;
