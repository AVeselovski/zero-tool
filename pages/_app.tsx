import { Provider as ReduxProvider } from "react-redux";
import { AppProps } from "next/app";

import { StoreProvider as ContextProvider } from "app/contextStore";
import { store } from "app/store";

import "styles/normalize.css";
import "styles/globals.css";
import Layout from "components/Layout";

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReduxProvider store={store}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </ReduxProvider>
    </>
  );
}
