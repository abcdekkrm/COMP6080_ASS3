import React from 'react';
import Paper from "@mui/material/Paper";

import Divider from "@mui/material/Divider";

function Search() {
  return (
    <Paper
      sx={{
        m: "10px",
        p: "6px",
        display: "flex",
        alignItems: "center",
        width: "90%",
      }}
    >
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}

export default Search;