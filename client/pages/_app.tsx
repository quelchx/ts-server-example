import Axios from "axios";
import { AuthProvider } from "../context/auth";

import "../styles/globals.css";
import type { AppProps } from "next/app";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
