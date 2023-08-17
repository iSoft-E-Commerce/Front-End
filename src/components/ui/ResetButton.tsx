import clsx from 'clsx';
import { type FC } from 'react';

type ResetButtonProps = {
  classModificator?: string;
  reset: () => void;
};

export const ResetButton: FC<ResetButtonProps> = ({
  classModificator,
  reset,
}) => {
  return (
    <button
      onClick={reset}
      className={clsx(
        'text-parS md:text-parM font-medium text-center w-full transition-all duration-150 border-b rounded-md text-darkGray-90 border-darkGray-60 tracking-wide hover:bg-mystic-100 hover:shadow-md',
        classModificator,
      )}
    >
      Очистити
    </button>
  );
};
