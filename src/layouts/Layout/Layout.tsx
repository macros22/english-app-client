import { useUser } from 'hooks';
import { NavBar } from 'layouts';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'semantic-ui-react';

export const Layout = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const { loggedIn } = useUser();

	const router = useRouter();

	React.useEffect(() => {
		if (!loggedIn) router.push('/auth/sign-in');
	}, [loggedIn]);

	return (
		<div>
			<NavBar />
			<main>
				<Container
					textAlign='center'
					style={{
						minHeight: '90vh',
						padding: '1rem'
					}}
				>
					{children}
				</Container>
			</main>
		</div>
	);
};
