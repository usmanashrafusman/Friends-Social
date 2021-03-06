export const loginUser=(email,password,navigate,setObj,setLoadingStatus)=>{
    return (dispatch)=>{
        dispatch({
            type:"login",
             email:email ,
             pass: password,
             navigate : navigate,
             setObj : setObj,
             setLoadingStatus,
        })
    }
}


export const signUpuser=(user,navigate,inputRef,setObj,setLoadingStatus)=>{
    return (dispatch)=>{
        dispatch({
            type:"signup",
            user : user,
            navigate : navigate,
            inputRef : inputRef,
            setObj : setObj,
            setLoadingStatus
        })
    }
}

export const inputChangeSignup=(key,value)=> {
    return (dispatch)=>{
        dispatch({
            type:"InputChangeInForm",
            key : key,
            value : value
           
        })
    }
}


export const uploadUserPost=(caption,files,uid)=> {
    return (dispatch)=>{
        dispatch({
            type:"uploadUserPost",
            caption,
            files,
            uid
        })
    }
}

export const userLogged=(payload)=> {
    return (dispatch)=>{
        dispatch({
            type:"UserLoggedIn",
        })
    }
}


export const userPOP=(payload)=> {
    return (dispatch)=>{
        dispatch({
            type:"postReducer",
            payload
        })
    }
}

export const postFromReducer=(payload)=> {
    return (dispatch)=>{
        dispatch({
            type:"postFromClicked",
            payload
        })
    }
}


export const postDesc=(payload)=> {
    return (dispatch)=>{
        dispatch({
            type:"postDesc",
            payload
        })
    }
}

