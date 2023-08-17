import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

type BannerProps = {
  children: ReactNode;
  classNameModificator?: string;
  size: 'small' | 'medium' | 'large';
  bgColor?: string;
};

export const Banner: FC<BannerProps> = ({
  children,
  classNameModificator,
  size,
  bgColor = 'bg-black',
}) => {
  const sizeClasses = {
    small: 'h-20 md:h-36 my-4 md:my-10',
    medium: 'h-28 md:h-48 my-4 md:my-10',
    large:
      'max-h-96 min-h-[280px] md:min-h-[350px] lg:min-h-[420px] my-0 md:my-0 relative bg-black',
  };

  return (
    <div
      className={clsx(
        `w-full ${bgColor} pointer-events-none flex flex-col justify-center pl-6`,
        sizeClasses[size],
        classNameModificator,
      )}
    >
      {children}
    </div>
  );
};
