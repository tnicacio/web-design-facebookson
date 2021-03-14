import styles from '../../styles/components/Profile.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';

interface IUser {
  name: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface ICustomStyle {
  profileContainer?: React.CSSProperties;
  profileContainerImg?: React.CSSProperties;
  profileContainerDiv?: React.CSSProperties;
  profileContainerDivStrong?: React.CSSProperties;
  profileContainerDivP?: React.CSSProperties;
  profileContainerDivPImg?: React.CSSProperties;
}

interface IProfile {
  user?: IUser;
  customStyle?: ICustomStyle;
  levelProp?: number;
}

export function Profile({ user, customStyle, levelProp }: IProfile) {
  const { level } = useContext(ChallengesContext);

  console.log('*****user Profile *****', user);

  const objUser = {
    name: null,
    level: null,
    avatar: null,
    imgSrc: null,
    avatarColor: null,
  };

  if (user) {
    objUser.name = user.name;
    objUser.level = user.level;
    objUser.avatar = user.avatar;

    const [avatarSrc, avatarStyle] = user?.avatar?.split('_') || ['', ''];
    objUser.imgSrc = avatarSrc;
    objUser.avatarColor = avatarStyle;
  }

  const objCustomStyle = {
    profileContainer: null,
    profileContainerImg: { backgroundColor: objUser?.avatarColor ?? 'blue' },
    profileContainerDiv: null,
    profileContainerDivStrong: null,
    profileContainerDivP: null,
    profileContainerDivPImg: null,
  };

  if (customStyle) {
    const {
      profileContainer,
      profileContainerImg,
      profileContainerDiv,
      profileContainerDivStrong,
      profileContainerDivP,
      profileContainerDivPImg,
    } = customStyle;

    objCustomStyle.profileContainer = profileContainer;
    objCustomStyle.profileContainerImg = {
      ...objCustomStyle.profileContainerImg,
      ...profileContainerImg,
    };
    objCustomStyle.profileContainerDiv = profileContainerDiv;
    objCustomStyle.profileContainerDivStrong = profileContainerDivStrong;
    objCustomStyle.profileContainerDivP = profileContainerDivP;
    objCustomStyle.profileContainerDivPImg = profileContainerDivPImg;
  }

  return (
    <div
      className={styles.profileContainer}
      style={{ ...objCustomStyle.profileContainer }}
    >
      <img
        src={objUser.imgSrc ?? ''}
        style={{ ...objCustomStyle.profileContainerImg }}
        alt={objUser.name ?? ''}
      />
      <div style={{ ...objCustomStyle.profileContainerDiv }}>
        <strong style={{ ...objCustomStyle.profileContainerDivStrong }}>
          {objUser.name ?? 'Anônimo'}
        </strong>

        <p style={{ ...objCustomStyle.profileContainerDivP }}>
          <img
            src="icons/level.svg"
            alt="level"
            style={{ ...objCustomStyle.profileContainerDivPImg }}
          />
          Level {level ?? objUser.level}
        </p>
      </div>
    </div>
  );
}
