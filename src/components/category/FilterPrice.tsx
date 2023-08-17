import { useUrlQuery } from '@/hooks/useUrlQuery';
import { useRouter } from 'next/router';
import { type FC } from 'react';

export const FilterPrice: FC = () => {
  const handleFilterChange = useUrlQuery();
  const { query } = useRouter();
  return (
    <div
      onClick={(e) => handleFilterChange(e, 'price', 'sort')}
      className="text-parS font-medium cursor-pointer flex items-center gap-2"
    >
      По ціні:{' '}
      <img
        className="w-5 h-5"
        src={
          query.price
            ? '/icons/price-asc-logo.svg'
            : '/icons/price-desc-logo.svg'
        }
        alt="asc-desc-price"
      />
    </div>
  );
};
