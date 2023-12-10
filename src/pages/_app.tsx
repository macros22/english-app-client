import * as React from 'react';
import { Theme } from '@radix-ui/themes';
import axios from 'axios';
import { withTheme } from 'layouts/withTheme';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  axios.interceptors.request.use(
    config => {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/dot-notation, spaced-comment
      //@ts-ignore
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        'accessToken',
      )}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

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
