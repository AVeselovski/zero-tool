import styles from "./404.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <div className={styles.message}>
        <p>No such page!</p>
      </div>
    </div>
  );
}
