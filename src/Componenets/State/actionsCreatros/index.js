export const loginUser=(email,password,navigate)=>{
    return (dispatch)=>{
        dispatch({
            type:"login",
             email:email ,
             pass: password,
             navigate : navigate
        })
    }
}


export const signUpuser=(user,navigate,inputRef)=>{
    return (dispatch)=>{
        dispatch({
            type:"signup",
            user : user,
            navigate : navigate,
            inputRef : inputRef
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


export const userPOP=()=> {
    return (dispatch)=>{
        dispatch({
            type:"userInfoClicked",
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

