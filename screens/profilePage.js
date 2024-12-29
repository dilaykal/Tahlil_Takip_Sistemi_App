import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilePage = () =>{
  return(
    <View style={styles.container}>
      <Text>HomePage</Text>
    </View>
  )
}
export default ProfilePage;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
