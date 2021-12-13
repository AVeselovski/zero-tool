import styles from "./Card.module.css";

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardHeader}>{children}</div>;
}

function CardHeaderTitle({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardHeaderTitle}>{children}</div>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardBody}>{children}</div>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardFooter}>{children}</div>;
}

function Card({
  children,
  isGroup = false,
}: {
  children: React.ReactNode;
  isGroup?: boolean;
}) {
  const classes: string[] = [styles.card];
  isGroup && classes.push(styles.cardGroup);

  return <div className={classes.join(" ")}>{children}</div>;
}

Card.Header = CardHeader;
Card.HeaderTitle = CardHeaderTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
