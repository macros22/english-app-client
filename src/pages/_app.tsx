import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';

import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    font-family: 'Open Sans', sans-serif;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
