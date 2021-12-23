import React, {useState,useLayoutEffect, useRef} from 'react'
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { db } from './FirebaseConfig';
import { doc, onSnapshot, collection } from "firebase/firestore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseConfig';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});


export default function TransitionsPopper() {

    const updateuserPicture = ()=>{
        // console.log(picRef.current.files)
        }
        
    


    const [userInfo , setUserInfo] = useState({});
    const [userPost , setUserPost] = useState([]);
    const picRef = useRef(null);

    useLayoutEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              // console.log(user)
              onSnapshot(doc(db, "Accounts", uid), (doc) => {
                setUserInfo(doc.data())
              })

              onSnapshot(collection(db, "Accounts", uid, "post"), (snapShot) =>
              setUserPost(snapShot.docs.map((doc) => doc.data()))
            );
            }
          });
    }, [])


  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
      <>
    <div className='userNav'>
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box >
            <Stack direction="row" alignItems="center" spacing={2} sx={{  p: 1}}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button ref={picRef} onClick={updateuserPicture} variant="contained" component="span">
          Update Profile Picture
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
        </IconButton>
      </label>
    </Stack>
            </Box>
          </Fade>
        )}
      </Popper>
      <img className='userPic' src={userInfo.userPhoto} alt={userInfo.firstName} aria-describedby={id} type="button" onClick={handleClick}/>

    
    {/* </div> */}
    



    {/* <div className='userNav'> */}
  
    
  
 
    <p>{userInfo.firstName + " " + userInfo.lastName}
    <br/>
    <span className='gen'>{userInfo.gender}</span>
    </p>
    <p style={{fontSize:"22px"}}>Email : <span style={{color: "#4083c5" , fontSize:"19px"}}>
          {userInfo.email}</span> </p>


         <div className="allPost">

          {userPost.map((e, index) => (
            <Card className="wd-80" key={index}>
              <CardHeader
                name={userInfo.firstName + " " + userInfo.lastName}
                time={e.dateString + " " + e.timeString}
                src={userInfo.userPhoto}
              />
              {e.postPicture !== "false" && <CardMain src={e.postPicture} />}
              <CardFooter caption={e.postCaption} />
            </Card>
          ))}
        </div>
      
   
</div>
      </>
  );
}





