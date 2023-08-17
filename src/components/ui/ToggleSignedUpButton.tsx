import { type FC } from 'react';
import clsx from 'clsx';

type ToggleSignedUpButtonProps = {
  children: React.ReactNode;
  classNameModificator?: string;
  onClick?: () => void;
};

export const ToggleSignedUpButton: FC<ToggleSignedUpButtonProps> = ({
  children,
  classNameModificator,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'text-parS md:text-parM font-medium text-center underline text-darkSkyBlue-90 tracking-wider transition-all duration-300 hover:border-b-darkSkyBlue-100 mb-2',
        classNameModificator,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
