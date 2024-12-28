import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import UserStack from './UserStack';


const RootNavigation = () => {
     const isAuth = false
    return(
       <NavigationContainer>
         {
            !isAuth 
               ? <AuthStack/> //giriş işlemleri yanlış ise
               : <UserStack/> //doğru ise

         }
       </NavigationContainer>
   )
}
export default RootNavigation;
