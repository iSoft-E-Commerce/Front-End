import { type FC, type ReactNode, useState } from 'react';

type FilterAccordionProps = {
  title: string;
  mapFunction: ReactNode;
};
export const FilterAccordion: FC<FilterAccordionProps> = ({
  title,
  mapFunction,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <div className="border-b pb-4 border-darkSkyBlue-20">
      <button
        className="w-full flex items-center justify-between p-2.5 text-left"
        onClick={toggleAccordion}
      >
        <span className="text-parL font-semibold">{title}</span>
        <span
          className={`text-xl transform ${
            isOpen ? 'rotate-0' : 'rotate-90'
          } transition-transform`}
        >
          &#8711;
        </span>
      </button>

      <div
        className={`overflow-hidden transition-max-height duration-150 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="py-1 px-2.5 flex flex-col gap-2">{mapFunction}</div>
      </div>
    </div>
  );
};
