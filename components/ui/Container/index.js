import styles from "./Container.module.css";

export default function Container({ children, isFluid, isScrollable }) {
  const classes = isFluid ? [styles.containerFluid] : [styles.container];
  isScrollable && classes.push(styles.xScroll);

  return <div className={classes.join(" ")}>{children}</div>;
}
