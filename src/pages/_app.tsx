import * as React from 'react';
import { Theme } from '@radix-ui/themes';
import { withTheme } from 'layouts/withTheme';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Theme
        appearance="inherit"
        accentColor="blue"
        grayColor="slate"
        radius="small">
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </Theme>
    </>
  );
};

export default withTheme(MyApp);
