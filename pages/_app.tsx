import { Provider as ReduxProvider } from "react-redux";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { store } from "app/store";
import { UiContextProvider } from "app/ui-store";

import "styles/normalize.css";
import "styles/globals.css";
import Layout from "components/Layout";

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ReduxProvider store={store}>
        <UiContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UiContextProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
