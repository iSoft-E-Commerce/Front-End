import clsx from 'clsx';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import type { Color, Product } from '../../../client';

export type ProductFilterProps = {
  matchedMemory: Product[];
  colors: Product[];
  color: Color;
  memory: string;
};
export const ProductFilter: FC<ProductFilterProps> = ({
  colors,
  matchedMemory,
  color,
  memory,
}) => {
  const { push } = useRouter();

  return (
    <div className="flex justify-between items-start pb-4 border-b-2 border-opacity-80 mb-4 max-sm:flex-col max-sm:gap-4">
      <div className="flex items-center flex-wrap justify-center">
        {colors.map((prod) => (
          <button
            disabled={color.color === prod.color.color}
            className={clsx(
              'flex justify-center items-center w-8 h-8 p-1 rounded-full',
              color.color === prod.color.color
                ? 'border-darkSkyBlue-40 border-2 p-1'
                : null,
            )}
            key={prod.id}
            onClick={() => push(`/products/${prod.description}`)}
          >
            <span
              className={clsx(
                'w-full h-full relative rounded-full border border-darkSkyBlue-40',
              )}
              style={{ backgroundColor: prod.color.color }}
            />
          </button>
        ))}
      </div>
      {memory ? (
        <div className="flex gap-1 flex-wrap items-center justify-center">
          {matchedMemory.map((prod) => (
            <button
              disabled={memory === prod.memory}
              onClick={() => push(`/products/${prod.description}`)}
              className={clsx(
                'p-1.5 border rounded-sm text-parS font-medium',
                memory === prod.memory ? 'bg-black text-white' : null,
              )}
              key={prod.id}
            >
              {prod.memory}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
