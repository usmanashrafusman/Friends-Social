import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from './FirebaseConfig';
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Collapse from '@mui/material/Collapse';
import MessageIcon from '@mui/icons-material/Message';
import CommentsCard from './CommentsCard'
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { UserInfo } from '../App'
import { setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {Info} from './PostDiv'


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

export default function PostCard(props) {
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const userInfo = useContext(UserInfo)
    const postInfo = useContext(Info)
    const [comment, setComment] = useState("")
    const [expanded, setExpanded] = useState(false);
    const [userPost, setUserPost] = useState([]);
  

    // const { dateString, postCaption, postPicture, timeString, likes, postId } = props.Info;

    // const addComment = () => {
    //     const d = new Date()
    //     const date = d.toDateString();
    //     let hours = d.getHours();
    //     let min = d.getMinutes();
    //     let period = 'AM';
    //     if (hours > 11) {
    //         period = 'PM';
    //         if (hours > 12) hours -= 12
    //     }
    //     if (min < 10) {
    //         min = `0${min}`;
    //     }
    //     if (hours < 10) {
    //         hours = `0${hours}`;
    //     }
    //     const postedTime = `${date} ${hours}:${min} ${period}`
    //     console.log(postedTime)
    //     const postedOn = d.getTime();
    //     setDoc(doc(db, "posts", postId), {
    //         comment: "dfasd",
    //         postedOn,
    //         postedTime,
    //         postedBy: userInfo.userID,
    //     });
    // }

    // const likedPost = () => {

    //     if (postId) {
    //         const postRef = doc(db, "posts", postId);
    //         if (liked) {
    //             updateDoc(postRef, {
    //                 likes: arrayRemove(userInfo.userID)
    //             })
    //         }
    //         else {
    //             updateDoc(postRef, {
    //                 likes: arrayUnion(userInfo.userID)
    //             })
    //         }
    //     }
    // }

    useEffect(() => {
        // const { postedBy } = props.Info;
        if (postInfo.postedBy) {
            console.log("Running")
            const nameRef = doc(db, "Accounts", postInfo.postedBy);

            onSnapshot(doc(db, "Accounts", postInfo.postedBy), (doc) => {
                setUserPost(doc.data());
            });
        }
    }, [props.postInfo])

    // useEffect(() => {
    //     if (likes) {
    //         setLiked(likes.includes(userInfo.userID))
    //     }
    // }, [props.Info])

    return (
        <>

            {(userPost && (
                <Card className="wid">
                    <CardHeader
                        name={userPost.firstName + " " + userPost.lastName}
                        time={postInfo.dateString + " " + postInfo.timeString}
                        src={userPost.userPhoto}
                    />
                    {postInfo.postPicture !== "false" && (
                        <CardMain src={postInfo.postPicture} />
                    )}

                    {/* <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {postCaption}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon onClick={likedPost} style={{ color: liked ? "red" : "" }} />
                            <Typography >{props.Info.likes.length}</Typography>
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
                            <Typography >12 </Typography>
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
                                <InsertEmoticonIcon style={{ color: "#cdc35c", fontSize: "32px", cursor: "pointer" }} />
                                <ArrowCircleRightRoundedIcon style={{ color: "#1976d2", fontSize: "32px", cursor: "pointer" }} onClick={addComment} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                                <CommentsCard comment="Comment 1" name="Muhammad Usman" src="https://pbs.twimg.com/profile_images/1166471091663122433/5ULjGFJS_400x400.jpg" />
                                <CommentsCard comment="Comment 2" name="Muhammad Usman" src="https://pbs.twimg.com/profile_images/1166471091663122433/5ULjGFJS_400x400.jpg" />
                                <CommentsCard comment="Comment 3" name="Muhammad Usman" src="https://pbs.twimg.com/profile_images/1166471091663122433/5ULjGFJS_400x400.jpg" />
                            </div>

                        </CardContent>
                    </Collapse> */}




{/* caption={postCaption} like={likes} id={postId} */}

                    <CardFooter/>
                </Card>
            ))}
        </>
    )
}
