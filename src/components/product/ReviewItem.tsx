import { convertDate } from '@/utils/convertDate';
import type { FC } from 'react';
import type { Rate } from '../../../client';
import { StarRating } from './StarRating';

export type ReviewItemProps = {
  rate: Rate;
  question?: boolean;
  userMessage: string;
};

export const ReviewItem: FC<ReviewItemProps> = ({
  rate: { rate, updatedAt, createdAt, user, review, moderatorReply },
  question = false,
  userMessage,
}) => {
  const { formattedCreatedAt, formattedUpdatedAt } = convertDate(
    createdAt,
    updatedAt,
  );
  return (
    <div className="flex items-start flex-col sm:flex-row  bg-white border-2 border-darkSkyBlue-20 px-2.5 py-5 mb-3 rounded-md">
      <div className="max-w-userReview w-full md:mr-8 mr-0">
        {user.firstName ? (
          <h4 className="text-parS font-semibold">{user.firstName}</h4>
        ) : (
          <img className="w-7 h-7" src={'/icons/user.svg'} />
        )}
        {!question && rate ? (
          <div className="flex items-center gap-1">
            <StarRating rating={rate} classNameModificator="w-3 h-3" />
            {rate > 0 ? (
              <span className="text-parM font-medium">{rate}</span>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="grow w-full">
        <div className="mb-4">
          <span className="block text-quot font-medium text-darkSkyBlue-60">
            {userMessage}{' '}
            <span className="text-darkSkyBlue-40 text-quot md:text-parS font-medium ml-1">
              {formattedCreatedAt}
            </span>
          </span>
        </div>
        <div className="mb-4 border-b-2 border-darkSkyBlue-10 pb-4">
          <p className="text-quot md:text-parS">{review}</p>
        </div>
        {moderatorReply.reply ? (
          <>
            <div className="flex items-start md:items-center gap-1 mb-4 flex-col-reverse md:flex-row">
              <div className="flex items-center gap-1">
                <img className="w-9 h-auto -mt-1 -ml-2" src={'/img/logo.png'} />
                <h4 className="text-parS font-semibold -ml-2">
                  {moderatorReply.name},
                </h4>
                <span className="text-parS font-bold block">
                  компанія iSoft
                </span>
              </div>
              <div>
                <span className="text-right block text-quot font-medium text-darkSkyBlue-60">
                  Відповідь{' '}
                  <span className="text-darkSkyBlue-40 text-quot md:text-parS font-medium ml-1">
                    {formattedUpdatedAt}
                  </span>
                </span>
              </div>
            </div>
            <div className="border-b-2 border-darkSkyBlue-10 pb-4">
              <p className="text-quot md:text-parS">{moderatorReply.reply}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
