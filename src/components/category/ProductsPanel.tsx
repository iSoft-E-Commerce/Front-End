import clsx from 'clsx';
import { useEffect, useState, type FC } from 'react';
import type { FilteredProducts, Product } from '../../../client';
import { ProductCard } from '../product/ProductCard';
import { WarningMessage } from '../ui/WarningMessage';
import { FilterPanel } from './FilterPanel';
import { FilterPrice } from './FilterPrice';

type ProductsPanelProps = {
  products: Product[] | null;
  pageNum: number;
  pagesCount?: number;
  filteredProducts: FilteredProducts | null;
};

export const ProductsPanel: FC<ProductsPanelProps> = ({
  products,
  filteredProducts,
}) => {
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768 && filterMenu) {
      setFilterMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [filterMenu]);

  return (
    <div className="mb-10">
      <div
        className={clsx(
          'fixed z-50 py-4 px-2.5 w-full h-screen inset-0 overflow-auto text-white bg-black transition-all duration-300',
          filterMenu ? 'visible translate-x-0' : 'invisible translate-x-[100%]',
        )}
      >
        <FilterPanel
          closeFilterPanel={() => setFilterMenu(false)}
          products={filteredProducts}
        />
      </div>
      <div className="shadow-productInfo p-2.5 mb-2 flex items-center justify-between">
        <div className="flex gap-4">
          <span className="text-parS font-medium text-darkGray-40">
            Виводити:
          </span>
          <FilterPrice />
        </div>
        <div
          onClick={() => setFilterMenu(true)}
          className="md:hidden block cursor-pointer"
        >
          <img className="w-8 h-8" src="/icons/filter-logo.svg" alt="filter" />
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products?.length ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <WarningMessage>Продуктів не знайдено</WarningMessage>
        )}
      </div>
    </div>
  );
};
