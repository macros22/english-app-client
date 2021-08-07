import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { wordStatusType } from 'types/words';
import { useActions } from 'hooks/useActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  const classes = useStyles();

  const { setWordStatus } = useActions();

  //const [status, setStatus] = React.useState<string>(wordStatusType.UNKNOWN);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setStatus(event.target.value as string);
    setWordStatus({ id, status: event.target.value as wordStatusType});
  };

  return (
    <>
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
    </>
  );
};

export default NativeSelects;
