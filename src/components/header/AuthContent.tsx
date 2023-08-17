import { AuthModalForm } from '@/components/forms/AuthModalForm';
import { Modal } from '@/components/ui/Modal';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { useSignOut } from '@/hooks/useSignOut';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { type FC, useState } from 'react';

export const AuthContent: FC = () => {
  const { data, status } = useSession();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isShownDropDown, setIsShownDropDown] = useState(false);

  const handleSignOut = useSignOut();

  const handleAuthModalOpen = () => {
    setShowAuthModal(true);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };
  if (status === 'authenticated') {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsShownDropDown(true)}
        onMouseLeave={() => setIsShownDropDown(false)}
      >
        <img
          className={clsx(
            'hidden md:block md:w-10 md:h-10 md:min-w-[40px] rounded-full cursor-pointer object-top object-cover',
            data.user?.image ? null : 'invert',
          )}
          src={data.user?.image || '/icons/user.svg'}
          alt="User Avatar"
        />
        <div
          className={clsx(
            'absolute right-0 bg-mystic-20 rounded-md text-right w-fit overflow-hidden shadow-md z-10 p-3 transition-all duration-300',
            isShownDropDown
              ? 'md:opacity-100 md:visible'
              : 'opacity-0 invisible',
          )}
        >
          <p className="text-darkGray-60 mb-1">{data.user?.email}</p>
          <Link
            href="/profile"
            className="block text-darkGray-100 cursor-default underline mb-2"
          >
            <span className="hover:font-medium hover:cursor-pointer transition-all duration-200">
              Мій профіль
            </span>
          </Link>
          <SubmitButton
            classNameModificator="py-0 px-4 text-parS"
            onClick={handleSignOut}
          >
            Вийти
          </SubmitButton>
        </div>
      </div>
    );
  } else if (status === 'loading') {
    return (
      <div>
        <span className="hidden md:block w-8 h-8 rounded-full border-t-2 border-b-2 border-2 border-transparent border-t-yellow-100 border-b-yellow-40 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="max-md:w-7 max-md:h-7">
        <button
          onClick={handleAuthModalOpen}
          className="text-white font-medium text-parS hover:underline"
        >
          <span className="md:block hidden">Реєстрація / Вхід</span>
          <img
            src="/icons/login.svg"
            alt="Login Icon"
            className="md:hidden block w-7 h-7 min-w-[28px]"
          />
        </button>
        {showAuthModal ? (
          <Modal onClose={handleAuthModalClose}>
            <AuthModalForm onClose={handleAuthModalClose} />
          </Modal>
        ) : null}
      </div>
    );
  }
};
