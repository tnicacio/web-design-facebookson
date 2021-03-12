import styles from '../../styles/components/LeaderboardRow.module.css';
import { Profile } from '../challenges/Profile';

interface ILeaderboardRow {
  position: number;
  user: IUser;
}

interface IUser {
  name: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function LeaderboardRow({ position, user }: ILeaderboardRow) {
  const { name, avatar, level, challengesCompleted, currentExperience } = user;

  const profileCustomStyle = {
    profileContainer: { width: '12.5rem' },
    profileContainerImg: { height: '3rem', width: '3rem' },
    profileContainerDiv: null,
    profileContainerDivStrong: { fontSize: '1.1rem' },
    profileContainerDivP: { fontSize: '0.80rem' },
    profileContainerDivPImg: null,
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.position}>{position}</div>
        <div className={styles.profile}>
          <Profile user={user} customStyle={profileCustomStyle} />
        </div>
      </div>
      <div className={styles.challengeInfo}>
        <div className={styles.challenges}>
          <span>{challengesCompleted}</span>{' '}
          {challengesCompleted === 1 ? 'completado' : 'completados'}
        </div>
        <div className={styles.experience}>
          <span>{currentExperience}</span> xp
        </div>
      </div>
    </div>
  );
}
