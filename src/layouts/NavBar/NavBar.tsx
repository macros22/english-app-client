import {  Menu, Dropdown, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from './NavBar.module.scss';
import { logout } from 'libs/auth.api';
import { useUser } from 'hooks';

export const NavBar = () => {
	const router = useRouter();

	const { loading, loggedIn, user, mutate } = useUser();

	const logoutHandler = async () => {
		await logout();
		mutate();
	};

	return (
		<>
			<Menu stackable className={styles.menu}>
				<Menu.Item>
					<img alt="logo" src="https://react.semantic-ui.com/logo.png" />
				</Menu.Item>

				<Menu.Menu position="right">
					<Dropdown item text="Language">
						<Dropdown.Menu>
							<Dropdown.Item>English</Dropdown.Item>
							<Dropdown.Item>Russian</Dropdown.Item>
							<Dropdown.Item>Spanish</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Menu.Item name="Add word" active={true} />
					<Menu.Item name="All words" />

					{loggedIn ? (
						<Menu.Item name="user">{user.name}</Menu.Item>
					) : (
						<Menu.Item name="sign-in">Sign-in</Menu.Item>
					)}
					{loggedIn ? (
						loading ? (
							'loading'
						) : (
							<Menu.Item name="logout" onClick={logoutHandler}>
									Logout
								    <Icon name='log out' size='large' />
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
