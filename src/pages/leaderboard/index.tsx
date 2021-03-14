import styles from '../../styles/pages/Leaderboard.module.css';
import axios from 'axios';
import { GeneralLayout } from '../../components/GeneralLayout';
import { LeaderboardRow } from '../../components/leaderboard/LeaderboardRow';
import { GetServerSideProps } from 'next';
import { SignInSignUpProvider } from '../../contexts/SignInSignUpContext';

interface ILeaderboardProps {
  user?: IUser;
  isLoggedIn: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  userList: IUser[];
}

interface IUser {
  name: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Leaderboard({
  isLoggedIn,
  level,
  currentExperience,
  challengesCompleted,
  userList,
}: ILeaderboardProps) {
  // console.log(userList);
  return (
    <SignInSignUpProvider isLoggedIn={isLoggedIn}>
      <GeneralLayout pageTitle="Leaderboard">
        {showUsers(userList)}
      </GeneralLayout>
    </SignInSignUpProvider>
  );
}

const showUsers = (userList) => {
  return (
    <div className={styles.containerExterno}>
      <header className={styles.leaderboardHeader}>
        <div className={styles.userInfoTitle}>
          <div className={styles.positionTitle}>POSIÇÃO</div>
          <div className={styles.userTitle}>USUÁRIO</div>
        </div>
        <div className={styles.challengeInfoTitle}>
          <div className={styles.challengesTitle}>DESAFIOS</div>
          <div className={styles.experienceTitle}>EXPERIÊNCIA</div>
        </div>
      </header>
      <section className={styles.contentContainer}>
        {userList?.length > 0
          ? userList.map((user: IUser, index) => {
              return (
                <LeaderboardRow
                  key={index + 1}
                  position={index + 1}
                  user={user}
                />
              );
            })
          : 'Nada a mostrar'}
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    isLoggedIn,
  } = ctx.req.cookies;
  console.log(ctx.req.cookies);

  const getUsers = async () => {
    try {
      const usersFetched = (await axios.get('http://localhost:3000/api/users'))
        ?.data;
      const arrayFromUsersFetched = [...usersFetched] || [];
      const usersOrderByCurrentExperienceDesc = arrayFromUsersFetched.sort(
        (a, b) => b.currentExperience - a.currentExperience
      );
      return usersOrderByCurrentExperienceDesc;
    } catch (err) {
      console.log(err);
    }
  };

  const users = await getUsers();
  const userList = [...users];
  return {
    props: {
      level: Number(level) ?? 1,
      currentExperience: Number(currentExperience) ?? 0,
      challengesCompleted: Number(challengesCompleted) ?? 0,
      isLoggedIn: Boolean(isLoggedIn) ?? false,
      userList,
    },
  };
};
