import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { getCssText } from '../styles/stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <meta name="color-scheme" content="dark light" />
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
