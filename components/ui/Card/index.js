import React from "react";

import styles from "./Card.module.css";

function CardHeader({ children }) {
  return <div className={styles.cardHeader}>{children}</div>;
}

function CardHeaderTitle({ children }) {
  return <div className={styles.cardHeaderTitle}>{children}</div>;
}

function CardBody({ children }) {
  return <div className={styles.cardBody}>{children}</div>;
}

function CardFooter({ children }) {
  return <div className={styles.cardFooter}>{children}</div>;
}

function Card({ children, isGroup }) {
  const classes = [styles.card];
  isGroup && classes.push(styles.cardGroup);

  return <div className={classes.join(" ")}>{children}</div>;
}

Card.Header = CardHeader;
Card.HeaderTitle = CardHeaderTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
