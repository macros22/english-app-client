import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { WordStudyStatus } from "types/types";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { Controller, useForm } from "react-hook-form";

interface FormData {
  word: string;
  transcription: string;
  translation: string;
  usageExample: string;
  usageExampleTranslation: string;
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

  

  const handleSelectStatusChange = (event: SelectChangeEvent) => {
    setStudyStatus(event.target.value as WordStudyStatus);
  };

  

  const defaultValues = {
    word: "example",
    transcription: "example",
    translation: "example",
    usageExample: "example",
    usageExampleTranslation: "example",
  };

  const {
    // register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ defaultValues, resolver: yupResolver(validationSchema) });
  const onSubmit = (data: FormData) => {alert(JSON.stringify(data, null, 2))
    postWord({
      word: data.word,
      transcription: data.transcription,
      translation: [data.translation],
      usageExamples: [
        {
          sentence: data.usageExample,
          translation: data.usageExampleTranslation,
        },
      ],
    });};

  return (
    <div>
     
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>


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
              <Controller
                name={"word"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="word"
                    name="word"
                    label="Word"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.word)}
                    helperText={errors.word && errors?.word?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Controller
                name={"transcription"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="transcription"
                    name="transcription"
                    label="Transcription"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.transcription)}
                    helperText={
                      errors.transcription && errors?.transcription?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Controller
                name={"translation"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="translation"
                    name="translation"
                    label="Translation"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.translation)}
                    helperText={
                      errors.translation && errors?.translation?.message
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs>
              <Controller
                name={"usageExample"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="usageExample"
                    name="usageExample"
                    label="Usage example"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.usageExample)}
                    helperText={
                      errors.usageExample && errors?.usageExample?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Controller
                name={"usageExampleTranslation"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="usageExampleTranslation"
                    name="usageExampleTranslation"
                    label="Example translation"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.usageExampleTranslation)}
                    helperText={errors.usageExampleTranslation && errors?.usageExampleTranslation?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <InputLabel id="study-status-select-label">
                  Study status
                </InputLabel>
                <Select
                  labelId="study-status-select-label"
                  id="study-status-select"
                  value={studyStatus}
                  label="Study status"
                  onChange={handleSelectStatusChange}
                >
                  <MenuItem value={WordStudyStatus.LEARN}>
                    {WordStudyStatus.LEARN}
                  </MenuItem>
                  <MenuItem value={WordStudyStatus.KNOW}>
                    {WordStudyStatus.KNOW}
                  </MenuItem>
                  <MenuItem value={WordStudyStatus.UNKNOWN}>
                    {WordStudyStatus.UNKNOWN}
                  </MenuItem>
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
                onClick={handleSubmit(onSubmit)}
              >
                Add word
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
     
    </div>
  );

};

export default AddWord;
