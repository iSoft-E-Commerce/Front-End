import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import type { FC, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { iSoftClient, type Product } from '../../client';
import { WishlistContext } from './WishlistContext';

type WishlistContextProviderProps = {
  children: ReactNode;
};

export const WishlistContextProvider: FC<WishlistContextProviderProps> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const getWishlistProducts = async () => {
    try {
      const session = await getSession();

      if (session) {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
          //@ts-ignore
          TOKEN: session?.user?.token,
        });
        const dbWishlist =
          await client.wishlistEndpoints.wishlistControllerGetWishlistProducts();
        const userWishlist: Product[] = dbWishlist.map((item) => {
          const { product } = item;
          return { ...product };
        });
        return userWishlist;
      } else {
        const localWishlist = localStorage.getItem('LocalWishlist');
        const parsedLocalWishlist: Product[] = JSON.parse(
          localWishlist as string,
        );

        return parsedLocalWishlist;
      }
    } catch (err: any) {
      toast.error(err.message);
      return;
    }
  };

  const addWishlistProduct = async (product: Product) => {
    try {
      const session = await getSession();

      if (session) {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
          //@ts-ignore
          TOKEN: session?.user?.token,
        });

        await client.wishlistEndpoints.wishlistControllerAddDevice({
          requestBody: { productId: product.id },
        });
      } else {
        const localWishlist = localStorage.getItem('LocalWishlist');
        let updatedLocalWishlist: Product[] = [];

        if (localWishlist) {
          updatedLocalWishlist = JSON.parse(localWishlist);
        }

        if (!updatedLocalWishlist.find((item) => item.id === product.id)) {
          updatedLocalWishlist.push(product);
        }

        localStorage.setItem(
          'LocalWishlist',
          JSON.stringify(updatedLocalWishlist),
        );
      }

      queryClient.invalidateQueries({ queryKey: ['userWishlist'] });
      toast.success('Додано в обране');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const removeWishlistProduct = async (id: number) => {
    try {
      const session = await getSession();

      if (session) {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
          //@ts-ignore
          TOKEN: session?.user?.token,
        });

        await client.wishlistEndpoints.wishlistControllerDeleteDevice({
          requestBody: { productId: id },
        });
      } else {
        const localWishlist = localStorage.getItem('LocalWishlist');
        const parsedLocalWishlist: Product[] = JSON.parse(
          localWishlist as string,
        );

        const updatedLocalWishlist = parsedLocalWishlist.filter(
          (product) => id !== product.id,
        );

        localStorage.setItem(
          'LocalWishlist',
          JSON.stringify(updatedLocalWishlist),
        );
      }

      queryClient.invalidateQueries({ queryKey: ['userWishlist'] });
      toast.success('Видалено з обраного');
    } catch (err: any) {
      toast.error('Помилка при видаленні товару з обраного');
    }
  };

  const {
    isLoading: isWishlistLoading,
    isFetching,
    data: userWishlist,
  } = useQuery<Product[] | undefined>({
    queryKey: ['userWishlist'],
    queryFn: () => getWishlistProducts(),
  });

  const contextValue = {
    isWishlistLoading,
    isFetching,
    userWishlist,
    addWishlistProduct,
    removeWishlistProduct,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
