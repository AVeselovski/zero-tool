import Script from "next/script";
// import { useRouter } from "next/router";

import "../styles/globals.css";
import "../styles/app.scss";

import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // const eventsRoute = router.route.split("/").includes("events");

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></Script>
    </>
  );
}

export default MyApp;
