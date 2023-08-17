import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const BreadCrumbs: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathAndQuery = router.asPath.split('?');
  const pathSegments = pathAndQuery[0]
    .split('/')
    .filter((segment) => segment !== '');

  const filteredSegments = pathSegments.filter(
    (segment) =>
      segment !== 'products' &&
      segment !== 'category' &&
      segment !== 'customers-info',
  );

  if (router.pathname === '/') {
    return null;
  }

  return (
    <div className="w-full bg-white md:max-w-md xl:max-w-xl px-2.5 mx-auto">
      <span>
        <Link
          className={'text-darkSkyBlue-60 sm:text-quot font-medium'}
          href="/"
        >
          {t('Головна')}
        </Link>
      </span>
      {filteredSegments.map((segment, index) => {
        const decodedSegment = decodeURIComponent(segment);
        return (
          <span key={index}>
            <span className="sm:text-quot font-medium text-darkSkyBlue-60">
              {' '}
              /{' '}
            </span>
            <Link
              className={clsx(
                'sm:text-quot font-medium capitalize',
                router.asPath?.includes(segment)
                  ? 'text-darkGray-100'
                  : 'text-darkSkyBlue-60',
              )}
              href={'/' + filteredSegments.slice(0, index + 1).join('')}
            >
              {t(`${decodedSegment}`)}
            </Link>
          </span>
        );
      })}
    </div>
  );
};
