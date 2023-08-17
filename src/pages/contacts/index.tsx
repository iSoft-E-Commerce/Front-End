import { ContactsData } from '@/components/contacts/ContactsData';
import { Title } from '@/components/ui/Title';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';
import { iSoftClient, type Contacts } from '../../../client';
import { QuestionForm } from '@/components/forms/QuestionForm';
import { SectionLayout } from '@/components/layout/SectionLayout';

export type ContactsPageProps = {
  contacts: Contacts | null;
};

export const getServerSideProps: GetServerSideProps<ContactsPageProps> = async (
  ctx,
) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
  );
  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const contacts =
      await client.contactsEndpoints.contactsControllerGetContacts();
    return {
      props: { contacts: contacts[0] },
    };
  } catch (err) {
    return {
      props: { contacts: null },
    };
  }
};

const Contacts: FC<ContactsPageProps> = ({ contacts }) => {
  return (
    <SectionLayout classNameModificator="pt-4">
      <Title classNameModificator="mb-6">Контакти</Title>
      <div className="flex md:flex-row flex-col justify-center items-center gap-10">
        <ContactsData contacts={contacts} />
        <QuestionForm />
      </div>
    </SectionLayout>
  );
};

export default Contacts;
