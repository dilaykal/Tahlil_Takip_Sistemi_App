// RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../styles/globalStyles';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    tcNo: '',
    email: '',
    gender: '',
    birthDate: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [genderItems] = useState([
    { label: 'Kadın', value: 'female' },
    { label: 'Erkek', value: 'male' },
  ]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Ad Soyad zorunludur';
    }

    if (!formData.tcNo) {
      newErrors.tcNo = 'TC Kimlik No zorunludur';
    } else if (formData.tcNo.length !== 11) {
      newErrors.tcNo = 'TC Kimlik No 11 haneli olmalıdır';
    }

    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.gender) {
      newErrors.gender = 'Cinsiyet seçimi zorunludur';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Doğum tarihi zorunludur';
    } else if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formData.birthDate)) {
      newErrors.birthDate = 'Doğum tarihi GG.AA.YYYY formatında olmalıdır';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      // API çağrısı burada yapılacak
      console.log('Kayıt yapılıyor:', formData);

      try {
        const response = await fetch('https://your-api-url.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          console.log('Kayıt başarılı');
          // Kayıt sonrası işlem (örneğin, yönlendirme)
          navigation.navigate('Login');
        } else {
          console.error('Kayıt başarısız', data.message);
        }
      } catch (error) {
        console.error('Kayıt işlemi sırasında hata oluştu', error);
      }
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    // Hata varsa temizle
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: null
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={[styles.input, errors.fullName && styles.inputError]}
        placeholder="* Ad Soyad"
        value={formData.fullName}
        onChangeText={(text) => updateFormData('fullName', text)}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

      <TextInput
        style={[styles.input, errors.tcNo && styles.inputError]}
        placeholder="* TC Kimlik No"
        value={formData.tcNo}
        onChangeText={(text) => updateFormData('tcNo', text)}
        keyboardType="numeric"
        maxLength={11}
      />
      {errors.tcNo && <Text style={styles.errorText}>{errors.tcNo}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="E-posta"
        value={formData.email}
        onChangeText={(text) => updateFormData('email', text)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.birthDate && styles.inputError]}
        placeholder="* Doğum Tarihi (GG.AA.YYYY)"
        value={formData.birthDate}
        onChangeText={(text) => updateFormData('birthDate', text)}
        keyboardType="numeric"
      />
      {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}

      {showDatePicker && (
        <DateTimePicker
          value={formData.birthDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              updateFormData('birthDate', selectedDate);
            }
          }}
        />
      )}

      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Telefon"
        value={formData.phone}
        onChangeText={(text) => updateFormData('phone', text)}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="* Şifre"
        value={formData.password}
        onChangeText={(text) => updateFormData('password', text)}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Cinsiyetin Ekranda Görünmesi */}
      <Text style={styles.label}>Cinsiyet: {formData.gender ? (formData.gender === 'female' ? 'Kadın' : 'Erkek') : ''}</Text>

      <DropDownPicker
        open={dropdownOpen}
        value={formData.gender}
        items={genderItems}
        setOpen={setDropdownOpen}
        setValue={(value) => updateFormData('gender', value)}
        setItems={setGenderItems}
        placeholder="Cinsiyet"
      />
      {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;