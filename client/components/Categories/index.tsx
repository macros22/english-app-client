import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  { title: 'WORDS', url: '/words' },
  { title: 'TESTS', url: '/tests' },
  { title: 'GAMES', url: '/games' },
  { title: 'STATISTIC', url: '/stat' },
];

interface Props {}
const Categories: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const router = useRouter();

  return (
    <>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        <>
          {sections.map((section) => (
            <Button key={section.url} onClick={() => router.push(section.url)}>
              {section.title}
            </Button>
          ))}
        </>
      </Toolbar>
    </>
  );
};
export default Categories;
