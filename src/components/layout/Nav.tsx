import { type FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { iSoftClient, type Type } from '../../../client';
import { NavSkeleton } from './NavSkeleton';
import { WarningMessage } from '../ui/WarningMessage';
import { customerLinks, profileLinks } from '@/utils/footerLinks';
import { WishlistAndBasketButtons } from '../ui/WishlistAndBasketButtons';
import { MobileNavSection } from './MobileNavSection';

type NavProps = {
  isOpenNavMenu: boolean;
  handleCloseNav: () => void;
};

export const Nav: FC<NavProps> = ({ isOpenNavMenu, handleCloseNav }) => {
  const { asPath } = useRouter();

  const getProductsTypes = async () => {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });

    const types = await client.typeEndpoints.typeControllerGetTypes();

    return types;
  };

  const {
    data: productTypes,
    isLoading,
    isError,
    error,
  } = useQuery<Type[]>({
    queryKey: ['types'],
    queryFn: () => getProductsTypes(),
  });

  return (
    <div
      className={clsx(
        'bg-darkGray-100 md:block w-full md:h-12 py-1.5 md:py-2.5 visible fixed md:static max-md:overflow-auto max-md:top-[56px] max-md:left-0 max-md:h-full max-md:pb-[70px] max-md:transition-all max-md:duration-700 max-md:ease-[cubic-bezier(0.68,-0.35,0.265,1.35)]',
        !isOpenNavMenu
          ? 'max-md:-translate-x-full max-md:invisible max-md:opacity-0'
          : null,
      )}
    >
      <div className="md:max-w-md xl:max-w-xl w-full px-2.5 mx-auto flex">
        {isError ? (
          <WarningMessage classNameModificator="text-white">
            {(error as any).message}!
          </WarningMessage>
        ) : null}
        {isLoading ? <NavSkeleton /> : null}
        {!productTypes?.length && !isLoading && !isError ? (
          <WarningMessage classNameModificator="text-white">
            Категорій продуктів не знайдено!
          </WarningMessage>
        ) : null}
        {productTypes?.length && !isLoading && !isError ? (
          <nav className="w-full flex flex-col md:flex-row gap-2 md:gap-10">
            <p className="text-dispS3 text-white pb-1.5 border-b-2 md:hidden border-b-white">
              Каталог
            </p>
            {productTypes?.map((type) => (
              <Link
                key={type.id}
                className={clsx(
                  asPath.toLowerCase().includes(type.name.toLowerCase())
                    ? 'text-darkGray-10 underline'
                    : 'text-white hover:text-darkGray-10 hover:underline transition-all duration-200',
                )}
                href={`/category/${type.name}`}
                onClick={handleCloseNav}
              >
                {type.name}
              </Link>
            ))}
            <MobileNavSection
              title="Клієнтам"
              links={customerLinks}
              onClick={handleCloseNav}
            />
            <MobileNavSection
              title="Особистий кабінет"
              links={profileLinks}
              onClick={handleCloseNav}
            />
          </nav>
        ) : null}
        <WishlistAndBasketButtons
          display="onDesktop"
          handleCloseNav={handleCloseNav}
        />
      </div>
    </div>
  );
};
