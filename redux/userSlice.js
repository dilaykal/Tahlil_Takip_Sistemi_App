import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { buildCreateApi } from "@reduxjs/toolkit/query";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export const login = createAsyncThunk('user/login',async({username, password})=>{
    try{
        const auth = getAuth();
       
        const userCredential=await signInWithEmailAndPassword(auth,username,password) //bundan sonraki işlemi bekle
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        const userData={
            token,
            user:user,
        }
        return userData
    }catch(error){
        console.log("userSlice 21 line: ", error)
        throw error
    }
})

const initialState={
    isAuth: false,
    token:null,
    user:null,
    error:null
    
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setEmail: (state, action)=>{
            state.email=action.payload
        },
        setPassword:(state, action)=>{
            state.password = action.payload
        }

    },
    extraReducers:()=>{
        builder 
            .addCase(login.pending,()=>{
                state.isAuth=false
            }) //yükleniyor cevap bekleniyor
            .addCase(login.fulfilled, (state, action)=>{
                state.isAuth=true;
                state.user = action.payload.user;
                state.token= action.payload.token;
            }) //başarılı sonuçlandığında
            .addCase(login.rejected, (state, action)=>{
                state.isAuth=false;
                state.error = action.error.massage;
            }) //hata mesajı geldi login işlemi olmadı
    }

    
})
export const{setEmail,setPassword}=userSlice.actions
export default userSlice.reducer;