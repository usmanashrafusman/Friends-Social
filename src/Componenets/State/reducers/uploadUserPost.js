import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../FirebaseConfig";

const reducer = (state = 0, action) => {
  if (action.type === "uploadUserPost") {
    let postCaption = action.caption;
    let postPic = action.files.current.files[0];
    let date = new Date();
    let dateString = date.toDateString();
    let timeString = date.toTimeString();
    let time = date.getTime().toString();
    if (postPic) {
      const storageRef = ref(storage, `/${action.uid}/${time}`);
      const uploadTask = uploadBytesResumable(storageRef, postPic);

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
            setDoc(doc(db, "Accounts", action.uid, "post", time), {
              postPicture,
              postCaption,
              dateString,
              timeString,
            });
          });
        }
      );
    } else {
      setDoc(doc(db, "Accounts", action.uid, "post", time), {
        postPicture: "false",
        postCaption,
        dateString,
        timeString,
      });
    }

    return state;
  } else {
    return state;
  }
};

export default reducer;
