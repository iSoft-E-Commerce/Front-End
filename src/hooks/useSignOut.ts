import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
      queryClient.invalidateQueries({ queryKey: ['userWishlist'] });
      queryClient.invalidateQueries({ queryKey: ['userBasket'] });

      router.replace(router.asPath);
      toast.success('Вихід успішно здійснено!');
    } catch (err) {
      toast.error('Під час виходу з системи сталася помилка!');
    }
  };

  return handleSignOut;
};
