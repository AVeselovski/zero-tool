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
  className = "",
  isList = false,
}: {
  className?: string;
  children: React.ReactNode;
  isList?: boolean;
}) {
  let classes: string[] = [styles.card];
  isList && classes.push(styles.cardGroup);
  classes = [...classes, ...className.split(" ")];

  return <div className={classes.join(" ")}>{children}</div>;
}

Card.Header = CardHeader;
Card.HeaderTitle = CardHeaderTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
