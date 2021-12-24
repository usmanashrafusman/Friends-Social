const initialState = {};

const reducer = (state = initialState, action) => {
  if (action.type === "UserLoggedIn") {
    if (state) {
      state = false;
    } else {
      state = true;
    }

    return state;
  } else {
    return state;
  }
};
export default reducer;
