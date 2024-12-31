import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import tjmsData from '../data/tjms.json';
import tjpData from '../data/tjp.json';
import apData from '../data/ap.json';     
import cilvData from '../data/cilv.json';
import osData from '../data/os.json';
import CustomButton from '../component/CustomButton';

import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TahlilSorgulaScreen = ({navigation}) => {
  const [ay, setAy] = useState('');
  const [secilenTest, setSecilenTest] = useState('IgA');
  const [deger, setDeger] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const testTipleri = ['IgA', 'IgG', 'IgM', 'IgG1', 'IgG2', 'IgG3', 'IgG4'];

  const karsilastir = () => {
    if (!ay || !deger) {
      alert('Lütfen yaş (ay olarak) ve test değerini giriniz');
      return;
    }
  
    setLoading(true);
    setSonuc(null);
  
    try {
      console.log('Sorgu başlıyor...', {
        girilenYas: ay,
        secilenTest: secilenTest,
        girilenDeger: deger
      });
  
      const kilavuzlar = [
        { name: 'TJMS', data: tjmsData },
        { name: 'TJP', data: tjpData },
        { name: 'AP', data: apData },   
        { name: 'CILV', data: cilvData },
        { name: 'OS', data: osData },  
      ];
      
      let sonuclar = [];
  
      kilavuzlar.forEach(kilavuz => {
        try {
          console.log(`${kilavuz.name} kılavuzu kontrol ediliyor...`);
          
          const data = kilavuz.data[0];
          if (data && data[secilenTest]) {
            const testVerileri = data[secilenTest];
            const yasInt = parseInt(ay);
            
            // Uygun aralığı bul
            const bulunanAralik = testVerileri.find(aralik => 
              yasInt >= aralik.min_age_months && 
              yasInt <= aralik.max_age_months
            );
      
            if (bulunanAralik) {
              console.log('Uygun aralık bulundu:', bulunanAralik);
              
              const degerNum = parseFloat(deger);
              let durum = '';
              
              if (degerNum < bulunanAralik.min_val) {
                durum = 'DÜŞÜK';
              } else if (degerNum > bulunanAralik.max_val) {
                durum = 'YÜKSEK';
              } else {
                durum = 'NORMAL';
              }
      
              sonuclar.push({
                kilavuz: kilavuz.name,
                referansAralik: `${bulunanAralik.min_val} - ${bulunanAralik.max_val}`,
                durum: durum,
                yasAraligi: `${bulunanAralik.min_age_months}-${bulunanAralik.max_age_months} ay`
              });
            } else {
              console.log(`${kilavuz.name} kılavuzunda ${yasInt} ay için uygun aralık bulunamadı`);
            }
          } else {
            console.log(`${kilavuz.name} kılavuzunda ${secilenTest} verisi bulunamadı`);
          }
        } catch (innerError) {
          console.error(`${kilavuz.name} işlenirken hata:`, innerError);
        }
      });
  
      console.log('Bulunan sonuçlar:', sonuclar);
      setSonuc(sonuclar);
      
    } catch (error) {
      console.error('Ana hata:', error);
      alert(`Sorgulama sırasında bir hata oluştu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderTestTipiPicker = () => (
    <Modal
      visible={showPicker}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowPicker(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Test Tipi Seçin</Text>
          {testTipleri.map((tip) => (
            <TouchableOpacity
              key={tip}
              style={styles.modalItem}
              onPress={() => {
                setSecilenTest(tip);
                setShowPicker(false);
              }}
            >
              <Text style={[styles.modalItemText, secilenTest === tip && styles.selectedItemText]}>
                {tip}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowPicker(false)}
          >
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tahlil Sorgulama</Text>
      
      <View style={styles.formContainer}>
        {/* Yaş Input */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Yaş (ay):</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 36"
            value={ay}
            onChangeText={setAy}
            keyboardType="numeric"
          />
        </View>
  
        {/* Test Tipi Seçici */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Test:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.pickerButtonText}>{secilenTest}</Text>
          </TouchableOpacity>
        </View>
  
        {/* Test Değeri Input */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Değer:</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 6.67"
            value={deger}
            onChangeText={setDeger}
            keyboardType="numeric"
          />
        </View>
  
        <TouchableOpacity
          style={styles.button}
          onPress={karsilastir}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Sorgulanıyor..." : "Sorgula"}
          </Text>
        </TouchableOpacity>
      </View>
  
      {sonuc && sonuc.length > 0 && (
        <View style={styles.sonucContainer}>
          {sonuc.map((item, index) => (
            <View key={index} style={styles.sonucItem}>
              <View style={styles.sonucHeader}>
                <Text style={styles.kilavuzAdi}>{item.kilavuz}:</Text>
                <Text style={[
                  styles.durumText,
                  item.durum === 'NORMAL' ? styles.normalDurum :
                  item.durum === 'DÜŞÜK' ? styles.dusukDurum : 
                  styles.yuksekDurum
                ]}>
                  {item.durum}
                </Text>
              </View>
              <Text style={styles.referansText}>Ref: {item.referansAralik}</Text>
              <Text style={styles.referansText}>Yaş: {item.yasAraligi}</Text>
            </View>
          ))}
        </View>
      )}
      <CustomButton
            buttonText="Geri"
            setWidth="40%"
            buttonColor="gray"
            pressedButtonColor="darkgray"
            handleOnPress={() => navigation.goBack()}
            />
        
      {renderTestTipiPicker()}
      </View>
  );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
      color: '#2c3e50',
    },
    formContainer: {
      marginBottom: 10,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      color: '#34495e',
      width: 60,
    },
    input: {
      flex: 1,
      height: 35,
      borderWidth: 1,
      borderColor: '#bdc3c7',
      borderRadius: 5,
      paddingHorizontal: 8,
      fontSize: 14,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
    },
    sonucContainer: {
      marginTop: 10,
    },
    sonucItem: {
      backgroundColor: '#f8f9fa',
      padding: 8,
      borderRadius: 5,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: '#e9ecef',
    },
    sonucHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    kilavuzAdi: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#2c3e50',
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
    },
    referansText: {
      fontSize: 12,
      color: '#7f8c8d',
      marginTop: 1,
    },
    noDataText: {
      fontSize: 16,
      color: '#95a5a6',
      textAlign: 'center',
      marginTop: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: '#2c3e50',
    },
    modalItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e9ecef',
    },
    modalItemText: {
      fontSize: 16,
      color: '#2c3e50',
    },
    selectedItemText: {
      color: '#007AFF',
      fontWeight: 'bold',
    },
    closeButton: {
      marginTop: 15,
      padding: 15,
      backgroundColor: '#007AFF',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default TahlilSorgulaScreen;
