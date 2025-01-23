import React, { useState } from 'react';
import { View, Text,StyleSheet, TextInput, Pressable } from 'react-native';
import { CustomTextInput, CustomButton } from '../component';
import { login } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const LoginScreen= ({navigation}) =>{

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  // Redux state'inden error'u alalım
  const { error } = useSelector((state) => state.user);
  //userSlice içerisindeki reducer yapılarını kullanma veya veri gönderme 
  const dispatch = useDispatch()


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>

      <CustomTextInput
        title="E-posta"
        isSecureText={false}
        handleOnChangeText={(text)=>setEmail(text.toLowerCase())}
        handleValue={email}
        handlePlaceholder='E Posta adresinizi Giriniz'

      />
      
      <CustomTextInput
        title="Şifre"
        isSecureText={true}
        handleOnChangeText={(password)=>setPassword(password)}
        handleValue={password}
        handlePlaceholder='Şifre Giriniz'

      />
       {error && <Text style={styles.errorText}>{error}</Text>}
      <CustomButton
        buttonText='Giriş Yap'
        setWidth='80%'
        handleOnPress={()=>dispatch(login({email, password}))}
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
      
      <CustomButton
        buttonText="Doktor Girişi"
        setWidth="40%"
        buttonColor="green"
        pressedButtonColor="darkgreen"
        handleOnPress={() => navigation.navigate('AdminLogin')}
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
  },
  errorText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
    width: '80%'
},

});