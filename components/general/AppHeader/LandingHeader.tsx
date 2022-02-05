import Link from "next/link";

import styles from "./AppHeader.module.css";

function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLeft}>
        <h1 className={styles.appHeaderBrand}>
          <Link href="/">Zero Tool</Link>
        </h1>
        <div className={styles.appHeaderActions}></div>
      </div>
      <div className={styles.appHeaderRight}>
        <Link href="/auth/register">
          <a className="button">Sign up</a>
        </Link>
        <Link href="/auth/login">
          <a className="button primary ml-2">Login</a>
        </Link>
      </div>
    </header>
  );
}

export default Header;
