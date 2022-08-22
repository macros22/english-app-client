import { useUser } from 'libs/hooks';
import { NavBar } from 'layouts';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'semantic-ui-react';
import { PaginationProvider } from 'libs/contexts/PagiantionContext';

export const Layout = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const { isLoggedIn } = useUser();

	const router = useRouter();

	React.useEffect(() => {
		if (!isLoggedIn) router.replace('/auth/sign-in');
	}, [isLoggedIn]);

	return (
		<div>
			<NavBar />
			<main>
				<PaginationProvider>
					<Container
						textAlign='center'
						style={{
							minHeight: '90vh',
							padding: '1.5rem 0.5rem'
						}}
					>
						{children}
					</Container>
				</PaginationProvider>
			</main>
		</div>
	);
};
