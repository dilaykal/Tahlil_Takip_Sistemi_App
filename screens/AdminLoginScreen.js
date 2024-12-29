import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CustomTextInput, CustomButton } from '../component';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    try {
      console.log("Doktor girişi deneniyor:", email);

      // Authentication kontrolü
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Authentication başarılı, UID:", userCredential.user.uid);

      // Firestore'dan doktor kontrolü
      const doctorsRef = collection(db, "doctors");
      const q = query(doctorsRef, where("email", "==", email));
      console.log("Doktor sorgusu yapılıyor...");

      const querySnapshot = await getDocs(q);
      console.log("Doktor sorgusu sonucu:", querySnapshot.empty ? "Bulunamadı" : "Bulundu");

      if (querySnapshot.empty) {
        console.log("Doktor kaydı bulunamadı");
        await auth.signOut();
        setError('Bu hesap doktor olarak kayıtlı değil');
        return;
      }

      const doctorData = querySnapshot.docs[0].data();
      console.log("Doktor verisi:", doctorData);

      // AdminDashboard'a yönlendir
      navigation.navigate('AdminDashboard', { doctorData });

    } catch (error) {
      console.error("Giriş hatası:", error.code, error.message);
      
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Geçersiz e-posta veya şifre');
          break;
        case 'auth/user-not-found':
          setError('Bu e-posta ile kayıtlı doktor bulunamadı');
          break;
        case 'auth/wrong-password':
          setError('Hatalı şifre');
          break;
        case 'auth/network-request-failed':
          setError('İnternet bağlantınızı kontrol edin');
          break;
        default:
          setError('Giriş yapılırken bir hata oluştu');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Doktor Girişi</Text>

        <CustomTextInput
          title="E-posta"
          isSecureText={false}
          handleOnChangeText={(text) => {
            setEmail(text.toLowerCase());
            setError('');
          }}
          handleValue={email}
          handlePlaceholder="E-posta adresinizi giriniz"
        />

        <CustomTextInput
          title="Şifre"
          isSecureText={true}
          handleOnChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          handleValue={password}
          handlePlaceholder="Şifrenizi giriniz"
        />

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <CustomButton
          buttonText="Giriş Yap"
          setWidth="80%"
          buttonColor="blue"
          pressedButtonColor="gray"
          handleOnPress={handleAdminLogin}
        />

        <CustomButton
          buttonText="Geri"
          setWidth="40%"
          buttonColor="gray"
          pressedButtonColor="darkgray"
          handleOnPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30
  },
  errorText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center'
  }
});

export default AdminLoginScreen;