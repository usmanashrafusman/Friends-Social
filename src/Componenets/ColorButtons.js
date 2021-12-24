import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ColorButtons() {
  return (
    <Stack direction="row" spacing={10} style={{ margin: "20px 0px" }}>
      <Button variant="contained" color="success">
        Upload A Post
      </Button>
    </Stack>
  );
}
