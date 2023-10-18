import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#3cb027",
    },
    logo: {
      blue: "#90d8f9",
      pink: "#db73c3",
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  const [hideHeaderElement, setHideHeaderElement] = useState(
    router.pathname === "/" || router.pathname === "/register"
  );

  useEffect(() => {
    // Update hideHeaderElements based on the new route
    setHideHeaderElement(
      router.pathname === "/" || router.pathname === "/register"
    );
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Layout hideHeaderElements={hideHeaderElement}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>Vegan SnackPal</title>
          </Head>
          <CssBaseline />
          <Component {...pageProps} />
        </CacheProvider>
      </Layout>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
