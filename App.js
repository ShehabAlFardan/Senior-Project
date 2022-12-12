import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainContainer from './screens/MainContainer';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (    
    <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen  name="Login" component={LoginScreen} options={{headerLeft: ()=> null}}/>
      <Stack.Screen  name="Main" component={MainContainer} options={{headerShown: false}}/>
      <Stack.Screen  name="Home" component={HomeScreen}/>
      <Stack.Screen  name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
