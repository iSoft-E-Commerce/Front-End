import { type FC } from 'react';
import clsx from 'clsx';

type SubmitButtonProps = {
  children: React.ReactNode;
  classNameModificator?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  classNameModificator,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        'text-parS md:text-parM font-medium text-center rounded-md bg-gradient-to-r from-black to-darkSkyBlue-80 text-mystic-10 tracking-wide drop-shadow-md filter saturate-100 transition-all duration-300 hover:saturate-200 hover:shadow-md',
        classNameModificator,
        disabled
          ? 'bg-gradient-to-r from-darkSkyBlue-80 to-darkSkyBlue-20 animate-pulse'
          : null,
      )}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
