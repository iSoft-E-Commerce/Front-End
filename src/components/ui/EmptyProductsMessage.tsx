import Link from 'next/link';
import { type FC } from 'react';

type EmptyMessageProps = {
  title: string;
  img: string;
};

export const EmptyProductsMessage: FC<EmptyMessageProps> = ({ title, img }) => {
  return (
    <div className="text-parM font-semibold relative">
      <img className="w-80 h-80 opacity-40 mx-auto" src={img} />
      <div className="absolute w-full top-1/2 right-0 -translate-y-1/2">
        <p className="text-center text-dispS3 md:text-dispS1 mb-5">{title}</p>
        <Link
          href="/"
          className="w-40 block mx-auto text-center px-3 py-1 border border-black hover:bg-black hover:text-white font-medium ease-out duration-500"
        >
          На головну
        </Link>
      </div>
    </div>
  );
};
