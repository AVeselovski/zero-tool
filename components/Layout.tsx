import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useUi } from "app/ui-store";
import { useAppDispatch } from "app/hooks";
import { setCredentials } from "features/auth/authSlice";

import styles from "./Layout.module.css";
import AppHeader from "./general/AppHeader";
import LandingHeader from "./general/AppHeader/LandingHeader";
import AppNavigation from "./general/AppNavigation";
import Main from "./general/Main";
import Footer from "./general/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { state } = useUi();

  const isAppRoute = router.asPath !== "/" && !router.asPath.includes("/auth");
  const isProjectPage = router.asPath !== "/dashboard";

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setCredentials({
          user: { name: session.user.name as string, email: session.user.email as string },
          token: session.accessToken as string,
        })
      );
    }
  }, [dispatch, session]);

  return (
    <>
      <Head>
        <title>Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>

      {router.asPath === "/" && <LandingHeader />}

      {isAppRoute && <AppHeader />}
      {isAppRoute && <AppNavigation />}

      <div
        className={`${styles.layout}${
          isProjectPage && state.projectSidebarOpen ? ` ${styles.isOpen}` : ""
        }`}
      >
        <Main>{children}</Main>
        {router.asPath === "/" && <Footer />}
      </div>
    </>
  );
}

export default Layout;
