import { auth ,  db } from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
    doc,
    onSnapshot,
  } from "firebase/firestore";

const initialState = {}

const reducer = (state=initialState, action, info)=>{

    if (action.type === "GetUserData") {
   
   console.log(info)
          return state;
    }
    else {
        return state
    }
}
export default reducer;


