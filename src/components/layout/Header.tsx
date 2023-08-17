import { AuthContent } from '@/components/header/AuthContent';
import { useNavAndSearch } from '@/hooks/useNavAndSearch';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import { Logo } from '../ui/Logo';
import { WishlistAndBasketButtons } from '../ui/WishlistAndBasketButtons';
import { BreadCrumbs } from './BreadCrumbs';
import { BurgerButton } from './BurgerButton';
import { Nav } from './Nav';
import { SearchBar } from './SearchBar';
import { SearchedValues } from './SearchedValues';

export const Header: FC = () => {
  const router = useRouter();
  const {
    debouncedValue,
    isOpenSearch,
    isOpenNavMenu,
    isOpenSearchValues,
    setToggleSearch,
    selectedProducts,
    setDebouncedSearch,
    handleToggleSearch,
    handleToggleNavMenu,
    handleToggleSearchValues,
  } = useNavAndSearch();

  return (
    <header className="sticky top-0 z-20 shadow-md bg-black">
      <div className="flex justify-between items-center gap-3 md:gap-8 md:max-w-md xl:max-w-xl px-2.5 py-1.5 mx-auto relative">
        <Logo
          isOpenNavMenu={isOpenNavMenu}
          handleCloseNav={handleToggleNavMenu}
        />
        <div className="md:relative w-full md:max-w-searchBar">
          <SearchBar
            setDebouncedSearch={setDebouncedSearch}
            isOpenSearch={isOpenSearch}
            handleToggleSearchValues={handleToggleSearchValues}
          />
          <img
            src={!isOpenSearch ? '/icons/search.svg' : '/icons/close.svg'}
            alt="search icon"
            className="w-6 h-6 min-w-[24px] ml-auto cursor-pointer md:pointer-events-none md:absolute md:top-1/2 md:right-1 md:-translate-y-1/2"
            onClick={handleToggleSearch}
          />
          {debouncedValue && isOpenSearchValues && selectedProducts?.length ? (
            <SearchedValues>
              {selectedProducts.map((product) => (
                <Link
                  className="flex items-center gap-2 max-[576px]:text-quot text-parS font-medium max-[576px]:py-1.5 py-2.5 border-b border-b-gray-500 bg-white hover:bg-gray-200 transition-all duration-200"
                  key={product.id}
                  href={`/products/${product.description}`}
                  onClick={() => setToggleSearch(false)}
                >
                  <img
                    className="w-7 h-7"
                    src={product.img}
                    alt={product.description}
                  />
                  <span>{product.description}</span>
                </Link>
              ))}
            </SearchedValues>
          ) : null}
        </div>
        <WishlistAndBasketButtons
          display="onMobile"
          isOpenNavMenu={isOpenNavMenu}
          handleCloseNav={handleToggleNavMenu}
        />
        <AuthContent />
        <BurgerButton
          isToggled={isOpenNavMenu}
          handleToggle={handleToggleNavMenu}
        />
      </div>
      <Nav isOpenNavMenu={isOpenNavMenu} handleCloseNav={handleToggleNavMenu} />
      <div
        className={clsx(
          'bg-white py-1',
          router.pathname === '/' ? 'hidden' : 'block',
        )}
      >
        <BreadCrumbs />
      </div>
    </header>
  );
};
