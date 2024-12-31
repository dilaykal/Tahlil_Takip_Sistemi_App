import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CustomButton, CustomTextInput } from '../component';

const AdminDashboard = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const { doctorData } = route.params;

  // Tüm hastaları getir
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const patientList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientList);
        setFilteredPatients(patientList);
      } catch (error) {
        console.error('Hasta verisi çekerken hata:', error);
      }
    };

    fetchPatients();
  }, []);

  // Arama işlemi
  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter(
      (patient) =>
        (patient.name && patient.name.toLowerCase().includes(text.toLowerCase())) ||
        (patient.tcNo && patient.tcNo.toLowerCase().includes(text.toLowerCase()))
    );

    setFilteredPatients(filtered);
  };

  // Hasta detaylarına git
  const handlePatientSelect = (patient) => {
    console.log('Hasta bilgisi:', patient); // Hasta bilgilerini kontrol edin
    navigation.navigate('PatientDetails', { patientName: patient.name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hoş Geldiniz, {doctorData.name}</Text>
        <Text style={styles.subtitleText}>Dahiliye</Text>
      </View>

      {/* Menü Butonları */}
      <View style={styles.menuButtons}>
        <CustomButton
          buttonText="Kılavuz Yönetimi"
          setWidth="80%"
          buttonColor="green"
          pressedButtonColor="darkgreen"
          handleOnPress={() => navigation.navigate('GuideManagement', { doctorData })}
        />
        <CustomButton
          buttonText="Tahlil Sorgula"
          setWidth="40%"
          buttonColor="blue"
          pressedButtonColor="gray"
          handleOnPress={() => navigation.navigate('TahlilSorgula')}
        />
        <CustomButton buttonText="Referans Değer Ara" setWidth="80%" />
      </View>

      {/* Hasta Ara */}
      <CustomTextInput
        title="Hasta Ara"
        isSecureText={false}
        handleOnChangeText={handleSearch}
        handleValue={searchText}
        handlePlaceholder="İsim veya TC No ile ara"
      />

      {/* Hasta Listesi */}
      <ScrollView style={styles.patientList}>
        {filteredPatients.map((patient) => (
          <View key={patient.id} style={styles.patientCard}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name || 'Bilinmiyor'}</Text>
              <Text style={styles.patientDetail}>TC: {patient.tcNo || 'Belirtilmemiş'}</Text>
              <Text style={styles.patientDetail}>
                Tel: {patient.phoneNumber || 'Belirtilmemiş'}
              </Text>
            </View>
            <CustomButton
              buttonText="Detaylar"
              setWidth="30%"
              buttonColor="blue"
              pressedButtonColor="darkblue"
              handleOnPress={() => handlePatientSelect(patient)}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          buttonText="Çıkış Yap"
          setWidth="80%"
          buttonColor="red"
          pressedButtonColor="darkred"
          handleOnPress={() => navigation.replace('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.8,
  },
  menuButtons: {
    marginBottom: 20,
    alignItems: 'center',
    gap: 10, // Butonlar arası boşluk
  },
  patientList: {
    flex: 1,
    marginVertical: 20,
  },
  patientCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientDetail: {
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default AdminDashboard;
