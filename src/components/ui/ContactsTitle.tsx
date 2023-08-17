import type { FC, ReactNode } from 'react';

type ContactsTitleProps = {
  children: ReactNode;
};

export const ContactsTitle: FC<ContactsTitleProps> = ({ children }) => {
  return (
    <h3 className="text-parM font-medium text-darkSkyBlue-60 ">{children}</h3>
  );
};
