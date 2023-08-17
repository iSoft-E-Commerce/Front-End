import type { Product } from '../../client';

export const uniqueChar = (products: Product[]) => {
  const allCharacteristics = products.flatMap((product) => [
    ...product.additionalCharacteristics,
    ...product.characteristics,
  ]);

  const productCharacteristics: Record<
    string,
    Record<string, string | null>
  > = {};
  products.forEach((product) => {
    const characteristics = [
      ...product.additionalCharacteristics,
      ...product.characteristics,
    ];
    productCharacteristics[product.name] = characteristics.reduce(
      (acc, char) => {
        //@ts-ignore
        acc[char.name] = char.value;
        return acc;
      },
      {},
    );
  });

  const uniqueChar = Array.from(
    new Set(allCharacteristics.map((characteristic) => characteristic.name)),
  );

  const tableData: Array<Record<string, string | null>> = uniqueChar.map(
    (characteristic) => {
      const rowData: Record<string, string | null> = {
        Characteristics: characteristic,
      };
      products.forEach((product) => {
        const productCharacteristic =
          productCharacteristics[product.name][characteristic];
        rowData[product.description] =
          productCharacteristic !== undefined ? productCharacteristic : '---';
      });
      return rowData;
    },
  );

  return {
    characteristics: tableData,
  };
};
