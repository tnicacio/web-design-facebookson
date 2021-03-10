import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';
import Login from '../pages/login';
import Challenges from '../pages/challenges';

import { useRouter } from 'next/router';

interface SignInSignUpContextData {
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  isRegisterModalOpen: boolean;
  isLoggedIn: boolean;
  signIn: () => void;
  logOut: () => void;
  setIsLoggedIn: (boolean) => void;
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
    // console.log('openRegisterModal');
    setIsRegisterModalOpen(true);
  }

  function signIn() {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', String(true));
  }
  const router = useRouter();

  function logOut() {
    setIsLoggedIn(false);
    const cookies = [
      'isLoggedIn',
      'level',
      'currentExperience',
      'challengesCompleted',
    ];
    cookies.forEach((cookie) => Cookies.remove(cookie));

    console.log('chegou ' + isLoggedIn);
    // router.push('/');
  }

  return (
    <SignInSignUpContext.Provider
      value={{
        isRegisterModalOpen,
        isLoggedIn,
        openRegisterModal,
        closeRegisterModal,
        signIn,
        logOut,
        setIsLoggedIn,
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
