import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen, {
  ViewProps as LoginProps,
} from "../screens/Authentication/LoginScreen";
import SignupScreen, {
  ViewProps as SignupProps,
} from "../screens/Authentication/SignupScreen";
import Authentication, { AuthState } from "../util/Authentication";
import UserProfileScreen from "../screens/UserProfileScreen";
import BankDetailsScreen from "../screens/BankDetalisScreen";
import SettingsScreen from "../screens/SettingsScreen";
import InvestmentScreen from "../screens/InvestmentScreen";
import TransactionScreen from "../screens/TransactionScreen";
import MutualFundsScreen from "../screens/MutualFundsScreen";
import Dashboard from "../screens/Dashboard";

export type AuthStackParams = {
  Login: LoginProps;
  Signup: SignupProps;
};

export type MainStackParams = {
  Home: undefined;
  Profile: undefined;
  Bank: undefined;
  Settings: undefined;
  Investment: undefined;
  Transactions: undefined;
  MutualFund: undefined;
  Dashboard: undefined;
};

const AuthStack = createStackNavigator<AuthStackParams>();
const MainStack = createStackNavigator<MainStackParams>();

type States = {
  isAuthComplete: boolean;
};

class Main extends Component<any, States> {
  private auth: Authentication;

  constructor(props: any) {
    super(props);
    this.auth = new Authentication();
    this.state = {
      isAuthComplete: true,
    };
  }

  componentDidMount() {
    this.auth.userRegisterStateUpdateCallback = (authState: number) => {
      this.listenAuthState(authState);
    };
  }

  listenAuthState(authState: number) {
    try {
      this.setState((state) => {
        return {
            isAuthComplete: true// authState >= AuthState.REGISTERED,
        };
      });
    } catch (err) {
      console.log("Main.tsx: ", err);
    }
  }

  render() {
    return this.state.isAuthComplete ? (
      <MainStack.Navigator>
            <MainStack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="Profile"
                component={UserProfileScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="Investment"
                component={InvestmentScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="Transactions"
                component={TransactionScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="Bank"
                component={BankDetailsScreen}
                options={{ headerShown: false }}
            />
      </MainStack.Navigator>
    ) : (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
      </AuthStack.Navigator>
    );
  }
}

export default Main;
