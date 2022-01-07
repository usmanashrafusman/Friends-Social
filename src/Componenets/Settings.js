import React, { useState, useLayoutEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { auth, db } from "./FirebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { updatePassword } from "firebase/auth";

export default function ControlledAccordions() {
  const [userInfo, setUserInfo] = useState({});
  const [userID, setUserID] = useState("");

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
        onSnapshot(doc(db, "Accounts", uid), (doc) => {
          setUserInfo(doc.data());
        });
      }
    });
  }, []);

  const updateNewPassword = () => {
    const user = auth.currentUser;
    let newPassword = userUpdateVal.password;
    updatePassword(user, userUpdateVal.password)
      .then(() => {
        const updateRef = doc(db, "Accounts", userID);
        updateDoc(updateRef, {
          password: newPassword
        }).then(() => {
          alert("Password Is Updated");
          setUpdateUser({ ...updateUser, password: false });
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updateProvidedData = (id, val) => {
    if (id === "password") {
      updateNewPassword();
    } else {
      if (id === "email") {
        let val = userUpdateVal.email;
        if (val !== userInfo.email && val !== "") {
          updateEmail(auth.currentUser, val)
            .then(() => {
              const updateRef = doc(db, "Accounts", userID);
              updateDoc(updateRef, {
                email: val
              }).then(() => {
                alert("Email Is Upadated");
              });
            })
            .catch((error) => {
              alert(error.message);
            });
          setUpdateUser({ ...updateUser, [id]: false });
        } else {
          if (val === userInfo.email) {
            setUpdateUser({ ...updateUser, [id]: false });
            alert("Please Provide Differnt Email To Update");
          } else if (val === "") {
            setUpdateUser({ ...updateUser, [id]: false });
            alert("Please Provide Email To Update");
          }
        }
      } else if (val.length >= 2 && val !== userInfo[id]) {
        const updateRef = doc(db, "Accounts", userInfo.userID);
        updateDoc(updateRef, {
          [id]: val
        }).then(() => {
          alert("Update Sucessfully");
        });
        setUpdateUser({ ...updateUser, [id]: false });
      } else {
        setUpdateUser({ ...updateUser, [id]: false });
      }
    }
  };

  const [updateUser, setUpdateUser] = useState({
    firstName: false,
    lastName: false,
    Email: false,
    gender: false
  });

  const [userUpdateVal, setUserUpdateVal] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    gender: ""
  });

  const dataRow = (id) => {
    if (!updateUser[id]) {
      return (
        <Typography sx={{ color: "text.secondary" }}>{userInfo[id]}</Typography>
      );
    } else {
      if (id !== "gender") {
        return (
          <TextField
            value={userUpdateVal[id]}
            onChange={(e) => {
              setUserUpdateVal({ ...userUpdateVal, [id]: e.target.value });
            }}
          />
        );
      }
      if (id === "gender") {
        return (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userUpdateVal[id]}
                label="Gender"
                onChange={(e) => {
                  setUserUpdateVal({ ...userUpdateVal, [id]: e.target.value });
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      }
    }
  };

  const dataRowPass = (id) => {
    // setUserUpdateVal({ ...userUpdateVal, [id]: "" });
    let star = "";
    if (!updateUser[id]) {
      if (userInfo[id]) {
        let enc = userInfo[id].length;

        for (let i = 0; i < enc; i++) {
          star += "*";
        }
      }

      return <Typography sx={{ color: "text.secondary" }}>{star}</Typography>;
    } else {
      return (
        <TextField
          // type="password"
          value={userUpdateVal[id] ? userUpdateVal[id] : ""}
          onChange={(e) => {
            setUserUpdateVal({ ...userUpdateVal, [id]: e.target.value });
          }}
        />
      );
    }
  };

  const icon = (id) => {
    if (updateUser[id]) {
      return (
        // <ArrowDownwardIcon
        //   id="firstName"
        //   onClick={() => {
        //     updateProvidedData(id, userUpdateVal[id]);
        //   }}
        // />
        <i
          class="fas fa-arrow-up"
          onClick={() => {
            updateProvidedData(id, userUpdateVal[id]);
          }}
        ></i>
      );
    } else {
      return (
        // <EditIcon
        //   onClick={() => {
        //     setUpdateUser({ ...updateUser, [id]: true });
        //   }}
        // />
        <i
          class="fas fa-pencil-alt pencil"
          onClick={() => {
            setUpdateUser({ ...updateUser, [id]: true });
          }}
        ></i>
      );
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {userInfo !== {} && (
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={icon("firstName")}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                First Name
              </Typography>
              {dataRow("firstName")}
            </AccordionSummary>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={icon("lastName")}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Last Name
              </Typography>
              {dataRow("lastName")}
            </AccordionSummary>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={icon("email")}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Email
              </Typography>
              {dataRow("email")}
            </AccordionSummary>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={icon("password")}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Password
              </Typography>

              {dataRowPass("password")}
            </AccordionSummary>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={icon("gender")}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Gender
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {dataRow("gender")}
              </Typography>
            </AccordionSummary>
          </Accordion>
        </div>
      )}
    </>
  );
}
