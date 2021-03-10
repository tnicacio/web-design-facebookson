import styles from '../../styles/components/LevelUpModal.module.css';

import { FocusScope } from '@react-aria/focus';

import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <FocusScope contain autoFocus>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <header>{level}</header>

          <strong>Parabéns!</strong>
          <p>Você alcançou um novo nível</p>

          <button type="button" onClick={closeLevelUpModal}>
            <img src="icons/close.svg" alt="Fechar modal" />
          </button>
        </div>
      </div>
    </FocusScope>
  );
}
