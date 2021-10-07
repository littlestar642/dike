import React from 'react';

import Main from './navigation/Main';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  let isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </>
  );
}
