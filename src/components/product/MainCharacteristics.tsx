import type { FC } from 'react';
import type { Characteristics } from '../../../client';

export type MainCharacteristicsProps = {
  characteristics: Characteristics[];
};

export const MainCharacteristics: FC<MainCharacteristicsProps> = ({
  characteristics,
}) => {
  return (
    <div className="shadow-productInfo p-4">
      <h3 className="text-parS font-semibold mb-2">Основні характеристики</h3>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
        {characteristics.map((char) => (
          <div key={char.name}>
            <h5 className="text-quot text-darkGray-60">{char.name}</h5>
            <span className="block text-quot font-medium">{char.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
