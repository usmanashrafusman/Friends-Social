import React, { useState, useLayoutEffect, useContext, useEffect , createContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";
import { collection, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { query, where, doc, getDocs, orderBy} from "firebase/firestore";
import StatusBar from "./StatusBar";
import LeftSideBar from "./LeftSideBar";
import MenuBar from "./MenuBar";
import { UserInfo } from "../App";
import PostCard from "./PostCard";

const Info = createContext();

export default function PostDiv() {

  const userInfo = { firstName: "A", lastName: "b", userPhoto: "C" };

  const [post, setPost] = useState([]);
  const [postUser, setPostUser] = useState([]);

  useEffect(() => {

    const postRef = query(collection(db, "posts"), orderBy("postedOn", 'desc'));
    onSnapshot(postRef, (snapShot) => {
      setPost(snapShot.docs.map((docs) => docs.data()));
    })
    // snapShot.docs.map((docs) => {

    //   onSnapshot(userRef, (snapShot) => {
    //     setPostUser(snapShot.docs.map((userDoc) =>userDoc.data()))
    //   });
    //   console.log(postUser)
    // });
    // onSnapshot(postRef, (querySnapshot) => {
    //     const cities = [];
    //     const name = []
    //     querySnapshot.forEach((docs) => {
    //         cities.push(docs.data());
    //         const nameRef = doc(db, "users", docs.data().postedBy);
    //         getDoc(nameRef).then((docSnap) => {
    //           name.push(docSnap.data())
    //           setPostUser((pre)=>[...pre,docSnap.data()])
    //           console.log(cities,name)
    //         });
    //     });
    //   })

    // post.map((e)=>{
    //   const querySnapshot = getDocs(userRef);
    //   querySnapshot.forEach((doc) => {
    //     setPostUser(querySnapshot.docs.map((doc) => doc.data()))
    //     console.log("Running")
    //   }
    //   );
    // })
    // const docSnap = getDoc(userRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    // setPostUser()


  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <LeftSideBar />
        <div className="allPost" style={{ width: "65%" }}>
          <MenuBar />
          <StatusBar />
        {post.map((e,index)=>
        <Info.Provider  key={index} value={e}>
          <PostCard Info = {e}/>
        </Info.Provider>
        )}
        </div>
        <LeftSideBar />
      </div>
    </>
  );
}


export {Info}