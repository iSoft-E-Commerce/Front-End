import { useUrlQuery } from '@/hooks/useUrlQuery';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import type { FilteredProducts } from '../../../client';
import { FilterAccordion } from './FilterAccordion';

type FilterPanelProps = {
  products: FilteredProducts | null;
  closeFilterPanel?: () => void;
};
export const FilterPanel: FC<FilterPanelProps> = ({
  products,
  closeFilterPanel,
}) => {
  const { query } = useRouter();
  const handleFilterChange = useUrlQuery();

  return (
    <>
      <div className="md:mb-0 mb-4">
        {products?.name.length ? (
          <FilterAccordion
            title={'Модель'}
            mapFunction={products?.name.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleFilterChange(e, 'productName', item.name)}
                className={clsx(
                  'relative w-full block text-left pl-9 mb-1 text-parM font-medium',
                  'before:absolute before:w-5 before:h-5 before:border-darkSkyBlue-20 before:left-1 before:top-0.5 before:right-auto before:border before:rotate-45',
                  query.productName?.includes(item.name)
                    ? 'before:bg-yellowCheckbox'
                    : 'before:bg-transparent',
                )}
              >
                {item.name}
              </button>
            ))}
          />
        ) : null}
        {products?.colors.length ? (
          <FilterAccordion
            title={'Колір'}
            mapFunction={products.colors.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleFilterChange(e, 'color', item.colorName)}
                className={clsx(
                  'relative w-full block text-left pl-9 mb-1 text-parM font-medium',
                  'before:absolute before:w-5 before:h-5 before:border-darkSkyBlue-20 before:left-1 before:top-0.5 before:right-auto before:border before:rotate-45',
                  query.color?.includes(item.colorName)
                    ? 'before:bg-yellowCheckbox'
                    : 'before:bg-transparent',
                )}
              >
                {item.colorName}
              </button>
            ))}
          />
        ) : null}
        {products?.memory.length ? (
          <FilterAccordion
            title={`Пам'ять`}
            mapFunction={products.memory.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleFilterChange(e, 'memory', item.memory)}
                className={clsx(
                  'relative w-full block text-left pl-9 mb-1 text-parM font-medium',
                  'before:absolute before:w-5 before:h-5 before:border-darkSkyBlue-20 before:left-1 before:top-0.5 before:right-auto before:border before:rotate-45',
                  query.memory?.includes(item.memory)
                    ? 'before:bg-yellowCheckbox'
                    : 'before:bg-transparent',
                )}
              >
                {item.memory}
              </button>
            ))}
          />
        ) : null}
      </div>
      <div
        onClick={closeFilterPanel}
        className="cursor-pointer md:hidden p-3 text-white border border-white text-center transition-all duration-150 hover:bg-darkGray-60"
      >
        Відфільтрувати
      </div>
    </>
  );
};
