import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GetStarted from './GetStarted';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import SignInScreen from './SignInScreen';
import AddPatient from './AddPatient';
import SlidingWindowScreen from './SlidingWindowScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define the Drawer navigator with DashboardScreen and SlidingWindowScreen
const DrawerNavigator = () => {
 return (
  <NavigationContainer>
  <Drawer.Navigator initialRouteName="DashboardScreen">
    <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
    <Drawer.Screen name="SlidingWindowScreen" component={SlidingWindowScreen} />
    {/* Add other screens as Drawer.Screen components */}
  </Drawer.Navigator>
</NavigationContainer>
 );
};

const App = () => {
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPatient" component={AddPatient} options={{ headerShown: false }}/>
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SlidingWindowScreen" component={SlidingWindowScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
 );
};

export default App;
