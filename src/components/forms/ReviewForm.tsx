import { useSendReview } from '@/hooks/useSendReview';
import clsx from 'clsx';
import { type FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { CloseButton } from '../ui/CloseButton';
import { SubmitButton } from '../ui/SubmitButton';
import { Title } from '../ui/Title';

export type ReviewFormProps = {
  question?: boolean;
  productId: number;
  onClose: () => void;
};

export const ReviewForm: FC<ReviewFormProps> = ({
  question = false,
  productId,
  onClose,
}) => {
  const [rating, setRating] = useState<number>(3);
  const [hover, setHover] = useState<number>(0);
  const { control, handleSubmit, handleSubmitReview, isSubmitting } =
    useSendReview(productId, question, rating);

  return (
    <div className="p-5 w-full">
      <CloseButton
        onClick={onClose}
        classNameModificator="absolute top-2.5 right-2.5"
      />
      <Title classNameModificator="text-center mb-4">
        {question ? 'Ваше запитання' : 'Оцініть товар'}
      </Title>
      {!question ? (
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, idx) => {
            const currRate = idx + 1;
            return (
              <label key={currRate}>
                <input
                  className="hidden"
                  name="rating"
                  type="radio"
                  value={currRate}
                  onClick={() => setRating(currRate)}
                />
                <img
                  src={'/icons/star-logo.svg'}
                  className={clsx(
                    currRate <= (hover || rating) ? 'grayscale-0' : 'grayscale',
                    'w-7 h-7 cursor-pointer',
                  )}
                  onMouseEnter={() => setHover(currRate)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
      ) : null}
      <form
        //@ts-ignore
        onSubmit={handleSubmit(handleSubmitReview)}
      >
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full outline-none border py-1 px-2.5 text-parS font-medium rounded-sm resize-y overflow-y-auto mb-4"
              placeholder={`Введіть текст`}
            />
          )}
        />
        <SubmitButton
          disabled={isSubmitting}
          classNameModificator={clsx('w-full py-1.5')}
        >
          {isSubmitting ? 'Відправка...' : 'Відправити'}
        </SubmitButton>
      </form>
    </div>
  );
};
