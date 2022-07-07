import type { NextPage } from 'next'
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../../components/organisms/navigator/Navigator';
import Content from '../../components/Content';
import Header from '../../components/organisms/header/Header';
import WordsTable from '../../components/organisms/wordsTable/WordsTable';
import { Word, WordStudyStatus } from '../../types/types';
import { Breadcrumbs } from '@mui/material';


const  words: Word[] = [
    {id: 1, eng: 'neglect', transcription:"tmp", rus: ['пренебрегать'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 2, eng: 'shun', transcription:"tmp", rus: ['избегать'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 3, eng: 'proposal', transcription:"tmp", rus: ['предложение'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 4, eng: 'attainment', transcription:"tmp", rus: ['достижение'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 5, eng: 'unnecessary', transcription:"tmp", rus: ['ненужный'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 6, eng: 'substrate', transcription:"tmp", rus: ['подложка'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 7, eng: 'sophisticated', transcription:"tmp", rus: ['сложный', 'утонченный'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
  ];


let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

export const BreadCrumb = () => {
    return (
        <>
        <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    MUI
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href="/getting-started/installation/"
  >
    Core
  </Link>
  <Typography color="text.primary">Breadcrumbs</Typography>
</Breadcrumbs>
</>
    );
}

const drawerWidth = 256;

const AllWords: NextPage = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
            />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: 'white' }}>
              <WordsTable words={words} />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
}

export default AllWords
