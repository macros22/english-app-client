import { SignIn, SignUp } from 'components';
import { GetServerSideProps } from 'next';
import React from 'react';

interface AuthPageProps extends Record<string, unknown> {
	isSignIn: boolean;
}

export const getServerSideProps: GetServerSideProps<AuthPageProps> = async (
	context
) => {
	const isSignIn = context.query['authMode'] == 'sign-in' ? true : false;
	return { props: { isSignIn } };
};

const AuthPage = ({ isSignIn }: AuthPageProps): JSX.Element => {
	return (
		<>
			{isSignIn ? <SignIn /> : <SignUp />}
		</>);
};

export default AuthPage;
