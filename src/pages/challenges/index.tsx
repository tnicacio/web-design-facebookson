import Head from 'next/head';
import styles from '../../styles/pages/Challenges.module.css';

import { CountdownProvider } from '../../contexts/CountdownContext';

import { Profile } from '../../components/challenges/Profile';
import { CompletedChallenges } from '../../components/challenges/CompletedChallenges';
import { Countdown } from '../../components/challenges/Countdown';
import { ChallengeBox } from '../../components/challenges/ChallengeBox';
import { MenuBar } from '../../components/MenuBar';
import { ExperienceBar } from '../../components/challenges/ExperienceBar';
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { SignInSignUpProvider } from '../../contexts/SignInSignUpContext';
import { GetServerSideProps } from 'next';

import { useContext, useEffect } from 'react';
import { UserLoggedContext } from '../../contexts/UserLoggedContext';
import axios from 'axios';

import Cookies from 'js-cookie';

interface HomeProps {
  isLoggedIn: boolean;
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

interface IProfile {
  name: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Challenges({
  isLoggedIn,
  level,
  currentExperience,
  challengesCompleted,
  facebooksonName,
  facebooksonAvatar,
  facebooksonId,
}: HomeProps) {
  const { userLogged, setUserLoggedIn, updateUserWithCookies } = useContext(
    UserLoggedContext
  );

  const userProfile: IProfile = {
    name: userLogged.name || facebooksonName,
    avatar: userLogged.avatar || facebooksonAvatar,
    level: Math.max(userLogged.level, level),
    currentExperience: Math.max(
      userLogged.currentExperience,
      currentExperience
    ),
    challengesCompleted: Math.max(
      userLogged.challengesCompleted,
      challengesCompleted
    ),
  };

  return (
    <SignInSignUpProvider isLoggedIn={isLoggedIn ?? false}>
      <ChallengesProvider
        level={level ?? 1}
        currentExperience={currentExperience ?? 0}
        challengesCompleted={challengesCompleted ?? 0}
      >
        <div className={styles.outterContainer}>
          <Head>
            <title>Home | facebookson</title>
          </Head>
          <header>
            <MenuBar />
          </header>
          <main className={styles.contentContainer}>
            <ExperienceBar />

            <CountdownProvider>
              <section>
                <div>
                  {userLogged.level}
                  {level}
                  <Profile user={userProfile} />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </main>
        </div>
      </ChallengesProvider>
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
      level,
      currentExperience,
      challengesCompleted,
      isLoggedIn,
      facebooksonName,
      facebooksonAvatar,
      facebooksonId,
    },
  };
};
