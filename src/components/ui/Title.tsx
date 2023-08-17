import clsx from 'clsx';
import { type FC } from 'react';

type TitleProps = {
  classNameModificator?: string;
  children: React.ReactNode;
  titleTag?: string | React.ElementType;
};

export const Title: FC<TitleProps> = ({
  children,
  classNameModificator,
  titleTag,
}) => {
  const TitleTag = titleTag ? titleTag : 'h2';

  return (
    <TitleTag
      className={clsx(
        'text-parM md:text-dispS3 font-semibold',
        classNameModificator,
      )}
    >
      {children}
    </TitleTag>
  );
};
