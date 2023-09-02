import { FC, useEffect } from 'react';
import { FullScreenLoader } from 'components';
import { NavBar } from 'layouts';
import { PaginationProvider } from 'libs/contexts/PagiantionContext';
import { useUser } from 'libs/hooks';
import { useRouter } from 'next/router';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => {
  const { isLoggedIn } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace('/auth/sign-in');
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <NavBar />
      <main>
        <PaginationProvider>
          <div className={styles.container}>{children}</div>
        </PaginationProvider>
      </main>
    </div>
  );
};
