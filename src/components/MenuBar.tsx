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

export function MenuBar() {
  const router = useRouter();
  const { logOut } = useContext(SignInSignUpContext);

  function handleDarkMode(e) {
    // console.log(e);
  }

  function handleLogOut(e) {
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
    router.push('/');
  }

  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <nav>
        <ul className={styles.container}>
          <li className={styles.item}>
            <a
              aria-label="Log Out"
              className={styles.logOutIcon}
              onClick={handleLogOut}
            >
              <GiPowerButton />
            </a>
          </li>

          <li className={styles.item}>
            <Link href="/">
              <a aria-label="Challenges">
                <AiOutlineHome />
              </a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="leaderboard">
              <a aria-label="Leaderboard">
                <GiRank3 />
              </a>
            </Link>
          </li>
          <li className={styles.item}>
            <a
              aria-label="Switch Light-Dark mode"
              className={styles.darkModeBtn}
              onClick={handleDarkMode}
            >
              <CgDarkMode />
            </a>
          </li>
          <li className={styles.item}>
            <Link href="about">
              <a aria-label="About">
                <AiOutlineInfoCircle />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}