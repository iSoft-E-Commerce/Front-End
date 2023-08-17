import { type FC } from 'react';

export type ReviewItemTitleProps = {
  title: string;
  btnText: string;
  handleClick?: () => void;
};
export const ReviewItemTitle: FC<ReviewItemTitleProps> = ({
  btnText,
  title,
  handleClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-parM font-semibold">{title}</h3>
      <button
        onClick={handleClick}
        className="p-1.5 text-parS border border-black font-medium hover:bg-black hover:text-white transition-all duration-150"
        type="button"
      >
        {btnText}
      </button>
    </div>
  );
};
