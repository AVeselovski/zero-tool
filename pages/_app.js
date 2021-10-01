import Script from "next/script";
import { Provider } from "react-redux";

import "styles/globals.css";
import "styles/app.scss";

import { StoreProvider } from "app/contextStore";
import { store } from "app/store";

import Layout from "@components/ui/Layout";

export default function Application({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </Provider>

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
