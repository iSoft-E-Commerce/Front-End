import { type FC } from 'react';
import { Title } from '../ui/Title';
import { type OrderData } from '../../../client';
import { UserOrder } from './UserOrder';
import Link from 'next/link';

type ProfileOrdersProps = {
  userOrders: Array<OrderData> | null;
};

export const ProfileOrders: FC<ProfileOrdersProps> = ({ userOrders }) => {
  return (
    <div className="w-full">
      <Title
        classNameModificator="text-darkGray-100 mb-6 text-center"
        titleTag={'h2'}
      >
        Історія замовлень
      </Title>
      {userOrders?.length ? (
        userOrders
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .map((order) => <UserOrder key={order.id} order={order} />)
      ) : (
        <div className="text-parS md:text-parM font-medium text-center">
          <p className="p-2.5 border w-fit mx-auto border-yellow-80 rounded-md mb-3">
            Ваша історія замовлень порожня
          </p>
          <Link
            href="/"
            className="underline text-darkGray-60 hover:text-darkGray-100 transition-all duration-200"
          >
            Перейти до покупок
          </Link>
        </div>
      )}
    </div>
  );
};
