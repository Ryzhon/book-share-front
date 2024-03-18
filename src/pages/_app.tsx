import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { FlashMessageProvider } from "@/contexts/FlashMessageContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <FlashMessageProvider>
        <Component {...pageProps} />
      </FlashMessageProvider>
    </>
  );
}
