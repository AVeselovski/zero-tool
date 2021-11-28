import Script from "next/script";
import { Provider as ReduxProvider } from "react-redux";

import { StoreProvider as ContextProvider } from "app/contextStore";
import { store } from "app/store";

import "styles/normalize.css";
import "styles/globals.css";
import Layout from "@components/Layout";

export default function Application({ Component, pageProps }) {
  return (
    <>
      <ReduxProvider store={store}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </ReduxProvider>

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
