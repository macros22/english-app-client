import * as React from "react";
import { AddWord, AllWords } from "components";
import { Paper, Stack } from "@mui/material";
import { withLayout } from "layout/MainLayout";

const paperStyle = {
  padding: "1.2rem",
  // minWidth: 940,
  width: 940,
  maxWidth: 965,
  margin: "auto",
  overflow: "hidden",
};

const Home = () => {
  return (
    <>
      <Stack spacing={3}>
        <Paper elevation={1} sx={paperStyle}>
          <AllWords />
        </Paper>
        <Paper elevation={1} sx={paperStyle}>
          <AddWord />
        </Paper>
      </Stack>
    </>
  );
};

export default withLayout(Home);
