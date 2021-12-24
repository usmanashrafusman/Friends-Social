const initialState = false;

const reducer = (state = initialState, action) => {
  if (action.type === "postFromClicked") {
    state = action.payload;
    return state;
  } else {
    return state;
  }
};
export default reducer;
