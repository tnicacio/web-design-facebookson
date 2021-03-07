import { createContext, ReactNode, useState } from 'react';
import { RegisterModal } from '../components/RegisterModal';
interface SignInSignUpContextData {
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

interface SignInSignUpProviderProps {
  children: ReactNode;
}

export const SignInSignUpContext = createContext({} as SignInSignUpContextData);

export function SignInSignUpProvider({
  children,
  ...rest
}: SignInSignUpProviderProps) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  function closeRegisterModal() {
    setIsRegisterModalOpen(false);
  }

  function openRegisterModal() {
    console.log('openRegisterModal');
    setIsRegisterModalOpen(true);
  }

  console.log(isRegisterModalOpen);

  return (
    <SignInSignUpContext.Provider
      value={{ openRegisterModal, closeRegisterModal }}
    >
      {children}
      {isRegisterModalOpen && <RegisterModal />}
    </SignInSignUpContext.Provider>
  );
}
