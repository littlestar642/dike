import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Firebase from '../util/FirebaseUtils';

export type MainStackParams = {
  Login: undefined;
  Signup: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export class Main extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Signup" component={SignupScreen} />
      </MainStack.Navigator>
    );
  }
}
