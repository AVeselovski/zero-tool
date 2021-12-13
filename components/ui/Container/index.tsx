import styles from "./Container.module.css";

type Props = {
  children: React.ReactNode;
  isFluid?: boolean;
  isScrollable?: boolean;
};

export default function Container({
  children,
  isFluid = false,
  isScrollable = false,
}: Props) {
  const classes = isFluid ? [styles.containerFluid] : [styles.container];
  isScrollable && classes.push(styles.xScroll);

  return <div className={classes.join(" ")}>{children}</div>;
}
