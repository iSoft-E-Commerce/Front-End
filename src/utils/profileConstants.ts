export enum UserSection {
  Profile = 'Profile',
  Orders = 'Orders',
  WishList = 'Wishlist',
}

export const profileTabs = [
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
