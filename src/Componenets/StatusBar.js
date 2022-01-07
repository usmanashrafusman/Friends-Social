import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { UserInfo } from "../App";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Picker from "emoji-picker-react";
import PostPOP from "./PostPOP";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import { collection, setDoc , doc } from "firebase/firestore";
import { db, auth, storage } from "./FirebaseConfig";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function StatusBar() {
  const [image, setImage] = useState([]);
  const [caption,setCaption]= useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage([
        URL.createObjectURL(event.target.files[0]),
        event.target.files[0]
      ]);
    }
  };

  const userInfo = useContext(UserInfo);
  const [emojiDiv, setEmojiDiv] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setCaption(caption + emojiObject.emoji);
  };

  const post = () => {

    if(caption === "" && image[1] === undefined){
alert("Please Write Or Upload Something To Post")
    }
    else {
      let date = new Date();
    let timeStamp = date.getTime()
    let dateString = date.toDateString();
    let timeString = date.toTimeString();
    const UniqueId = date.getTime().toString();
    const user = auth.currentUser;
    if (image[1]) {
      const storageRef = ref(storage, `${user.uid}/posts/${UniqueId}`);
      uploadBytes(storageRef, image[1]).then(() => {
        getDownloadURL(ref(storage, `${user.uid}/posts/${UniqueId}`))
          .then((url) => {
            const postRef = doc(collection(db, "posts"));
            setDoc(postRef, {
              dateString,
              timeString,
              postCaption: caption,
              postPicture: url,
              postedBy: user.uid,
              postedOn: timeStamp,
              likes : [],
              postId : postRef.id
            });
            setCaption("");
            setImage([])
          })
          .catch((error) => {
            alert(error);
            setCaption("");
            setImage([])
          });
      });
    } else {
      const postRef = doc(collection(db, "posts"));
      setDoc(postRef, {
        dateString,
        timeString,
        postCaption: caption,
        postPicture: "false",
        postedBy: user.uid,
        postedOn: timeStamp,
        likes : [],
        postId : postRef.id
      })
        .then(() => {
          setCaption("");
          setImage([])
        })
        .catch((error) => {
          alert(error);
          setCaption("");
          setImage([])
        });
    }
    }  
  };
  return (
    <>
      <PostPOP />
      <div className="mainStatas">
        <div className="statusBar">
          <Avatar
            src={userInfo.userPhoto}
            style={{ border: "3px solid #1976d2" }}
          />
          <input
            value={caption}
            type="text"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="whats"
            placeholder="What's on your mind ?"
          />
        </div>
        <div className="statusAction">
          <div
            className="action"
            onClick={() => {
              setEmojiDiv(false);
            }}
          >
            <label className="photoBtn" htmlFor="postPhoto">
              <input
                onChange={onImageChange}
                accept="image/*"
                id="postPhoto"
                hidden
                type="file"
              />
              <PhotoLibraryIcon style={{ color: "#4cb333" }} />
              <Typography
                variant="p"
                noWrap
                component="div"
                style={{ color: " #665a5a" }}
              >
                Photo
              </Typography>
            </label>
          </div>

          <div
            className="action"
            onClick={() => {
              setEmojiDiv(!emojiDiv);
            }}
          >
            <InsertEmoticonIcon style={{ color: "#cdc35c" }} />
            <Typography
              variant="p"
              noWrap
              component="div"
              style={{ color: " #665a5a" }}
            >
              Emoji
            </Typography>
          </div>

          <div
            className="action"
            onClick={() => {
              post();
              setEmojiDiv(false);
            }}
          >
            <ArrowForwardIcon style={{ color: "#1976d2" }} />
            <Typography
              variant="p"
              noWrap
              component="div"
              style={{ color: " #665a5a" }}
            >
              Post
            </Typography>
          </div>
        </div>
        {emojiDiv && (
          <Picker style={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}

        {(image !== null && image[0] !== undefined) && (
          <>
            <div
              style={{
                width: "100%",
                height: "200px",
                marginTop: "2rem",
                display: "flex"
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
              <CloseIcon
                sx={{
                  float: "right",
                  color: "#1976d2",
                  transition: "0.3s",
                  border: "1px solid #1976d2",
                  borderRadius: "50%",
                  alignSelf: "center",
                  marginLeft: "15px",
                  cursor: "pointer"
                }}
                onClick={() => { setImage([]) }}
                className="crossIcon"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
