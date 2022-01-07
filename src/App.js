import "./App.css";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Provider } from "react-redux";
import { store } from "./Componenets/State/store";
import PostDiv from "./Componenets/PostDiv";
import AllUsers from "./Componenets/AllUsers";
import Settings from "./Componenets/Settings";
import UserProfile from "./Componenets/UserProfile";
import { useState, createContext, useLayoutEffect } from "react";
import { auth, db } from "./Componenets/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

const UserInfo = createContext();

function App() {
  const [userData, setUserData] = useState({});

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        onSnapshot(doc(db, "Accounts", uid), (doc) => {
          setUserData(doc.data());
        });
      }
    });
  }, []);

  console.log(userData);

  return (
    <Provider store={store}>
      <UserInfo.Provider value={userData}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />

            <Route exact path="/signup" element={<SignUp />} />

            <Route
              exact
              path="/home"
              element={
                <>
                  <Home />
                  <PostDiv />
                </>
              }
            />

            <Route
              exact
              path="/post"
              element={
                <>
                  <Home />
                  <PostDiv />
                </>
              }
            />

            <Route
              exact
              path="/users"
              element={
                <>
                  <Home />
                  <AllUsers />
                </>
              }
            />

            <Route
              exact
              path="/user"
              element={
                <>
                  <Home />
                  <UserProfile />
                </>
              }
            />

            <Route
              exact
              path="/setting"
              element={
                <>
                  <Home />
                  <Settings />
                </>
              }
            />

            <Route
              path="/profile/:docID"
              element={
                <>
                  <Home />
                  <UserProfile />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserInfo.Provider>
    </Provider>
  );
}

export default App;
export { UserInfo };
