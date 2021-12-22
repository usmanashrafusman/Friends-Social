import React , {useEffect, useState}from 'react'
import {auth} from './FirebaseConfig'
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from './FirebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { showUser } from './Functions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CardHead(props) {
  
    return (
     
        <div 
        className="userCl"
        onClick={
            ()=>{


                props.show();
                   props.set();
                  }
        }
        >
   <Avatar alt={props.name}  src={props.src}/>
        <p>{props.name}</p>
        </div>
     
    
    
    )
}
