import { convertDate } from '@/utils/convertDate';
import { type FC, useState } from 'react';
import { type OrderData } from '../../../client';
import { OrderItem } from './OrderItem';

type UserOrderProps = {
  order: OrderData;
};

export const UserOrder: FC<UserOrderProps> = ({ order }) => {
  const [isOpenOrder, setOpenOrder] = useState(false);
  const { formattedCreatedAt } = convertDate(order.createdAt, order.updatedAt);

  const totalPrice = order.products.reduce((sum, item) => {
    const { quantity, product } = item;
    const { price, discount } = product.price;

    return (sum += quantity * (discount ? price - discount : price));
  }, 0);

  return (
    <div>
      <div
        className="flex justify-between items-center gap-2 text-parS md:text-parM font-medium p-2.5 pr-0 mb-1 border bg-white border-darkGray-20 rounded-md hover:bg-mystic-40 hover:cursor-pointer transition-all duration-200"
        onClick={() => {
          setOpenOrder(!isOpenOrder);
        }}
      >
        <div className="flex w-full justify-between items-center text-darkGray-60">
          <p>
            Замовлення №:
            <span className=" text-darkGray-100 font-semibold mx-1">
              {order.id}
            </span>
            від
            <span className="underline ml-1 text-darkGray-100">
              {formattedCreatedAt}
            </span>
          </p>
        </div>
        <div className="flex items-center shrink-0">
          {!isOpenOrder ? (
            <p className="mr-2 text-green-100 font-medium">{totalPrice} грн</p>
          ) : null}
          <img
            className="w-7 h-7 mr-2"
            src={isOpenOrder ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
            alt="open-order"
          />
        </div>
      </div>
      {isOpenOrder ? (
        <div className="text-parS font-medium p-2.5">
          {order.products.map((item) => (
            <OrderItem key={item.id} orderItem={item} />
          ))}
          <p className="py-1.5 text-right">
            Разом:
            <span className="text-green-100 font-semibold ml-1">
              {totalPrice} грн
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
};
