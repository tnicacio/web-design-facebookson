import styles from '../../styles/components/Card.module.css';

interface ICard {
  title?: string;
  children?: string;
}

export function Card({ children, title }: ICard) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <header>
          <h1>{title}</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
