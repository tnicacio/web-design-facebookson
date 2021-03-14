import { GetServerSideProps } from 'next';
import { SignInSignUpProvider } from '../contexts/SignInSignUpContext';
import Challenges from './challenges';
import { useEffect, useContext } from 'react';
import { UserLoggedContext } from '../contexts/UserLoggedContext';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

interface HomeProps {
  user?: User;
  isLoggedIn?: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  facebooksonName: string;
  facebooksonAvatar: string;
  facebooksonId: string;
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

export default function Home({
  isLoggedIn,
  level,
  currentExperience,
  challengesCompleted,
  facebooksonName,
  facebooksonAvatar,
  facebooksonId,
}: HomeProps) {
  const { userLogged, setUserLoggedIn } = useContext(UserLoggedContext);

  let dbUserWithCookies = {
    _id: null,
    name: null,
    email: null,
    password: null,
    level: null,
    currentExperience: null,
    challengesCompleted: null,
  } as IUser;

  const getUserFromDb = async () => {
    if (!userLogged._id && facebooksonId) {
      const responseFromDb: {
        _id: string;
        name: string;
        email: string;
        password: string;
        avatar: string;
        level: number;
        currentExperience: number;
        challengesCompleted: number;
      } = (await axios.get(`api/users/${facebooksonId}`)).data.returnFindById;

      const userFromDb = { ...responseFromDb };
      console.log('***userFromDb*** Home Page', userFromDb);

      const clevel = level;
      if (clevel) {
        userFromDb.level = Number(clevel);
      }
      const cCurrentExperience = currentExperience;
      if (cCurrentExperience) {
        userFromDb.currentExperience = Number(cCurrentExperience);
      }
      const cChallengesCompleted = challengesCompleted;
      if (cChallengesCompleted) {
        userFromDb.challengesCompleted = Number(cChallengesCompleted);
      }
      dbUserWithCookies = { ...userFromDb };

      setUserLoggedIn(dbUserWithCookies);
      console.log('***dbUserWithCookies', dbUserWithCookies);
    }
  };

  useEffect(() => {
    getUserFromDb();
  }, []);

  return (
    <SignInSignUpProvider isLoggedIn={isLoggedIn}>
      <Challenges
        isLoggedIn={isLoggedIn}
        level={level ?? userLogged.level ?? 1}
        currentExperience={
          currentExperience ?? userLogged.currentExperience ?? 0
        }
        challengesCompleted={
          challengesCompleted ?? userLogged.challengesCompleted ?? 0
        }
        facebooksonName={facebooksonName ?? userLogged.name ?? ''}
        facebooksonAvatar={facebooksonAvatar ?? userLogged.avatar ?? ''}
        facebooksonId={facebooksonId ?? userLogged._id ?? ''}
      />
    </SignInSignUpProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    isLoggedIn,
    facebooksonName,
    facebooksonAvatar,
    facebooksonId,
  } = ctx.req.cookies;

  console.log(ctx.req.cookies);
  return {
    props: {
      level: Number(level) || 1,
      currentExperience: Number(currentExperience) || 0,
      challengesCompleted: Number(challengesCompleted) || 0,
      isLoggedIn: Boolean(isLoggedIn) || false,
      facebooksonName: facebooksonName || null,
      facebooksonAvatar: facebooksonAvatar || null,
      facebooksonId: facebooksonId || null,
    },
  };
};
