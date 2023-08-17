import ProductCardsListGrid from '@/components/product/ProductCardsListGrid';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import { type FC } from 'react';
import { Title } from '../ui/Title';

export const UserWishlist: FC = () => {
  const { userWishlist } = useWishlist();
  return (
    <section className="w-full">
      <Title
        classNameModificator="text-darkGray-100 text-center mb-6"
        titleTag={'h2'}
      >
        Мій список бажань
      </Title>
      {userWishlist?.length ? (
        <ProductCardsListGrid
          products={userWishlist}
          gridModificator="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      ) : (
        <div className="text-parS md:text-parM font-medium text-center relative z-[1] min-h-[35vh] flex flex-col justify-center items-center">
          <img
            className="w-80 h-80 z-[-1] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src="/icons/heart-logo.svg"
            alt="heart-icon"
          />
          <WarningMessage classNameModificator="p-2.5 border w-fit mx-auto border-yellow-80 rounded-md mb-3">
            Наразі список бажань порожній
          </WarningMessage>
          <Link
            href="/"
            className="underline text-darkGray-60 hover:text-darkGray-100 transition-all duration-200"
          >
            Перейти до покупок
          </Link>
        </div>
      )}
    </section>
  );
};
