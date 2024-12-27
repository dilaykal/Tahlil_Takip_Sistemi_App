import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { 
 HomeScreen,
 LoginScreen,
 RegisterScreen,
 AdminLoginScreen,
 AdminDashboard 
} from './screens';

const Stack = createStackNavigator();

const App = () => {
 return (
   <NavigationContainer>
     <StatusBar
       barStyle="light-content"
       backgroundColor="#007AFF"
       translucent={true}
     />
     <Stack.Navigator
       initialRouteName="Home"
       screenOptions={{
         headerStyle: {
           backgroundColor: '#007AFF',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
       }}
     >
       <Stack.Screen
         name="Home"
         component={HomeScreen}
         options={{ title: 'Ana Sayfa' }}
       />
       <Stack.Screen
         name="Login"
         component={LoginScreen}
         options={{ title: 'Kullanıcı Girişi' }}
       />
       <Stack.Screen
         name="Register"
         component={RegisterScreen}
         options={{ title: 'Kayıt Ol' }}
       />
       <Stack.Screen
         name="AdminLogin"
         component={AdminLoginScreen}
         options={{ title: 'Yönetici Girişi' }}
       />
       <Stack.Screen
         name="AdminDashboard"
         component={AdminDashboard}
         options={{
           title: 'Yönetici Paneli',
           headerLeft: null,
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
};

export default App;