import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { CustomButton } from '../component';
import TestComparison from './TestComparison';

const TestItem = ({ test }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.testCard} 
      onPress={() => setExpanded(!expanded)}
    >
      <Text style={styles.testDate}>{test.raporTarih}</Text>
      {expanded && (
        <View>
          {test.IgG && <Text style={styles.testValue}>IgG: {test.IgG}</Text>}
          {test.IgA && <Text style={styles.testValue}>IgA: {test.IgA}</Text>}
          {test.IgM && <Text style={styles.testValue}>IgM: {test.IgM}</Text>}
          {test.IgG1 && <Text style={styles.testValue}>IgG1: {test.IgG1}</Text>}
          {test.IgG2 && <Text style={styles.testValue}>IgG2: {test.IgG2}</Text>}
          {test.IgG3 && <Text style={styles.testValue}>IgG3: {test.IgG3}</Text>}
          {test.IgG4 && <Text style={styles.testValue}>IgG4: {test.IgG4}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const PatientDetails = ({ route, navigation }) => {
  const { patientName } = route.params;
  const [patient, setPatient] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const getPatientData = async () => {
      if (!patientName) return;

      try {
        const patientQuery = query(
          collection(db, 'users'),
          where('name', '==', patientName)
        );
        
        const patientSnapshot = await getDocs(patientQuery);
    
        if (!patientSnapshot.empty) {
          const patientDoc = patientSnapshot.docs[0];
          setPatient(patientDoc.data());
    
          const testResultsRef = collection(patientDoc.ref, 'testResults');
          const testSnapshot = await getDocs(testResultsRef);
    
          const results = testSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          setTestResults(results);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    getPatientData();
  }, [patientName]);

  if (!patient) return <Text>Yükleniyor...</Text>;

  const renderPatientInfo = () => (
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>İsim:</Text>
        <Text style={styles.value}>{patient.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{patient.id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Doğum:</Text>
        <Text style={styles.value}>{patient.birthDate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{patient.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Cinsiyet:</Text>
        <Text style={styles.value}>{patient.gender}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>TC No:</Text>
        <Text style={styles.value}>{patient.tcNo}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Tel:</Text>
        <Text style={styles.value}>{patient.telNo}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Hasta Detayları</Text>
        {renderPatientInfo()}
        
        <Text style={styles.testHeader}>Tahliller</Text>
        <TestComparison testResults={testResults} />
        <FlatList
          data={testResults}
          renderItem={({item}) => <TestItem test={item} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.noData}>Tahlil bilgisi mevcut değil</Text>}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText="Geri"
          setWidth="40%"
          buttonColor="gray"
          pressedButtonColor="darkgray"
          handleOnPress={() => navigation.goBack()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  label: {
    fontWeight: '600',
    width: 80,
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    flex: 1,
  },
  testHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  testDate: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  testValue: {
    fontSize: 14,
    marginTop: 5,
  },
  noData: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default PatientDetails;
