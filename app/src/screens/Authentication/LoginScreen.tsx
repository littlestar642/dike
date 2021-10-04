import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';

import { AuthStackParams } from '../../navigation/Main';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from '../../util/Authentication';
import PhoneVerification from '../../components/Authentication/PhoneVerification';
import Firebase from '../../util/FirebaseUtils';

type Props = {
    navigation: StackNavigationProp<AuthStackParams>;
};

type States = {
    verifyRequestSent: boolean;
};

class LoginScreen extends React.Component<Props, States> {
    private phoneVerifier: React.RefObject<PhoneVerification>;
    private navigation: StackNavigationProp<AuthStackParams>;
    private authListenerId: number;

    constructor (props: Props) {
        super(props);
        this.state = {
            verifyRequestSent: false
        };
        this.navigation = props.navigation;
        this.phoneVerifier = React.createRef();
        this.authListenerId = -1;
        let auth = new Authentication();
        auth.signOut();
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

    componentDidMount () {
        let firebaseInstance = Firebase.getInstance();
        this.authListenerId = firebaseInstance.addAuthChangeListener(async (user) => {
            if (user !== null) {
                let auth = new Authentication();
                if (!(await auth.isUserRegistered()))
                {
                    this.navigation.navigate('Signup');
                } else {
                    // Redirect to main page
                    Alert.alert('User registered');
                }
            }
        });
    }

    componentWillUnmount () {
        Firebase.getInstance().removeAuthChangeListener(this.authListenerId);
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
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    link: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: '#2193b0'
    }
});
