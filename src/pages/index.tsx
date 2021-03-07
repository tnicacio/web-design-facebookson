import styles from '../styles/pages/Home.module.css';
import { Login } from './Login/Login';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { RegisterModal } from '../components/RegisterModal';
import {
  SignInSignUpContext,
  SignInSignUpProvider,
} from '../contexts/SignInSignUpContext';
import { useContext } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

interface HomeProps {
  user: User;
}

const isLoggedIn = false;

export default function Home() {
  return (
    <SignInSignUpProvider>
      <div className={styles.container}>
        {isLoggedIn ? (
          <div className={styles.container}>
            <Head>
              <title>Home | facebookson</title>
            </Head>
            home
          </div>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </SignInSignUpProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
