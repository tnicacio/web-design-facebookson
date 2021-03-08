import styles from '../styles/components/MenuBar.module.css';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { GiRank3, GiPowerButton } from 'react-icons/gi';

import { IconContext } from 'react-icons/lib';
import { useContext } from 'react';
import Link from 'next/link';

import { SignInSignUpContext } from '../contexts/SignInSignUpContext';

export function MenuBar() {
  const { logOut } = useContext(SignInSignUpContext);

  function handleDarkMode(e) {
    console.log(e);
  }

  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <nav>
        <ul className={styles.container}>
          <li className={styles.item}>
            <a className={styles.logOutIcon} onClick={logOut}>
              <GiPowerButton />
            </a>
          </li>

          <li className={styles.item}>
            <Link href="/">
              <a>
                <AiOutlineHome />
              </a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/leaderboard">
              <a>
                <GiRank3 />
              </a>
            </Link>
          </li>
          <li className={styles.item}>
            <a className={styles.darkModeBtn} onClick={handleDarkMode}>
              <CgDarkMode />
            </a>
          </li>
          <li className={`${styles.item} ${styles.about}`}>
            <a href="/about">
              <AiOutlineInfoCircle />
            </a>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
