import { getSession } from 'next-auth/react';
import { type CreateRateDto, iSoftClient } from '../../client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useSendReview = (
  productId?: number,
  question?: boolean,
  rating?: number,
) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ defaultValues: { review: '' } });
  const handleSubmitReview = async (data: CreateRateDto) => {
    try {
      const session = await getSession();
      if (!session) {
        throw new Error('Для відправки авторизуйтесь.');
      }
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session.user.token,
      });
      const res = await client.rateEndpoints.rateControllerCreateRate({
        requestBody: {
          productId: productId!,
          rate: question ? 0 : rating!,
          review: data.review,
        },
      });
      if (res) {
        toast.success('Успішно відправлено. Публікація після перевірки.');
        router.replace(router.asPath);
      }
      reset({ review: '' });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return {
    control,
    handleSubmit,
    handleSubmitReview,
    isSubmitting,
    isSubmitSuccessful,
  };
};
