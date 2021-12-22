import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const reducer = (state=0, action)=>{
    if(action.type==="login"){
        signInWithEmailAndPassword(auth, action.email, action.pass)
        .then((userCredential) => {
      alert("Sucessfully Loged In")
          const user = userCredential.user;
          // const displayName = user.displayName;
          console.log(user)
          action.navigate("./home")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
        });
        return state
    }
    else {
        return state
    }
}

export default reducer