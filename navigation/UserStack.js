import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';  // Direkt dosyadan import
import ProfilePage from '../screens/ProfilePage';  // Direkt dosyadan import


const Stack =createStackNavigator();
const UserStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Ana Sayfa',
              headerStyle: {
                backgroundColor: 'tomato',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfilePage}
            options={{
              title: 'Profil',
              headerStyle: {
                backgroundColor: 'tomato',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      );
}
export default UserStack
{/* <Stack.Navigator  
            initialRouteName='Home'
            screenOptions={{headerShown:false}}>
            <Stack.Screen name= "Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name= "Profile" component={ProfilePage}></Stack.Screen>

        </Stack.Navigator> */}