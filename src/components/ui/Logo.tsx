import Link from 'next/link';
import { type FC } from 'react';

type LogoProps = {
  isOpenNavMenu?: boolean;
  handleCloseNav?: () => void;
};

export const Logo: FC<LogoProps> = ({ isOpenNavMenu, handleCloseNav }) => {
  return (
    <Link
      className="flex items-center hover:opacity-90 -ml-2.5"
      href="/"
      onClick={
        handleCloseNav
          ? () => {
              if (isOpenNavMenu) {
                return handleCloseNav();
              }
            }
          : () => {}
      }
    >
      <img
        className="w-16 h-11 min-w-[64px] invert"
        src="/img/logo.png"
        alt="logo"
      />
      <span className="font-bold text-dispS3 -ml-3 text-white">iSoft</span>
    </Link>
  );
};
