import { Banner } from '@/components/ui/Banner';
import { Title } from '@/components/ui/Title';
import { type FC } from 'react';

const Delivery: FC = () => {
  return (
    <section className="md:max-w-medium w-full px-2.5 mx-auto">
      <Title
        classNameModificator="text-darkGray-100 mb-6 md:pt-8"
        titleTag={'h1'}
      >
        Доставка
      </Title>
      <Banner
        size="medium"
        classNameModificator="bg-[url('https://www.svgrepo.com/show/503827/gift.svg')] bg-contain bg-[90%] bg-no-repeat"
      >
        <span className="uppercase text-dispS1 md:text-dispL text-white font-extrabold">
          Безкоштовно
        </span>
        <span className="text-white text-dispS3 md:text-dispS1">
          Замовляй на сайті - отримуй в магазині
        </span>
      </Banner>
      <Title
        classNameModificator="mb-3 md:mb-4 font-bold underline"
        titleTag={'h2'}
      >
        Самовивіз з нашого магазину: швидко, зручно та безкоштовно
      </Title>
      <p>
        Оформлюйте замовлення на сайті та протягом години отримуйте його в
        нашому магазині за умови наявності товару.
      </p>
      <p>
        Доставка товару в магазин здійснюється{' '}
        <span className="font-bold">безкоштовно.</span>
      </p>
      <p>
        Після підтвердження замовлення ви отримаєте повідомлення з інформацією
        про готовність вашого замовлення.
      </p>
      <p>Резерв вашого замовлення збережеться протягом 24 годин.</p>
      <Banner
        size="medium"
        classNameModificator="bg-contain bg-[90%] bg-no-repeat bg-[url('https://ifrukt.com/src/images/site/delivery/nova-poshta.svg')]"
      >
        <span className="uppercase text-dispS1 md:text-dispL text-white font-bold">
          службою
        </span>
        <span className="uppercase text-dispS1 md:text-dispL text-white font-bold">
          доставки
        </span>
      </Banner>
      <Title
        classNameModificator="mb-3 md:mb-4 font-bold underline"
        titleTag={'h2'}
      >
        Доставка у відділення "Нової Пошти"
      </Title>
      <p>
        Доставка здійснюється у будь-яке зручне та обране вами відділення Нової
        пошти. Вартість доставки залежить від способу оплати та вартості товару.
        Відправка товару по Україні оплачується покупцем згідно тарифів служби
        доставки "Нова Пошта" . По прибуттю відправлення у ваше відділення Ви
        отримаєте повідомлення та зможете отримати ваше замовлення.
      </p>
      <p>
        {' '}
        При підтвердженні замовлення до 14:00 , відправка буде у день
        замовлення. Терміни доставки у відділення 1-3 дні.{' '}
      </p>
      <p>
        {' '}
        Після відправлення замовлення Ви отримаєте SMS-повідомлення з номером
        експрес-накладної.{' '}
      </p>
      <Banner
        size="medium"
        classNameModificator="bg-[url('https://www.svgrepo.com/show/503846/deliver-goods.svg')] bg-contain bg-[90%] bg-no-repeat"
      >
        <span className="uppercase text-dispS1 md:text-dispL text-white font-bold">
          адресна доставка
        </span>
        <span className="uppercase text-dispS1 md:text-dispL text-white font-bold ml-[10%]">
          кур'єром
        </span>
      </Banner>
      <Title
        classNameModificator="mb-3 md:mb-4 font-bold underline"
        titleTag={'h2'}
      >
        Адресна доставка: ваше замовлення вчасно та з комфортом доставлене до
        дверей
      </Title>
      <p>
        Умови та час доставки будуть узгоджені з вами особисто під час
        оформлення замовлення.
      </p>
      <p>
        Для забезпечення безперебійного процесу доставки, наш кур'єр зателефонує
        вам перед виїздом для підтвердження вашої адреси та зручного для вас
        часу доставки.
      </p>
      <p>
        Врахуйте, що час доставки може варіюватись в залежності від обставин на
        дорогах та умов роботи перевізників.
      </p>
      <p>
        У разі виникнення будь-яких змін у ваших планах або умовах доставки,
        будь ласка, негайно повідомте нас, щоб ми могли адекватно реагувати на
        зміни.
      </p>
      <p>
        Завжди переконуйтесь, що ви надали нам правильну контактну інформацію та
        адресу для доставки, щоб ми могли ефективно та вчасно доставити ваше
        замовлення.
      </p>
    </section>
  );
};

export default Delivery;
