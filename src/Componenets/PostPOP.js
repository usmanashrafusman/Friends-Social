import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { auth, db, storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "emoji-picker-react";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [disable, setDisable] = useState(false);
  const [emojiDiv, setEmojiDiv] = useState(false);

  const dispatch = useDispatch();
  const { userPOP, postDesc } = bindActionCreators(actionCreators, dispatch);

  const postPOP = useSelector((state) => state.userPOP);
  const descVal = useSelector((state) => state.postDesc);

  const onEmojiClick = (event, emojiObject) => {
    postDesc(descVal + emojiObject.emoji);
  };

  useEffect(() => {
    setOpen(postPOP);
  }, [postPOP]);

  useEffect(() => {
    if (descVal === "" && !image[0]) setDisable(true);
    else setDisable(false);
  }, [image, descVal]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage([
        URL.createObjectURL(event.target.files[0]),
        event.target.files[0]
      ]);
    }
  };

  const handleClose = () => {
    userPOP(false);
    setDisable(true);
    setOpen(false);
    setImage([]);
  };

  const post = () => {
    let date = new Date();
    let timeStamp = date.getTime()
    let dateString = date.toDateString();
    let timeString = date.toTimeString();
    const UniqueId = date.getTime().toString();
    setDisable(true);
    const user = auth.currentUser;
    if (image[1]) {
      const storageRef = ref(storage, `${user.uid}/posts/${UniqueId}`);
      uploadBytes(storageRef, image[1]).then(() => {
        getDownloadURL(ref(storage, `${user.uid}/posts/${UniqueId}`))
          .then((url) => {
            addDoc(collection(db, "posts"), {
              dateString,
              timeString,
              postCaption: descVal,
              postPicture: url,
              postedBy: user.uid,
              postedOn: timeStamp
            });
            handleClose();
            postDesc("");
          })
          .catch((error) => {
            alert(error);
            postDesc("");
          });
      });
    } else {
      addDoc(collection(db, "posts"), {
        dateString,
        timeString,
        postCaption: descVal,
        postPicture: "false",
        postedBy: user.uid,
        postedOn: timeStamp
      })
        .then(() => {
          handleClose();
          postDesc("");
        })
        .catch((error) => {
          alert(error);
          postDesc("");
        });
    }
  };

  return (
    <>
      {postPOP && (
        <div>
          <Dialog fullWidth={true} maxWidth="sm" open={open}>
            <DialogTitle>
              Add Your Post
              <CloseIcon
                sx={{
                  float: "right",
                  color: "#1976d2",
                  transition: "0.3s",
                  border: "1px solid #1976d2",
                  borderRadius: "50%"
                }}
                onClick={handleClose}
                className="crossIcon"
              />
            </DialogTitle>
            <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                onChange={(e) => {
                  postDesc(e.target.value);
                }}
                multiline
                rows={4}
                autoFocus
                value={descVal}
                margin="dense"
                type="text"
                fullWidth
              />
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <label htmlFor="postPhoto">
                  <input
                    onChange={onImageChange}
                    accept="image/*"
                    id="postPhoto"
                    hidden
                    type="file"
                  />
                  <Button fullWidth variant="contained" component="span">
                    <PhotoCamera style={{ margin: "5px" }} />
                    Add a photo
                  </Button>
                </label>
                <label>
                  <Button
                    onClick={() => {
                      setEmojiDiv(!emojiDiv);
                    }}
                    fullWidth
                    variant="contained"
                    component="span"
                    style={{ backgroundColor: "#d9d3d3", color: "#000" }}
                  >
                    <SentimentSatisfiedAltIcon
                      style={{ margin: "5px", color: "#a3a328" }}
                    />
                    {emojiDiv ? "Close Emoji" : "Insert Emoji"}
                  </Button>
                </label>
              </div>
              {emojiDiv && (
                <Picker style={{ width: "100%" }} onEmojiClick={onEmojiClick} />
              )}
              {image[0] ? (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      marginTop: "2rem"
                    }}
                  >
                    <img
                      alt="img-prievew"
                      style={{
                        maxWidth: "100%",
                        border: "3px solid black"
                      }}
                      src={image[0]}
                    />
                  </div>
                </>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={post}
                disabled={disable}
                variant="contained"
                fullWidth
              >
                post your status
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
