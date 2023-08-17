import { SectionLayout } from '@/components/layout/SectionLayout';
import { CloseButton } from '@/components/ui/CloseButton';
import { EmptyProductsMessage } from '@/components/ui/EmptyProductsMessage';
import { useCompareContext } from '@/context/CompareContextProvider';
import { uniqueChar } from '@/utils/uniqueChar';
import Link from 'next/link';
import { type FC, useMemo } from 'react';

const CompareProducts: FC = () => {
  const { compareProducts, compareProductHandler } = useCompareContext();
  const { characteristics } = useMemo(
    () => uniqueChar(compareProducts),
    [compareProducts.length],
  );

  return (
    <SectionLayout classNameModificator="py-5 overflow-x-auto">
      {compareProducts.length ? (
        <div className="flex gap-2 mb-4">
          <div className="min-w-[250px] max-w-[250px] w-full text-quot sm:text-parS font-semibold mt-auto p-1.5 ">
            Xарактеристики
          </div>
          {compareProducts.map((item) => (
            <div
              key={item.description}
              className="min-w-[250px] max-w-[250px] w-full text-center shadow-productInfo p-1.5 relative"
            >
              <CloseButton
                classNameModificator="w-5 h-5 absolute top-1.5 right-1.5"
                onClick={() => compareProductHandler(item)}
              />
              <Link href={`/products/${item.description}`}>
                <img
                  className="max-w-full h-32 mx-auto mb-2"
                  src={item.img}
                  alt="product-img"
                />
                <span className="text-quot sm:text-parS font-semibold">
                  {item.description}
                </span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <EmptyProductsMessage
          img="/icons/compare-logo.svg"
          title="Товари до порівняння не додано!"
        />
      )}
      {characteristics.map((item, index) => (
        <div className="flex gap-2" key={index}>
          {Object.entries(item).map(([key, value]) => (
            <div
              className="min-w-[250px] max-w-[250px] w-full text-quot sm:text-parS font-medium p-1.5 border-b"
              key={key}
            >
              {value}
              <br />
            </div>
          ))}
        </div>
      ))}
    </SectionLayout>
  );
};

export default CompareProducts;
