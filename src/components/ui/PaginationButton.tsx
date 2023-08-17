import { type FC } from 'react';

type BtnProps = {
  variant: 'next' | 'prev';
  activePageNumber: number;
  updateURL: (num: number) => void;
};

export const PaginationButton: FC<BtnProps> = ({
  variant,
  activePageNumber,
  updateURL,
}) => {
  return (
    <button
      onClick={() =>
        variant === 'prev'
          ? updateURL(activePageNumber - 1)
          : updateURL(activePageNumber + 1)
      }
      className="w-8 h-8 font-semibold text-dispS3 text-darkGray-100 hover:bg-darkGray-10 transition-all duration-300"
    >
      {variant === 'prev' ? '<' : '>'}
    </button>
  );
};
