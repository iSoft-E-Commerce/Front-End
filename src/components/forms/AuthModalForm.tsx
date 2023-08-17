import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { type FC } from 'react';
import { CloseButton } from '../ui/CloseButton';
import { SubmitButton } from '../ui/SubmitButton';
import { Title } from '../ui/Title';
import { ToggleSignedUpButton } from '../ui/ToggleSignedUpButton';
import { FormInput } from './FormInput';

type AuthModalFormProps = {
  onClose: () => void;
};

export const AuthModalForm: FC<AuthModalFormProps> = ({ onClose }) => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isLoading,
    toggleForm,
    isSignUp,
  } = useAuth();

  return (
    <div className="w-full text-darkGray-60 px-5 py-5 sm:px-10 sm:py-7 flex items-center flex-col">
      <Title classNameModificator="text-darkGray-80">
        {isSignUp ? 'Реєстрація' : 'Вхід'}
      </Title>
      <CloseButton
        onClick={onClose}
        classNameModificator="absolute right-2.5 top-2.5 hover:opacity-80"
      />
      <ToggleSignedUpButton onClick={toggleForm}>
        {isSignUp ? 'Вже є акаунт' : 'Ще не маю акаунту'}
      </ToggleSignedUpButton>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormInput
          label="Пошта"
          name="email"
          placeholder="Example@gmail.com"
          register={register('email', { required: `Пошта обов'язкове поле` })}
          type="email"
          errors={errors.email}
          required
        />
        <FormInput
          label="Пароль"
          name="pass"
          placeholder="************"
          register={register('password', {
            required: `Пароль обов'язкове поле`,
            minLength: { value: 6, message: 'Мінімум 6 символів' },
          })}
          type="password"
          errors={errors.password}
          required
        />
        <SubmitButton
          disabled={isLoading}
          classNameModificator={clsx('w-full py-2.5')}
        >
          {isLoading
            ? 'Завантаження...'
            : isSignUp
            ? 'Зареєструватися'
            : 'Увійти'}
        </SubmitButton>
      </form>
    </div>
  );
};
