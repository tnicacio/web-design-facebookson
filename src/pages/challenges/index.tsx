import Head from 'next/head';
import styles from '../../styles/pages/Challenges.module.css';

import { CountdownProvider } from '../../contexts/CountdownContext';

import { Profile } from '../../components/Profile';
import { CompletedChallenges } from '../../components/CompletedChallenges';
import { Countdown } from '../../components/Countdown';
import { ChallengeBox } from '../../components/ChallengeBox';
import { MenuBar } from '../../components/MenuBar';
import { ExperienceBar } from '../../components/ExperienceBar';
import { ChallengesProvider } from '../../contexts/ChallengesContext';

interface ChallengeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function Challenges(props: ChallengeProps) {
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
