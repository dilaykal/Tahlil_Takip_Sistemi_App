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

  // Tahlilleri getir
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

      const [tarih] = tarihString.split(' '); // Sadece tarih kısmını alalım
      return tarih; // "18.07.2024" şeklinde döndürecek
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

        tahliller
          .filter(t => t.id !== secilenTahlil.id && t[igTipi])
          .forEach(digerTahlil => {
            const secilenDeger = parseFloat(secilenTahlil[igTipi]);
            const karsilastirilacakDeger = parseFloat(digerTahlil[igTipi]);

            let durum;
            if (secilenDeger === karsilastirilacakDeger) {
              durum = "NORMAL";
            } else if (secilenDeger > karsilastirilacakDeger) {
              durum = "YÜKSEK";
            } else {
              durum = "DÜŞÜK";
            }

            karsilastirmalar[igTipi].push({
              raporTarih: digerTahlil.raporTarih,
              karsilastirilacakDeger: karsilastirilacakDeger,
              durum: durum
            });
          });
      }
    });

    setKarsilastirmaSonuc(karsilastirmalar);
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
                  {new Date(tahlil.raporTarih).toLocaleDateString()}
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
                          {formatTarih(k.raporTarih)} tarihli rapora göre 
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
