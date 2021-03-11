import styles from '../../styles/components/LeaderboardRow.module.css';

export function LeaderboardRow({ position, user }) {
  const { name, imgUri, level, challengesCompleted, currentExperience } = user;

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.position}>{position}</div>
        <div className={styles.profile}>Perfil</div>
      </div>
      <div className={styles.challengeInfo}>
        <div className={styles.challenges}>{challengesCompleted}</div>
        <div className={styles.experience}>{currentExperience}</div>
      </div>
    </div>
  );
}
