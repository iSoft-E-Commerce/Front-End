import Link from 'next/link';
import type { FC } from 'react';
import type { Contacts } from '../../../client';
import { ContactsTitle } from '../ui/ContactsTitle';
import { WarningMessage } from '../ui/WarningMessage';

export type ContactsDataProps = {
  contacts: Contacts | null;
};

export const ContactsData: FC<ContactsDataProps> = ({ contacts }) => {
  return (
    <div className="md:mx-0 mx-auto max-w-contactsData w-full">
      {contacts ? (
        <div>
          <div className="pointer-events-none pb-4 border-b-2 border-b-gray-200 mb-4 flex gap-4 items-center">
            <img
              className="w-8 h-8"
              src={'/icons/phone-logo.svg'}
              alt="phone"
            />
            <div>
              <ContactsTitle>Телефон</ContactsTitle>
              <p className="text-dispS3 font-medium">{contacts.phone}</p>
              <span className="underline text-parM">Безкоштовно</span>
            </div>
          </div>
          <div className="pointer-events-none pb-4 border-b-2 border-b-gray-200 mb-4 flex gap-4 items-center">
            <img
              className="w-8 h-8"
              src={'/icons/clock-logo.svg'}
              alt="phone"
            />
            <div>
              <ContactsTitle>Графік роботи</ContactsTitle>
              <p className="text-dispS3 font-medium">{contacts.schedule}</p>
              <span className="underline text-parM">
                Без перерв та вихідних
              </span>
            </div>
          </div>
          <div className="pointer-events-none pb-4 border-b-2 border-b-gray-200 mb-4 flex gap-4 items-center">
            <img
              className="w-8 h-8"
              src={'/icons/address-logo.svg'}
              alt="phone"
            />
            <div>
              <ContactsTitle>Адреса</ContactsTitle>
              <p className="text-dispS3 font-medium">{contacts.address}</p>
              <span className="underline text-parM">Центр міста</span>
            </div>
          </div>
          {contacts?.socialMedia ? (
            <div className="flex items-center gap-4 justify-center">
              {contacts.socialMedia.map((social) => (
                <Link
                  className="hover:scale-[1.1] transition-all duration-150"
                  target="_blank"
                  key={social.link}
                  href={social.link}
                >
                  <img
                    className="max-w-10 w-full  max-h-10 "
                    src={social.img}
                    alt={'Media'}
                  />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <WarningMessage>Наразі даних про контакти не створено.</WarningMessage>
      )}
    </div>
  );
};
