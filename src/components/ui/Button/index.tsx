import { Button as RadixButton } from '@radix-ui/themes';
import { styled } from '@stitches/react';

import { Loader } from '../Loader';

type ButtonProps = Parameters<typeof RadixButton>[0] & {
  isLoading?: boolean;
};

const ButtonStyled = styled(RadixButton, {
  cursor: 'pointer',
  variants: {
    isLoading: {
      true: {
        pointerEvents: 'none',
        width: '200px',
      },
    },
  },
});

export const Button = ({
  children,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyled isLoading={isLoading} {...props}>
      {isLoading ? <Loader /> : children}
    </ButtonStyled>
  );
};
