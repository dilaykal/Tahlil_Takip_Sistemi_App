import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const profilePage = () =>{
  return(
    <View style={styles.container}>
      <Text>HomePage</Text>
    </View>
  )
}
export default profilePage
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
