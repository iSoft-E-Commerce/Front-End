import { SectionLayout } from '@/components/layout/SectionLayout';
import ProductCardsListGrid from '@/components/product/ProductCardsListGrid';
import { EmptyProductsMessage } from '@/components/ui/EmptyProductsMessage';
import { useWishlist } from '@/context/WishlistContext';
import { type FC } from 'react';

const WishList: FC = () => {
  const { userWishlist } = useWishlist();
  return (
    <SectionLayout classNameModificator="pt-5">
      {userWishlist?.length ? (
        <ProductCardsListGrid products={userWishlist}></ProductCardsListGrid>
      ) : (
        <EmptyProductsMessage
          img="/icons/heart-logo.svg"
          title="Наразі список бажань порожній!"
        />
      )}
    </SectionLayout>
  );
};

export default WishList;
