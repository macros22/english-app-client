import { NavBar } from 'components';
import useUser from 'hooks/useUser.hook';
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
					style={{
						minHeight: '90vh',
						padding: '2rem'
					}}
				>
					{children}
				</Container>
			</main>
		</div>
	);
};
