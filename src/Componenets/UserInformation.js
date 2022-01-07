import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { updateEmail } from "firebase/auth";
import { auth, db } from "./FirebaseConfig";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Avatar from "@mui/material/Avatar";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "./MiniDrawer";

export default function UserInformation(props) {
  const userInfo = useContext(User);
  const uid = userInfo.userID;

  const [userUpdate, setUserUpdate] = useState({
    firstName: false,
    lastName: false,
    email: false,
    gender: false
  });

  const edit = (val) => {
    if (!userUpdate.firstName) {
      return (
        <>
          <span className="span">{val}</span>
          <EditRoundedIcon
            onClick={() => {
              setUserUpdate({ ...userUpdate, firstName: true });
            }}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          />
        </>
      );
    } else if (userUpdate.firstName) {
      return (
        <>
          <input
            type="text"
            className="edit"
            onChange={(e) => {
              setUserUpdatedFields({
                ...userUpdatedFields,
                firstName: e.target.value
              });
            }}
          />
          <UpgradeIcon
            id="firstName"
            onClick={(e) => {
              setUserUpdate({ ...userUpdate, firstName: false });
              updateProvidedData(e, userUpdatedFields.firstName, userInfo, uid);
            }}
          />
        </>
      );
    }
  };

  const editLastName = (val) => {
    if (!userUpdate.lastName) {
      return (
        <>
          <span>{val}</span>

          <EditRoundedIcon
            onClick={() => {
              setUserUpdate({ ...userUpdate, lastName: true });
            }}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          />
        </>
      );
    } else if (userUpdate.lastName) {
      return (
        <>
          <input
            type="text"
            className="edit"
            onChange={(e) => {
              setUserUpdatedFields({
                ...userUpdatedFields,
                lastName: e.target.value
              });
            }}
          />
          <UpgradeIcon
            id="lastName"
            onClick={(e) => {
              setUserUpdate({ ...userUpdate, lastName: false });
              updateProvidedData(e, userUpdatedFields.lastName, userInfo, uid);
            }}
          />
        </>
      );
    }
  };

  const editEmail = (val) => {
    if (!userUpdate.email) {
      return (
        <>
          <span>{val}</span>
          <EditRoundedIcon
            onClick={() => {
              setUserUpdate({ ...userUpdate, email: true });
            }}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          />
        </>
      );
    } else if (userUpdate.email) {
      return (
        <>
          <input
            type="email"
            className="edit"
            onChange={(e) => {
              setUserUpdatedFields({
                ...userUpdatedFields,
                email: e.target.value
              });
            }}
          />
          <UpgradeIcon
            id="email"
            onClick={(e) => {
              setUserUpdate({ ...userUpdate, email: false });
              editUserEmail(e, userUpdatedFields.email);
            }}
          />
        </>
      );
    }
  };

  const editGender = (val) => {
    if (!userUpdate.gender) {
      return (
        <>
          <span>{val}</span>
          <EditRoundedIcon
            onClick={() => {
              setUserUpdate({ ...userUpdate, gender: true });
            }}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          />
        </>
      );
    } else if (userUpdate.gender) {
      return (
        <>
          <select
            className="edit"
            id="gender"
            onChange={(e) => {
              setUserUpdatedFields({
                ...userUpdatedFields,
                gender: e.target.value
              });
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <UpgradeIcon
            id="gender"
            onClick={(e) => {
              setUserUpdate({ ...userUpdate, gender: false });
              updateProvidedData(e, userUpdatedFields.gender, userInfo, uid);
            }}
          />
        </>
      );
    }
  };

  const editUserEmail = (e, val) => {
    updateEmail(auth.currentUser, val)
      .then(() => {
        const updateRef = doc(db, "Accounts", uid);
        updateDoc(updateRef, {
          email: val
        }).then(() => {
          alert("Email Is Upadated");
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updateProvidedData = (e, val, userInfo, uid) => {
    if (val.length >= 2 && val != userInfo[e.target.id]) {
      const updateRef = doc(db, "Accounts", uid);
      updateDoc(updateRef, {
        [e.target.id]: val
      }).then(() => {
        alert("Update Sucessfully");
      });
    }
  };

  const [userUpdatedFields, setUserUpdatedFields] = useState({});

  const dispatch = useDispatch();

  const { userPOP } = bindActionCreators(actionCreators, dispatch);
  const userPOPDiv = useSelector((state) => state.userPOP);

  return (
    <>
      {userPOPDiv && (
        <div className="userDiv">
          <div className="userInfo">
            <input
              onClick={userPOP}
              type="button"
              value="X"
              className="input"
            />
            <Avatar
              alt="Trevor Henderson"
              style={{ left: "80%" }}
              src={userInfo.userPhoto}
              style={{ left: "0%", height: "60px", width: "60px" }}
            />
            <div className="user">
              <p>First Name : {edit(userInfo.firstName)}</p>
              <p>Last Name : {editLastName(userInfo.lastName)}</p>
              <p>Email : {editEmail(userInfo.email)} </p>
              <p>Gender : {editGender(userInfo.gender)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
