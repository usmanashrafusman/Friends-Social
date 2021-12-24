const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};
const reducer = (state = initialState, action) => {
  if (action.type === "InputChangeInForm") {
    state[action.key] = action.value;
    return state;
  } else {
    return state;
  }
};
export default reducer;
