import styles from "./Container.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  isFluid?: boolean;
  isScrollable?: boolean;
};

export default function Container({
  children,
  className = "",
  isFluid = false,
  isScrollable = false,
}: Props) {
  let classes = isFluid ? [styles.containerFluid] : [styles.container];
  isScrollable && classes.push(styles.xScroll);
  classes = [...classes, ...className.split(" ")];

  return <div className={classes.join(" ")}>{children}</div>;
}
