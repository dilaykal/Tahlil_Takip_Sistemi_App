
//import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import { 
//  HomeScreen,
//  LoginScreen,
//  RegisterScreen,
//  AdminLoginScreen,
//  AdminDashboard 
// } from './screens';


import React from 'react';
import RootNavigation from './navigation/rootNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () =>{
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
);

};

export default App;





// const Stack = createStackNavigator();

// const App = () => {
//   useEffect(() => {
//     async function fetchData() {
//       const querySnapshot = await getDocs(collection(db, "TahlilTakipSistemi"));
//       console.log("Data:", querySnapshot.docs.map(doc => doc.data()));
//     }
//     fetchData();
//   }, []);
//  return (
//    <NavigationContainer>
//      <StatusBar
//        barStyle="light-content"
//        backgroundColor="#007AFF"
//        translucent={true}
//      />
//      <Stack.Navigator
//        initialRouteName="Home"
//        screenOptions={{
//          headerStyle: {
//            backgroundColor: '#007AFF',
//          },
//          headerTintColor: '#fff',
//          headerShown:false,
//          headerTitleStyle: {
//            fontWeight: 'bold',
//          },
//        }}
//      >
//        <Stack.Screen
//          name="Home"
//          component={HomeScreen}
//          options={{ title: 'Ana Sayfa' }}
//        />
//        <Stack.Screen
//          name="Login"
//          component={LoginScreen}
//          options={{ title: 'Kullanıcı Girişi' }}
//        />
//        <Stack.Screen
//          name="Register"
//          component={RegisterScreen}
//          options={{ title: 'Kayıt Ol' }}
//        />
//        <Stack.Screen
//          name="AdminLogin"
//          component={AdminLoginScreen}
//          options={{ title: 'Yönetici Girişi' }}
//        />
//        <Stack.Screen
//          name="AdminDashboard"
//          component={AdminDashboard}
//          options={{
//            title: 'Yönetici Paneli',
//            headerLeft: null,
//          }}
//        />
//      </Stack.Navigator>
//    </NavigationContainer>
//  );
// };

// export default App;