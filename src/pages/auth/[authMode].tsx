import { SignIn, SignUp } from 'components';
import { GetServerSideProps } from 'next';
import React from 'react';

interface IAuthPageProps extends Record<string, unknown> {
	isSignIn: boolean;
}

export const getServerSideProps: GetServerSideProps<IAuthPageProps> = async (
	context
) => {
	const isSignIn = context.query['authMode'] == 'sign-in' ? true : false;
	return { props: { isSignIn } };
};

const AuthPage = ({ isSignIn }: IAuthPageProps): JSX.Element => {
	return (
		<>
			{isSignIn ? <SignIn /> : <SignUp />}
		</>);
};

export default AuthPage;
