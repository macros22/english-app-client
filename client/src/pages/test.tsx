import * as React from "react";
import { AddWord, AllWords } from "components";
import { Paper, Stack } from "@mui/material";
import { withLayout } from "layout/MainLayout";

const Paperbase = () => {
  return (
    <>
      <Stack spacing={3}>
        <AllWords />
        <Paper
          elevation={1}
          // variant="outlined"
          sx={{
            padding: "0.5rem",
            minWidth: 940,
            maxWidth: 965,
            margin: "auto",
            overflow: "hidden",
          }}
        >
          <AddWord />
        </Paper>
      </Stack>
    </>
  );
};

export default withLayout(Paperbase);
