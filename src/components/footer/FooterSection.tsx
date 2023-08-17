import { type FC } from 'react';
import { Title } from '../ui/Title';
import Link from 'next/link';
import { customerLinks } from '@/utils/footerLinks';

export const FooterSection: FC<{
  title: string;
  links: typeof customerLinks;
}> = ({ title, links }) => (
  <div>
    <Title
      classNameModificator="mb-2 md:text-parM pointer-events-none text-white font-medium"
      titleTag={'h3'}
    >
      {title}
    </Title>
    {links.map((link) => (
      <Link
        key={link.name}
        href={link.path}
        className=" block text-darkGray-10 hover:text-white transition-all duration-300"
      >
        {link.name}
      </Link>
    ))}
  </div>
);
