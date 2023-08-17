import { type FC } from 'react';

export type StarRating = {
  rating: number;
  classNameModificator?: string;
};

export const StarRating: FC<StarRating> = ({
  rating,
  classNameModificator,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];
  const emptyStars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push('/icons/star-logo.svg');
  }

  if (hasHalfStar) {
    stars.push('/icons/half-star-logo.svg');
  }

  for (let i = 0; i < 5 - stars.length; i++) {
    emptyStars.push('/icons/empty-star-logo.svg');
  }

  return (
    <div className="flex items-center gap-1">
      {stars.length ? (
        <>
          {stars.map((star, idx) => (
            <img
              className={classNameModificator}
              key={idx}
              src={star}
              alt="star"
            />
          ))}
          {emptyStars.map((star, idx) => (
            <img
              className={classNameModificator}
              key={idx}
              src={star}
              alt="star"
            />
          ))}
        </>
      ) : (
        <>
          <img
            className={classNameModificator}
            src={'/icons/empty-star-logo.svg'}
          />
          <img
            className={classNameModificator}
            src={'/icons/empty-star-logo.svg'}
          />
          <img
            className={classNameModificator}
            src={'/icons/empty-star-logo.svg'}
          />
          <img
            className={classNameModificator}
            src={'/icons/empty-star-logo.svg'}
          />
          <img
            className={classNameModificator}
            src={'/icons/empty-star-logo.svg'}
          />
        </>
      )}
    </div>
  );
};
