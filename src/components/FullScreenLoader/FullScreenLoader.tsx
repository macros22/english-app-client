import { Loader, Segment } from 'semantic-ui-react';
import styles from './FullScreenLoader.module.scss';

export const FullScreenLoader = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <Loader size='massive' active />
        </div>
    );
}