import React from 'react';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss'
import { useUser } from 'libs/hooks';
import { NavBar } from 'layouts';
import { PaginationProvider } from 'libs/contexts/PagiantionContext';
import { FullScreenLoader } from 'components';

export const Layout: React.FC = ({
	children,
}) => {
	const { isLoggedIn } = useUser();

	const router = useRouter();

	React.useEffect(() => {
		if (!isLoggedIn) router.replace('/auth/sign-in');
	}, [isLoggedIn]);

	if (!isLoggedIn) {
		return (
			<FullScreenLoader />
		);
	}

	return (
		<div>
			<NavBar />
			<main >
				<PaginationProvider>
					<div className={styles.container}>
						{children}
					</div>
				</PaginationProvider>
			</main>
		</div>
	);
};
