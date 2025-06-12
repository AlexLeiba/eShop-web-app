import React, {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Button } from './Button';
import { cn } from '../../lib/utils';
import { IconX } from '@tabler/icons-react';

type ContextType = {
  isModalOpen: boolean;
  title?: string;
  description?: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};
const ModalContext = createContext<ContextType>({
  isModalOpen: false,
  title: '',
  description: '',
  setIsModalOpen: () => {},
  onConfirm: () => {},
});

type Props = {
  isOpen?: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  classNameCustome?: string;
  onConfirm: () => void;
};

// PROVIDER (shares state between modal and its children)
export function ModalProvider({
  title,
  description,
  children,
  isOpen = false,
  onConfirm,
}: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(isOpen);
  return (
    <ModalContext.Provider
      value={{
        setIsModalOpen,
        onConfirm,
        isModalOpen,
        title,
        description,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// MODAL
export function Modal({
  children,
  classNameCustome,
}: {
  children: React.ReactNode;
  classNameCustome?: string;
}) {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  return (
    <>
      <div
        className={`${
          isModalOpen ? 'block' : 'hidden'
        } fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 `}
      >
        {/* Content */}
        <div
          className={cn(
            `min-w-[100px] min-h-[100px] mx-[10%] bg-white z-50 rounded-md shadow-lg px-8 pt-10 pb-8 flex flex-col relative ${classNameCustome}`
          )}
        >
          <IconX
            className='absolute right-4 top-4 cursor-pointer'
            onClick={() => setIsModalOpen(false)}
          />
          {children}
        </div>
      </div>
    </>
  );
}

// TRIGGER
export function ModalTrigger({ children }: { children: React.ReactNode }) {
  const { setIsModalOpen } = useContext(ModalContext);

  return <div onClick={() => setIsModalOpen((prev) => !prev)}>{children}</div>;
}

// BODY CONTENT
export function ModalTitle() {
  const { title } = useContext(ModalContext);

  if (!title) {
    return null;
  }
  return <h4 className='text-2xl font-bold pb-4'>{title}</h4>;
}
export function ModalDescription() {
  const { description } = useContext(ModalContext);

  if (!description) {
    return null;
  }
  return <p className='pb-12'>{description}</p>;
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className='flex-1'>{children}</div>;
}

export function ModalFooter() {
  const { onConfirm, setIsModalOpen } = useContext(ModalContext);
  return (
    <div className='flex lg:gap-8 md:gap-8 gap-4 w-full lg:flex-row md:flex-row flex-col'>
      <Button variant='secondary' onClick={() => onConfirm()}>
        Confirm
      </Button>
      <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
    </div>
  );
}
