import type { FC } from 'react';
import type { Characteristics } from '../../../client';

export type AllCharacteristicsProps = {
  characteristics: Characteristics[];
  additionalCharacteristics: Characteristics[];
};

export const AllCharacteristics: FC<AllCharacteristicsProps> = ({
  additionalCharacteristics,
  characteristics,
}) => {
  return (
    <div className="w-full mx-auto shadow-productInfo">
      <div className="border p-1.5 bg-darkSkyBlue-10">
        <h3 className="text-parM font-semibold">Основні характеристики</h3>
      </div>
      {characteristics.map((char) => (
        <div className="flex" key={char.name}>
          <div className="border flex-1 p-1.5 sm:p-2.5">
            <p className="text-quot sm:text-parS font-medium">{char.name}</p>
          </div>
          <div className="border flex-1 p-1.5 sm:p-2.5">
            <p className="text-quot sm:text-parS">{char.value}</p>
          </div>
        </div>
      ))}
      <div className="border p-1.5 bg-darkSkyBlue-10">
        <h3 className="text-parM font-semibold">Додаткові характеристики</h3>
      </div>
      {additionalCharacteristics.map((char) => (
        <div className="flex" key={char.name}>
          <div className="border flex-1 p-1.5 sm:p-2.5">
            <p className="text-quot sm:text-parS font-medium">{char.name}</p>
          </div>
          <div className="border flex-1 p-1.5 sm:p-2.5">
            <p className="text-quot sm:text-parS">{char.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
