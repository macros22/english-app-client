import * as React from "react";
import { AddWord, AllWord } from "components";
import { Paper } from "@mui/material";
import { withLayout } from "layout/MainLayout";

const Paperbase = () => {
  return (
    <AllWord />
    <Paper
      elevation={1}
      sx={{
        padding: "1rem",
        maxWidth: 936,
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <AddWord />
    </Paper>
  );
};

export default withLayout(Paperbase);
