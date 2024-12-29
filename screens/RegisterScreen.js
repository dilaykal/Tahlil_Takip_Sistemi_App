// RegisterScreen.js güncellendi.
  
import { StyleSheet, Text, View, SafeAreaView ,Image, Pressable} from "react-native";
import React, { useState } from 'react';
import { CustomTextInput, CustomButton } from "../component";
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

const RegisterScreen= ({ navigation }) =>{
  const [name, setName] = useState("")
  const [tc, setTc] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [telNo, setTelNo] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("");
  const [tcError, setTcError] = useState("");

  const [error, setError] = useState("");

  const handleTcChange = (text) => {
    // Sadece rakam girilmesini sağla
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // 11 karakterden fazla girilmesini engelle
    if (numericValue.length <= 11) {
      setTc(numericValue);
      
      // Hata mesajı kontrolü
      if (numericValue.length === 11) {
        setTcError("");
      } else if (numericValue.length > 0) {
        setTcError("TC Kimlik No 11 haneli olmalıdır");
      } else {
        setTcError("");
      }
    }
  };
  const handlePhoneChange = (text) => {
    // Sadece sayıları al
    let numbers = text.replace(/\D/g, '');
    
    // 10 karakterden fazla olmasını engelle
    numbers = numbers.substring(0, 10);
    
    // Format uygula
    let formatted = '';
    if (numbers.length > 0) {
      formatted = `(${numbers.substring(0, 3)}`;
      if (numbers.length > 3) {
        formatted += `) ${numbers.substring(3, 6)}`;
        if (numbers.length > 6) {
          formatted += ` ${numbers.substring(6, 8)}`;
          if (numbers.length > 8) {
            formatted += ` ${numbers.substring(8)}`;
          }
        }
      }
    }
    
    setTelNo(formatted);
  };
  // Email kontrolü için fonksiyon
  const handleEmailChange = (text) => {
    setEmail(text);
    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.length > 0 && !emailRegex.test(text)) {
      setEmailError('Geçerli bir email adresi giriniz');
    } else {
      setEmailError('');
    }
  };
   // Firebase'e kayıt fonksiyonu
   const handleRegister = async () => {
    try {
      // Validasyonlar
      if (!name || !tc || !email || !password || !gender || !birthDate || !telNo) {
        setError('Tüm alanları doldurunuz');
        return;
      }
      if (tc.length !== 11) {
        setError('TC Kimlik No 11 haneli olmalıdır');
        return;
      }
      if (emailError) {
        setError('Geçerli bir email adresi giriniz');
        return;
      }

      // Firebase Authentication'da kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Firestore'a kullanıcı bilgilerini kaydet
      await addDoc(collection(db, "users"), {
        userId: userCredential.user.uid,
        name: name,
        tcNo: tc,
        email: email,
        gender: gender,
        birthDate: birthDate,
        phoneNumber: telNo,
        userType: 'patient', 
        createdAt: new Date()
      });

      // Başarılı kayıt sonrası Login sayfasına yönlendir
      navigation.navigate('Login');
    } catch (error) {
      console.error('Kayıt hatası:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Bu email adresi zaten kullanımda');
          break;
        case 'auth/weak-password':
          setError('Şifre en az 6 karakter olmalıdır');
          break;
        default:
          setError('Kayıt sırasında bir hata oluştu');
      }
    }
  }; 

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.image} source={require('../assets/images/signup.png')}/>
        <Text style={styles.register}></Text>
      </View>

      <View style= {styles.textInputContainer}>
        <CustomTextInput
          title="İsim Soyisim"
          isSecureText={false}
          handleOnChangeText={setName}
          handleValue={name}
          handlePlaceholder=""
        />

        <CustomTextInput
          title="TC Kimlik Numarası"
          isSecureText={false}
          handleOnChangeText={handleTcChange}
          handleValue={tc}
          handlePlaceholder=""
        />

       
        <CustomTextInput
          title="E-posta"
          isSecureText={false}
          handleOnChangeText={handleEmailChange}
          handleValue={email}
          handlePlaceholder="ornek@email.com"
        />
        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}

        <CustomTextInput
          title="Cinsiyet"
          isSecureText={false}
          handleOnChangeText={setGender}
          handleValue={gender}
          handlePlaceholder=""
        />
                
        <CustomTextInput
          title="Doğum Tarihi"
          isSecureText={false}
          handleOnChangeText={setBirthDate}
          handleValue={birthDate}
          handlePlaceholder="GG/AA/YYYY"
        />

        <CustomTextInput
          title="Telefon Numarası"
          isSecureText={false}
          handleOnChangeText={handlePhoneChange}
          handleValue={telNo}
          handlePlaceholder="(5XX) XXX XX XX"
        />
        
        <CustomTextInput
          title="Şifre"
          isSecureText={true}
          handleOnChangeText={setPassword}
          handleValue={password}
          handlePlaceholder=""
        />

      </View>

      <View style={styles.backLogin}>
        <CustomButton
          buttonText="Kayıt Ol"
          setWidth="80%"
          handleOnPress={handleRegister}
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
    flex:5,
    width:'100%',
    alignItems:'center',
    paddingVertical:5,
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  backLogin:{
    flex:1,
    width:'100%',
    alignItems:'center'
  },
  image:{
    width:110,
    height:110,
    marginBottom:0
  },
  errorText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: -5
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
