import { db, storage, auth } from "../../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const reducer = (state = 0, action) => {
  if (action.type === "signup") {
   
    action.setObj({
      errorFirstName: false,
      errorLastName: false,
      errorGender: false,
      errorEmail: false,
      errorPass: false,
      text: " ",
    });
    let obj = action.setObj;

    if (action.user.firstName.length === 0) {
      action.setObj({
        ...obj,
        errorFirstName: true,
        text: "Please Enter Your First Name",
      });
    } else if (action.user.lastName.length === 0) {
      action.setObj({
        ...obj,
        errorLastName: true,
        text: "Please Enter Your Last Name",
      });
    } else if (action.user.email.length === 0) {
      action.setObj({
        ...obj,
        errorEmail: true,
        text: "Please Enter Your Email",
      });
    } else if (action.user.password.length === 0) {
      action.setObj({
        ...obj,
        errorPass: true,
        text: "Please Enter Your Password",
      });
    } else if (action.user.gender.length === 0) {
      action.setObj({
        ...obj,
        errorGender: true,
        text: "Please Select Your Gender",
      });
    } else {
      action.setLoadingStatus(true)
      createUserWithEmailAndPassword(
        auth,
        action.user.email,
        action.user.password
      )
        .then((userCredential) => {
         
          // alert("Your Account Is Created");
          const user = userCredential.user;
          const uid = user.uid;
          let d = new Date();
          let t = d.getTime();
          let files = action.inputRef.current.files[0];
          if (files) {
            const storageRef = ref(storage, `/${uid}/${t}`);
            const uploadTask = uploadBytesResumable(storageRef, files);

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
                  let userPhoto = downloadURL;
                  let obj = { ...action.user };
                  let fullName =
                    obj.firstName.toLowerCase() + obj.lastName.toLowerCase();
                  setDoc(doc(db, "Accounts", uid), {
                    ...obj,
                    userPhoto,
                    fullName,
                    userID: uid,
                  });
                  action.navigate("/home");
                  action.setLoadingStatus(false)
                });
              }
            );
          } else {
            let obj = { ...action.user };
            let fullName =
              obj.firstName.toLowerCase() + obj.lastName.toLowerCase();
            setDoc(doc(db, "Accounts", uid), {
              ...obj,
              userPhoto:
                "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
              fullName,
              userID: uid,
            }).then(() => {
              action.navigate("/home");
              action.setLoadingStatus(false)
            });
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          action.setLoadingStatus(false)
          if (errorMessage === "Firebase: Error (auth/invalid-email)."){
            action.setObj({
              ...obj,
              errorEmail: true,
              text: "Your Email Is Invalid",
            });
          }
          else if (errorMessage === "Firebase: Error (auth/email-already-in-use)."){
            action.setObj({
              ...obj,
              errorEmail: true,
              text: "User Already Exist With This Email",
            });
          }
          else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
            action.setObj({
              ...obj,
              errorPass: true,
              text: "Your Password Is Weak Should Be Atlest 6 Character",
            });
          }
          console.log(errorMessage);
          // ..
        });
    }

    return state;
  } else {
    return state;
  }
};

export default reducer;
