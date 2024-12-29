import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export const login = createAsyncThunk('user/login',async({email, password})=>{
    console.log("mail: ", email)
    console.log("password: ",password)
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        const userData = {
            token,
            user: user,
        }
        return userData;
    } catch (error) {
        console.log("userSlice 21 line ", error)
        throw error
    }
});

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
    extraReducers:(builder)=>{
        builder 
            .addCase(login.pending,(state)=>{
                state.isAuth=false
                state.error = null;
            }) //yükleniyor cevap bekleniyor
            .addCase(login.fulfilled, (state, action)=>{
                if (action.payload) {
                    state.isAuth = true;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.error = null;
                }
            }) //başarılı sonuçlandığında
            .addCase(login.rejected, (state, action)=>{
                state.isAuth = false;
                state.error = action.error.message;
            }) //hata mesajı geldi login işlemi olmadı
    }

    
})
export const{setEmail,setPassword}=userSlice.actions
export default userSlice.reducer;