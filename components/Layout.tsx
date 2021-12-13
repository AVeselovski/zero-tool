import Head from "next/head";
import { useRouter } from "next/router";

import AppHeader from "./general/AppHeader";
import MobileNavigation from "./general/MobileNav";
import Main from "./general/Main";
import Footer from "./general/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>
      {router.asPath !== "/" && (
        <>
          <AppHeader />
          <MobileNavigation />
        </>
      )}
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
