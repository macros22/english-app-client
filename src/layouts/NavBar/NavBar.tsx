import { Menu, Button, Label, Container, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from './NavBar.module.scss';
import { logout } from 'libs/api/auth.api';
import { useMediaQuery, useUser } from 'libs/hooks';
import React from 'react';

export const NavBar = () => {
	const router = useRouter();
	const { isUserLoading, isLoggedIn, user, mutate: mutateUser } = useUser();

	const isSmallScreen = useMediaQuery('(max-width: 769px)');
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

	const isMenuVisible = React.useCallback(() => {
		if (!isSmallScreen || (isSmallScreen && isMenuOpen)) {
			return true;
		}
	}, [isMenuOpen, isSmallScreen])

	// Handlers.
	const mobileMenuButtonHandler = () => {
		setIsMenuOpen(isOpen => !isOpen);
	}

	const logoutHandler = async () => {
		await logout();
		mutateUser();
	};

	return (
		<>
			<Menu secondary stackable className={styles.menu}>
				<Container>
					<Menu.Item>
						<span className={styles.logo}>English words</span>
						{isSmallScreen &&
							<Icon className={styles.menuIcon} size='big' name='content' onClick={mobileMenuButtonHandler} />
						}
					</Menu.Item>




					{isMenuVisible() &&
						<Menu.Menu position="right">

							<Menu.Item name="Add word" link active={router.pathname === '/add-word'} onClick={() => router.push('/add-word')}>
								{/* <Link href="/add-word">Add word</Link> */}
								{/* <Button icon='add' size='small'  /> */}
							</Menu.Item>

							<Menu.Item name="All words" link active={router.pathname === '/common-words'} onClick={() => router.replace('/common-words')}>
								{/* <Link href="/">All words</Link> */}
							</Menu.Item>

							<Menu.Item name="My words" link active={router.pathname === '/user-words'} onClick={() => router.replace('/user-words')}>
								{/* <Link href="/">All words</Link> */}
							</Menu.Item>

							{isLoggedIn ? (
								<Menu.Item name="user"><Label style={{ margin: 0, padding: '0.6rem 1rem' }} size="big" color='teal' content={user?.name} /></Menu.Item>
							) : (
								<Menu.Item name="sign-in">Sign-in</Menu.Item>
							)}
							{isLoggedIn ? (
								isUserLoading ? (
									'isUserLoading'
								) : (
									<Menu.Item >
										<Button basic size="big" content='Logout' onClick={logoutHandler} />
									</Menu.Item>
								)
							) : (
								<Menu.Item name="sign-up">Sign-up</Menu.Item>
							)}
						</Menu.Menu>
					}
				</Container>
			</Menu>
		</>
	);
};
