import React, { useState, useLayoutEffect, useRef } from "react";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { db, storage } from "./FirebaseConfig";
import { doc, onSnapshot, collection } from "firebase/firestore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc } from "firebase/firestore";

import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

export default function TransitionsPopper() {
  const updateuserPicture = () => {
    let file = picRef.current.files[0];
    let date = new Date();
    let dateString = date.toDateString();
    let timeString = date.toTimeString();
    let time = date.getTime().toString();
    if (file){
      console.log(file)

      const storageRef = ref(storage, `/${uid}/${time}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress.toString();
        },
        (error) => {
          alert("An Error Occured During Uploading Your Picture");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let postPicture = downloadURL;
            setDoc(doc(db, "Accounts", uid), {
              userPhoto:postPicture
            });

            alert("Your Profile Picture Is Updated")
          });
        }
      );
    }
    else{
      alert("Please Select Pictrue To Update")
    }
  };

  const [userInfo, setUserInfo] = useState(null);
  const [uid , setUID] = useState("")
  const [userPost, setUserPost] = useState([]);
  const picRef = useRef(null);

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUID(uid);
        onSnapshot(doc(db, "Accounts", uid), (doc) => {
          setUserInfo(doc.data());
        });
      }
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <>
      {userInfo !== null && (
        <div className="userNav">
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box style={{display:"flex" , flexDirection:"column"}}>
                  <Stack
                    direction="column"
                    alignItems="center"
                    spacing={2}
                    sx={{ p: 1 }}
                  >
                    <label htmlFor="contained-button-file">
                      <Input
                          ref={picRef}
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                      />
                      <Button
                    
                        variant="contained"
                        component="span"
                      >
                        
                        Select Profile Picture
                      </Button>
                      <br/>
                   <Button
                        style={{ margin: "5px auto" , display:"flex" }}
                        variant="contained"
                        color="success"
                        onClick={updateuserPicture}
                      >
                        Update
                      </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                     
                    </label>
                  </Stack>
                </Box>
              </Fade>
            )}
          </Popper>
          <img
            className="userPic"
            src={userInfo.userPhoto}
            alt={userInfo.firstName}
            aria-describedby={id}
            type="button"
            onClick={handleClick}
          />

          <p>
            {userInfo.firstName + " " + userInfo.lastName}
            <br />
            <span className="gen">{userInfo.gender}</span>
          </p>
          <p style={{ fontSize: "22px" }}>
            Email :{" "}
            <span style={{ color: "#4083c5", fontSize: "19px" }}>
              {userInfo.email}
            </span>{" "}
          </p>

          <div className="allPost">
            {userPost.map((e, index) => (
              <Card className="wid" key={index}>
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
      )}
    </>
  );
}
