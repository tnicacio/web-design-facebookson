import { GetServerSideProps } from 'next';
import { SignInSignUpProvider } from '../contexts/SignInSignUpContext';

interface User {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

interface HomeProps {
  user: User;
  isLoggedIn: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <SignInSignUpProvider
      isLoggedIn={props.isLoggedIn ?? false}
      level={props.level ?? 0}
      currentExperience={props.currentExperience ?? 0}
      challengesCompleted={props.challengesCompleted ?? 0}
    />
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
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      isLoggedIn: Boolean(isLoggedIn),
    },
  };
};
