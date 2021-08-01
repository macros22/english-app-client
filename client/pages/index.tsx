import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AllWordsBlock from '../components/AllWordsBlock'
// import { Container } from '@material-ui/core'

import MainLayout from '../layout/MainLayout'

export default function Index() {
  return (
    <MainLayout title={'english-app'}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-beta with TypeScript example
          </Typography>
          <AllWordsBlock />
        </Box>
    </MainLayout>
  )
}
