import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { AllWordsBlock, MyWordsBlock } from 'components';
import MainLayout from 'layout/MainLayout';
import {Grid, Paper} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 5,
    textAlign: 'center',
  },
});


export default function Index() {

  const classes = useStyles();

  return (
    <MainLayout title={'english-app'}>
      <Grid container className={classes.root} direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <AllWordsBlock />
        </Grid>
        <Grid item xs={6}>
          <MyWordsBlock />
        </Grid>
      </Grid>
    </MainLayout>
  );
}
