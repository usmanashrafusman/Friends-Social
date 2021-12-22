import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link , useNavigate} from 'react-router-dom'


export default function CardHead(props) {


  
    return (
 
        <CardHeader
        avatar={
          
          <Avatar alt={props.name}  src={props.src}/>
        }
        action={ <IconButton aria-label="settings">  <MoreVertIcon /> </IconButton>
        }
      
        title={props.name}
        subheader={props.time}
      />
    
    )
}
