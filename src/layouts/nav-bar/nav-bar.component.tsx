import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { IconButton, Text } from '@radix-ui/themes';
import { Modal, WordForm } from 'components';
import { logout } from 'libs/api/auth.api';
import { useMediaQuery, useUser } from 'libs/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Icon, Menu } from 'semantic-ui-react';

// import { Container, Icon, Menu } from 'semantic-ui-react';
import styles from './nav-bar.module.scss';
import {
  CaretDown,
  List,
  ListItem,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  ViewportPosition,
  Wrapper,
} from './nav-bar.styled';

export const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, user, mutate: mutateUser } = useUser();

  const { theme, setTheme } = useTheme();

  const isSmallScreen = useMediaQuery('(max-width: 769px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMenuVisible = !isSmallScreen || (isSmallScreen && isMenuOpen);

  const mobileMenuButtonHandler = () => {
    setIsMenuOpen(isOpen => !isOpen);
  };

  const logoutHandler = async () => {
    await logout();
    mutateUser();
  };

  return (
    <>
      <Wrapper>
        <Text className={styles.logo}>English words</Text>
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                <Modal title="Add word" modalTrigger={<Text>Add word</Text>}>
                  <WordForm mode="add" />
                </Modal>
              </NavigationMenuTrigger>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                Words
                <CaretDown aria-hidden />
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <List>
                  <ListItem title="all words">
                    <Link href="/words/common-words">All words</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/words/user-words" title="my words">
                      My words
                    </Link>
                  </ListItem>
                </List>
              </NavigationMenuContent>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <IconButton
                variant="outline"
                color="gray"
                onClick={() =>
                  setTheme(prevTheme  =>
                    prevTheme === 'light' ? 'dark' : 'light',
                  )
                }>
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </IconButton>
            </NavigationMenu.Item>
          </NavigationMenuList>

          <ViewportPosition>
            <NavigationMenuViewport />
          </ViewportPosition>
        </NavigationMenuRoot>

        {isSmallScreen && (
          <Icon
            className={styles.menuIcon}
            color="grey"
            size="big"
            name="bars"
            onClick={mobileMenuButtonHandler}
          />
        )}

        {isSmallScreen && isMenuVisible && (
          <Menu.Menu position="right">
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
      </Wrapper>
    </>
  );
};
