import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';


export default function CardMain (props){

  return (
      <CardMedia
      className='wid hei'
        component="img"
        height="194"
        image={props.src}
        alt="Paella dish"
      />
  );
}

