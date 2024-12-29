import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { 
    collection, 
    query, 
    where, 
    getDocs 
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
export const login = createAsyncThunk('user/login',async({email, password})=>{
    console.log("mail: ", email)
    console.log("password: ",password)
    try {
        // Firebase Authentication kontrolü
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Kullanıcının doctors koleksiyonunda olup olmadığını kontrol et
        const doctorsRef = collection(db, "doctors");
        const doctorQuery = query(doctorsRef, where("email", "==", email));
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
            throw new Error('Bu hesap bir doktor hesabıdır. Lütfen doktor girişini kullanın.');
        }

        // Normal kullanıcı kontrolü
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("email", "==", email));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            throw new Error('Kullanıcı bulunamadı');
        }

        const userData = userSnapshot.docs[0].data();
        return {
            token: userCredential.user.accessToken,
            user: {
                ...userData,
                uid: userCredential.user.uid
            }
        };

    } catch (error) {
        console.log("userSlice 21 line: ", error);
        if (error.message.includes('doktor hesabıdır')) {
            throw error;
        }
        switch (error.code) {
            case 'auth/invalid-credential':
                throw new Error('Geçersiz e-posta veya şifre');
            case 'auth/user-not-found':
                throw new Error('Kullanıcı bulunamadı');
            case 'auth/wrong-password':
                throw new Error('Hatalı şifre');
            case 'auth/invalid-email':
                throw new Error('Geçersiz e-posta formatı');
            default:
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