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

import UserList from '../../../mockUsers.json';

interface User {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

interface HomeProps {
  user?: User;
  isLoggedIn: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Challenges({
  isLoggedIn,
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps) {
  interface IUser {
    name: string;
    avatar: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
  }

  const userLogged: IUser = {
    name: UserList[1].name,
    avatar: UserList[1].avatar,
    level: UserList[1].level,
    currentExperience: UserList[1].currentExperience,
    challengesCompleted: UserList[1].challengesCompleted,
  };

  return (
    <SignInSignUpProvider
      isLoggedIn={isLoggedIn}
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <ChallengesProvider
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
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
                  <Profile user={userLogged} />
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
  } = ctx.req.cookies;

  console.log(ctx.req.cookies);
  return {
    props: {
      level: Number(level) ?? 1,
      currentExperience: Number(currentExperience) ?? 0,
      challengesCompleted: Number(challengesCompleted) ?? 0,
      isLoggedIn: Boolean(isLoggedIn) ?? false,
    },
  };
};
