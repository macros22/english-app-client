import type { VFC } from 'react';
import { useEffect } from 'react';
import type { CustomAppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import { darkTheme } from 'styles/stitches.config';

// import { dark } from '../../styles/dark';

type AppPage = (props: CustomAppProps) => JSX.Element;

export const withTheme = (Component: AppPage) => {
  return function (props: CustomAppProps) {
    return (
      <ThemeProvider
        // attribute="class"

        attribute="class"
        defaultTheme="dark"
        value={{
          light: 'light',
          dark: darkTheme.className,
        }}>
        <InitTheme>
          <Component {...props} />
        </InitTheme>
      </ThemeProvider>
    );
  };
};

const InitTheme: VFC<{ children: JSX.Element }> = props => {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const html = document.querySelectorAll('html')[0];
    html.setAttribute('class', resolvedTheme ?? '');
  }, [resolvedTheme]);

  return props.children;
};
