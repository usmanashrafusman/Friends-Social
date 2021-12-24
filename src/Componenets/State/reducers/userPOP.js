const initialState = false;

const reducer = (state = initialState, action) => {
  if (action.type === "userInfoClicked") {
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
