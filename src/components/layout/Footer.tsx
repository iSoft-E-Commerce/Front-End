import { customerLinks, profileLinks } from '@/utils/footerLinks';
import { type FC } from 'react';
import { FooterSection } from '../footer/FooterSection';
import { Logo } from '../ui/Logo';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Type } from '../../../client';
import { Title } from '../ui/Title';
import Link from 'next/link';
import { FooterNavSkeleton } from './FooterNavSkeleton';

const Footer: FC = () => {
  const { data } = useSession();

  const currYear = new Date().getFullYear();

  const { isLoading, data: productTypes } = useQuery<Type[]>({
    queryKey: ['types'],
  });

  return (
    <footer className="min-h-fit bg-black py-2.5">
      <div className="md:max-w-md xl:max-w-xl w-full p-2.5 mx-auto flex flex-col items-center space-y-4">
        <div className="flex justify-between items-center w-full pb-2 border-b border-mystic-80">
          <Logo />
          <div>
            <span className="text-white text-parM md:text-parL pointer-events-none font-medium italic">
              Ми приймаємо
            </span>
            <div className="flex items-center justify-between">
              <img
                src="/icons/visa-logo.svg"
                alt="Visa"
                className="w-16 h-16"
              />
              <img
                src="/icons/mastercard-logo.svg"
                alt="MasterCard"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-3 gap-4 w-full text-white pb-4 border-b border-darkGray-10">
          <div>
            <Title
              classNameModificator="mb-2 md:text-parM pointer-events-none text-white font-medium"
              titleTag={'h3'}
            >
              Каталог
            </Title>
            {isLoading ? (
              <FooterNavSkeleton />
            ) : (
              <>
                {productTypes?.map((type) => (
                  <Link
                    key={type.name}
                    href={`/category/${type.name}`}
                    className=" block text-darkGray-10 hover:text-white transition-all duration-300"
                  >
                    {type.name}
                  </Link>
                ))}
              </>
            )}
          </div>
          <FooterSection title="Клієнтам" links={customerLinks} />
          {data ? (
            <FooterSection title="Особистий кабінет" links={profileLinks} />
          ) : null}
        </div>
        <p className="text-parS text-mystic-100 text-center pointer-events-none">
          &copy; Всі права захищені, інтернет-магазин техніки. УкраЇна.
          <span className="ml-1 text-mystic-40">{currYear}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
