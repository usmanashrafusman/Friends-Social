import React, { useState, useRef } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  showUser,
} from "./Functions";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SuggestUsers from "./SuggestUsers";
import { db } from "./FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SearchBar() {
  const inputed = useRef(null);

  const [searchedResult, setSearchedResult] = useState([]);

  const showResults = async () => {
    setSearchedResult([]);
    let queryS = inputed.current.children[0].value;
    queryS = queryS.split(" ").join("").toLowerCase();
    setSearchedResult([]);
    const q = query(
      collection(db, "Accounts"),
      where("fullName", ">=", queryS),
      where("fullName", "<=", queryS + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    setSearchedResult([]);
    querySnapshot.forEach((doc) => {
      setSearchedResult((val) => [...val, doc.data()]);
    });

    if (queryS.length === 0) {
      setSearchedResult([]);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            ref={inputed}
            onChange={() => {
              setSearchedResult([]);
              showResults();
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <div className="Results" spacing={2} sx={{ width: 300 }}>
            {searchedResult.map((e, index) => {
              return (
                <SuggestUsers
                  show={() => {
                    showUser(e.userID, navigate);
                  }}
                  set={() => {
                    setSearchedResult([]);
                  }}
                  key={index}
                  src={e.userPhoto}
                  name={e.firstName + " " + e.lastName}
                />
              );
            })}
          </div>
        </Search>
      </Stack>
    </>
  );
}
