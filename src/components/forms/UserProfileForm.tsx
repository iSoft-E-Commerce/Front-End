import clsx from 'clsx';
import { getSession } from 'next-auth/react';
import { type FC } from 'react';
import { useForm, type FieldError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type User, iSoftClient, type UpdateUserDto } from '../../../client';
import { ResetButton } from '../ui/ResetButton';
import { SubmitButton } from '../ui/SubmitButton';
import { FormInput } from './FormInput';

type UserProfileFormProps = {
  userData: User;
};

export const UserProfileForm: FC<UserProfileFormProps> = ({ userData }) => {
  const { email, firstName, phone, lastName, img } = userData;
  const {
    register,
    reset,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email,
      firstName,
      phone,
      lastName,
      img,
    },
  });

  const handleUpdateUserData = async (data: UpdateUserDto) => {
    const session = await getSession();
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    try {
      await client.userEndpoints.userControllerUpdateUserData({
        requestBody: data,
      });
      toast.success('Оновлення даних успішне.');
    } catch (err: any) {
      toast.error(err.message as string);
    }
  };
  return (
    <div className="w-full lg:max-w-profileForm mx-auto">
      <div className="flex lg:flex-row gap-7 flex-col items-center lg:items-start justify-between">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-top"
            src={img || '/icons/user.svg'}
            alt="User Avatar"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateUserData)}
          className="md:basis-3/4 w-full grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-4"
        >
          <FormInput
            label={`Ім'я`}
            name="firstName"
            placeholder={`Ваше ім'я`}
            register={register('firstName', {
              minLength: {
                value: 2,
                message: "Ім'я повинно мати мінімум 2 літери",
              },
              pattern: {
                value: /^[а-яА-Яa-zA-ZіІїЇєЄ']+$/,
                message: 'Тільки літери без пробілів',
              },
            })}
            type="text"
            errors={errors.firstName as FieldError}
          />
          <FormInput
            label="Прізвище"
            name="lastName"
            placeholder="Ваше прізвище"
            register={register('lastName', {
              minLength: {
                value: 2,
                message: 'Прізвище повинно мати мінімум 2 літери',
              },
              pattern: {
                value: /^[а-яА-Яa-zA-ZіІїЇєЄ']+$/,
                message: 'Тільки літери без пробілів',
              },
            })}
            type="text"
            errors={errors.lastName as FieldError}
          />
          <FormInput
            label="Пошта"
            name="email"
            placeholder="Example@gmail.com"
            register={register('email', { required: `Пошта обов'язкове поле` })}
            type="email"
            errors={errors.email as FieldError}
            required
          />
          <FormInput
            label="Номер телефону"
            name="phone"
            placeholder="0501234321"
            register={register('phone', {
              minLength: {
                value: 10,
                message: 'Повинно бути не менше 10 символів',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Тільки цифри без пробілів',
              },
            })}
            type="text"
            errors={errors.phone as FieldError}
          />
          <FormInput
            label="Фото"
            name="img"
            placeholder="http://img.com"
            register={register('img')}
            type="text"
            errors={errors.img as FieldError}
            classNameModificator="md:col-span-2"
          />
          <div className="flex items-center justify-between gap-4 md:col-span-2">
            <ResetButton
              classModificator="py-1 md:py-2.5"
              reset={() =>
                reset({
                  email: '',
                  firstName: '',
                  phone: '',
                  lastName: '',
                  img: '',
                })
              }
            />
            <SubmitButton
              disabled={isLoading}
              classNameModificator={clsx('w-full py-1 md:py-2.5')}
            >
              {isLoading ? 'Завантаження...' : 'Оновити'}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
