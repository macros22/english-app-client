import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { wordStatusType } from 'types/words';
import { useActions } from 'hooks/useActions';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    circle: {
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      background: ({ circleColor }) => circleColor,
    },
    formControl: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  status: wordStatusType;
  id: number;
}

const NativeSelects: React.FC<Props> = ({ id, status }) => {
  const { setWordStatus } = useActions();

  //const [status, setStatus] = React.useState<string>(wordStatusType.UNKNOWN);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setStatus(event.target.value as string);
    setWordStatus({ id, status: event.target.value as wordStatusType });
  };

  const styleProps = {
    circleColor: 'red',
  };

  switch (status) {
    case wordStatusType.UNKNOWN:
      styleProps.circleColor = 'indianred';
      break;
    case wordStatusType.KNOW:
      styleProps.circleColor = 'lightgreen';
      break;
    case wordStatusType.LEARN:
      styleProps.circleColor = 'goldenrod';
      break;
  }

  const classes = useStyles(styleProps);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <Grid item>
        <div className={classes.circle}></div>
      </Grid>
      <Grid item>
        <FormControl size="small" className={classes.formControl}>
          {/*<InputLabel htmlFor="filled-status-native-simple">Status</InputLabel>*/}
          <Select
            native
            value={status}
            onChange={handleChange}
            inputProps={{
              name: 'status',
              id: 'filled-status-native-simple',
            }}
          >
            <option value={wordStatusType.KNOW}>{wordStatusType.KNOW}</option>
            <option value={wordStatusType.UNKNOWN}>{wordStatusType.UNKNOWN}</option>
            <option value={wordStatusType.LEARN}>{wordStatusType.LEARN}</option>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default NativeSelects;
