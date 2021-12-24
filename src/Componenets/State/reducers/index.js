import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";
import inputChangeSignup from "./inputOnChange";
import uploadUserPost from "./uploadUserPost";
import userInfoReducer from "./userInfoReducer";
import userPOP from "./userPOP";
import postFromReducer from "./postFromReducer";
import userDataReducer from "./userDataReducer";
const reducer = combineReducers({
  login: loginReducer,
  signup: signUpReducer,
  inputChange: inputChangeSignup,
  uploadUserPost: uploadUserPost,
  userLogged: userInfoReducer,
  userPOP: userPOP,
  postFromReducer: postFromReducer,
  userDataReducer: userDataReducer,
});

export default reducer;
