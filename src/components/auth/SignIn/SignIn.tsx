import { useUser } from 'hooks';
import { login } from 'libs/auth.api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
} from 'semantic-ui-react';

export const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const { mutate, loggedIn, user } = useUser();

	const router = useRouter();

  React.useEffect(() => {
    console.log(user)
  }, [user]);

  React.useEffect(() => {
    // if (loggedIn) router.replace("/");
  }, [loggedIn]);

  if (loggedIn) return <> Redirecting.... </>;



	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email && password) {
			const accessToken = await login(email, password);
			// setCookie(authCookie, `${accessToken}; Max-Age=3600; Path=/; HttpOnly; Domain=node-express-t-prod-nodejs-express-ts-gsiguz.mo2.mogenius.io`);
			mutate();
			console.log(accessToken);
		}
		console.log({
			email,
			password,
		});
	};

	const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	};

	const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	};

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 550 }}>
				<Header as="h2" color="teal" textAlign="center">
					Sign in
				</Header>
				<Form size="large" onSubmit={handleSubmit}>
					<Segment>
						<Form.Input
							value={email}
							onChange={handleEmail}
							name="email"
							fluid
							icon="user"
							iconPosition="left"
							placeholder="E-mail address"
						/>
						<Form.Input
							fluid
							onChange={handlePassword}
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
						/>

						<Button color="teal" fluid size="large">
							Login
						</Button>
					</Segment>
				</Form>
				<Message>
					Or you can <Link href="/auth/sign-up">Sign Up</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
};
