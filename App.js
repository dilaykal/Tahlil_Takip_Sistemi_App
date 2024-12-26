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

// Özel tema renkleri
const theme = {
  primary: '#FF69B4',       // Pembe tonu
  secondary: '#FF1493',     // Koyu pembe
  background: '#FFFFFF',    // Beyaz
  text: '#FFFFFF',         // Beyaz metin
  headerBackground: '#FF69B4', // Header arka plan
};

const Stack = createStackNavigator();

const navigationTheme = {
  dark: false,
  colors: {
    primary: theme.primary,
    background: theme.background,
    card: theme.headerBackground,
    text: theme.text,
    border: 'transparent',
  },
};

// Özel header stil ayarları
const screenOptions = {
  headerStyle: {
    backgroundColor: theme.headerBackground,
    elevation: 0, // Android gölgesini kaldır
    shadowOpacity: 0, // iOS gölgesini kaldır
    borderBottomWidth: 0,
  },
  headerTintColor: theme.text,
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  cardStyle: { backgroundColor: theme.background },
  headerShadowVisible: false,
};

const App = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.headerBackground}
        translucent={true}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Kuaför Salonu',
            headerTitleStyle: {
              ...screenOptions.headerTitleStyle,
              fontSize: 22,
            },
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Giriş Yap',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Kayıt Ol',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{
            title: 'Yönetici Girişi',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            title: 'Yönetici Paneli',
            headerLeft: null,
            gestureEnabled: false,
            animation: 'fade_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;