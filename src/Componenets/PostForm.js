import React, { useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { User } from "./MiniDrawer";
import { Input } from "./Functions";

export default function PostForm() {
  const userInfo = useContext(User);
  const uid = userInfo.userID;
  const dispatch = useDispatch();
  const { postFromReducer, uploadUserPost } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [caption, setCaption] = useState("");

  const UploadPost = () => {
    setCaption("")
    if (caption.length >= 1) {
      uploadUserPost(caption, files, uid);
      postFromReducer(false);
    } else {
      alert("Please Fill Caption To Post");
    }
  };

  const files = useRef("");

  const postDiv = useSelector((state) => state.postFromReducer);

  const onPost = () => {
    if (postDiv) {
      postFromReducer(false);
    }
  };

  return (
    <>
      {postDiv && (
        <div className="postDiv">
          <div className="postMain">
            <input type="button" value="X" className="input" onClick={onPost} />
            <TextField
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              id="caption"
              placeholder="Enter Your Caption Here"
              label="Caption"
              multiline
              style={{ width: "80%", margin: "20px" }}
              maxRows={20}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  ref={files}
                  id="contained-button-file"
                  type="file"
                />
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "0px 20px" }}
                >
                  Upload a Picture
                </Button>
              </label>
            </Stack>
            <Stack direction="row" spacing={10} style={{ margin: "20px 0px" }}>
              <Button
                style={{ margin: "0px 20px" }}
                variant="contained"
                color="success"
                onClick={UploadPost}
              >
                Upload A Post
              </Button>
            </Stack>
          </div>
        </div>
      )}
    </>
  );
}
