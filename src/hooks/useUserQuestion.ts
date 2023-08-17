import { toast } from 'react-toastify';
import { type CreateQuestionDto, iSoftClient } from '../../client';
import { useForm } from 'react-hook-form';

export const useUserQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
    reset,
    control,
  } = useForm();

  const handleSendUserQuestion = async (data: CreateQuestionDto) => {
    try {
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      });
      const res =
        await client.questionEndpoints.questionControllerCreateUserQuestion({
          requestBody: data,
        });
      if (res) {
        toast.success(res.message);
        reset({ question: '' });
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return {
    handleSubmit,
    handleSendUserQuestion,
    errors,
    control,
    isLoading,
    register,
  };
};
