import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AdminLoginScreen = ({ navigation }) => {
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    if (validateForm()) {
      // Doğrulama başarılıysa yönlendirme
      navigation.navigate('AdminDashboard');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!tcNo) {
      newErrors.tcNo = 'TC Kimlik No zorunludur';
    } else if (tcNo.length !== 11) {
      newErrors.tcNo = 'TC Kimlik No 11 haneli olmalıdır';
    }
    if (!password) {
      newErrors.password = 'Şifre zorunludur';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yönetici Girişi</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  inputError: { borderColor: 'red' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginTop: -10, marginBottom: 10 },
});

export default AdminLoginScreen;
