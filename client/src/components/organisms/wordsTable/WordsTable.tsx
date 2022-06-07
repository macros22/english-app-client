// import { makeStyles, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
// import React from 'react';

// import SelectInput from './SelectInput';

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow, { TableRowTypeMap } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Chip, Collapse, Divider, TableHead, Typography, TextField, SelectChangeEvent, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Word, WordStudyStatus } from "../../../types/types";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloseIcon from "@mui/icons-material/Close";

import { useFormik,  useFormikContext  } from "formik";
import * as yup from "yup";


function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" }, height: 20 }}>
        <TableCell width={40}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width={40} component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.word}</TableCell>
        <TableCell>{row.transcription}</TableCell>
        <TableCell width={200}>{row.translation}</TableCell>
        <TableCell width={150} align="center">
          {row.studyStatus == WordStudyStatus.KNOW && (
            <Chip
              color={"success"}
              label={row.studyStatus}
              icon={<DoneIcon />}
            />
          )}
          {row.studyStatus == WordStudyStatus.UNKNOWN && (
            <Chip
              color={"error"}
              label={row.studyStatus}
              icon={<CloseIcon />}
            />
          )}
          {row.studyStatus == WordStudyStatus.LEARN && (
            <Chip
              color={"info"}
              label={row.studyStatus}
              icon={<AccessTimeFilledIcon />}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: "0px", border: "0px" }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Usage examples:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>English</TableCell>
                    <TableCell>Translation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.usageExamples.map((exampleRow) => (
                    <TableRow key={exampleRow.sentence}>
                      <TableCell component="th" scope="row">
                        {exampleRow.sentence}
                      </TableCell>
                      <TableCell>{exampleRow.translation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
   
  );
}


const validationSchema = yup.object({
  word: yup
    .string()
    .min(2, "Word should be of minimum 2 characters length")
    .required("Word is required"),
  transcription: yup
    .string()
    .min(2, "Transcription should be of minimum 2 characters length")
    .required("Transcription is required"),
  translation: yup
    .string()
    .min(2, "Translation should be of minimum 2 characters length")
    .required("Translation is required"),
  usageExample: yup.string().required("Usage example is required"),
  usageExampleTranslation: yup
    .string()
    .required("Usage example translation is required"),
});





function EditRow(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);


  const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
    row.studyStatus
  );

    

  const formik = useFormik({
    initialValues: {
      word: row.word,
      transcription: row.transcription,
      translation: row.translation[0],
      usageExample: row.usageExamples[0].sentence,
      usageExampleTranslation: row.usageExamples[0].translation,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
     
    },
  });


  const handleSelectStatusChange = (event: SelectChangeEvent) => {
    setStudyStatus(event.target.value as WordStudyStatus);
  };


  return (
   
    <React.Fragment>
      
      <TableRow sx={{ "& > *": { borderBottom: "none" }, height: 20 }}>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <TableCell width={40}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width={40} component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell width={140} >
        <TextField
                  // fullWidth
                  variant="standard"
                  id="word"
                  name="word"
                  // label="Word"
                  value={formik.values.word}
                  onChange={formik.handleChange}
                  error={formik.touched.word && Boolean(formik.errors.word)}
                  helperText={formik.touched.word && formik.errors.word}
                />
        </TableCell>
        <TableCell width={140} >
        <TextField
                  // fullWidth
                  variant="standard"
                  id="transcription"
                  name="transcription"
                  // label="Transcription"
                  type="transcription"
                  value={formik.values.transcription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.transcription &&
                    Boolean(formik.errors.transcription)
                  }
                  helperText={
                    formik.touched.transcription && formik.errors.transcription
                  }
                />
        </TableCell>
        <TableCell width={200}><TextField
                  // fullWidth
                  variant="standard"
                  id="translation"
                  name="translation"
                  // label="Translation"
                  type="translation"
                  value={formik.values.translation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.translation &&
                    Boolean(formik.errors.translation)
                  }
                  helperText={
                    formik.touched.translation && formik.errors.translation
                  }
                /></TableCell>
        <TableCell width={150} align="center">
          {row.studyStatus == WordStudyStatus.KNOW && (
            <Chip
              color={"success"}
              label={row.studyStatus}
              icon={<DoneIcon />}
            />
          )}
          {row.studyStatus == WordStudyStatus.UNKNOWN && (
            <Chip
              color={"error"}
              label={row.studyStatus}
              icon={<CloseIcon />}
            />
          )}
          {row.studyStatus == WordStudyStatus.LEARN && (
            <Chip
              color={"info"}
              label={row.studyStatus}
              icon={<AccessTimeFilledIcon />}
            />
          )}
        </TableCell>
        <TableCell>
        
        {/*
        // @ts-ignore */}
        <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  // startIcon={<AddBoxIcon />}
                  
                  onClick={formik.handleSubmit}
                  
                  fullWidth
                  type="submit"
                >
                  Add word
                </Button>
          </TableCell>
          
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: "0px", border: "0px" }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Usage examples:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>English</TableCell>
                    <TableCell>Translation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.usageExamples.map((exampleRow) => (
                    <TableRow key={exampleRow.sentence}>
                      <TableCell component="th" scope="row">
                        {exampleRow.sentence}
                      </TableCell>
                      <TableCell>{exampleRow.translation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    
    </React.Fragment>
   
  );
}


interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(word: Word) {
  return {
    ...word,
    isEditingNow: false,
  };
}

interface IProps {
  words: Word[];
}

const WordsTable: React.FC<IProps> = ({ words }) => {
  const rows = words
    .map((word) => createData(word))
    .sort((a, b) => (a.id < b.id ? -1 : 1));

  rows[0].isEditingNow = true;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Table
      </Typography>

      <TableContainer>
        <Table
          size="small"
          sx={{ minWidth: 200 }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Id</TableCell>
              <TableCell>English</TableCell>
              <TableCell>Transcription</TableCell>
              <TableCell>Russian</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              row.isEditingNow 
                ? <EditRow key={row.id} row={row} />
                : <Row key={row.id} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: false,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default WordsTable;
