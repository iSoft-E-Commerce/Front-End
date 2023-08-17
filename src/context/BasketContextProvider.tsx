import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { type FC, type ReactNode, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  type LocalBasketProduct,
  type Product,
  iSoftClient,
} from '../../client';
import { BasketContext } from './basketContext';

type BasketContextProviderProps = {
  children: ReactNode;
};

export const BasketContextProvider: FC<BasketContextProviderProps> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isBasketPopUpOpen, setToggleBasketPopUp] = useState(false);
  const [isActiveBuyButton, setToggleBuyButton] = useState<number | null>(null);

  const toggleBasket = () => setToggleBasketPopUp(!isBasketPopUpOpen);

  const getBasketProducts = async () => {
    try {
      const session = await getSession();

      if (session) {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
          //@ts-ignore
          TOKEN: session?.user?.token,
        });
        const dbBasket =
          await client.basketEndpoints.basketControllerGetBasketProducts();

        const userBasket: LocalBasketProduct[] = dbBasket.map((item) => {
          const { product, quantity } = item;
          return { ...product, quantity };
        });

        return userBasket.sort((a, b) => a.id - b.id);
      } else {
        const localBasket = localStorage.getItem('LocalBasket');
        const parsedLocalBasket: LocalBasketProduct[] = JSON.parse(
          localBasket as string,
        );

        return parsedLocalBasket;
      }
    } catch (err: any) {
      toast.error(err.message);
      return;
    }
  };

  const addBasketProduct = async (product: Product) => {
    setToggleBuyButton(product.id);
    try {
      const session = await getSession();

      if (session) {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
          //@ts-ignore
          TOKEN: session?.user?.token,
        });

        await client.basketEndpoints.basketControllerAddDevice({
          requestBody: { productId: product.id },
        });
      } else {
        const localBasket = localStorage.getItem('LocalBasket');
        let updatedLocalBasket: LocalBasketProduct[] = [];

        if (localBasket) {
          updatedLocalBasket = JSON.parse(localBasket);
        }

        const productInLocalBasket = updatedLocalBasket.find(
          (item) => item.id === product.id,
        );

        if (productInLocalBasket) {
          productInLocalBasket.quantity += 1;
        } else {
          updatedLocalBasket.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('LocalBasket', JSON.stringify(updatedLocalBasket));
      }

      queryClient.invalidateQueries({ queryKey: ['userBasket'] });
      toast.success('Товар додано у кошик.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const removeBasketProduct = async (id: number, isDelete: boolean) => {
    try {
      const session = await getSession();

      if (session) {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
          //@ts-ignore
          TOKEN: session?.user?.token,
        });

        await client.basketEndpoints.basketControllerDeleteDevice({
          requestBody: { productId: id, isDelete },
        });
      } else {
        const localBasket = localStorage.getItem('LocalBasket');
        const parsedLocalBasket: LocalBasketProduct[] = JSON.parse(
          localBasket as string,
        );

        const productInLocalBasket = parsedLocalBasket.find(
          (item) => item.id === id,
        );

        if (productInLocalBasket && !isDelete) {
          productInLocalBasket.quantity -= 1;

          localStorage.setItem(
            'LocalBasket',
            JSON.stringify(parsedLocalBasket),
          );
        } else {
          const updatedLocalBasket = parsedLocalBasket.filter(
            (product) => id !== product.id,
          );

          localStorage.setItem(
            'LocalBasket',
            JSON.stringify(updatedLocalBasket),
          );
        }
      }

      queryClient.invalidateQueries({ queryKey: ['userBasket'] });
      toast.success('Товар видалено з кошика.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const createOrder = async () => {
    try {
      const session = await getSession();

      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user?.token,
      });

      const dbBasket =
        await client.basketEndpoints.basketControllerGetBasketProducts();

      await client.ordersHistoryEdpoints.ordersHistoryControllerCreateOrderData(
        { requestBody: dbBasket },
      );

      queryClient.invalidateQueries({ queryKey: ['userBasket'] });
      toast.success('Замовлення оформлено.');
    } catch (err: any) {
      toast.error(err.message);
      return;
    }
  };

  const {
    isLoading: isBasketLoading,
    isFetching,
    data: userBasket,
  } = useQuery<LocalBasketProduct[] | undefined>({
    queryKey: ['userBasket'],
    queryFn: () => getBasketProducts(),
  });

  useEffect(() => {
    if (!isFetching) {
      setToggleBuyButton(null);
    }
  }, [isFetching]);

  const totalBasketPrice = useMemo(() => {
    return userBasket?.reduce((sum, product) => {
      const price = product.price.discount
        ? product.price.price - product.price.discount
        : product.price.price;
      return (sum += product.quantity * price);
    }, 0);
  }, [userBasket]);

  const contextValue = {
    isBasketLoading,
    isFetching,
    isActiveBuyButton,
    userBasket,
    totalBasketPrice,
    isBasketPopUpOpen,
    toggleBasket,
    addBasketProduct,
    removeBasketProduct,
    createOrder,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};
