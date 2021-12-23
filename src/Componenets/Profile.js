import React, {useState,useLayoutEffect} from 'react'
import { db } from './FirebaseConfig';
import { doc, onSnapshot, collection } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";



export default function Profile() {
      const {docID} = useParams();
    const [currentUer , setCrrentUser] = useState("")
    const [userPost , setUserPost] = useState([])

    useLayoutEffect(() => {

        // console.log(docID)
        onSnapshot(doc(db, "Accounts", docID), (doc) => {
            setCrrentUser(doc.data())
            // console.log("Current data: ", doc.data());
        });

        onSnapshot(collection(db, "Accounts", docID, "post"), (snapShot) =>
        setUserPost(snapShot.docs.map((doc) => doc.data()))
      );
      
    }, [docID])





    return (

<div className='userNav'>
  
    <img className='userPic' src={currentUer.userPhoto} alt={currentUer.firstName}/>
  
 
    <p>{currentUer.firstName + " " + currentUer.lastName}
    <br/>
    <span className='gen'>{currentUer.gender}</span>
    </p>
    <p style={{fontSize:"22px"}}>Email : <span style={{color: "#4083c5" , fontSize:"19px"}}>
          {currentUer.email}</span> </p>


         <div className="allPost">

          {userPost.map((e, index) => (
            <Card className="wd-80" key={index}>
              <CardHeader
                name={currentUer.firstName + " " + currentUer.lastName}
                time={e.dateString + " " + e.timeString}
                src={currentUer.userPhoto}
              />
              {e.postPicture !== "false" && <CardMain src={e.postPicture} />}
              <CardFooter caption={e.postCaption} />
            </Card>
          ))}
        </div>
      
   
</div>

       
    )
}
