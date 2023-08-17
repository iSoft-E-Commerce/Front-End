import { ProductInfo } from '@/components/product/ProductInfo';
import { WarningMessage } from '@/components/ui/WarningMessage';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';
import { iSoftClient, type Product } from '../../../client';
import { SectionLayout } from '@/components/layout/SectionLayout';

export type ProductProps = {
  product: Product | null;
  theSameProducts: Product[] | null;
};

export const getServerSideProps: GetServerSideProps<ProductProps> = async (
  ctx,
) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
  );
  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const product =
      await client.productEndpoints.productControllerGetProductByDescription({
        description: ctx.query.description as string,
      });
    const theSameProducts =
      await client.productEndpoints.productControllerGetTheSameProducts({
        name: product.name,
      });
    return {
      props: { product, theSameProducts },
    };
  } catch (err) {
    return {
      props: { product: null, theSameProducts: null },
    };
  }
};

const Product: FC<ProductProps> = ({ product, theSameProducts }) => {
  if (!product) {
    return (
      <WarningMessage>Наразі немає інформації про продукт.</WarningMessage>
    );
  }
  return (
    <SectionLayout>
      <ProductInfo theSameProducts={theSameProducts!} product={product} />
    </SectionLayout>
  );
};

export default Product;
