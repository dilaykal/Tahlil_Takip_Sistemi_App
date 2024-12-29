import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CustomTextInput, CustomButton } from '../component';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      // Önce Authentication'da giriş yap
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Authentication başarılı:", userCredential.user.email);

      // Doctors koleksiyonunda bu email ile kayıt var mı kontrol et
      const doctorsRef = collection(db, "doctors");
      const q = query(doctorsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Doktor kaydı yoksa çıkış yap ve hata göster
        await auth.signOut();
        setError('Bu hesap doktor girişine yetkili değil');
        return;
      }

      // Doktor kaydı varsa devam et
      const doctorData = querySnapshot.docs[0].data();
      console.log("Doktor girişi başarılı:", doctorData);
      
      // Admin paneline yönlendir
      navigation.replace('AdminDashboard');
      
    } catch (error) {
      console.error("Giriş hatası:", error);
      
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Geçersiz e-posta veya şifre');
          break;
        case 'auth/invalid-email':
          setError('Geçersiz e-posta formatı');
          break;
        case 'auth/user-not-found':
          setError('Bu e-posta ile kayıtlı kullanıcı bulunamadı');
          break;
        case 'auth/wrong-password':
          setError('Hatalı şifre');
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