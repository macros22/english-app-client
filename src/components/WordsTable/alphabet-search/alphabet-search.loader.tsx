import { JSX, ReactNode } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { slate } from '@radix-ui/colors';

const WIDTH = 800;
const HEIGHT = 150;

export const AlphabetSearchLaoder = (
  props: JSX.IntrinsicAttributes &
    IContentLoaderProps & { children?: ReactNode },
) => (
  <ContentLoader
    speed={2}
    width={WIDTH}
    height={HEIGHT}
    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    backgroundColor={slate.slate10}
    foregroundColor={slate.slate11}
    {...props}>
    <rect x="3" y="0" rx="0" ry="0" width={WIDTH} height={HEIGHT / 2} />
  </ContentLoader>
);
