import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  engWord: yup
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
});

const AddWord: React.FC = () => {

  const postWord = async (formData:any) => {
    let response = await fetch('http://localhost:3146/api/dictionary/addWord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    console.log(await response.json());
  }


  const formik = useFormik({
    initialValues: {
      engWord: "",
      transcription: "",
      translation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // postWord(values);
      postWord({
        eng: values.engWord,
        transcription: values.transcription,
        rus: [values.translation]
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
        
          <Grid container spacing={2}>
          <Grid container item spacing={2}>
            <Grid item xs>
              <TextField
                fullWidth
                id="engWord"
                name="engWord"
                label="engWord"
                value={formik.values.engWord}
                onChange={formik.handleChange}
                error={formik.touched.engWord && Boolean(formik.errors.engWord)}
                helperText={formik.touched.engWord && formik.errors.engWord}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                id="transcription"
                name="transcription"
                label="transcription"
                type="transcription"
                value={formik.values.transcription}
                onChange={formik.handleChange}
                error={
                  formik.touched.transcription && Boolean(formik.errors.transcription)
                }
                helperText={formik.touched.transcription && formik.errors.transcription}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                id="translation"
                name="translation"
                label="translation"
                type="translation"
                value={formik.values.translation}
                onChange={formik.handleChange}
                error={
                  formik.touched.translation && Boolean(formik.errors.translation)
                }
                helperText={formik.touched.translation && formik.errors.translation}
              />
            </Grid>
            </Grid>
            <Grid container item>
            <Grid item xs>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
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
