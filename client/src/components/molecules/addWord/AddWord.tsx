import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { WordStudyStatus } from "types/types";
import AddBoxIcon from '@mui/icons-material/AddBox';


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

const AddWord: React.FC = () => {
  const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
    WordStudyStatus.UNKNOWN
  );

  React.useEffect(() => {
    console.log(studyStatus);
  }, [studyStatus]);

  const postWord = async (formData: any) => {
    let response = await fetch("http://localhost:3146/api/dictionary/addWord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(await response.json());
  };

  const formik = useFormik({
    initialValues: {
      word: "example",
      transcription: "example",
      translation: "example",
      usageExample: "example",
      usageExampleTranslation: "example",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // postWord(values);
      postWord({
        word: values.word,
        transcription: values.transcription,
        translation: [values.translation],
        usageExamples: [
          {
            sentence: values.usageExample,
            translation: values.usageExampleTranslation,
          },
        ],
      });
    },
  });

  const handleSelectStatusChange = (event: SelectChangeEvent) => {
    setStudyStatus(event.target.value as WordStudyStatus);
  };


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1, padding: "1rem" }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs>
                <Typography variant="h4" gutterBottom component="div">
                  Add new word.
                </Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="word"
                  name="word"
                  label="Word"
                  value={formik.values.word}
                  onChange={formik.handleChange}
                  error={formik.touched.word && Boolean(formik.errors.word)}
                  helperText={formik.touched.word && formik.errors.word}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="transcription"
                  name="transcription"
                  label="Transcription"
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
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="translation"
                  name="translation"
                  label="Translation"
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
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="usageExample"
                  name="usageExample"
                  label="Usage example"
                  type="usageExample"
                  value={formik.values.usageExample}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.usageExample &&
                    Boolean(formik.errors.usageExample)
                  }
                  helperText={
                    formik.touched.usageExample && formik.errors.usageExample
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="usageExampleTranslation"
                  name="usageExampleTranslation"
                  label="Usage example translation"
                  type="usageExampleTranslation"
                  value={formik.values.usageExampleTranslation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.usageExampleTranslation &&
                    Boolean(formik.errors.usageExampleTranslation)
                  }
                  helperText={
                    formik.touched.usageExampleTranslation &&
                    formik.errors.usageExampleTranslation
                  }
                />
              </Grid>
              <Grid item xs>
                {/* <SplitButton state={studyStatus} setState={setStudyStatus} /> */}
                <FormControl fullWidth>
                  <InputLabel id="study-status-select-label">Study status</InputLabel>
                  <Select
                    labelId="study-status-select-label"
                    id="study-status-select"
                    value={studyStatus}
                    label="Study status"
                    onChange={handleSelectStatusChange }
                  >
                    <MenuItem value={WordStudyStatus.LEARN}>{WordStudyStatus.LEARN}</MenuItem>
                    <MenuItem value={WordStudyStatus.KNOW}>{WordStudyStatus.KNOW}</MenuItem>
                    <MenuItem value={WordStudyStatus.UNKNOWN}>{WordStudyStatus.UNKNOWN}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  startIcon={<AddBoxIcon />}
                  fullWidth
                  type="submit"
                >
                  Add word
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );

  //   return (
  //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  //   );
};

export default AddWord;
