import {
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import type { Product } from '../../client';
import { CompareContext } from './compareContext';

type CompareCtxProps = {
  children: ReactNode;
};

export const CompareContextProvider: FC<CompareCtxProps> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const clearCompareProducts = () => {
    setCompareItems([]);
    localStorage.removeItem('compareItems');
  };

  const compareProductHandler = (product: Product) => {
    const currProduct = compareItems.find((item) => item.id === product.id);
    if (currProduct) {
      const updatedCartItems = compareItems.filter(
        (item) => item.id !== product.id,
      );
      if (updatedCartItems.length === 0) {
        clearCompareProducts();
      } else {
        setCompareItems(updatedCartItems);
      }
    } else {
      const newItem = [...compareItems, { ...product }];
      setCompareItems(newItem);
    }
  };

  useEffect(() => {
    const localStorageCompareItems = localStorage.getItem('compareItems');
    if (localStorageCompareItems) {
      setCompareItems(JSON.parse(localStorageCompareItems));
    }
  }, []);

  useEffect(() => {
    if (compareItems.length > 0) {
      localStorage.setItem('compareItems', JSON.stringify(compareItems));
    }
  }, [compareItems]);

  return (
    <CompareContext.Provider
      value={{
        compareProductHandler,
        compareProducts: compareItems,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompareContext = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('Compare context is not provided');
  }
  return ctx;
};
