// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import {getAuth, initializeAuth, browserLocalPersistence, browserPopupRedirectResolver} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, doc,getDocs } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDanUvSkK2MEAZ0wYtzyaIhTnSqTE_t5KE",
  authDomain: "mobiluygulamaproje-c156f.firebaseapp.com",
  projectId: "mobiluygulamaproje-c156f",
  storageBucket: "mobiluygulamaproje-c156f.firebasestorage.app",
  messagingSenderId: "250917662870",
  appId: "1:250917662870:web:91d64d295484d45268d2b7",
  measurementId: "G-TNB0KXVJV3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Auth'u başlat
// Auth'u özel ayarlarla başlat
const auth = getAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver
});

// Auth durumunu izle
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Kullanıcı oturum açtı:', user.email);
  } else {
    console.log('Kullanıcı oturum açık değil');
  }
});
export async function getKilavuz(id) {
  const docRef = doc(db, "kılavuzlar", id); // Kılavuz ID'si
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data(); // Kılavuz verilerini döndür
  } else {
    console.log("Kılavuz bulunamadı");
    return null;
  }
}



//const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };
export default app;

//const analytics = getAnalytics(app);



// const auth= initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });










//READ DATA

// const ref = collection(db, "TahlilTakipSistemi");

// getDocs(ref)
//   .then((snapshot)=>{
//     const TahlilTakipSistemi = snapshotEqual.docs.map((doc) => ({
//         id : doc.id,
//         ...doc.data(),
//     }));
//     console.log(TahlilTakipSistemi);
//    })
//     .catch((error) => {
//         console.log(error);
//     });

// //Write Data
// const addForm = document.getElementById("add");
// addForm.addEventListener("submit", (e) => {
//     e.preventDefault();
    
//     const formData = {
//         tcNo: addForm.tcNo.value,
//         password: addForm.password.value,
//     };
 
//     addDoc(ref, formData)
//         .then(() => {
//             alert("Kullanıcı eklendi");
//             addForm.reset();
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//  });

