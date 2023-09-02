import * as React from 'react';
// import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Theme } from '@radix-ui/themes';
import type { AppProps } from 'next/app';
// pages/_app.js
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';
import '@radix-ui/themes/styles.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      {/* <GlobalStyle />
      <ThemeProvider theme={theme}> */}

      <ThemeProvider attribute="class">
        <Theme
          appearance="dark"
          accentColor="teal"
          grayColor="mauve"
          radius="small">
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </Theme>
      </ThemeProvider>

      {/* </ThemeProvider> */}
    </>
  );
};

export default MyApp;
