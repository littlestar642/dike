import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';

import { AuthStackParams } from '../../navigation/Main';
import Authentication, { AuthState } from '../../util/Authentication';
import PhoneVerification from '../../components/Authentication/PhoneVerification';

export type ViewProps = {} | undefined;

type Props = {
    navigation: NativeStackNavigationProp<AuthStackParams>;
    route: ViewProps;
};

type States = {
    verifyRequestSent: boolean;
};

class LoginScreen extends React.Component<Props, States> {
    private phoneVerifier: React.RefObject<PhoneVerification>;
    private navigation: NativeStackNavigationProp<AuthStackParams>;
    private auth: Authentication;

    constructor (props: Props) {
        super(props);
        this.state = {
            verifyRequestSent: false
        };
        this.navigation = props.navigation;
        this.phoneVerifier = React.createRef();
        this.auth = new Authentication();
        this.auth.signOut();
        this.navigation.addListener('focus', (event) => {
            this.auth.signOut();
        })
    }
    
    componentDidMount() {
        this.auth.userRegisterStateUpdateCallback = ((authState) => {this.updateAuthState(authState)});
    }

    async sendPhoneVerifyRequest () {
        await this.phoneVerifier.current?.sendPhoneVerifyRequest();
    }

    updateVerificationSentState (verificationSentState: boolean) {
        if (this.state.verifyRequestSent !== verificationSentState) {
            this.setState(state => {
                return {
                    ...state,
                    verifyRequestSent: verificationSentState
                };
            });
        }
    }

    updateAuthState(authState: number) {
        console.log('AuthState: ', authState);
        if (authState === AuthState.NOTREGISTERED) {
            this.navigation.navigate('Signup');
        }
    }

    async verifyOtp () {
        await this.phoneVerifier.current?.verifyOtp();
    }

    openSignUpPage () {
        try {
            this.navigation.navigate('Signup');
        } catch (err: any) {
            console.error(err.message);
        }
    }

    render () {
        return (
            <SafeAreaView style={styles.container}>
                {/* <LinearGradient
                    colors={["#2193b0", "#6dd5ed"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cards}
                ></LinearGradient> */}
                <View style={styles.centerVerticleContainer}>
                    <Text style={styles.title}>
                        Dike
                    </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <PhoneVerification
                        ref={this.phoneVerifier}
                        updateSentState={(state: boolean) => {this.updateVerificationSentState(state);}}
                    />
                    {
                        this.state.verifyRequestSent ? (
                            <Button onPress={() => this.verifyOtp()}>Verify Otp</Button>
                        ) : (
                            <Button onPress={() => this.sendPhoneVerifyRequest()}>Login</Button>
                        )
                    }
                    <View style={styles.centerVerticleContainer}>
                    <TouchableWithoutFeedback onPress={() => {this.openSignUpPage()}}>
                        <Text style={styles.link}>
                            Not registered yet! SignUp
                        </Text>
                    </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  centerVerticleContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#2193b0",
  },
});
