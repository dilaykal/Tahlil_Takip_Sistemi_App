import { StyleSheet, Text, View , TextInput} from "react-native";
import React from "react";


const CustomTextInput = ({title,isSecureText,handleOnChangeText,handleValue,handlePlaceholder }) =>{
    return(
        <View style={styles.inputContainer}>
            <Text style={styles.inputBoxText} >{title}</Text>
            <TextInput 
                placeholder={handlePlaceholder} 
                secureTextEntry={isSecureText}
                style={styles.textInputStyle} 
                keyboardType={
                    title === "E-posta" 
                      ? 'email-address' 
                      : title === "Telefon" 
                        ? 'phone-pad' 
                        : 'decimal-pad'
                  }
                onChangeText={(text) => handleOnChangeText(text)}
                value={handleValue}
            />
        </View>
    )
}
 export default CustomTextInput
 const styles = StyleSheet.create({
    inputContainer:{
        width:'80%'
    },
    inputBoxText:{
        fontWeight:'bold',
        alignSelf:'flex-start',
        color:'white'
    },
    textInputStyle:{
        borderBottomWidth:0.5,
        borderColor:'white',
        width:'100%',
        height:50,
        borderRadius:10,
        marginVertical:10,
        textAlign:'center',
      }
 })



