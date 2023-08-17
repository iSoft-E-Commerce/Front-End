import type { FC } from 'react';

export const FooterNavSkeleton: FC = () => {
  return (
    <div className="animate-pulse flex flex-col py-2 gap-3 transition-all duration-150">
      <div className="bg-darkGray-10 h-2 w-20 rounded-full" />
      <div className="bg-darkGray-10 h-2 w-20 rounded-full" />
      <div className="bg-darkGray-10 h-2 w-20 rounded-full" />
      <div className="bg-darkGray-10 h-2 w-20 rounded-full" />
    </div>
  );
};
