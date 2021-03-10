import styles from '../styles/components/GeneralLayout.module.css';
import Head from 'next/head';
import { MenuBar } from './MenuBar';
import { ReactNode } from 'react';

interface GeneralLayoutProps {
  pageTitle?: string;
  children?: ReactNode;
}

export function GeneralLayout({ pageTitle, children }: GeneralLayoutProps) {
  return (
    <div className={styles.outterContainer}>
      <Head>
        <title>Leaderboard | facebookson</title>
      </Head>
      <header>
        <MenuBar />
      </header>
      <main className={styles.contentContainer}>
        <section className={styles.content}>
          <div className={styles.pageTitle}>
            <h1>{pageTitle ?? ''}</h1>
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}
