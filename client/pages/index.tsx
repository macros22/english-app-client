import * as React from 'react';

import Box from '@material-ui/core/Box';

import { AllWordsBlock } from 'components';
import MainLayout from 'layout/MainLayout';

export default function Index() {
  return (
    <MainLayout title={'english-app'}>
      <Box sx={{ my: 4 }}>
        <AllWordsBlock />
      </Box>
    </MainLayout>
  );
}
