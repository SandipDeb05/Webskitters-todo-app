import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import ReactGA from "react-ga4";
ReactGA.initialize("G-BRS748Q3CM");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
