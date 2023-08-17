import { BasketContext } from '@/context/basketContext';
import clsx from 'clsx';
import Link from 'next/link';
import { useContext, type FC } from 'react';
import { BasketPopUp } from './BasketPopUp';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useWishlist } from '@/context/WishlistContext';
import { useCompareContext } from '@/context/CompareContextProvider';

type ButtonsGroupProps = {
  display: 'onMobile' | 'onDesktop';
  isOpenNavMenu?: boolean;
  handleCloseNav: () => void;
};

export const WishlistAndBasketButtons: FC<ButtonsGroupProps> = ({
  display,
  isOpenNavMenu,
  handleCloseNav,
}) => {
  const { toggleBasket, userBasket } = useContext(BasketContext);
  const { compareProducts } = useCompareContext();

  const { userWishlist } = useWishlist();
  const router = useRouter();
  const handleWishlistClick = async () => {
    try {
      const session = await getSession();
      if (session) {
        router.push('/profile?section=Wishlist');
        return;
      }
      router.push('/wishlist');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className={clsx(
        'items-center gap-4 ml-auto',
        display === 'onDesktop' ? 'hidden md:flex' : null,
        display === 'onMobile' ? 'flex md:hidden' : null,
      )}
    >
      <Link href="/compare" className="relative w-7 h-7 hidden md:block">
        <img
          className="w-7 h-7 min-w-[28px]"
          src="/icons/compare-white-icon.svg"
          alt="wishlist"
        />
        <p className="absolute w-4 h-4 -top-0.5 -right-2 text-quot text-center leading-4 rounded-full bg-green-80 flex items-center justify-center">
          {compareProducts?.length ? compareProducts.length : 0}
        </p>
      </Link>
      <button
        className="relative w-7 h-7 hidden md:block"
        onClick={handleWishlistClick}
      >
        <img
          className="w-7 h-7 min-w-[28px]"
          src="/icons/wishlist-icon.svg"
          alt="wishlist"
        />
        <p className="absolute w-4 h-4 -top-0.5 -right-2 text-quot text-center leading-4 rounded-full bg-yellow-80 flex items-center justify-center">
          {userWishlist?.length ? userWishlist.length : 0}
        </p>
      </button>
      <div
        className="relative w-7 h-7"
        onMouseEnter={toggleBasket}
        onMouseLeave={toggleBasket}
        onClick={() => {
          if (isOpenNavMenu) {
            return handleCloseNav();
          }
        }}
      >
        <Link href="/basket">
          <img
            className="min-w-[28px]"
            src="/icons/basket-icon.svg"
            alt="basket"
          />
          <p className="absolute w-4 h-4 -top-0.5 -right-2 text-quot text-center leading-4 rounded-full bg-blue-80 flex items-center justify-center">
            {userBasket ? userBasket?.length : 0}
          </p>
        </Link>
        <BasketPopUp />
      </div>
    </div>
  );
};
