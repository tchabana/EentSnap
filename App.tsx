import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { StatusBar } from 'react-native';
import Scanner from './src/screens/Scanner';
import RenderQrcode from './src/screens/RenderQrcode';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import TicketDetailsScreen from './src/screens/TicketDetailsScreen';

const Stack = createNativeStackNavigator();
console.log(Stack);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'default'}}
        />
        <Stack.Screen name="scanner" component={Scanner} />
        <Stack.Screen name="renderQrcode" component={RenderQrcode} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;