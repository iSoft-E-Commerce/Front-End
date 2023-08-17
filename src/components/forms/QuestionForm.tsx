import { useUserQuestion } from '@/hooks/useUserQuestion';
import type { FC } from 'react';
import { Controller, type FieldError } from 'react-hook-form';
import { SubmitButton } from '../ui/SubmitButton';
import { Title } from '../ui/Title';
import { FormInput } from './FormInput';

export const QuestionForm: FC = () => {
  const {
    control,
    errors,
    handleSendUserQuestion,
    handleSubmit,
    isLoading,
    register,
  } = useUserQuestion();

  return (
    <div className="max-w-[500px] w-full border-2 border-b-gray-200 px-8 py-6">
      <Title classNameModificator="opacity-80 mb-3">Поставити запитання</Title>
      <form
        //@ts-ignore
        onSubmit={handleSubmit(handleSendUserQuestion)}
      >
        <div className="flex flex-col gap-4">
          <FormInput
            label={`Пошта`}
            name="email"
            placeholder={`iSoft@gmail.com`}
            register={register('email', { required: `Пошта обов'язкове поле` })}
            type="text"
            errors={errors.email as FieldError}
            classNameModificator=""
            required
          />
          <FormInput
            label={`ПІБ`}
            name="fullName"
            placeholder={`Ваше ім'я`}
            register={register('fullName')}
            type="text"
            errors={errors.fullName as FieldError}
          />
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full outline-none border py-1 px-2.5 text-parS font-medium rounded-sm resize-y overflow-y-auto mb-2" // Добавьте необходимые стили
                placeholder={`Ваше питання`}
                required
              />
            )}
          />
          <SubmitButton disabled={isLoading} classNameModificator="p-1">
            {isLoading ? 'Відправка...' : 'Відправити'}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
