// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;











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

