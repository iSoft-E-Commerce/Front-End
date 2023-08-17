import { MainLayout } from '@/components/layout/MainLayout';
import { BasketContextProvider } from '@/context/BasketContextProvider';
import { CompareContextProvider } from '@/context/CompareContextProvider';
import { WishlistContextProvider } from '@/context/WishlistContextProvider';
import '@/styles/globals.css';
import { checkAuth } from '@/utils/checkAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect, useState, type FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../utils/i18n';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  );

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <CompareContextProvider>
            <WishlistContextProvider>
              <BasketContextProvider>
                <MainLayout>
                  <Component {...pageProps} />
                  <ToastContainer position="bottom-left" autoClose={2000} />
                </MainLayout>
              </BasketContextProvider>
            </WishlistContextProvider>
          </CompareContextProvider>
        </QueryClientProvider>
      </SessionProvider>
    </I18nextProvider>
  );
};

export default App;
