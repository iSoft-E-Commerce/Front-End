import clsx from 'clsx';
import type { ReactNode, FC } from 'react';

type SectionLayoutProps = {
  children: ReactNode;
  classNameModificator?: string;
};

export const SectionLayout: FC<SectionLayoutProps> = ({
  children,
  classNameModificator,
}) => {
  return (
    <section
      className={clsx(
        'md:max-w-md xl:max-w-xl w-full px-2.5 mx-auto',
        classNameModificator,
      )}
    >
      {children}
    </section>
  );
};
