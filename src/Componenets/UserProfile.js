import React, { useState, useLayoutEffect, useContext , createContext } from "react";
import { db } from "./FirebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import StatusBar from "./StatusBar";
import LeftSideBar from "./LeftSideBar";
import MenuBar from "./MenuBar";
import { UserInfo } from "../App";
import { useParams } from "react-router-dom";
import UserPost from "./UserPost";
import ProfileCover from "./ProfileCover";
import ProfileInfo from "./ProfileInfo";

const Info = createContext()

export default function TransitionsPopper() {
  const { docID } = useParams();
  const userData = useContext(UserInfo);
  const [userInfo, setUserInfo] = useState({});
  const [isUser, setIsUser] = useState(false);

  useLayoutEffect(() => {
    if (docID === userData.userID) {
      setUserInfo(userData);
      setIsUser(true);
    } else {
      setIsUser(false);
      onSnapshot(doc(db, "Accounts", docID), (doc) => {
        setUserInfo(doc.data());
      });
    }
  }, [docID, userData.userID]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <LeftSideBar />
        {userInfo !== null && (
          <>
            <div className="userNav">
              <MenuBar />
              <ProfileCover Info={userInfo} isUser={isUser} />
              <ProfileInfo Info={userInfo} />
              {isUser && <StatusBar />}
              <div className="allPost">
                <UserPost Info={userInfo} />
              </div>
            </div>
          </>
        )}
        <LeftSideBar />
      </div>
    </>
  );
}
