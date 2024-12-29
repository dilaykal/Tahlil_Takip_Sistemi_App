import React from 'react'
import { HomeScreen, profilePage} from "../screens"
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../screens/ProfilePage';

const Stack =createStackNavigator();
const UserStack = () => {
    return(
        <Stack.Navigator  
            initialRouteName='Home'
            screenOptions={{headerShown:false}}>
            <Stack.Screen name= "Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name= "Profile" component={ProfilePage}></Stack.Screen>

        </Stack.Navigator>
    )
}
export default UserStack
