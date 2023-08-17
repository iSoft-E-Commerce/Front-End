import { getPaginationTemplate } from '@/utils/getPagination';
import { useRouter } from 'next/router';
import { type FC, Fragment } from 'react';
import { PaginationButton } from './PaginationButton';

type PaginationProps = {
  activePageNumber: number;
  pagesCount: number;
};

export const Pagination: FC<PaginationProps> = ({
  activePageNumber,
  pagesCount,
}) => {
  const { route, push, query } = useRouter();
  const changedRoute = route.replace('[name]', query.name as string);

  const updateURL = (pageNumber: number) => {
    const queryParams = new URLSearchParams(query as any);
    queryParams.delete('name');
    queryParams.set('page', pageNumber.toString());
    push(`${changedRoute}?${queryParams.toString()}`);
  };

  const paginationTemplate = getPaginationTemplate(
    activePageNumber,
    pagesCount,
  );

  return (
    <div className="flex justify-center gap-3">
      {activePageNumber !== 1 ? (
        <PaginationButton
          updateURL={updateURL}
          variant="prev"
          activePageNumber={activePageNumber}
        />
      ) : null}
      <div className="flex gap-1 justify-center items-center text-parM">
        {paginationTemplate.map((item, i) => (
          <Fragment key={i}>
            {item === '...' ? (
              <p className="font-bold px-1">...</p>
            ) : (
              <button
                onClick={() => updateURL(parseInt(item as string))}
                disabled={activePageNumber === item}
                className="w-8 h-7 border enabled:hover:bg-darkGray-10 disabled:bg-gradient-to-r disabled:from-black disabled:to-darkGray-60 disabled:text-white transition-all duration-300"
              >
                {item}
              </button>
            )}
          </Fragment>
        ))}
      </div>
      {activePageNumber !== pagesCount ? (
        <PaginationButton
          updateURL={updateURL}
          variant="next"
          activePageNumber={activePageNumber}
        />
      ) : null}
    </div>
  );
};
