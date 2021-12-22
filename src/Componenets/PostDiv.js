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

export default function PostDiv() {
    const [post, setPost] = useState([]);
    
 



    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
       
          const uid = user.uid;
          console.log(uid)
          onSnapshot(collection(db, "Accounts", uid, "post"), (snapShot) =>
          setPost(snapShot.docs.map((doc) => doc.data()))
        );
  
        } else {
          console.log("NOT FOdUND")
        }
      });


    }, [])
    const userInfo = {
        firstName:"A",
        lastName:"B",
        userPhoto:"C",
      
    }

    


    return (
        <div className="allPost" style={{marginLeft : "75px"}}>
        {post.map((e, index) => (
          <Card sx={{ maxWidth: 345 }} key={index}>
            <CardHeader
              name={userInfo.firstName + " " + userInfo.lastName}
              time={e.dateString + " " + e.timeString}
              src={userInfo.userPhoto}
            />
            {e.postPicture !== "false" && (
              <CardMain src={e.postPicture} />
            )}
            <CardFooter caption={e.postCaption} />
          </Card>
        ))}
      </div>
    )
}



