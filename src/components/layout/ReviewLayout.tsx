import type { FC, ReactNode } from 'react';

export type ReviewLayoutProps = {
  children: ReactNode;
};

export const ReviewLayout: FC<ReviewLayoutProps> = ({ children }) => {
  return (
    <div className="relative bg-darkSkyBlue-10 shadow-productInfo border p-2.5">
      {children}
    </div>
  );
};
