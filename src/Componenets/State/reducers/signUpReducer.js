import { app, db, storage, auth } from "../../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

const reducer = (state = 0 , action) => {

  if (action.type === "signup") {
    createUserWithEmailAndPassword(
      auth,
      action.user.email,
      action.user.password
    )
      .then((userCredential) => {
        alert("Your Account Is Created");
        const user = userCredential.user;
        const uid = user.uid;
        let d = new Date();
        let t = d.getTime();
        let files = action.inputRef.current.files[0];
        const storageRef = ref(storage, `/${uid}/${t}`);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            alert("An Error Occured During Uploading Your Picture");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              let userPhoto = downloadURL;
              let obj = {...action.user}
              let fullName = obj.firstName.toLowerCase()+obj.lastName.toLowerCase();
              setDoc(doc(db, "Accounts", uid), {
                ...obj,
                userPhoto,
                fullName,
                userID : uid
              });

              action.navigate("/home");
            });
          }
        );
      })
      .catch((error) => {
       
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
    return state;
  } else {
    return state;
  }
};

export default reducer;
