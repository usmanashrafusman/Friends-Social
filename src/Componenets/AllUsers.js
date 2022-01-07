import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(collection(db, "Accounts"), (snapShot) =>
          setAllUsers(snapShot.docs.map((doc) => doc.data()))
        );
      }
    });
  }, []);

  return (
    <div className="container">
    <p className="people">Peoples you may know</p>
      {allUsers.map((e, index) => (
          <CardHeader
          key={index}
          avatar={<Avatar alt={e.firstName} src={e.userPhoto} />}
          title={e.firstName + " " + e.lastName}/>
      ))}
    </div>
  );
}
