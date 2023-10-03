import { JSX, ReactNode } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { slate } from '@radix-ui/colors';

// TODO: fix size and colors constants
const WIDTH = 1000;
const HEIGHT = 600;

export const WordTableLoader = (
  props: JSX.IntrinsicAttributes &
    IContentLoaderProps & { children?: ReactNode },
) => (
  <ContentLoader
    speed={2}
    width={WIDTH}
    height={HEIGHT}
    viewBox={`0 0 ${WIDTH} ${HEIGHT * 1.5}`}
    backgroundColor={slate.slate10}
    foregroundColor={slate.slate11}
    {...props}>
    <rect x="0" y="0" rx="0" ry="0" width={WIDTH} height={HEIGHT / 1.2} />
    <rect x="0" y="550" rx="0" ry="0" width={WIDTH} height={HEIGHT / 4} />
  </ContentLoader>
);
