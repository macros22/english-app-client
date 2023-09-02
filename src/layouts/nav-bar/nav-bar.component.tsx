import { useCallback, useState } from 'react';
import { Modal, WordForm } from 'components';
import { logout } from 'libs/api/auth.api';
import { useMediaQuery, useUser } from 'libs/hooks';
import { useRouter } from 'next/router';
import { Container, Icon, Menu } from 'semantic-ui-react';

import styles from './nav-bar.module.scss';

export const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, user, mutate: mutateUser } = useUser();

  const isSmallScreen = useMediaQuery('(max-width: 769px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMenuVisible = useCallback(() => {
    return !isSmallScreen || (isSmallScreen && isMenuOpen);
  }, [isMenuOpen, isSmallScreen]);

  const mobileMenuButtonHandler = () => {
    setIsMenuOpen(isOpen => !isOpen);
  };

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
            {isSmallScreen && (
              <Icon
                className={styles.menuIcon}
                color="grey"
                size="big"
                name="bars"
                onClick={mobileMenuButtonHandler}
              />
            )}
          </Menu.Item>

          {isMenuVisible() && (
            <Menu.Menu position="right">
              <Modal
                title="Add word"
                modalTrigger={<Menu.Item name="Add word" link />}>
                <WordForm mode="add" />
              </Modal>
              <Menu.Item
                name="All words"
                link
                active={router.asPath.startsWith('/words/common-words')}
                onClick={() => router.replace('/words/common-words')}
              />
              <Menu.Item
                name="My words"
                link
                active={router.asPath.startsWith('/words/user-words')}
                onClick={() => router.replace('/words/user-words')}
              />

              {isLoggedIn ? (
                <Menu.Item
                  name={user?.name}
                  link
                  active={router.asPath.startsWith('/profile')}
                  onClick={() => router.replace('/profile')}
                />
              ) : (
                <Menu.Item name="Sign-in" />
              )}

              {isLoggedIn ? (
                <Menu.Item name="Logout" onClick={logoutHandler} />
              ) : (
                <Menu.Item name="Sign-up" />
              )}
            </Menu.Menu>
          )}
        </Container>
      </Menu>
    </>
  );
};
