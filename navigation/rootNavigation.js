import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import { useSelector } from 'react-redux';

const RootNavigation = () => {

   const {isAuth} = useSelector((state)=>state.user)
   
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
