import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState={
    tc:null,
    password:null,
    isAuth: false,
    users:{
        userTc: "12345678999",
        userPassword:"1234"
    }
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setTc: (state, action)=>{
            state.tc=action.payload
        },
        setPassword:(state, action)=>{
            state.password = action.payload
        },
        setLogin: (state) =>{
            if((state.tc === state.users.userTc) 
                && state.password===state.users.userPassword){
                console.log(true)
                state.isAuth = true
            }else{
                console.log(false)
            }
        }

    }

})
export const{setTc,setPassword, setLogin}=userSlice.actions
export default userSlice.reducer;