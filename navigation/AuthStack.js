import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';



const Stack = createStackNavigator();
const AuthStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName='Login'
            screenOptions={{headerShown:false}}>
            
            <Stack.Screen name= "Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name= "Register" component={RegisterScreen}></Stack.Screen>
            

        </Stack.Navigator>
    )
}
export default AuthStack;
