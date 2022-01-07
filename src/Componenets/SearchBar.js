import React, { useState, useContext, useEffect } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  showUser
} from "./Functions";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SuggestUsers from "./SuggestUsers";
import { db } from "./FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserInfo } from "../App";
import LoadingGif from "../Componenets/Images/giphy.gif";

export default function SearchBar() {
  const userInfo = useContext(UserInfo);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);

  useEffect(() => {
    const getSearchRes = async () => {
      let queryS = searchQuery;
      queryS = queryS.split(" ").join("").toLowerCase();
      const q = query(
        collection(db, "Accounts"),
        where("fullName", ">=", queryS),
        where("fullName", "<=", queryS + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      setSearchedResult([]);
      querySnapshot.forEach((doc) => {
        if (doc.data().userID !== userInfo.userID) {
          setSearchedResult((val) => [...val, doc.data()]);
        }
      });

      if (queryS.length === 0) {
        setSearchedResult([]);
      }
    };
    getSearchRes();
  }, [searchQuery, userInfo.userID]);

  const navigate = useNavigate();

  return (
    <>
      <Stack spacing={2} sx={{ width: 250 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchQuery}
            placeholder="Search…"
            // onFocus={searchOnFocus}
            onChange={(e) => {
              setSearchedResult([]);
              // showResults();
              setSearchQuery(e.target.value);
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <div className="Results" spacing={2} sx={{ width: 250 }}>
            {searchQuery !== "" && (
              <>
                {searchedResult.length === 0 ? (
                  <>
                    <div className="userCl">
                      <img
                        style={{ width: "100%", height: "220px" }}
                        src={LoadingGif}
                        alt="No Results Found"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {searchedResult.map((e, index) => {
                      return (
                        <SuggestUsers
                          show={() => {
                            showUser(e.userID, navigate);
                          }}
                          set={() => {
                            setSearchedResult([]);
                            setSearchQuery("");
                          }}
                          key={index}
                          src={e.userPhoto}
                          name={e.firstName + " " + e.lastName}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </Search>
      </Stack>
    </>
  );
}
