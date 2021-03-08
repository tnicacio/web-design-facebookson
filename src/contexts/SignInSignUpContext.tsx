import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';
import { Login } from '../pages/login';
import { Challenges } from '../pages/challenges';

interface SignInSignUpContextData {
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  isRegisterModalOpen: boolean;
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

interface SignInSignUpProviderProps {
  children?: ReactNode;
  isLoggedIn?: boolean;
  level?: number;
  currentExperience?: number;
  challengesCompleted?: number;
}

export const SignInSignUpContext = createContext({} as SignInSignUpContextData);

export function SignInSignUpProvider({
  children,
  ...rest
}: SignInSignUpProviderProps) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(rest.isLoggedIn ?? false);

  function closeRegisterModal() {
    setIsRegisterModalOpen(false);
  }

  function openRegisterModal() {
    console.log('openRegisterModal');
    setIsRegisterModalOpen(true);
  }

  const logIn = () => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', String(true));
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    const cookies = [
      'isLoggedIn',
      'level',
      'currentExperience',
      'challengesCompleted',
    ];
    cookies.forEach((cookie) => Cookies.remove(cookie));
  };

  return (
    <SignInSignUpContext.Provider
      value={{
        isRegisterModalOpen,
        isLoggedIn,
        openRegisterModal,
        closeRegisterModal,
        logIn,
        logOut,
      }}
    >
      {isLoggedIn ? (
        <Challenges
          level={rest.level}
          currentExperience={rest.currentExperience}
          challengesCompleted={rest.challengesCompleted}
        />
      ) : (
        <Login />
      )}
    </SignInSignUpContext.Provider>
  );
}
