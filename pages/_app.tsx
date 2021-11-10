import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Web3Lagos</title>
        <meta
          name="description"
          content="A conference for people interested in building for the next phase of the internet.  "
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
