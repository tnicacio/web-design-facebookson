import { createContext, ReactNode, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import Login from '../pages/login';

import { useRouter } from 'next/router';
import About from '../pages/about';
import { DarkModeProvider } from './DarkModeContext';
import { UserLoggedContext } from './UserLoggedContext';
import axios from 'axios';

interface SignInSignUpContextData {
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  isRegisterModalOpen: boolean;
  isLoggedIn: boolean;
  signIn: (user: IUser) => void;
  logOut: () => void;
  setIsLoggedIn: (boolean) => void;
}

interface SignInSignUpProviderProps {
  children?: ReactNode;
  isLoggedIn?: boolean;
  isAboutPage?: boolean;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface IUserStatus {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const SignInSignUpContext = createContext({} as SignInSignUpContextData);

export function SignInSignUpProvider({
  children,
  ...rest
}: SignInSignUpProviderProps) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(rest.isLoggedIn ?? false);

  const { userLogged, setUserLoggedIn } = useContext(UserLoggedContext);

  function closeRegisterModal() {
    setIsRegisterModalOpen(false);
  }

  function openRegisterModal() {
    setIsRegisterModalOpen(true);
  }

  function signIn(user: IUser) {
    setUserLoggedIn(user);
    setIsLoggedIn(true);
    console.log('***SERA QUE TA***', user);
    Cookies.set('facebooksonId', user._id);
    Cookies.set('facebooksonName', user.name);
    Cookies.set('facebooksonAvatar', user.avatar);
    Cookies.set('level', String(user.level));
    Cookies.set('currentExperience', String(user.currentExperience));
    Cookies.set('challengesCompleted', String(user.challengesCompleted));
    Cookies.set('isLoggedIn', String(true));
  }
  const router = useRouter();

  async function logOut() {
    const updatePlayerStatus: IUserStatus = { ...userLogged };
    console.log('***updatePlayerStatus', updatePlayerStatus);
    //Update values on database
    await axios.put(`/api/users/${userLogged._id}`, updatePlayerStatus);

    setIsLoggedIn(false);
    const cookies = [
      'facebooksonId',
      'isLoggedIn',
      'facebooksonName',
      'facebooksonAvatar',
      'level',
      'currentExperience',
      'challengesCompleted',
    ];
    cookies.forEach((cookie) => Cookies.remove(cookie));
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
      <DarkModeProvider userLoggedIn={isLoggedIn}>
        {isLoggedIn || rest.isAboutPage ? <>{children}</> : <Login />}
      </DarkModeProvider>
    </SignInSignUpContext.Provider>
  );
}
