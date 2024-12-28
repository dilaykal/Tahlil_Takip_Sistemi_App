// RegisterScreen.js
// import {
  //   View,
  //   Text,
  //   TextInput,
  //   TouchableOpacity,
  // } from 'react-native';
  // import DropDownPicker from 'react-native-dropdown-picker';
  // import { styles } from '../styles/globalStyles';
  
import { StyleSheet, Text, View, SafeAreaView ,Image, Pressable} from "react-native";
import React, { useState } from 'react';
import { CustomTextInput, CustomButton } from "../component";

const RegisterScreen= () =>{
  const [name, setName] = useState("")
  const [tc, setTc] = useState({})
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [telNo, setTelNo] = useState({})
  const [password, setPassword] = useState("")

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.image} source={require('../assets/images/signup.png')}/>
        <Text style={styles.register}>Register Page</Text>
      </View>

      <View style= {styles.textInputContainer}>
        <CustomTextInput
          title="name"
          isSecureText={false}
          handleOnChangeText={setName}
          handleValue={name}
          handlePlaceholder="İsminizi giriniz"
        />

        <CustomTextInput
          title="Tc No"
          isSecureText={false}
          handleOnChangeText={setTc}
          handleValue={tc}
          handlePlaceholder="Tc no giriniz"
        />

        <CustomTextInput
          title="email"
          isSecureText={false}
          handleOnChangeText={setEmail}
          handleValue={email}
          handlePlaceholder="E posta adresi giriniz"
        />

        <CustomTextInput
          title="gender"
          isSecureText={false}
          handleOnChangeText={setGender}
          handleValue={gender}
          handlePlaceholder="Cinsiyet giriniz"
        />

        <CustomTextInput
          title="birthDate"
          isSecureText={false}
          handleOnChangeText={setBirthDate}
          handleValue={birthDate}
          handlePlaceholder="Doğum tarihinizi giriniz"
        />

        <CustomTextInput
          title="Tel no"
          isSecureText={false}
          handleOnChangeText={setTelNo}
          handleValue={telNo}
          handlePlaceholder="Telefon no giriniz"
        />

        <CustomTextInput
          title="password"
          isSecureText={true}
          handleOnChangeText={setPassword}
          handleValue={password}
          handlePlaceholder="Şifre oluşturunuz"
        />
      </View>

      <View style={styles.backLogin}>
        <CustomButton
          buttonText="Kayıt Ol"
          setWidth="80%"
          handleOnPress={()=>console.log(name," ", tc, " ", password, " ")}
          buttonColor="blue"
          pressedButtonColor="gray"
        
        />

        <Pressable onPress ={()=>navigation.navigate("Login")}>
          <Text style={{fontWeight:'bold'}}>Hesabınız var mı? Giriş Yap</Text>
        </Pressable>
      </View>

    </SafeAreaView>
 
      

  )

}
export default RegisterScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  register:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:30,
    color:'white'
  },
  title:{
    flex:1,
    paddingTop:50,
    width:'100%',
    alignItems:'center'
  },
  textInputContainer:{
    flex:4,
    width:'100%',
    alignItems:'center',
    paddingVertical:20,
    alignItems:'center',
    justifyContent:'space-between'
  },
  
  backLogin:{
    flex:1,
    width:'100%',
    alignItems:'center'
  },
  image:{
    width:120,
    height:120,
    marginBottom:20
  }
})





// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     tcNo: '',
//     email: '',
//     gender: '',
//     birthDate: '',
//     phone: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [genderItems] = useState([
//     { label: 'Kadın', value: 'female' },
//     { label: 'Erkek', value: 'male' },
//   ]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName) {
//       newErrors.fullName = 'Ad Soyad zorunludur';
//     }

//     if (!formData.tcNo) {
//       newErrors.tcNo = 'TC Kimlik No zorunludur';
//     } else if (formData.tcNo.length !== 11) {
//       newErrors.tcNo = 'TC Kimlik No 11 haneli olmalıdır';
//     }

//     if (formData.email && !formData.email.includes('@')) {
//       newErrors.email = 'Geçerli bir e-posta adresi giriniz';
//     }

//     if (!formData.gender) {
//       newErrors.gender = 'Cinsiyet seçimi zorunludur';
//     }

//     if (!formData.birthDate) {
//       newErrors.birthDate = 'Doğum tarihi zorunludur';
//     } else if (!/^‌\d{2}\.\d{2}\.\d{4}$/.test(formData.birthDate)) {
//       newErrors.birthDate = 'Doğum tarihi GG.AA.YYYY formatında olmalıdır';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Şifre zorunludur';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Şifre en az 6 karakter olmalıdır';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegister = () => {
//     if (validateForm()) {
//       console.log('Kayıt yapılıyor:', formData);
//       // Kayıt sonrası işlem (örneğin, yönlendirme)
//       navigation.navigate('Login');
//     }
//   };

//   const updateFormData = (key, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: value
//     }));
//     // Hata varsa temizle
//     if (errors[key]) {
//       setErrors(prev => ({
//         ...prev,
//         [key]: null
//       }));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Kayıt Ol</Text>

//       <TextInput
//         style={[styles.input, errors.fullName && styles.inputError]}
//         placeholder="* Ad Soyad"
//         value={formData.fullName}
//         onChangeText={(text) => updateFormData('fullName', text)}
//       />
//       {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

//       <TextInput
//         style={[styles.input, errors.tcNo && styles.inputError]}
//         placeholder="* TC Kimlik No"
//         value={formData.tcNo}
//         onChangeText={(text) => updateFormData('tcNo', text)}
//         keyboardType="numeric"
//         maxLength={11}
//       />
//       {errors.tcNo && <Text style={styles.errorText}>{errors.tcNo}</Text>}

//       <TextInput
//         style={[styles.input, errors.email && styles.inputError]}
//         placeholder="E-posta"
//         value={formData.email}
//         onChangeText={(text) => updateFormData('email', text)}
//         keyboardType="email-address"
//       />
//       {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//       <TextInput
//         style={[styles.input, errors.birthDate && styles.inputError]}
//         placeholder="* Doğum Tarihi (GG.AA.YYYY)"
//         value={formData.birthDate}
//         onChangeText={(text) => updateFormData('birthDate', text)}
//         keyboardType="numeric"
//       />
//       {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}

//       <TextInput
//         style={[styles.input, errors.phone && styles.inputError]}
//         placeholder="Telefon"
//         value={formData.phone}
//         onChangeText={(text) => updateFormData('phone', text)}
//         keyboardType="phone-pad"
//       />
//       {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//       <TextInput
//         style={[styles.input, errors.password && styles.inputError]}
//         placeholder="* Şifre"
//         value={formData.password}
//         onChangeText={(text) => updateFormData('password', text)}
//         secureTextEntry
//       />
//       {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

//       <Text style={styles.label}>Cinsiyet:</Text>

//       <DropDownPicker
//         open={dropdownOpen}
//         value={formData.gender}
//         items={genderItems}
//         setOpen={setDropdownOpen}
//         setValue={(value) => updateFormData('gender', value)}
//         placeholder="Cinsiyet"
//       />
//       {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Kayıt Ol</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default RegisterScreen;
