import React, { createContext, useContext } from 'react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

type ContextType = {
  isOpenModal: boolean;
  title?: string;
  description?: string;
  onClose: (value: boolean) => void;
  onConfirm: () => void;
};
const ModalContext = createContext<ContextType>({
  isOpenModal: false,

  title: '',
  description: '',
  onClose: () => {},
  onConfirm: () => {},
});

type Props = {
  isOpenModal: boolean;
  onClose: (value: boolean) => void;
  onConfirm: () => void;

  title: string;
  description: string;
  children: React.ReactNode;

  classNameCustome?: string;
};
export function Modal({
  title,
  description,
  children,
  isOpenModal,
  onClose,
  onConfirm,
  classNameCustome,
}: Props) {
  return (
    <ModalContext.Provider
      value={{
        onClose,
        onConfirm,
        isOpenModal,
        title,
        description,
      }}
    >
      {/* Backdrop */}
      <div>
        <div
          className={`${
            isOpenModal ? 'block' : 'hidden'
          } fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center `}
        >
          {/* Content */}
          <div
            className={cn(
              `min-w-[100px] min-h-[100px] mx-[10%] bg-white rounded-md shadow-lg p-4 flex flex-col ${classNameCustome}`
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export function Title() {
  const { title } = useContext(ModalContext);

  if (!title) {
    return null;
  }
  return <h4 className='text-2xl font-bold pb-4'>{title}</h4>;
}
export function Description() {
  const { description } = useContext(ModalContext);

  if (!description) {
    return null;
  }
  return <p className='pb-12'>{description}</p>;
}

export function Header({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className='flex-1'>{children}</div>;
}

export function Footer() {
  const { onConfirm, onClose } = useContext(ModalContext);
  return (
    <div className='flex lg:gap-8 md:gap-8 gap-4 w-full lg:flex-row md:flex-row flex-col'>
      <Button variant='secondary' onClick={() => onConfirm()}>
        Confirm
      </Button>
      <Button onClick={() => onClose(false)}>Cancel</Button>
    </div>
  );
}
