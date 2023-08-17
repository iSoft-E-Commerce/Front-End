import { type FC } from 'react';
import clsx from 'clsx';

type CloseButtonProps = {
  classNameModificator?: string;
  onClick?: () => void;
};

export const CloseButton: FC<CloseButtonProps> = ({
  classNameModificator,
  onClick,
}) => {
  return (
    <button
      className={clsx('max-w-closeBtn', classNameModificator)}
      type="button"
      onClick={onClick}
    >
      <img src="/icons/close-circle.svg"></img>
    </button>
  );
};
