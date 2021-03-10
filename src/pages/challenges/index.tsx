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

interface ChallengeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Challenges(props: ChallengeProps) {
  return (
    <ChallengesProvider
      level={props.level || 0}
      currentExperience={props.currentExperience || 0}
      challengesCompleted={props.challengesCompleted || 0}
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
                <Profile />
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
  );
}
