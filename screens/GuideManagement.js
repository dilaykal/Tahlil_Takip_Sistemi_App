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
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      },
      IgM: {
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      },
      IgG: {
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      },
      IgG1: {
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      },
      IgG2: {
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      },
      IgG3: {
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      },
      IgG4: {
        min: 0,
        max: 0,
        geometricMeanSD: { value: '', sd: '' },
        meanSD: { value: '', sd: '' },
        confidenceInterval: { value: '', sd: '' },
        unit: "mg/dl"
      }
    }
  });

  const fetchGuides = async () => {
    try {
      const guidesRef = collection(db, "guides");
      const snapshot = await getDocs(guidesRef);
      const guidesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGuides(guidesList);
    } catch (error) {
      console.error('Kılavuzlar getirilirken hata:', error);
      Alert.alert('Hata', 'Kılavuzlar yüklenirken bir sorun oluştu');
    }
  };

  const handleAddGuide = async () => {
    try {
      // Veriyi hazırla
      const guideData = {
        ageGroup: newGuide.ageGroup,
        values: {
          [selectedIg]: {
            min: parseFloat(newGuide.values[selectedIg].min),
            max: parseFloat(newGuide.values[selectedIg].max),
            geometricMeanSD: {
              value: parseFloat(newGuide.values[selectedIg].geometricMeanSD.value),
              sd: parseFloat(newGuide.values[selectedIg].geometricMeanSD.sd)
            },
            meanSD: {
              value: parseFloat(newGuide.values[selectedIg].meanSD.value),
              sd: parseFloat(newGuide.values[selectedIg].meanSD.sd)
            },
            confidenceInterval: {
              value: parseFloat(newGuide.values[selectedIg].confidenceInterval.value),
              sd: parseFloat(newGuide.values[selectedIg].confidenceInterval.sd)
            },
            unit: "mg/dl"
          }
        }
      };

      // Firestore'a ekle
      await addDoc(collection(db, "guides"), guideData);

      // Başarılı olduğunda
      Alert.alert('Başarılı', 'Yeni kılavuz başarıyla eklendi');
      // State'i resetle
      setNewGuide({
        ageGroup: '',
        values: {
          IgA: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgM: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG1: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG2: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG3: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" },
          IgG4: { min: 0, max: 0, geometricMeanSD: { value: '', sd: '' }, meanSD: { value: '', sd: '' }, confidenceInterval: { value: '', sd: '' }, unit: "mg/dl" }
        }
      });
      // Listeyi yenile
      fetchGuides();
    } catch (error) {
      console.error('Kılavuz eklenirken hata:', error);
      Alert.alert('Hata', 'Kılavuz eklenirken bir sorun oluştu');
    }
  };

  const handleDeleteGuide = async (guideId) => {
    try {
      await deleteDoc(doc(db, "guides", guideId));
      Alert.alert('Başarılı', 'Kılavuz silindi');
      fetchGuides(); // Listeyi yenile
    } catch (error) {
      console.error('Silme işleminde hata:', error);
      Alert.alert('Hata', 'Kılavuz silinirken bir sorun oluştu');
    }
  };

  const ValueInputGroup = ({ ig, values, onChange }) => {
    return (
      <View style={styles.valueGroupContainer}>
        <Text style={styles.valueLabel}>{ig}</Text>
        <View style={styles.inputColumn}>
          <CustomTextInput
            title="Min-Max"
            handleValue={`${values.min} - ${values.max}`}
            handleOnChangeText={(text) => {
              const [min, max] = text.split('-').map(t => parseFloat(t.trim()));
              onChange(ig, 'min', min || 0);
              onChange(ig, 'max', max || 0);
            }}
            width="100%"
          />
          
          <CustomTextInput
            title="Geometric Mean SD"
            handleValue={`${values.geometricMeanSD.value} ± ${values.geometricMeanSD.sd}`}
            handleOnChangeText={(text) => {
              const [value, sd] = text.split('±').map(t => parseFloat(t.trim()));
              onChange(ig, 'geometricMeanSD', { value, sd });
            }}
            width="100%"
          />
          
          <CustomTextInput
            title="Mean SD"
            handleValue={`${values.meanSD.value} ± ${values.meanSD.sd}`}
            handleOnChangeText={(text) => {
                const [value, sd] = text.split('±').map(t => parseFloat(t.trim()));
                onChange(ig, 'meanSD', { value, sd });
              }}
            width="100%"
          />
          
          <CustomTextInput
            title="95% Confidence Interval"
            handleValue={`${values.confidenceInterval.value} ± ${values.confidenceInterval.sd}`}
            handleOnChangeText={(text) => {
              const [value, sd] = text.split('±').map(t => parseFloat(t.trim()));
              onChange(ig, 'confidenceInterval', { value, sd });
            }}
            width="100%"
          />
        </View>
      </View>
    );
  };
  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Kılavuz Yönetimi</Text>

        <View style={styles.igSelectContainer}>
          <Text style={styles.igSelectLabel}>İmmünoglobulin Türü Seçin:</Text>
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
                        // Değerlerin kopyasını oluştur
                        const updatedValues = {...prev.values};
                        
                        // Farklı alan tiplerini kontrol et
                        if (typeof value === 'object') {
                            // meanSD, geometricMeanSD gibi alanlarda
                            updatedValues[ig][field] = {
                                value: isFinite(value.value) ? value.value : 0,
                                sd: isFinite(value.sd) ? value.sd : 0
                            };
                        } else {
                            // min, max gibi sayısal alanlarda
                            updatedValues[ig][field] = isFinite(value) ? value : 0;
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
          <CustomButton
            buttonText="Geri"
            setWidth="40%"
            buttonColor="gray"
            pressedButtonColor="darkgray"
            handleOnPress={() => navigation.goBack()}
        />
        </View>

        <View style={styles.guideList}>
          {guides.map((guide, index) => (
            <View key={index} style={styles.guideItem}>
              <Text style={styles.guideText}>
                Yaş Grubu: {guide.ageGroup}
              </Text>
              <CustomButton
                buttonText="Sil"
                setWidth="50%"
                buttonColor="red"
                pressedButtonColor="darkred"
                handleOnPress={() => handleDeleteGuide(guide)}
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
    padding: 10 // Ekrana daha fazla alan sağlamak için padding'i azaltabilirsiniz
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
    flexWrap: 'wrap', // Elemanların sarmasını sağla
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
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  valueLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 10
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
    marginBottom: 10
  },
  vvalueGroupContainer: {
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
  inputColumn: {
    width: '100%',
    gap: 10  // Inputlar arası boşluk
  }
});

export default GuideManagement;
