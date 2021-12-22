import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {

  return (
     <TextField
     id="caption"
     placeholder="Enter Your Caption Here"
     label="Caption"
     multiline
     style={{width:"80%" , margin:"20px"}}
     maxRows={20}
   />
  );
}
