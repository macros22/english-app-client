import * as React from 'react';
import type { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {

	return (
		<CookiesProvider>
			<Component {...pageProps} />
		</CookiesProvider>
	);
};

export default MyApp;
