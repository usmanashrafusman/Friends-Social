import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { styled } from '@mui/material/styles';
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Collapse from '@mui/material/Collapse';
import MessageIcon from '@mui/icons-material/Message';
import CardHeader from "./CardHeader";
import CommentsCard from './CommentsCard'
import { UserInfo } from '../App'
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, addDoc , collection , onSnapshot, query,orderBy} from "firebase/firestore";
import { db } from './FirebaseConfig'
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Info } from './UserPost'
import Picker from "emoji-picker-react";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardFooter(props) {

  const [emojiDiv, setEmojiDiv] = useState(false);

const showEmoji = ()=>{
    setEmojiDiv(!emojiDiv)
}
  const handleExpandClick = () => {
    setEmojiDiv(false)
    setExpanded(!expanded);
  };

  const userInfo = useContext(UserInfo)
  const postInfo = useContext(Info);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("")
  const [allComments , setAllComments] = useState([]);
  let likesArr = postInfo.likes;

    const onEmojiClick = (event, emojiObject) => {
    setComment(comment + emojiObject.emoji);
  };

  useEffect(() => {
    if (likesArr && userInfo.userID) {
      setLiked(likesArr.includes(userInfo.userID))
    }
    if (postInfo){
    //   console.log(postInfo)
    //   onSnapshot(doc(db, "posts", postInfo.postId), (doc) => {
    //     setAllComments(doc.data());
    // });

    const commentQuery = query(collection(db, "posts", postInfo.postId , "comments") , orderBy("postedOn"))

    onSnapshot(commentQuery, (snapShot) => {
      setAllComments(snapShot.docs.map((docs) => docs.data()));
      console.log("Rung", allComments)
    })
    }

  }, [likesArr ,userInfo.userID])

  const likedPost = () => {
    if (postInfo) {
      const postRef = doc(db, "posts", postInfo.postId);
      if (liked) {
        updateDoc(postRef, {
          likes: arrayRemove(userInfo.userID)
        })
      }
      else {
        updateDoc(postRef, {
          likes: arrayUnion(userInfo.userID)
        })
      }
    }
  }

  const addComment = () => {
    setEmojiDiv(false)
    const d = new Date()
    const date = d.toDateString();
    let hours = d.getHours();
    let min = d.getMinutes();
    let period = 'AM';
    if (hours > 11) {
      period = 'PM';
      if (hours > 12) hours -= 12
    }
    if (min < 10) {
      min = `0${min}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    const postedTime = `${date} ${hours}:${min} ${period}`
    console.log(postedTime)
    const postedOn = d.getTime();
    addDoc(collection(db, "posts", postInfo.postId , "comments"), {
      comment,
      postedOn,
      postedTime,
      postedBy: userInfo.userID,
    }).then(()=>{
      setComment("")
    })
  }

  return (
    <>
      {(postInfo && postInfo.likes) && (
        <>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {postInfo.postCaption}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon onClick={likedPost} style={{ color: liked ? "#d33838" : "#757575" }} />
              <Typography >{postInfo.likes.length}</Typography>
            </IconButton>
            <IconButton aria-label="share">
              <Typography >Share</Typography>
              <ShareIcon />
            </IconButton>
            <ExpandMore
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <MessageIcon style={{ color: expanded ? "#1976d2" : "" }} />
              <Typography >{allComments.length}</Typography>
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent >
              <div style={{ display: "flex", alignItems: "center", margin: "10px 0px" }}>
                <MessageIcon style={{ color: "#1976d2", fontSize: "32px" }} />
                <input
                  value={comment}
                  type="text"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="whats"
                  placeholder="Write Your Comment Here ....."
                />
                <InsertEmoticonIcon style={{ color: "#cdc35c", fontSize: "32px", cursor: "pointer" }} onClick={showEmoji}/>
                <ArrowCircleRightRoundedIcon style={{ color: "#1976d2", fontSize: "32px", cursor: "pointer" }} onClick={addComment} />

              </div>
              <div>
              
   {emojiDiv && (
          <Picker style={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
              </div>

              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                {allComments.map((e,index)=>(
                  <CommentsCard key={index} comment={e.comment} id={e.postedBy}/>
                ))}
              </div>

            </CardContent>
          </Collapse>
        </>
      )}
    </>
  );
}
