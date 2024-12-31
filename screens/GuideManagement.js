import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Alert,
} from 'react-native';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CustomButton, CustomTextInput } from '../component';

const GuideManagement = ({navigation}) => {
  const [guides, setGuides] = useState([]);
  const [selectedIg, setSelectedIg] = useState('IgG');
  const [newGuide, setNewGuide] = useState({
    ageGroup: '',
    values: {
      IgA: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      },
      IgM: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      },
      IgG: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      },
      IgG1: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      },
      IgG2: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      },
      IgG3: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      },
      IgG4: { 
        min: '', 
        max: '', 
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl" 
      }
    }
  });

  // ... (fetchGuides fonksiyonu aynı kalacak)

  const handleAddGuide = async () => {
    try {
      if (!newGuide.ageGroup.trim()) {
        Alert.alert('Uyarı', 'Lütfen yaş grubunu girin');
        return;
      }

      const guideData = {
        ageGroup: newGuide.ageGroup,
        values: {
          [selectedIg]: {
            min: newGuide.values[selectedIg].min === '' ? 0 : Number(newGuide.values[selectedIg].min.replace(',', '.')),
            max: newGuide.values[selectedIg].max === '' ? 0 : Number(newGuide.values[selectedIg].max.replace(',', '.')),
            geometricMeanSD: {
              value: newGuide.values[selectedIg].geometricMeanSD.value === '' ? 0 : Number(newGuide.values[selectedIg].geometricMeanSD.value.replace(',', '.')),
              sd: newGuide.values[selectedIg].geometricMeanSD.sd === '' ? 0 : Number(newGuide.values[selectedIg].geometricMeanSD.sd.replace(',', '.'))
            },
            meanSD: {
              value: newGuide.values[selectedIg].meanSD.value === '' ? 0 : Number(newGuide.values[selectedIg].meanSD.value.replace(',', '.')),
              sd: newGuide.values[selectedIg].meanSD.sd === '' ? 0 : Number(newGuide.values[selectedIg].meanSD.sd.replace(',', '.'))
            },
            confidenceInterval: {
              value: newGuide.values[selectedIg].confidenceInterval.value === '' ? 0 : Number(newGuide.values[selectedIg].confidenceInterval.value.replace(',', '.')),
              sd: newGuide.values[selectedIg].confidenceInterval.sd === '' ? 0 : Number(newGuide.values[selectedIg].confidenceInterval.sd.replace(',', '.'))
            },
            unit: "mg/dl"
          }
        }
      };

      await addDoc(collection(db, "guides"), guideData);
      Alert.alert('Başarılı', 'Yeni kılavuz başarıyla eklendi');
      
      setNewGuide({
        ageGroup: '',
        values: {
          IgA: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgM: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG1: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG2: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG3: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG4: { min: '', max: '', geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" }
        }
      });
      fetchGuides();
    } catch (error) {
      console.error('Kılavuz eklenirken hata:', error);
      Alert.alert('Hata', 'Kılavuz eklenirken bir sorun oluştu');
    }
  };

  // ... (handleDeleteGuide fonksiyonu aynı kalacak)

  const ValueInputGroup = ({ ig, values, onChange }) => {
    return (
      <View style={styles.valueGroupContainer}>
        <Text style={styles.valueLabel}>{ig}</Text>
        
        {/* Min-Max Inputs */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="Minimum Değer"
              handleValue={values.min}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'min', validText);
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="Min değer"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="Maximum Değer"
              handleValue={values.max}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'max', validText);
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="Max değer"
            />
          </View>
        </View>

        {/* Geometric Mean Inputs */}
        <Text style={styles.subLabel}>Geometric Mean SD</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="Değer"
              handleValue={values.geometricMeanSD.value}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'geometricMeanSD', { ...values.geometricMeanSD, value: validText });
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="Değer"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="SD"
              handleValue={values.geometricMeanSD.sd}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'geometricMeanSD', { ...values.geometricMeanSD, sd: validText });
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="SD"
            />
          </View>
        </View>

        {/* Mean SD Inputs */}
        <Text style={styles.subLabel}>Mean SD</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="Değer"
              handleValue={values.meanSD.value}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'meanSD', { ...values.meanSD, value: validText });
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="Değer"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="SD"
              handleValue={values.meanSD.sd}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'meanSD', { ...values.meanSD, sd: validText });
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="SD"
            />
          </View>
        </View>

        {/* Confidence Interval Inputs */}
        <Text style={styles.subLabel}>95% Confidence Interval</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="Değer"
              handleValue={values.confidenceInterval.value}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'confidenceInterval', { ...values.confidenceInterval, value: validText });
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="Değer"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              title="SD"
              handleValue={values.confidenceInterval.sd}
              handleOnChangeText={(text) => {
                const validText = text.replace(',', '.');
                onChange(ig, 'confidenceInterval', { ...values.confidenceInterval, sd: validText });
              }}
              width="100%"
              keyboardType="decimal-pad"
              handlePlaceholder="SD"
            />
          </View>
        </View>
      </View>
    );
  };

  // ... (geriye kalan component kodu aynı)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Kılavuz Yönetimi</Text>

        <View style={styles.igSelectContainer}>
          <Text style={styles.igSelectLabel}>İmmünoglobulin Türü:</Text>
          {['IgA', 'IgM', 'IgG', 'IgG1', 'IgG2', 'IgG3', 'IgG4'].map((ig) => (
            <CustomButton
              key={ig}
              buttonText={ig}
              setWidth="20%"
              buttonColor={selectedIg === ig ? 'blue' : 'gray'}
              pressedButtonColor={selectedIg === ig ? 'darkblue' : 'darkgray'}
              handleOnPress={() => setSelectedIg(ig)}
            />
          ))}
        </View>

        <View style={styles.newGuideContainer}>
          <CustomTextInput
            title="Yaş Grubu"
            handleOnChangeText={(text) => {
              setNewGuide((prevState) => ({
                ...prevState,
                ageGroup: text
              }));
            }}
            handleValue={newGuide.ageGroup}
            handlePlaceholder="Yaş grubunu girin"
          />

          {Object.keys(newGuide.values)
            .filter(key => key === selectedIg)
            .map((key) => (
              <ValueInputGroup
                key={key}
                ig={key}
                values={newGuide.values[key]}
                onChange={(ig, field, value) => {
                  setNewGuide(prev => {
                    const updatedValues = {...prev.values};
                    if (typeof value === 'object') {
                      updatedValues[ig][field] = value;
                    } else {
                      updatedValues[ig][field] = value;
                    }
                    return {
                      ...prev,
                      values: updatedValues
                    };
                  });
                }}
              />
          ))}

          <CustomButton
            buttonText="Ekle"
            setWidth="80%"
            buttonColor="green"
            pressedButtonColor="darkgreen"
            handleOnPress={handleAddGuide}
          />
        </View>

        <View style={styles.guideList}>
          {guides.map((guide, index) => (
            <View key={index} style={styles.guideItem}>
              <Text style={styles.guideText}>
                Yaş Grubu: {guide.ageGroup}
                {guide.values[selectedIg] && (
                  `\nMin-Max: ${guide.values[selectedIg].min} - ${guide.values[selectedIg].max} ${guide.values[selectedIg].unit}`
                )}
                {guide.values[selectedIg]?.geometricMeanSD && (
                  `\nGeometric Mean: ${guide.values[selectedIg].geometricMeanSD.value} ± ${guide.values[selectedIg].geometricMeanSD.sd}`
                )}
                {guide.values[selectedIg]?.meanSD && (
                  `\nMean: ${guide.values[selectedIg].meanSD.value} ± ${guide.values[selectedIg].meanSD.sd}`
                )}
                {guide.values[selectedIg]?.confidenceInterval && (
                  `\nConfidence Interval: ${guide.values[selectedIg].confidenceInterval.value} ± ${guide.values[selectedIg].confidenceInterval.sd}`
                )}
              </Text>
              <CustomButton
                buttonText="Sil"
                setWidth="50%"
                buttonColor="red"
                pressedButtonColor="darkred"
                handleOnPress={() => handleDeleteGuide(guide.id)}
              />
            </View>
          ))}
        </View>

        <CustomButton
          buttonText="Geri"
          setWidth="40%"
          buttonColor="gray"
          pressedButtonColor="darkgray"
          handleOnPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato'
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  igSelectContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  igSelectLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 10
  },
  newGuideContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20
  },
  valueGroupContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  valueLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  inputContainer: {
    flex: 1
  },
  guideList: {
    width: '100%',
    marginTop: 20
  },
  guideItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  guideText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default GuideManagement;