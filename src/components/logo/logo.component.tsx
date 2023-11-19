import styles from "./logo.module.scss";

export const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>🧙‍♀️</span>
      <span className={styles.type}>Witchfolio</span>
    </div>
  );
};
