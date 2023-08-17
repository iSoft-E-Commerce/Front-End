import { BasketPageProduct } from '@/components/basket/BasketPageProduct';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { EmptyProductsMessage } from '@/components/ui/EmptyProductsMessage';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { BasketContext } from '@/context/basketContext';
import { useSession } from 'next-auth/react';
import { useContext, type FC } from 'react';
import { toast } from 'react-toastify';

const Basket: FC = () => {
  const { data: session } = useSession();

  const { userBasket, totalBasketPrice, isBasketLoading, createOrder } =
    useContext(BasketContext);

  return (
    <SectionLayout classNameModificator="pt-5">
      <div className="max-w-lg mx-auto pb-10">
        {userBasket?.length && !isBasketLoading ? (
          <>
            {userBasket?.map((product) => (
              <BasketPageProduct basketProduct={product} key={product.id} />
            ))}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-5 sm:mt-10">
              <p className="text-papM md:text-dispS3">
                <span className="font-bold">До сплати: </span>
                {totalBasketPrice} грн
              </p>
              <SubmitButton
                classNameModificator="px-2.5 py-1.5 max-sm:w-full"
                onClick={
                  session ? createOrder : () => toast.warning('Авторизуйтесь!')
                }
              >
                Оформити замовлення
              </SubmitButton>
            </div>
          </>
        ) : !isBasketLoading ? (
          <EmptyProductsMessage
            img="/icons/basket-dark-icon.svg"
            title="Ваш кошик порожній!"
          />
        ) : (
          <div className="w-full h-80 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-t-8 border-b-8 border-8 border-transparent border-t-darkGray-60 border-b-darkGray-20 animate-spin" />
          </div>
        )}
      </div>
    </SectionLayout>
  );
};

export default Basket;
