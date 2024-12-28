//import React, { useEffect } from 'react';
import React, { useState } from 'react';
// import { StatusBar } from 'react-native';
import { View, Text,StyleSheet, TextInput, Pressable } from 'react-native';
import { CustomTextInput, CustomButton } from '../component';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import RootNavigation from './navigation/rootNavigation';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import { 
//  HomeScreen,
//  RegisterScreen,
//  AdminLoginScreen,
//  AdminDashboard 
// } from './screens';

const LoginScreen= ({navigation}) =>{
  const [tc, setTc] = useState("");
  const {password, setPassword} = useState("");


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>

      <CustomTextInput
        title="TC Kimlik Numarası"
        isSecureText={false}
        handleOnChangeText={setTc}
        handleValue={tc}
        handlePlaceholder='Tc No Giriniz'

      />
      
      <CustomTextInput
        title="Şifre"
        isSecureText={true}
        handleOnChangeText={setPassword}
        handleValue={password}
        handlePlaceholder='Şifre Giriniz'

      />

      <CustomButton
        buttonText='Giriş Yap'
        setWidth='80%'
        handleOnPress={()=>navigation.navigate('Home')}
        buttonColor="blue"
        pressedButtonColor="gray"
      />

      <CustomButton
        buttonText='Kayıt Ol'
        setWidth='30%'
        handleOnPress={()=>navigation.navigate('Register')}
        buttonColor="gray"
        pressedButtonColor="lightgray"
      />
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerbutton:{
    width:'30%',
    height:50,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:30,
    color:'white'
  }

});























// LoginScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { styles } from '../styles/globalStyles';


// const LoginScreen = ({ navigation }) => {
//   const [tcNo, setTcNo] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!tcNo) {
//       newErrors.tcNo = 'TC Kimlik No zorunludur';
//     } else if (tcNo.length !== 11) {
//       newErrors.tcNo = 'TC Kimlik No 11 haneli olmalıdır';
//     }

//     if (!password) {
//       newErrors.password = 'Şifre zorunludur';
//     } else if (password.length < 6) {
//       newErrors.password = 'Şifre en az 6 karakter olmalıdır';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = () => {
//     if (validateForm()) {
//       // API çağrısı burada yapılacak
//       console.log('Giriş yapılıyor:', { tcNo, password });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Giriş Yap</Text>

//       <TextInput
//         style={[styles.input, errors.tcNo && styles.inputError]}
//         placeholder="TC Kimlik No"
//         value={tcNo}
//         onChangeText={setTcNo}
//         keyboardType="numeric"
//         maxLength={11}
//       />
//       {errors.tcNo && <Text style={styles.errorText}>{errors.tcNo}</Text>}

//       <TextInput
//         style={[styles.input, errors.password && styles.inputError]}
//         placeholder="Şifre"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Giriş Yap</Text>
//       </TouchableOpacity>

//       <TouchableOpacity 
//         onPress={() => navigation.navigate('Register')}
//         style={styles.registerLink}
//       >
//         <Text style={styles.registerText}>Hesabınız yok mu? Kayıt olun</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// //export { HomeScreen, LoginScreen};
// export default LoginScreen;