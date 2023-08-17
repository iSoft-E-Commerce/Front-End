import { Montserrat } from 'next/font/google';
import { type FC } from 'react';
import Footer from './Footer';
import { Header } from './Header';

const montserrat = Montserrat({ subsets: ['latin'] });

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={`${montserrat.className} flex flex-col min-h-full`}>
      <Header />
      <main className="flex-1 pb-6">{children}</main>
      <Footer />
    </div>
  );
};
