import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export const login = createAsyncThunk('user/login',async({email, password})=>{
    try {
        // Email formatını kontrol et
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Geçersiz e-posta adresi');
        }

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
        if (error.message === 'Geçersiz e-posta adresi') {
            throw error;
        }
        // Firebase'den gelen hataları Türkçeleştir
        if (error.code === 'auth/invalid-email') {
            throw new Error('Geçersiz e-posta adresi');
        } else if (error.code === 'auth/user-not-found') {
            throw new Error('Kullanıcı bulunamadı');
        } else if (error.code === 'auth/wrong-password') {
            throw new Error('Hatalı şifre');
        } else {
            throw new Error('Giriş yapılırken bir hata oluştu');
        }
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
            }) //yükleniyor cevap bekleniyor
            .addCase(login.fulfilled, (state, action)=>{
                state.isAuth=true;
                state.user = action.payload.user;
                state.token= action.payload.token;
            }) //başarılı sonuçlandığında
            .addCase(login.rejected, (state, action)=>{
                state.isAuth=false;
                state.error = action.error.message;
            }) //hata mesajı geldi login işlemi olmadı
    }

    
})
export const{setEmail,setPassword}=userSlice.actions
export default userSlice.reducer;