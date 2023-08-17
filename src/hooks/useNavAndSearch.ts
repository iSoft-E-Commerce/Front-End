import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { iSoftClient } from '../../client';

export const useNavAndSearch = () => {
  const [debouncedValue, setDebouncedSearch] = useState('');
  const [isOpenSearch, setToggleSearch] = useState(false);
  const [isOpenNavMenu, setToggleNavMenu] = useState(false);
  const [isOpenSearchValues, setToggleSearchValues] = useState(false);

  const handleProductSearch = async () => {
    try {
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      });
      const products =
        await client.productEndpoints.productControllerSearchProducts({
          q: debouncedValue,
        });
      return products;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleSearch = () => {
    if (isOpenNavMenu) {
      setToggleNavMenu(false);
    }
    setToggleSearch(!isOpenSearch);
  };

  const handleToggleNavMenu = () => {
    if (isOpenSearch) {
      setToggleSearch(false);
    }
    setToggleNavMenu(!isOpenNavMenu);
  };

  const handleToggleSearchValues = () => {
    setToggleSearchValues(!isOpenSearchValues);
  };

  const { data: selectedProducts } = useQuery({
    queryKey: ['products', debouncedValue],
    queryFn: () => {
      if (debouncedValue) {
        return handleProductSearch();
      } else {
        return [];
      }
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        if (isOpenSearch) {
          setToggleSearch(false);
        } else if (isOpenNavMenu) {
          setToggleNavMenu(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpenSearch, isOpenNavMenu]);

  return {
    debouncedValue,
    isOpenSearch,
    isOpenNavMenu,
    isOpenSearchValues,
    setToggleSearch,
    setToggleNavMenu,
    selectedProducts,
    setDebouncedSearch,
    handleToggleSearch,
    handleToggleNavMenu,
    handleToggleSearchValues,
  };
};
