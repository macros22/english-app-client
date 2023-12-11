import { ForwardedRef, forwardRef } from 'react';
import cn from 'clsx';

import styles from './Card.module.scss';
import { CardProps } from './Card.props';

export const Card = forwardRef(
  (
    { children, className, ...properties }: CardProps,
    reference: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    return (
      <div
        className={cn(styles.card, className, {})}
        ref={reference}
        {...properties}>
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';
