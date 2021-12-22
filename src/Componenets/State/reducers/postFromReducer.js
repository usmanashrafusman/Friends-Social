const initialState = false;

const reducer = (state=initialState, action)=>{
    if (action.type === "postFromClicked") {
       
        state = action.payload;
        console.log(state)
        return state
    }
    else {
        return state
    }
}
export default reducer;