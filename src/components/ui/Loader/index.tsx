import { keyframes, styled } from '@stitches/react';

const rotations = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Loader = styled('span', {
  width: '16px',
  height: '16px',
  opacity: 0.75,
  border: '4px solid #FFF',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: `${rotations} 1s linear infinite`,
});
