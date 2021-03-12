import { GetServerSideProps } from 'next';
import { SignInSignUpProvider } from '../contexts/SignInSignUpContext';
import Challenges from './challenges';
import Login from './login';

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
}

export default function Home({
  isLoggedIn,
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps) {
  return (
    <SignInSignUpProvider
      isLoggedIn={isLoggedIn}
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <Challenges
        isLoggedIn={isLoggedIn}
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
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
