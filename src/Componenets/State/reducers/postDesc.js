const initialState = "";
const reducer = (state = initialState, action) => {
  if (action.type === "postDesc") {
    state = action.payload;
    return state;
  } else {
    return state;
  }
};
export default reducer;
