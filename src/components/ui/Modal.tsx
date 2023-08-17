import type { FC, ReactNode } from 'react';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export const Modal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-1.5">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 opacity-75"
          aria-hidden="true"
          onClick={onClose}
        />
        <div
          className="h-full max-w-[450px] mx-auto w-full flex justify-center items-center bg-white rounded-lg overflow-hidden text-left shadow-xl transform transition-all"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
