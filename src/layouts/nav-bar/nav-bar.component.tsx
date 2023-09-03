import React, { forwardRef, useCallback, useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Heading, IconButton, Text } from '@radix-ui/themes';
import { Modal, WordForm } from 'components';
import { logout } from 'libs/api/auth.api';
import { useMediaQuery, useUser } from 'libs/hooks';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Container, Icon, Menu } from 'semantic-ui-react';

import styles from './nav-bar.module.scss';
import {
  Callout,
  CalloutHeading,
  CalloutText,
  CaretDown,
  List,
  ListItem,
  NavigationMenuContent,
  NavigationMenuDemo,
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
      {/* <NavigationMenuDemo /> */}
      <Wrapper>
        <Text className={styles.logo}>English words</Text>
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                Learn
                <CaretDown aria-hidden />
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <List>
                  <li style={{ gridRow: 'span 3' }}>
                    <NavigationMenu.Link asChild>
                      <Callout href="/">
                        <svg
                          aria-hidden
                          width="38"
                          height="38"
                          viewBox="0 0 25 25"
                          fill="white">
                          <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z" />
                          <path d="M12 0H4V8H12V0Z" />
                          <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z" />
                        </svg>
                        <CalloutHeading>Radix Primitives</CalloutHeading>
                        <CalloutText>
                          Unstyled, accessible components for React.
                        </CalloutText>
                      </Callout>
                    </NavigationMenu.Link>
                  </li>

                  <ListItem href="https://stitches.dev/" title="Stitches">
                    CSS-in-JS with best-in-class developer experience.
                  </ListItem>

                  <ListItem href="/colors" title="Colors">
                    Beautiful, thought-out palettes with auto dark mode.
                  </ListItem>
                  <ListItem href="https://icons.radix-ui.com/" title="Icons">
                    A crisp set of 15x15 icons, balanced and consistent.
                  </ListItem>
                </List>
              </NavigationMenuContent>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                <Modal
                  title="Add word"
                  modalTrigger={<Menu.Item name="Add word" link />}>
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
                  {/* <li style={{ gridRow: 'span 3' }}>
                    <NavigationMenu.Link asChild>
                      <Callout href="/">
                        <svg
                          aria-hidden
                          width="38"
                          height="38"
                          viewBox="0 0 25 25"
                          fill="white">
                          <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z" />
                          <path d="M12 0H4V8H12V0Z" />
                          <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z" />
                        </svg>
                        <CalloutHeading>Radix Primitives</CalloutHeading>
                        <CalloutText>
                          Unstyled, accessible components for React.
                        </CalloutText>
                      </Callout>
                    </NavigationMenu.Link>
                  </li> */}

                  <ListItem title="Stitches">
                    <Menu.Item
                      name="All words"
                      link
                      active={router.asPath.startsWith('/words/common-words')}
                      onClick={() => router.replace('/words/common-words')}
                    />
                  </ListItem>
                  <ListItem href="/colors" title="Colors">
                    <Menu.Item
                      name="My words"
                      link
                      active={router.asPath.startsWith('/words/user-words')}
                      onClick={() => router.replace('/words/user-words')}
                    />
                  </ListItem>
                </List>
              </NavigationMenuContent>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <IconButton
                variant="outline"
                color="gray"
                onClick={() =>
                  setTheme(prevTheme =>
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
      </Wrapper>
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

          <div>
            <IconButton variant="surface">
              {theme === 'light' ? (
                <MoonIcon onClick={() => setTheme('dark')} />
              ) : (
                <SunIcon onClick={() => setTheme('light')} />
              )}
              {/* <MagnifyingGlassIcon width="18" height="18" /> */}
            </IconButton>
          </div>
        </Container>
      </Menu>
    </>
  );
};
