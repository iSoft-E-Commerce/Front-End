import type { FC, ReactNode } from 'react';

type SearchedValuesProps = {
  children: ReactNode;
};

export const SearchedValues: FC<SearchedValuesProps> = ({ children }) => {
  return (
    <div className="max-h-searchedValues absolute w-screen right-0 top-[180%] md:top-[110%] md:w-full md:max-w-searchBar bg-white z-[5] border border-darkGray-80 shadow-md overflow-y-auto p-3 md:p-5 flex flex-col">
      {children}
    </div>
  );
};
