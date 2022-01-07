import React, {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { collection , onSnapshot,doc} from "firebase/firestore";
import {db} from './FirebaseConfig'


export default function CardHead(props) {
const [commentUser,setCommentUser]= useState({});

useEffect(() => {
    const id = props.id;
    if(id){
        const commentBy = doc(db, "Accounts" , id,);
        onSnapshot(commentBy, (doc) => {
            setCommentUser(doc.data());
        })
    }
  }, [props.id])








  

    return (
        <>
       {commentUser !== {} &&     
      (  <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <Avatar alt={commentUser.firstName} src={commentUser.userPhoto} />
                </div>
                <div className="comment">
                    <Typography style={{ textAlign: "start", fontWeight: 550, fontSize: "14px" }}>{`${commentUser.firstName} ${commentUser.lastName}`}</Typography>
                    <Typography style={{ textAlign: "start", fontSize: "15px" }}>{props.comment}</Typography>
                </div>
            </div>)
        }
        </>
    );
}
