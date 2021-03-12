import styles from '../styles/components/GeneralLayout.module.css';
import Head from 'next/head';
import { MenuBar } from './MenuBar';
import { ReactNode } from 'react';

interface GeneralLayoutProps {
  pageTitle?: string;
  hideMenuBar?: boolean;
  children?: ReactNode;
}

export function GeneralLayout({
  pageTitle,
  hideMenuBar,
  children,
}: GeneralLayoutProps) {
  const hideMenu = hideMenuBar ?? false;

  return (
    <div className={styles.outterContainer}>
      <Head>
        <title>{pageTitle} | facebookson</title>
      </Head>
      {!hideMenu && (
        <header>
          <MenuBar />
        </header>
      )}
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
