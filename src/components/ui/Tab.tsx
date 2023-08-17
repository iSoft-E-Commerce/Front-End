import { type FC } from 'react';
import clsx from 'clsx';

type TabProps = {
  label: string;
  isActive?: string | null;
  classNameModificator?: string;
  onClick: () => void;
};

const Tab: FC<TabProps> = ({
  label,
  isActive,
  onClick,
  classNameModificator,
}) => {
  return (
    <span
      className={clsx(
        'block text-parM font-medium cursor-pointer',
        classNameModificator,
        isActive,
      )}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Tab;
