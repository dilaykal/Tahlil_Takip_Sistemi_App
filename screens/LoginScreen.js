// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from '../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!tcNo) {
      newErrors.tcNo = 'TC Kimlik No zorunludur';
    } else if (tcNo.length !== 11) {
      newErrors.tcNo = 'TC Kimlik No 11 haneli olmalıdır';
    }

    if (!password) {
      newErrors.password = 'Şifre zorunludur';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // API çağrısı burada yapılacak
      console.log('Giriş yapılıyor:', { tcNo, password });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={[styles.input, errors.tcNo && styles.inputError]}
        placeholder="TC Kimlik No"
        value={tcNo}
        onChangeText={setTcNo}
        keyboardType="numeric"
        maxLength={11}
      />
      {errors.tcNo && <Text style={styles.errorText}>{errors.tcNo}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Register')}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>Hesabınız yok mu? Kayıt olun</Text>
      </TouchableOpacity>
    </View>
  );
};
//export { HomeScreen, LoginScreen};
export default LoginScreen;