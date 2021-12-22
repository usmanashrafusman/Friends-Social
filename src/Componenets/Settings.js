import React,{useEffect, useState , useLayoutEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { onAuthStateChanged , updateEmail } from "firebase/auth";
import {auth,db} from './FirebaseConfig'
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ControlledAccordions() {

    const [userInfo , setUserInfo] = useState({})
    const [userID , setUserID] = useState("")

    useLayoutEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setUserID(uid)
              console.log(user)
              onSnapshot(doc(db, "Accounts", uid), (doc) => {
                setUserInfo(doc.data())
              })
            }
          });
    }, [])

    const updateProvidedData = (id ,val) => {
      if (id === "email"){
        let val = userUpdateVal.email
        if(val !== userInfo.email){
          updateEmail(auth.currentUser, val)
          .then(() => {
            const updateRef = doc(db, "Accounts", userID);
            updateDoc(updateRef, {
              email: val,
            }).then(() => {
              alert("Email Is Upadated");
            });
          })
          .catch((error) => {
            alert(error.message);
          });
          setUpdateUser({...updateUser,[id]:false})
        }
        else {
          alert("Please Provide Differnt Email To Update")
        }
        }
      

        else if (val.length >= 2 && val != userInfo[id]) {
          const updateRef = doc(db, "Accounts", userInfo.userID);
          updateDoc(updateRef, {
            [id]: val,
          }).then(() => {
            alert("Update Sucessfully");
          });
          setUpdateUser({...updateUser,[id]:false})
        }
      };

    const [updateUser ,  setUpdateUser]= useState({
        firstName : false,
        lastName : false,
        Email : false,
        gender : false
    })

    const [userUpdateVal ,  setUserUpdateVal]= useState({
        firstName : "",
        lastName : "",
        email : "",
        gender : ""
    })


const dataRow =(id)=>{

  
  if (!(updateUser[id])){
   
      return (
          <Typography sx={{ color: 'text.secondary' }}>
          {userInfo[id]}
          </Typography>
      )
  }
  else{
      return(
          <TextField
          value={userUpdateVal[id]}
          onChange={(e)=>{setUserUpdateVal({...userUpdateVal , [id]:e.target.value}); console.log(userUpdateVal)}}
          />
      )
  
  }
  }

  const dataRowPass =(id)=>{

  
    if (!(updateUser[id])){
      
       let enc = userInfo[id];
    

        return (
            <Typography sx={{ color: 'text.secondary' }}>
            {enc}
            </Typography>
        )
    }
    else{
        return(
            <TextField
            value={userUpdateVal[id]}
            onChange={(e)=>{setUserUpdateVal({...userUpdateVal , [id]:e.target.value}); console.log(userUpdateVal)}}
            />
        )
    
    }
    }

const icon = (id)=> {
  if (updateUser[id]){

    return(

        <ArrowDownwardIcon id="firstName" onClick={()=>{updateProvidedData(id, userUpdateVal[id] )}}/>
    )
  }
  else{

    return (
        <EditIcon onClick={()=>{ setUpdateUser({...updateUser,[id]:true})}}/>
    )

  }
  
}



  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={icon("firstName")}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            First Name
          </Typography>
          {dataRow("firstName")}
        </AccordionSummary>

      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={icon("lastName")}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Last Name</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
  
          </Typography>
          {dataRow("lastName")}
        </AccordionSummary>

      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={icon("email")}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Email
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
  
          </Typography>
          {dataRow("email")}
        </AccordionSummary>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={icon("password")}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Password
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
  
          </Typography>
          {dataRowPass("password")}
        </AccordionSummary>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Gender</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
          {userInfo.gender}
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
