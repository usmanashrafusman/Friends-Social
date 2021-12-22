import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  query,
  where,
  updateDoc,
  getDocs, 
  orderBy, 
  startAt
} from "firebase/firestore";
import { app, db, auth, storage } from "./FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

//// Mini Drawer Functions
export const gettingUserInfo = (setUserInfo) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user)
      onSnapshot(doc(db, "Accounts", uid), (doc) => {
        setUserInfo(doc.data())
      })
    }
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(collection(db, "Accounts"), (snapShot) =>
    setAllUsers(snapShot.docs.map((doc) => doc.data()))
  );
};

export const Input = styled("input")({
  display: "none",
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const drawerWidth = 240;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const searchResult =async (
  inputSearch,
  setSearchedResult,
  searchedResult
) => {
  const q = query(
    collection(db, "Accounts"),
    where('fullName', '>=', inputSearch),where('fullName', '<=', inputSearch+ "\uf8ff")
  );
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setSearchedResult((val) => [...val, doc.data()]);
    console.log(doc.id, " => ", doc.data());
});
  // doc.data() is never undefined for query doc snapshots
    // result.push(doc.data())
    // console.log(result)
// onSnapshot(q, (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       setSearchedResult((val) => [...val, doc.data()]);
//     });
//     console.log("Current cities in CA: ", searchedResult);
//   });



//     const q = query(
//     collection(db, "Accounts"),
//     where("nameOfuser", "array-contains", inputSearch)
//   );
  

// onSnapshot(q, (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       setSearchedResult((val) => [...val, doc.data()]);
//     });
//     console.log("Current cities in CA: ", searchedResult);
//   });

  // const q = query(
  //   collection(db, "Accounts"),
  //   where("fullName", ">=", inputSearch),
  //   where("fullName", "<=", inputSearch + "uf8ff")
  // );
  // const q2 = query(
  //   collection(db, "Accounts"),
  //   where("lastName", ">=", inputSearch),
  //   where("lastName", "<=", inputSearch + "uf8ff")
  // );
  // const q2 = query(collection(db, "Accounts"), where("lastName", "==", inputSearch))
  // const q3 = query(collection(db, "Accounts"), where("email", "==", inputSearch))
  // const result = [];
  // onSnapshot(q, (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     setSearchedResult((preValue) => [...preValue, doc.data()]);
  //   });
  //   console.log("Current cities in CA: ", searchedResult);
  // });
  // onSnapshot(q2, (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     setSearchedResult((preValue) => [...preValue, doc.data()]);
  //   });
  //   console.log("Current cities in CA: ", searchedResult);
  // });
  // onSnapshot(q2, (querySnapshot) => {

  //   querySnapshot.forEach((doc) => {
  //     setSearchedResult((preValue)=>[...preValue, doc.data()])

  //   });
  //   console.log("Current cities in CA: ", result);
  // });

  // onSnapshot(q3, (querySnapshot) => {

  //   querySnapshot.forEach((doc) => {
  //     setSearchedResult((preValue)=>[...preValue, doc.data()])
  //   });
  //   console.log("Current cities in CA: ", result);
  // });

};

export const showUser = (id, navigate) =>{

  navigate(`/profile/${id}`)


}








//// Mini Drawer Functions