import styles from "./Loader.module.css";

/** TODO: This needs work */

const Loader = ({ className = "", isBlock = false, isMini = false }) => {
  const classNames = className ? className.split(" ") : [];
  isBlock && classNames.push(styles.block);
  isMini && classNames.push(styles.mini);

  return (
    <div className={[styles.loader, ...classNames].join(" ")}>
      <div className={styles.loaderRing}></div>
    </div>
  );
};

export default Loader;
