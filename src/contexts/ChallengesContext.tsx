import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/challenges/LevelUpModal';
import axios from 'axios';
import { UserLoggedContext } from './UserLoggedContext';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false);

  const { userLogged, setUserLoggedIn } = useContext(UserLoggedContext);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  let dbUserWithCookies = {
    _id: null,
    name: null,
    email: null,
    password: null,
    level: null,
    currentExperience: null,
    challengesCompleted: null,
  } as IUser;

  const getUserFromDb = async () => {
    if (!userLogged._id && Cookies.get('facebooksonId')) {
      const responseFromDb: {
        _id: string;
        name: string;
        email: string;
        password: string;
        avatar: string;
        level: number;
        currentExperience: number;
        challengesCompleted: number;
      } = (await axios.get(`api/users/${Cookies.get('facebooksonId')}`)).data
        .returnFindById;

      const userFromDb = { ...responseFromDb };
      console.log('***userFromDb***', userFromDb);

      const clevel = level;
      if (clevel) {
        userFromDb.level = Number(clevel);
      }
      const cCurrentExperience = currentExperience;
      if (cCurrentExperience) {
        userFromDb.currentExperience = Number(currentExperience);
      }
      const cChallengesCompleted = challengesCompleted;
      if (cChallengesCompleted) {
        userFromDb.challengesCompleted = Number(challengesCompleted);
      }
      dbUserWithCookies = { ...userFromDb };

      setUserLoggedIn(dbUserWithCookies);
      console.log('***dbUserWithCookies', dbUserWithCookies);
    }
  };

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    getUserFromDb();
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModelOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModelOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    //new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModelOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
