import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Authentication/LoginScreen';
import SignupScreen from '../screens/Authentication/SignupScreen';
import Firebase from '../util/FirebaseUtils';

export type MainStackParams = {
  Login: undefined;
  Signup: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

class Main extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <MainStack.Screen name="Signup" component={SignupScreen} />
      </MainStack.Navigator>
    );
  }
}

export default Main;
