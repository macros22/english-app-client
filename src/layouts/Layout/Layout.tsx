import { useUser } from 'libs/hooks';
import React from 'react';
import { NavBar } from 'layouts';
import { useRouter } from 'next/router';
import { Container } from 'semantic-ui-react';
import { PaginationProvider } from 'libs/contexts/PagiantionContext';
import styles from './Layout.module.scss'

export const Layout: React.FC = ({
	children,
}) => {
	const { isLoggedIn } = useUser();

	const router = useRouter();

	React.useEffect(() => {
		if (!isLoggedIn) router.replace('/auth/sign-in');
	}, [isLoggedIn]);

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
