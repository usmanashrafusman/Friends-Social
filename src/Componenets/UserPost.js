import React, { useState, useLayoutEffect, useEffect, createContext } from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './FirebaseConfig';
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import { useParams } from 'react-router';
import CardFooter from './CardFoot'


const Info = createContext();

export default function UserPost(props) {

  const {docID} = useParams;
  console.log(docID)
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    const { userID } = props.Info;
    if (userID) {
      console.log("Running")
      const q = query(collection(db, "posts"), where("postedBy", "==", userID), orderBy("postedOn", 'desc'));
      onSnapshot(q, (snapShot) =>
        setUserPost(snapShot.docs.map((doc) => doc.data()))
      )
    }
  }, [props.Info])

  return (
    <>
      {userPost.map((e, index) => (
        <Card className="wid" key={index}>
          <CardHeader
            name={props.Info.firstName + " " + props.Info.lastName}
            time={e.dateString + " " + e.timeString}
            src={props.Info.userPhoto}
          />
          {e.postPicture !== "false" && (
            <CardMain src={e.postPicture} />
          )}
        <Info.Provider  key={index} value={e}>
          <CardFooter />
        </Info.Provider>
        </Card>
      ))}

    </>
  )
}


export {Info}