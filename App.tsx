/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Details from './src/Screens/Details';
import Home from './src/Screens/Home';
import store from './App/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#6e3b6e'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Details"
            options={{title: 'Memes'}}
            component={Details}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
