import styles from "./Columns.module.css";

function Column({ children }: { children: React.ReactNode }) {
  return <div className={styles.column}>{children}</div>;
}

function Columns({ children }: { children: React.ReactNode }) {
  return <div className={styles.columns}>{children}</div>;
}

Columns.Col = Column;

export default Columns;
