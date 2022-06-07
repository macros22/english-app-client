import * as React from "react";
import { AddWord, AllWords } from "components";
import { Paper } from "@mui/material";
import { withLayout } from "layout/MainLayout";

const Paperbase = () => {
  return (
    <>
    <AllWords />
    <Paper
      elevation={1}
      // variant="outlined"
      sx={{
        padding: "0.5rem",
        maxWidth: 1000,
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <AddWord />
    </Paper>
    </>
  );
};

export default withLayout(Paperbase);
