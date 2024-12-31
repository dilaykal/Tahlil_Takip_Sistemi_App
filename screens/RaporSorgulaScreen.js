import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { collection, query, getDocs, orderBy, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import CustomButton from '../component/CustomButton';

const RaporSorgulaScreen = ({ navigation }) => {
  const [tahliller, setTahliller] = useState([]);
  const [secilenTahlil, setSecilenTahlil] = useState(null);
  const [karsilastirmaSonuc, setKarsilastirmaSonuc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tahlilleriGetir = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const testResultsRef = collection(userDocRef, "testResults");
        const q = query(testResultsRef, orderBy("raporTarih", "desc"));
        const querySnapshot = await getDocs(q);

        const tumTahliller = [];
        querySnapshot.forEach((doc) => {
          tumTahliller.push({ id: doc.id, ...doc.data() });
        });

        setTahliller(tumTahliller);
      } catch (error) {
        console.error("Tahliller getirilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    tahlilleriGetir();
  }, []);

  const formatTarih = (tarihString) => {
    try {
      if (!tarihString) return 'Tarih Yok';

      // Tarih string'ini parçalara ayır
      const [gun, ay, yil] = tarihString.split('.');
      
      // Geçerli bir tarih mi kontrol et
      if (!gun || !ay || !yil) return 'Geçersiz Tarih';
      
      // Tarihi formatlı şekilde döndür
      return `${gun.padStart(2, '0')}.${ay.padStart(2, '0')}.${yil}`;
    } catch (error) {
      console.error('Tarih formatlanırken hata:', error);
      return 'Geçersiz Tarih';
    }
  };

  const karsilastirIgDegerleri = (secilenTahlil) => {
    const igTipleri = ['IgG1', 'IgG2', 'IgG3', 'IgG4', 'IgA', 'IgM', 'IgG'];
    const karsilastirmalar = {};

    igTipleri.forEach(igTipi => {
      if (secilenTahlil[igTipi]) {
        karsilastirmalar[igTipi] = [];

        const secilenDeger = parseFloat(secilenTahlil[igTipi]);
        
        tahliller
          .filter(t => t.id !== secilenTahlil.id && t[igTipi])
          .forEach(digerTahlil => {
            const karsilastirilacakDeger = parseFloat(digerTahlil[igTipi]);

            // Sayısal değerleri kontrol et
            if (isNaN(secilenDeger) || isNaN(karsilastirilacakDeger)) {
              return;
            }

            let durum;
            if (Math.abs(secilenDeger - karsilastirilacakDeger) < 0.001) {
              durum = "NORMAL";
            } else if (secilenDeger > karsilastirilacakDeger) {
              durum = "YÜKSEK";
            } else {
              durum = "DÜŞÜK";
            }

            karsilastirmalar[igTipi].push({
              raporTarih: digerTahlil.raporTarih,
              karsilastirilacakDeger,
              durum
            });
          });
      }
    });

    setKarsilastirmaSonuc(karsilastirmalar);
  };

  const formatTarihForDisplay = (date) => {
    try {
      if (!date) return 'Tarih Yok';
      return date.split(' ')[0]; // Sadece tarih kısmını al
    } catch (error) {
      console.error('Tarih gösterimi hatası:', error);
      return 'Geçersiz Tarih';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rapor Sorgula</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <Text style={styles.subtitle}>Tahlil Seçin:</Text>
          <View style={styles.tahlilList}>
            {tahliller.map((tahlil) => (
              <TouchableOpacity
                key={tahlil.id}
                style={[
                  styles.tahlilItem,
                  secilenTahlil?.id === tahlil.id && styles.selectedTahlil
                ]}
                onPress={() => {
                  setSecilenTahlil(tahlil);
                  karsilastirIgDegerleri(tahlil);
                }}
              >
                <Text style={styles.tahlilDate}>
                  {formatTarihForDisplay(tahlil.raporTarih)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {karsilastirmaSonuc && (
            <View style={styles.sonucContainer}>
              <Text style={styles.sonucTitle}>Karşılaştırma Sonuçları</Text>
              <ScrollView style={styles.sonucScroll} nestedScrollEnabled={true}>
                {Object.entries(karsilastirmaSonuc).map(([igTipi, karsilastirmalar]) => (
                  <View key={igTipi} style={styles.sonucItem}>
                    <Text style={styles.igTipi}>{igTipi}: {secilenTahlil[igTipi]}</Text>
                    {karsilastirmalar.map((k, index) => (
                      <View key={index} style={styles.karsilastirmaItem}>
                        <Text style={styles.karsilastirmaDate}>
                          {formatTarihForDisplay(k.raporTarih)} tarihli rapora göre 
                          ({k.karsilastirilacakDeger}): 
                        </Text>
                        <Text style={[
                          styles.durumText,
                          k.durum === 'NORMAL' ? styles.normalDurum :
                          k.durum === 'DÜŞÜK' ? styles.dusukDurum :
                          styles.yuksekDurum
                        ]}>
                          {k.durum}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <CustomButton
            buttonText="Geri"
            setWidth="40%"
            buttonColor="gray"
            pressedButtonColor="darkgray"
            handleOnPress={() => navigation.goBack()}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  tahlilList: {
    marginBottom: 20,
  },
  tahlilItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 8,
  },
  selectedTahlil: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  tahlilDate: {
    fontSize: 14,
  },
  sonucContainer: {
    padding: 10,
  },
  sonucScroll: {
    maxHeight: 300,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  sonucTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sonucItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 8,
  },
  igTipi: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  karsilastirmaItem: {
    marginVertical: 5,
    padding: 5,
  },
  karsilastirmaDate: {
    fontSize: 13,
    color: '#666',
  },
  durumText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  normalDurum: {
    color: '#27ae60',
  },
  dusukDurum: {
    color: '#e74c3c',
  },
  yuksekDurum: {
    color: '#f39c12',
  }
});

export default RaporSorgulaScreen;