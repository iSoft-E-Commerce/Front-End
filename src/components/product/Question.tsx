import { useState, type FC } from 'react';
import type { Rate } from '../../../client';
import { ReviewForm } from '../forms/ReviewForm';
import { ReviewLayout } from '../layout/ReviewLayout';
import { Modal } from '../ui/Modal';
import { WarningMessage } from '../ui/WarningMessage';
import { ReviewItem } from './ReviewItem';
import { ReviewItemTitle } from './ReviewItemTitle';

export type QuestionProps = {
  rate: Rate[];
  productId: number;
};

export const Question: FC<QuestionProps> = ({ rate, productId }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const filterQuestion = rate.filter((item) => item.rate === 0);
  return (
    <ReviewLayout>
      {isModal ? (
        <Modal onClose={() => setIsModal(false)}>
          <ReviewForm
            onClose={() => setIsModal(false)}
            productId={productId}
            question={true}
          />
        </Modal>
      ) : null}
      <ReviewItemTitle
        title="Питання"
        btnText="Запитати"
        handleClick={() => setIsModal(true)}
      />
      <div className="max-w-md w-full mx-auto max-h-rateHeight overflow-auto">
        {filterQuestion.length ? (
          filterQuestion.map((item) => (
            <ReviewItem userMessage="Питання" key={item.id} rate={item} />
          ))
        ) : (
          <div className="bg-white p-2.5 shadow-productInfo">
            <WarningMessage>
              <p>Ще немає жодного питання.</p>
              <p>Будьте першим хто залишить питання.</p>
            </WarningMessage>
          </div>
        )}
      </div>
    </ReviewLayout>
  );
};
