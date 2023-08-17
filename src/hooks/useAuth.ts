import { useQueryClient } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type CreateUserDto, iSoftClient } from '../../client';

export const useAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<CreateUserDto>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { status } = useSession();

  const onSubmit = async (data: CreateUserDto) => {
    if (isSignUp) {
      try {
        const client = new iSoftClient({
          BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        });
        await client.userEndpoints.userControllerCreate({
          requestBody: data as CreateUserDto,
        });

        toast.success('Користувача учпішно зареєстровано!');
        setIsSignUp(false);
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      const localWishlistProducts = localStorage.getItem('LocalWishlist');
      const localBasketProducts = localStorage.getItem('LocalBasket');

      const res = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/',
        localWishlistProducts,
        localBasketProducts,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        localStorage.removeItem('LocalWishlist');
        localStorage.removeItem('LocalBasket');

        reset();
      }
      queryClient.invalidateQueries({ queryKey: ['userWishlist'] });
      queryClient.invalidateQueries({ queryKey: ['userBasket'] });
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isLoading,
    status,
    toggleForm,
    isSignUp,
  };
};
