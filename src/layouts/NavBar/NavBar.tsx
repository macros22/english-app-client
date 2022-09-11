import { Menu, Button, Label, Container, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from './NavBar.module.scss';
import { logout } from 'libs/api/auth.api';
import { useMediaQuery, useUser } from 'libs/hooks';
import React from 'react';
import { Modal, WordForm } from 'components';

export const NavBar = () => {
	const router = useRouter();
	const { isLoggedIn, user, mutate: mutateUser } = useUser();

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
							<Icon className={styles.menuIcon} color='grey' size='big' name='content' onClick={mobileMenuButtonHandler} />
						}
					</Menu.Item>

					{isMenuVisible() &&
						<Menu.Menu position="right">
							<Modal title='Add word' modalTrigger={<Menu.Item name="Add word" link />} >
								<WordForm mode="add" />
							</Modal>
							<Menu.Item name="All words" link active={router.asPath.startsWith('/words/common-words')} onClick={() => router.replace('/words/common-words')} />
							<Menu.Item name="My words" link active={router.asPath.startsWith('/words/user-words')} onClick={() => router.replace('/words/user-words')} />

							{isLoggedIn
								? <Menu.Item name={user?.name} link active={router.asPath.startsWith('/profile')} onClick={() => router.replace('/profile')} />
								: <Menu.Item name="Sign-in" />
							}

							{isLoggedIn
								? <Menu.Item name='Logout' onClick={logoutHandler} />
								: <Menu.Item name="Sign-up" />
							}

						</Menu.Menu>
					}
				</Container>
			</Menu>
		</>
	);
};
