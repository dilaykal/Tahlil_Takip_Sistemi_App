// screens/HomeScreen.js
import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs,deleteDoc,doc }  from 'firebase/firestore';
import {db} from '../firebaseConfig';
import CustomButton from '../component/CustomButton';

const HomeScreen = () =>{
  const [data, setData]=useState([])
 
  //SEND DATA TO FIREBASE
  const sendData = async()=>{
      try{
        const docRef=await addDoc(collection(db,"TahlilTakipSistemi"),{
          title:"Tahlil Sonuc Takip Sistemi",
          content:"Tahlil sonuclari görüntüleme"
      });
      console.log("Document written with ID: ", docRef.id);
    }catch (e){
      console.error("Error adding document: ",e);
    }
  };

  //GET DATA FROM FIREBASE
  const getData = async () => {
    try {
      const tahlilData = [];
      const querySnapshot = await getDocs(collection(db, "TahlilTakipSistemi"));
      querySnapshot.forEach((doc) => {
        tahlilData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setData(tahlilData);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  //DELETE DATA FROM DATABASE
  const deleteData = async() =>{
    await deleteDoc(doc(db, "TahlilTakipSistemi","kFQkmvoloVkzw70WsWGo"));
  }

    return(
      <View style={styles.container}>
        <Text style={styles.headerText}>Tahlil Takip Sistemi</Text>

        {/* Veriler varsa göster */}
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.dataItem}>
              <Text style={styles.titleText}>{item?.title || 'Başlık yok'}</Text>
              <Text style={styles.contentText}>{item?.content || 'İçerik yok'}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Henüz veri bulunmamaktadır</Text>
        )}
        <CustomButton
          buttonText={"Save"}
          setWidth={"40%"}
          buttonColor={'blue'}
          pressedButtonColor={'gray'}
          handleOnPress={sendData}
        />
        <CustomButton
          buttonText={"Get Data"}
          setWidth={"40%"}
          buttonColor={'blue'}
          pressedButtonColor={'gray'}
          handleOnPress={getData}
        />
        <CustomButton
          buttonText={"Delete Data"}
          setWidth={"40%"}
          buttonColor={'blue'}
          pressedButtonColor={'gray'}
          handleOnPress={deleteData}
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