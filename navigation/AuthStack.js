import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminDashboard from '../screens/AdminDashboard';
import GuideManagement from '../screens/GuideManagement';
import GuideSearch from '../screens/GuideSearch';
import TahlilSorgulaScreen from '../screens/TahlilSorgulaScreen';


const Stack = createStackNavigator();
const AuthStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName='Login'
            screenOptions={{headerShown:false}}>
            
            <Stack.Screen name= "Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name= "Register" component={RegisterScreen}></Stack.Screen>
            <Stack.Screen name= "AdminLogin" component={AdminLoginScreen}></Stack.Screen>
            <Stack.Screen 
              name="AdminDashboard" 
              component={AdminDashboard}
              options={{ 
                title: 'Doktor Paneli',
                headerLeft: null 
              }}
            />
            <Stack.Screen 
              name="GuideManagement" 
              component={GuideManagement}
              options={{ 
                title: 'Kılavuz Yönetimi',
                //headerLeft: null 
              }}
            />
            <Stack.Screen 
            name="GuideSearch" 
            component={GuideSearch}
            options={{
              title: 'Referans Değer Arama',
              headerStyle: {
                backgroundColor: 'tomato',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="TahlilSorgula" 
            component={TahlilSorgulaScreen}
            options={{
              title: 'TahlilSorgula',
              headerStyle: {
                backgroundColor: 'tomato',
              },
              headerTintColor: '#fff',
            }}
          />       
            

        </Stack.Navigator>
    )
}
export default AuthStack;
