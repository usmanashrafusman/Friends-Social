import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const reducer = (state = 0, action) => {
  if (action.type === "login") {
    action.setObj({
      errorEmail: false,
      errorPass : false,
      text: " ",
    });
    signInWithEmailAndPassword(auth, action.email, action.pass)
      .then((userCredential) => {
        alert("Sucessfully Loged In");
        const user = userCredential.user;
        state = user;
        action.navigate("./home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          action.setObj({
            errorEmail: true,
            text: "Invalid Email User Don't Exist",
          });
        } else if (errorMessage === "Firebase: Error (auth/invalid-email).") {
          action.setObj({
            errorEmail: true,
            text: "Invalid Email",
          });
        }
    
        else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          action.setObj({
            errorPass: true,
            text: "Incorrect Password",
          });
        }
        else if (errorMessage === "Firebase: Error (auth/internal-error).") {
          action.setObj({
            errorPass: true,
            text: "Please Enter Password To Sign In",
          });
        }
        else if (errorMessage === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
         alert("Your Account Has Been Blocked Try To Sign In Later")
        }
      });
    return state;
  } else {
    return state;
  }
};

export default reducer;
