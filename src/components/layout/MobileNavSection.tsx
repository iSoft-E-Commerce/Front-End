import { customerLinks } from '@/utils/footerLinks';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FC } from 'react';

type MobileNavSectionProps = {
  title: string;
  links: typeof customerLinks;
  onClick: () => void;
};

export const MobileNavSection: FC<MobileNavSectionProps> = ({
  title,
  links,
  onClick,
}) => {
  const { asPath } = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <p className="text-dispS3 text-white pb-1.5 border-b-2 md:hidden border-b-white mt-2">
        {title}
      </p>
      {!session && title === 'Особистий кабінет' ? (
        <>
          <Link
            href="/wishlist"
            className={clsx(
              'md:hidden',
              asPath === '/wishlist'
                ? 'text-darkGray-10 underline'
                : 'text-white hover:text-darkGray-10 hover:underline transition-all duration-200',
            )}
            onClick={onClick}
          >
            Обрані товари
          </Link>
          <Link
            href="/compare"
            className={clsx(
              'md:hidden',
              asPath === '/compare'
                ? 'text-darkGray-10 underline'
                : 'text-white hover:text-darkGray-10 hover:underline transition-all duration-200',
            )}
            onClick={onClick}
          >
            Порівняння
          </Link>
        </>
      ) : (
        <>
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={clsx(
                'md:hidden',
                asPath === link.path
                  ? 'text-darkGray-10 underline'
                  : 'text-white hover:text-darkGray-10 hover:underline transition-all duration-200',
              )}
              onClick={onClick}
            >
              {link.name}
            </Link>
          ))}
        </>
      )}
    </>
  );
};
