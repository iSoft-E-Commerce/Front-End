import clsx from 'clsx';
import { type FC } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label?: string;
  errors?: FieldError;
  register: UseFormRegisterReturn<string>;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  classNameModificator?: string;
};

export const FormInput: FC<InputProps> = ({
  label,
  errors,
  register,
  type,
  placeholder,
  name,
  required,
  classNameModificator,
}) => {
  return (
    <label
      className={clsx(
        'block w-full relative mb-6 text-parS md:text-parM font-medium text-darkGray-40',
        classNameModificator,
      )}
      htmlFor={name}
    >
      {label} {required ? <span className="text-error-100">*</span> : null}
      {errors && (
        <p className="text-error-100 md:absolute top-1 right-0 text-quot font-medium">
          {errors.message}
        </p>
      )}
      <input
        id={name}
        className={`w-full pl-3.5 py-1 md:py-2.5 outline-none md:h-input mt-1 bg-transparent border-b border-b-darkGray-80 text-darkGray-80 ${
          errors ? 'shadow-error-100 shadow-insetErrorInput' : ''
        }`}
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </label>
  );
};
