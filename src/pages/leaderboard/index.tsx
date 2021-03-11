import styles from '../../styles/pages/Leaderboard.module.css';
import axios from 'axios';
import { GeneralLayout } from '../../components/GeneralLayout';
import { LeaderboardRow } from '../../components/leaderboard/LeaderboardRow';

interface User {
  name: string;
  email: string;
  password: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface LeaderboardProps {
  userList: User[];
}

export default function Leaderboard({ userList }: LeaderboardProps) {
  console.log(userList);
  return (
    <GeneralLayout pageTitle="Leaderboard">{showUsers(userList)}</GeneralLayout>
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
          ? userList.map((user, index) => {
              return <LeaderboardRow position={index + 1} user={user} />;
            })
          : 'Nada a mostrar'}
      </section>
    </div>
  );
};

export async function getServerSideProps(ctx) {
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
      userList,
    },
  };
}
