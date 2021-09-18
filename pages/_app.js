import Script from "next/script";

import "../styles/globals.css";
import "../styles/app.scss";

import { StoreProvider } from "../utils/store";

import Layout from "../components/ui/Layout";

export default function Application({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>

      <Script
        src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"
        type="module"
      ></Script>
      <Script
        nomodule=""
        src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js"
      ></Script>
    </>
  );
}
