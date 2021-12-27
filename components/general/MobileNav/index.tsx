import { useUi } from "app/ui-store";

import styles from "./MobileNav.module.css";

function MobileNavigation() {
  const { state } = useUi();

  return (
    <div className={`${styles.mobileNav}${state.sideNavOpen ? ` ${styles.isOpen}` : ""}`}>
      Tough nut
    </div>
  );
}

export default MobileNavigation;
