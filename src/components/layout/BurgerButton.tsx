import clsx from 'clsx';
import { type FC } from 'react';

type BurgerButtonProps = {
  isToggled: boolean;
  handleToggle: () => void;
};

export const BurgerButton: FC<BurgerButtonProps> = ({
  isToggled,
  handleToggle,
}) => {
  return (
    <button
      className="cursor-pointer block md:hidden ease-out duration-300"
      onClick={handleToggle}
    >
      <div
        className={clsx(
          'flex flex-col gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.68,-0.35,0.265,1.35)]',
          isToggled ? 'rotate-180' : null,
        )}
      >
        <div
          className={clsx(
            'w-8 h-1 bg-white transition-all duration-300 delay-200',
            isToggled ? 'rotate-45 translate-y-[10px]' : null,
          )}
        ></div>
        <div
          className={clsx(
            'w-8 h-1 transition-all duration-100 delay-300',
            isToggled ? 'bg-transparent' : 'bg-white',
          )}
        ></div>
        <div
          className={clsx(
            'w-8 h-1 bg-white transition-all duration-300 delay-200',
            isToggled ? '-rotate-45 -translate-y-[10px]' : null,
          )}
        ></div>
      </div>
    </button>
  );
};
