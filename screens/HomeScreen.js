// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc }  from 'firebase/firestore';
import {db} from '../firebaseConfig';
import CustomButton from '../component/CustomButton';

const HomeScreen = () =>{
  const sendData = async()=>{
      try{
        const docRef=await addDoc(collection(db,"TahlilTakipSistemi"),{
          title:"Tahlil Sonuc Takip Sistemi",
          content:"Tahlil sonuclari görüntüleme",
      });
      console.log("Document written with ID: ", docRef.id);
    }catch (e){
      console.error("Error adding document: ",e);
    }
  };
    return(
      <View style={styles.container}>
        <Text>HomePage</Text>
        <CustomButton
          buttonText={"Save"}
          setWidth={"40%"}
          buttonColor={'blue'}
          pressedButtonColor={'gray'}
          handleOnPress={sendData}
        />
      </View>
    );

};
export default HomeScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'tomato'
  }
})






// const HomeScreen = ({ navigation }) => {
//   //SEND DATA TO FIREBASE
//   const sendData = async()=>{
//     try{
//       const docRef = await addDoc(collection(db, "TahlilTakipSistemi"),{
//         tcNo: "45689723675",
//         sifre: "makmak123"
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch(e){
//       console.error("Error adding dcument: ", e);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tahlil Takip Sistemi</Text>
      
//       <TouchableOpacity  
//         style={styles.button}  
//         onPress={sendData}
//       >
//         <Text style={styles.buttonText}>
//           Kullanıcı Girişi
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity 
//         style={[styles.button, styles.adminButton]}
//         onPress={() => navigation.navigate('AdminLogin')}
//       >
//         <Text style={styles.buttonText}>Yönetici Girişi</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   adminButton: {
//     backgroundColor: '#34C759',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;