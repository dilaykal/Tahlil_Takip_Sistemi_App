// AdminDashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminDashboard = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Yönetici Paneli</Text>
  
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('GuidelineCreate')}
          >
            <Text style={styles.menuText}>Kılavuz Oluşturma</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('DataEntry')}
          >
            <Text style={styles.menuText}>Veri Girişi</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('GuidelineSearch')}
          >
            <Text style={styles.menuText}>Kılavuz Arama</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PatientTracking')}
          >
            <Text style={styles.menuText}>Hasta Takibi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    inputError: {
      borderColor: 'red',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    adminButton: {
      backgroundColor: '#34C759',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: -10,
      marginBottom: 10,
    },
    menuContainer: {
      marginTop: 20,
    },
    menuItem: {
      backgroundColor: '#f8f9fa',
      padding: 20,
      borderRadius: 8,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#dee2e6',
    },
    menuText: {
      fontSize: 16,
      color: '#212529',
    },
  });
  
  export default AdminDashboard;