import React, { useState, useRef } from 'react'
import { db, storage } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Button from "@mui/material/Button";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
    display: "none"
});

export default function ProfileCover(props) {

    const [updateUserPic, setupdateUserPic] = useState(null);
    const picRef = useRef(null);

    const updateImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setupdateUserPic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const updateuserPicture = () => {
        let file = picRef.current.files[0];
        let date = new Date();
        let time = date.getTime().toString();
        if (file) {
            console.log(file);
            const storageRef = ref(storage, `/${props.Info.userID}/${time}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progress.toString();
                },
                (error) => {
                    alert("An Error Occured During Uploading Your Picture");
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        let postPicture = downloadURL;
                        const ref = doc(db, "Accounts", props.Info.userID);
                        updateDoc(ref, {
                            userPhoto: postPicture
                        });

                        alert("Your Profile Picture Is Updated");
                        setupdateUserPic(null);
                    });
                }
            );
        } else {
            alert("Please Select Pictrue To Update");
            setupdateUserPic(null);
        }
    };

    return (
        <>
            <div className="cover">
                <div className="coverDiv">
                    <img
                        alt={props.Info.firstName}
                        className="coverPic"
                        src="https://assets.unenvironment.org/styles/article_billboard_image/s3/2021-05/alberta-2297204_1920.jpg?h=1483c54f&amp;itok=GdjA9GRu"
                    />
                    <div className="userPicDiv">
                        <img
                            className="userPic"
                            src={updateUserPic ? updateUserPic : props.Info.userPhoto}
                            alt={props.Info.firstName}
                            type="button"
                        />
                        {props.isUser && (
                            <Stack
                                className="updatePic"
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <label htmlFor="contained-button-file">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        ref={picRef}
                                        name="userPhoto"
                                        onChange={(e) => {
                                            updateImage(e);
                                        }}
                                    />
                                    <PhotoLibraryIcon className="updatePicIco" />
                                </label>
                            </Stack>
                        )}
                        {props.isUser && (
                            <>
                                {updateUserPic !== null && (
                                    <div>
                                        <Button
                                            style={{ margin: "5px auto", display: "flex" }}
                                            variant="contained"
                                            color="primary"
                                            onClick={updateuserPicture}
                                        >
                                            <ArrowUpwardIcon />
                                        </Button>

                                        <Button
                                            style={{
                                                margin: "5px auto",
                                                display: "flex",
                                                background: "red"
                                            }}
                                            variant="contained"
                                            onClick={() => {
                                                setupdateUserPic(null);
                                            }}
                                        >
                                            X
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}
