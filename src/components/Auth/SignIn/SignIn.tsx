import { WORDS_MODE } from 'constants/names.storage';
import { useLocalStorage, useUser } from 'hooks';
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
import { WordMode } from 'types/types';
import styles from '../Auth.module.scss';

export const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [errorMessage, setErrorMessage] = React.useState('');

	const { mutate, isLoggedIn } = useUser();

	const router = useRouter();

	const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'commonWords');

	React.useEffect(() => {
		if (isLoggedIn) router.replace(wordsMode == "commonWords" ? "/common-words" : '/');
	}, [isLoggedIn]);


	const [isLoadingPostForm, setIsLoadingPostForm] = React.useState(false);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage('');
		setIsLoadingPostForm(true);
		if (email && password) {
			const { accessToken, error } = await login(email, password);
			if (!error && accessToken) {
				mutate();
				console.log(accessToken);
			}
			if (error) {
				setErrorMessage(error);
			}
		}
		setIsLoadingPostForm(false);
	};

	const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
		setErrorMessage('');
	};

	const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
		setErrorMessage('');
	};

	if (isLoggedIn) return <> Redirecting.... </>;

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column className={styles.form}>
				<Header as="h1" color="teal" textAlign="center">
					Sign in
				</Header>
				<Form error size="large" onSubmit={handleSubmit}>
					<Segment >
						<Form.Input
							size='huge'
							value={email}
							onChange={handleEmail}
							name="email"
							fluid
							icon="user"
							iconPosition="left"
							placeholder="E-mail address"
						/>
						<Form.Input
							size='huge'
							fluid
							onChange={handlePassword}
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
						/>

						{errorMessage &&
							<Message
								error
								header={errorMessage}

							/>
						}

						<Button loading={isLoadingPostForm} color="teal" fluid size="huge">
							Login
						</Button>
					</Segment>
				</Form>
				<Segment>
					Or you can <Link href="/auth/sign-up"><strong>Sign Up</strong></Link>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};
