import { UserProfileForm } from '@/components/forms/UserProfileForm';
import { SubmitButton } from '@/components/ui/SubmitButton';
import Tab from '@/components/ui/Tab';
import { Title } from '@/components/ui/Title';
import { ProfileOrders } from '@/components/user/ProfileOrders';
import { UserWishlist } from '@/components/user/UserWishlist';
import { useSignOut } from '@/hooks/useSignOut';
import { UserSection } from '@/utils/profileConstants';
import { type GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC, useCallback, useEffect, useState } from 'react';
import { iSoftClient, type OrderData, type User } from '../../../client';
import { SectionLayout } from '@/components/layout/SectionLayout';

type UserProfileProps = {
  userData: User | null;
  ordersHistory: OrderData[] | null;
};

export const getServerSideProps: GetServerSideProps<UserProfileProps> = async (
  ctx,
) => {
  try {
    const session = await getSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user?.token,
    });

    const userData = await client.userEndpoints.userControllerGetUserData();
    const ordersHistory =
      await client.ordersHistoryEdpoints.ordersHistoryControllerGetOrdersHistory();

    return {
      props: { userData, ordersHistory },
    };
  } catch (err) {
    return {
      props: { userData: null, ordersHistory: null },
    };
  }
};

const profileTabs = [
  {
    label: 'Особисті дані',
    section: UserSection.Profile,
  },
  {
    label: 'Мої замовлення',
    section: UserSection.Orders,
  },
  {
    label: 'Обрані товари',
    section: UserSection.WishList,
  },
];

const UserProfile: FC<UserProfileProps> = ({ userData, ordersHistory }) => {
  const handleSignOut = useSignOut();
  const router = useRouter();
  const sectionFromUrl = router.query.section;
  const [profileNavShown, setProfileNavShown] = useState(false);

  const [activeSection, setActiveSection] = useState(() => {
    switch (sectionFromUrl) {
      case 'Orders':
        return UserSection.Orders;
      case 'Wishlist':
        return UserSection.WishList;
      default:
        return UserSection.Profile;
    }
  });

  useEffect(() => {
    switch (sectionFromUrl) {
      case 'Orders':
        setActiveSection(UserSection.Orders);
        break;
      case 'Wishlist':
        setActiveSection(UserSection.WishList);
        break;
      default:
        setActiveSection(UserSection.Profile);
    }
  }, [sectionFromUrl]);

  const handleNavigationClick = useCallback(
    (section: UserSection) => {
      setActiveSection(section);
      router.replace(`/profile?section=${section}`, undefined, {
        shallow: true,
      });
    },
    [router],
  );

  const toggleProfileNav = () => {
    setProfileNavShown(!profileNavShown);
  };

  return (
    <SectionLayout classNameModificator="py-8">
      <Title classNameModificator="text-darkGray-100 md:mb-10" titleTag={'h1'}>
        Особистий кабінет
      </Title>
      {userData ? (
        <div className="flex justify-between gap-5 relative">
          <div className="min-w-fit absolute md:static top-0 left-0">
            <button className="md:hidden w-8 h-8" onClick={toggleProfileNav}>
              <img
                src={
                  profileNavShown
                    ? 'icons/close-circle.svg'
                    : 'icons/show-more-circle.svg'
                }
                alt="Profile nav button"
              />
            </button>
            <div
              className={`pr-8 md:border-r-2 w-44 md:w-48 min-w-fit md:max-w-[200px] transition-all duration-500 absolute top-10 z-10 md:z-0 bg-darkGray-100 px-4 py-3 rounded-md md:bg-transparent ${
                profileNavShown ? 'left-0' : '-left-[1000%]'
              } md:translate-x-0 md:static`}
            >
              <div className="mb-3 pb-3 md:border-b-2 flex flex-col">
                {profileTabs.map(({ label, section }) => (
                  <Tab
                    key={section}
                    label={label}
                    classNameModificator="text-parS md:text-parM md:py-2 py-1 mb-1.5 md:mb-2 text-mystic-40 md:text-darkGray-60 outline-none md:hover:text-darkGray-80 w-fit"
                    isActive={
                      activeSection === section
                        ? 'md:font-semibold border-b border-t border:mystic-100 md:border-darkGray-80'
                        : null
                    }
                    onClick={() => handleNavigationClick(section)}
                  />
                ))}
              </div>
              <SubmitButton
                classNameModificator="py-0 px-4 text-parS"
                onClick={handleSignOut}
              >
                Вийти
              </SubmitButton>
            </div>
          </div>
          {activeSection === UserSection.Profile ? (
            <UserProfileForm userData={userData} />
          ) : null}
          {activeSection === UserSection.Orders ? (
            <ProfileOrders userOrders={ordersHistory} />
          ) : null}
          {activeSection === UserSection.WishList ? <UserWishlist /> : null}
        </div>
      ) : (
        <span className="block text-center text-parS font-medium p-4 text-error-100">
          Інформацію про користувача не знайдено.
        </span>
      )}
    </SectionLayout>
  );
};

export default UserProfile;
