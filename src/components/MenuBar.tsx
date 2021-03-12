import styles from '../styles/components/MenuBar.module.css';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { GiRank3, GiPowerButton } from 'react-icons/gi';

import { IconContext } from 'react-icons/lib';
import { useContext } from 'react';
import Link from 'next/link';

import { SignInSignUpContext } from '../contexts/SignInSignUpContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { DarkModeContext } from '../contexts/DarkModeContext';

export function MenuBar() {
  const router = useRouter();
  const { logOut } = useContext(SignInSignUpContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  function handleDarkMode() {
    toggleDarkMode();
  }

  async function handleLogOut(e: React.MouseEvent) {
    e.preventDefault;
    logOut?.();

    //Update level, currentExperience and challengesComplete from User

    const cookies = [
      'isLoggedIn',
      'level',
      'currentExperience',
      'challengesCompleted',
    ];
    cookies.forEach((cookie) => Cookies.remove(cookie));

    toggleDarkMode(true);
    router.push('/');
  }

  async function handleKeyUpDarkMode(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      //Enter
      document.getElementById('toggle-dark-mode')?.click();
    }
  }

  async function handleKeyUpLogOut(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      //Enter
      document.getElementById('log-out-btn')?.click();
    }
  }

  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <nav>
        <ul className={styles.container}>
          <li className={styles.item}>
            <a
              id="log-out-btn"
              role="button"
              aria-label="Log Out"
              className={styles.logOutIcon}
              onClick={handleLogOut}
              onKeyUp={handleKeyUpLogOut}
              tabIndex={1}
            >
              <GiPowerButton />
            </a>
          </li>

          <li className={styles.item}>
            <Link href="/">
              <a aria-label="Challenges" tabIndex={2}>
                <AiOutlineHome />
              </a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="leaderboard">
              <a aria-label="Leaderboard" tabIndex={3}>
                <GiRank3 />
              </a>
            </Link>
          </li>
          <li className={styles.item}>
            <a
              id="toggle-dark-mode"
              role="button"
              aria-label="Switch Light-Dark mode"
              className={styles.darkModeBtn}
              onClick={handleDarkMode}
              onKeyUp={handleKeyUpDarkMode}
              tabIndex={4}
            >
              <CgDarkMode />
            </a>
          </li>
          <li className={styles.item}>
            <Link href="about">
              <a aria-label="About" tabIndex={5}>
                <AiOutlineInfoCircle />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
