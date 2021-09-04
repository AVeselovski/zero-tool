import Head from "next/head";
import Header from "./Header";
import MobileNavigation from "./MobileNavigation";

function Layout(props) {
  return (
    <div>
      <Head>
        <title>Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>
      <Header />
      <MobileNavigation />
      <main>{props.children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
