import { Menu, Button, Label } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from './NavBar.module.scss';
import { logout } from 'libs/auth.api';
import { useUser } from 'hooks';
import React from 'react';

export const NavBar = () => {
	const router = useRouter();
	const { loading, loggedIn, user, mutate: mutateUser } = useUser();

	const logoutHandler = async () => {
		await logout();
		mutateUser();
	};

	return (
		<>
			<Menu stackable className={styles.menu}>
				<Menu.Item>
					<img alt="logo" src="https://react.semantic-ui.com/logo.png" />
				</Menu.Item>

				<Menu.Menu position="right">

					<Menu.Item name="Add word" link active={router.pathname === '/add-word'} onClick={() => router.push('/add-word')}>
						{/* <Link href="/add-word">Add word</Link> */}
						{/* <Button icon='add' size='small'  /> */}
					</Menu.Item>

					<Menu.Item name="All words" link active={router.pathname === '/common-words'} onClick={() => router.push('/common-words')}>
						{/* <Link href="/">All words</Link> */}
					</Menu.Item>

					<Menu.Item name="My words" link active={router.pathname === '/'} onClick={() => router.push('/')}>
						{/* <Link href="/">All words</Link> */}
					</Menu.Item>

					{loggedIn ? (
						<Menu.Item name="user"><Label style={{ margin: 0 }} size="big" icon="user" color='green' content={user?.name} /></Menu.Item>
					) : (
						<Menu.Item name="sign-in">Sign-in</Menu.Item>
					)}
					{loggedIn ? (
						loading ? (
							'loading'
						) : (
							<Menu.Item >
								{/* <Icon name='log out' size='big' className='ui transparent icon input'/> */}
								<Button basic icon="log out" size="big" content='Logout' onClick={logoutHandler} />
							</Menu.Item>
						)
					) : (
						<Menu.Item name="sign-up">Sign-up</Menu.Item>
					)}
				</Menu.Menu>
			</Menu>
		</>
	);
};
