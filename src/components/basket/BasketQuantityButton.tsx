import { BasketContext } from '@/context/basketContext';
import { type FC, useContext } from 'react';

type QuantityButtonProps = {
  quantity: number;
  handleClick: () => void;
  variant: 'incr' | 'decr';
};

const BasketQuantityButton: FC<QuantityButtonProps> = ({
  variant,
  handleClick,
  quantity,
}) => {
  const { isFetching } = useContext(BasketContext);

  return (
    <button
      disabled={(variant === 'decr' && quantity === 1) || isFetching}
      onClick={handleClick}
      className="disabled:opacity-30 enabled:hover:scale-125 ease-out duration-200"
    >
      {variant === 'incr' ? (
        <img
          className="w-4 h-4 lg:w-6 lg:h-6 min-w-[16px]"
          src="/icons/plus.svg"
          alt="add"
        />
      ) : (
        <img
          className="w-4 h-4 lg:w-6 lg:h-6 min-w-[16px]"
          src="/icons/minus.svg"
          alt="remove"
        />
      )}
    </button>
  );
};

export default BasketQuantityButton;
