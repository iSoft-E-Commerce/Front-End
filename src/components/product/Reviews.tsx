import { useState, type FC } from 'react';
import type { Rate } from '../../../client';
import { ReviewForm } from '../forms/ReviewForm';
import { ReviewLayout } from '../layout/ReviewLayout';
import { Modal } from '../ui/Modal';
import { WarningMessage } from '../ui/WarningMessage';
import { ReviewItem } from './ReviewItem';
import { ReviewItemTitle } from './ReviewItemTitle';

export type ReviewsProps = {
  rate: Rate[];
  productId: number;
};

export const Reviews: FC<ReviewsProps> = ({ rate, productId }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const filterReview = rate.filter((item) => item.rate > 0);

  return (
    <ReviewLayout>
      {isModal ? (
        <Modal onClose={() => setIsModal(false)}>
          <ReviewForm onClose={() => setIsModal(false)} productId={productId} />
        </Modal>
      ) : null}
      <ReviewItemTitle
        title="Відгуки"
        btnText="Залишити відгук"
        handleClick={() => setIsModal(true)}
      />
      <div className="max-w-md w-full mx-auto max-h-rateHeight overflow-auto">
        {filterReview.length ? (
          filterReview.map((item) => (
            <ReviewItem userMessage="Відгук" key={item.id} rate={item} />
          ))
        ) : (
          <div className="bg-white p-2.5 shadow-productInfo">
            <WarningMessage>
              Ще немає жодного відгуку. <br /> Будьте першим хто залишить
              відгук.
            </WarningMessage>
          </div>
        )}
      </div>
    </ReviewLayout>
  );
};
