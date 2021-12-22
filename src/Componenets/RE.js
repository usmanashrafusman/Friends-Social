<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
<DrawerHeader />
<UserInformation />
<PostForm/>

<div className="container">
  {/* {friendsDiv && (
    <>
      {allUsers.map((e, index) => (
        <CardHeader
          key={index}
          src={e.userPhoto}
          name={e.firstName + " " + e.lastName}
        />
      ))}
    </>
  )}

  {mainPage && <div className="allPost">
  {post.map((e, index) => (
    <Card sx={{ maxWidth: 345 }} key={index}>
      <CardHeader
        name={userInfo.firstName + " " + userInfo.lastName}
        time={e.dateString + " " + e.timeString}
        src={userInfo.userPhoto}
      />
      {e.postPicture !== "false" && <CardMain src={e.postPicture} />}
      <CardFooter caption={e.postCaption} />
    </Card>
  ))}







</div>} */}
</div>

<Profile/>
</Box>


{/* <Stack spacing={2} sx={{ width: 300 }}>
<Search>
  <SearchIconWrapper>
    <SearchIcon />
  </SearchIconWrapper>
  <StyledInputBase
    placeholder="Search…"
    value={inputSearch}
    onChange={(e) => {
      setInputSearch(e.target.value);
      console.log(e.target.value);
      setSearchedResult([]);
      // searchResult(inputSearch, setSearchedResult, searchedResult);
    }}
    inputProps={{ "aria-label": "search" }}
  />
    <div className="Results">
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
<button
  onClick={() => {
    setSearchedResult([]);
    searchResult(inputSearch, setSearchedResult, searchedResult);
  }}
>
  Show Result
</button>
</Stack> */}


  // useEffect(() => {
  //   getAllUsers(setAllUsers);
  // }, []);

  // const [uid, setUID] = useState("");
  // const [mainPage, setMainPage] = useState(true);
  // const [friendsDiv, setFriendsDiv] = useState(false);
  // const [userDiv, setUserDiv] = useState(false);
  // const [postDiv, setPostDiv] = useState(false);
  // const [allUsers, setAllUsers] = useState([]);
    // const [post, setPost] = useState([]);

    <EditIcon 
            onClick={()=>{setUpdateUser({firstName:true}); console.log("A")}}
          />