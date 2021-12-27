import Head from "next/head";
import { useRouter } from "next/router";

import { useUi } from "app/ui-store";

import styles from "./Layout.module.css";
import AppHeader from "./general/AppHeader";
import MobileNavigation from "./general/MobileNav";
import Main from "./general/Main";
import Footer from "./general/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const { state } = useUi();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>

      {router.asPath !== "/" && <AppHeader />}
      {router.asPath !== "/" && <MobileNavigation />}

      <div className={`${styles.layout}${state.sideNavOpen ? ` ${styles.isOpen}` : ""}`}>
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
