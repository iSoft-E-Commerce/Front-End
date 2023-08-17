import { useWishlist } from '@/context/WishlistContext';
import clsx from 'clsx';
import { type FC } from 'react';
import { type Product } from '../../../client';

type AddToWishlistButtonProps = {
  wishlistProduct: Product;
  children?: React.ReactNode;
  classNameModificator?: string;
};

export const AddToWishlistButton: FC<AddToWishlistButtonProps> = ({
  classNameModificator,
  wishlistProduct,
}) => {
  const {
    userWishlist,
    removeWishlistProduct,
    addWishlistProduct,
    isWishlistLoading,
  } = useWishlist();

  const productInWishlist = userWishlist?.some(
    (item) => item.id === wishlistProduct.id,
  );

  const handleClick = async () => {
    if (productInWishlist) {
      await removeWishlistProduct(wishlistProduct.id);
    } else {
      await addWishlistProduct(wishlistProduct);
    }
  };

  return (
    <button
      className={clsx(
        'text-quot flex items-center flex-row gap-1',
        classNameModificator,
      )}
      type="button"
      onClick={handleClick}
      disabled={isWishlistLoading}
    >
      {productInWishlist ? (
        <>
          <span className="md:hidden xl:block text-darkGray-40">
            Додано в обране
          </span>
          <span className="hidden md:block xl:hidden text-darkGray-40">
            В обраному
          </span>
          <img
            className="w-5 h-5"
            src={'/icons/heart-in-wishlist.svg'}
            alt="heart-icon"
          />
        </>
      ) : (
        <>
          <span className="md:hidden xl:block">Додати в обране</span>
          <span className="hidden md:block xl:hidden">В обране</span>
          <img
            className="w-5 h-5"
            src={'/icons/heart-logo.svg'}
            alt="heart-icon"
          />
        </>
      )}
    </button>
  );
};
