import * as React from 'react';
import type { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
	return (
		<Component {...pageProps} />
	);
};

export default MyApp;
