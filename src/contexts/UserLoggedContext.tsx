import { createContext, ReactNode, useState } from 'react';

interface UserLoggedContextData {
  userLogged: IUser;
  setUserLoggedIn: (user: IUser) => void;
  updateUserWithCookies: (
    facebooksonId?,
    level?,
    currentExperience?,
    challengesCompleted?,
    facebooksonName?,
    facebooksonAvatar?
  ) => void;
}

interface UserLoggedProviderProps {
  children: ReactNode;
  cookies?: {
    level?: number;
    currentExperience?: number;
    challengesCompleted?: number;
    isLoggedIn?: boolean;
    facebooksonName?: string;
    facebooksonAvatar?: string;
    facebooksonId?: string;
  };
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  // password: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const UserLoggedContext = createContext({} as UserLoggedContextData);

export function UserLoggedProvider({
  children,
  cookies,
}: UserLoggedProviderProps) {
  const [userLogged, setUserLogged] = useState({} as IUser);

  function setUserLoggedIn(user: IUser) {
    setUserLogged(user);
  }

  function updateUserWithCookies({
    facebooksonId,
    level,
    currentExperience,
    challengesCompleted,
    facebooksonName,
    facebooksonAvatar,
  }) {
    const objUserLogged = {};

    if (facebooksonId && !userLogged['_id']) {
      objUserLogged['_id'] = String(facebooksonId);
    }
    if (level && !userLogged['level']) {
      objUserLogged['level'] = Number(level);
    }
    if (currentExperience && !userLogged['currentExperience']) {
      objUserLogged['currentExperience'] = Number(currentExperience);
    }
    if (challengesCompleted && !userLogged['challengesCompleted']) {
      objUserLogged['challengesCompleted'] = Number(challengesCompleted);
    }
    if (facebooksonName && !userLogged['name']) {
      objUserLogged['name'] = String(facebooksonName);
    }
    if (facebooksonAvatar && !userLogged['avatar']) {
      objUserLogged['avatar'] = String(facebooksonAvatar);
    }
    setUserLoggedIn({ ...userLogged, ...objUserLogged });
  }

  return (
    <UserLoggedContext.Provider
      value={{ userLogged, setUserLoggedIn, updateUserWithCookies }}
    >
      {children}
    </UserLoggedContext.Provider>
  );
}
