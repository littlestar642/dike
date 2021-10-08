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

export type AuthStackParams = {
  Login: LoginProps;
  Signup: SignupProps;
  Home: undefined;
  Profile: undefined;
  Bank: undefined;
  Settings: undefined;
  Investment: undefined;
  Transactions: undefined;
};

const MainStack = createStackNavigator<AuthStackParams>();

type States = {
  isAuthComplete: boolean;
};

class Main extends Component<any, States> {
  private auth: Authentication | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      isAuthComplete: false,
    };
  }

  componentDidMount() {
    this.auth = new Authentication((authState: number) => {
      this.listenAuthState(authState);
    });
  }

  listenAuthState(authState: number) {
    try {
      this.setState((state) => {
        return {
          isAuthComplete: authState === AuthState.REGISTERED,
        };
      });
    } catch (err) {
      console.log("Main.tsx: ", err);
    }
  }

  render() {
    return (
      <MainStack.Navigator>
        {
          /* {this.state.isAuthComplete }*/ true ? (
            <>
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
                name="Profile"
                component={UserProfileScreen}
                options={{ headerShown: false }}
              />
              <MainStack.Screen
                name="Settings"
                component={SettingsScreen}
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
                name="Bank"
                component={BankDetailsScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <MainStack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <MainStack.Screen name="Signup" component={SignupScreen} />
            </>
          )
        }
      </MainStack.Navigator>
    );
  }
}

export default Main;
