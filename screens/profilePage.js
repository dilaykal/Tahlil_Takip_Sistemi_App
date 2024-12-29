import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { CustomTextInput, CustomButton } from '../component';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [tc, setTc] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [telNo, setTelNo] = useState("");
  const [userId, setUserId] = useState("");
  const [docId, setDocId] = useState("");

  // Kullanıcı bilgilerini getir
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Firestore'dan kullanıcı bilgilerini al
          const q = query(
            collection(db, "users"), 
            where("userId", "==", currentUser.uid)
          );
          
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setName(userData.name || '');
            setTc(userData.tcNo || '');
            setEmail(userData.email || '');
            setGender(userData.gender || '');
            setBirthDate(userData.birthDate || '');
            setTelNo(userData.phoneNumber || '');
            setUserId(userData.userId);
            setDocId(doc.id);
          });
        }
      } catch (error) {
        console.error("Kullanıcı bilgileri getirme hatası:", error);
        Alert.alert("Hata", "Kullanıcı bilgileri alınamadı");
      }
    };

    fetchUserData();
  }, []);

  // Input kontrol fonksiyonları
  const handleTcChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 11) {
      setTc(numericValue);
    }
  };

  const handlePhoneChange = (text) => {
    let numbers = text.replace(/\D/g, '');
    numbers = numbers.substring(0, 10);
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

  // Bilgileri güncelle
  const handleUpdate = async () => {
    try {
      if (!docId) {
        Alert.alert("Hata", "Kullanıcı bilgisi bulunamadı");
        return;
      }

      const userRef = doc(db, "users", docId);
      await updateDoc(userRef, {
        name: name,
        tcNo: tc,
        gender: gender,
        birthDate: birthDate,
        phoneNumber: telNo,
        updatedAt: new Date()
      });

      Alert.alert("Başarılı", "Bilgileriniz güncellendi");
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      Alert.alert("Hata", "Bilgiler güncellenirken bir hata oluştu");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style= {styles.textInputContainer}>
        <Text style={styles.title}>Profil Bilgileri</Text>

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
          handleValue={email}
          editable={false} // Email değiştirilemez
          handlePlaceholder=""
        />

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

        <CustomButton
          buttonText="Bilgileri Güncelle"
          setWidth="80%"
          buttonColor="blue"
          pressedButtonColor="gray"
          handleOnPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
};
export default ProfilePage;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'tomato'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30
  },
  textInputContainer:{
    flex:5,
    width:'100%',
    alignItems:'center',
    paddingVertical:5,
    alignItems:'center',
    justifyContent:'space-evenly'
  },
})
