import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import CustomButton from '../component/CustomButton';
import { useNavigation } from '@react-navigation/native';

 // auth'u doğru şekilde import edin
import { signOut } from 'firebase/auth';
const HomeScreen = () => {

  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedTahlil, setSelectedTahlil] = useState(null);

  // Çıkış yapma fonksiyonu
  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Çıkış işlemi
      console.log('Çıkış başarılı');
      navigation.replace('Login');  // Giriş ekranına yönlendir
    } catch (error) {
      console.error('Çıkış işlemi sırasında hata:', error.message);
    }
  };
  // Firebase'den veri çekme işlemi
  const getData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Kullanıcı oturum açmamış!");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const testResultsCollectionRef = collection(userDocRef, "testResults");

      const querySnapshot = await getDocs(testResultsCollectionRef);
      const testResults = [];

      querySnapshot.forEach((doc) => {
        testResults.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      if (testResults.length === 0) {
        console.log("Bu kullanıcı için test sonuçları bulunamadı.");
      } else {
        console.log("Test Sonuçları:", testResults);
      }

      setData(testResults);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  const handleTahlilPress = (tahlil) => {
    setSelectedTahlil(tahlil === selectedTahlil ? null : tahlil);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tahlil Sonuçları</Text>

      {data && data.length > 0 ? (
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => handleTahlilPress(item)}
              style={styles.cardHeader}
            >
              <Text style={styles.cardTitle}>Rapor Tarihi: {item.raporTarih}</Text>
            </TouchableOpacity>

            {selectedTahlil === item && (
              <View style={styles.cardDetails}>
                <Text style={styles.cardContent}>Rapor No: {item.raporNo}</Text>
                {item.NumuneTürü && (
                  <Text style={styles.cardContent}>Numune Türü: {item.NumuneTürü}</Text>
                )}
                {item.TetkikİstemZamani && (
                  <Text style={styles.cardContent}>Tetkik İstem Zamanı: {item.TetkikİstemZamanı}</Text>
                )}
                {item.NumuneAlmaZamanı && (
                  <Text style={styles.cardContent}>Numune Alma Zamanı: {item.NumuneAlmaZamanı}</Text>
                )}
                {item.NumuneKabulZamanı && (
                  <Text style={styles.cardContent}>Numune Kabul Zamanı: {item.NumuneKabulZamanı}</Text>
                )}
                {item.UzmanOnayZamanı && (
                  <Text style={styles.cardContent}>Uzman Onay Zamanı: {item.UzmanOnayZamanı}</Text>
                )}

                {(item.IgG1 || item.IgG2 || item.IgG3 || item.IgG4) && (
                  <>
                    <Text style={styles.cardTitle}>İmmünoglobulin G Alt Grupları:</Text>
                    {item.IgG1 && <Text style={styles.cardContent}>IgG1: {item.IgG1}</Text>}
                    {item.IgG2 && <Text style={styles.cardContent}>IgG2: {item.IgG2}</Text>}
                    {item.IgG3 && <Text style={styles.cardContent}>IgG3: {item.IgG3}</Text>}
                    {item.IgG4 && <Text style={styles.cardContent}>IgG4: {item.IgG4}</Text>}
                  </>
                )}

                {(item.IgA || item.IgM || item.IgG) && (
                  <>
                    <Text style={styles.cardTitle}>Diğer İmmünoglobulinler:</Text>
                    {item.IgA && <Text style={styles.cardContent}>IgA: {item.IgA}</Text>}
                    {item.IgM && <Text style={styles.cardContent}>IgM: {item.IgM}</Text>}
                    {item.IgG && <Text style={styles.cardContent}>IgG: {item.IgG}</Text>}
                  </>
                )}
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Henüz test sonucu bulunmamaktadır</Text>
      )}

      <CustomButton
        buttonText={"Tahlilleri Görüntüle"}
        setWidth={"40%"}
        buttonColor={'blue'}
        pressedButtonColor={'gray'}
        handleOnPress={getData}
      />

      <CustomButton
        buttonText="Rapor Sorgula"
        setWidth="40%"
        buttonColor="blue"
        pressedButtonColor="gray"
        handleOnPress={() => navigation.navigate('RaporSorgula')}
      />

      <CustomButton
        buttonText="Profil"
        setWidth="40%"
        buttonColor="blue"
        pressedButtonColor="gray"
        handleOnPress={() => {
          const user = auth.currentUser;
          if (user) {
            navigation.navigate('Profile');
          } else {
            console.log("Kullanıcı oturum açmamış");
            navigation.navigate('Login');
          }
        }}
      />

      {/* Çıkış Yap Butonu */}
      <CustomButton
        buttonText="Çıkış Yap"
        setWidth="40%"
        buttonColor="red"
        pressedButtonColor="gray"
        handleOnPress={handleSignOut}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});
