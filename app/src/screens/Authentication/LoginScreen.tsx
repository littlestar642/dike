import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';

import { MainStackParams } from '../../navigation/Main';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from '../../util/Authentication';
import PhoneVerification from '../../components/Authentication/PhoneVerification';
import Firebase from '../../util/FirebaseUtils';

type Props = {
    navigation: StackNavigationProp<MainStackParams>;
};

type States = {
    verifyRequestSent: boolean;
};

class LoginScreen extends React.Component<Props, States> {
    private phoneVerifier: React.RefObject<PhoneVerification>;
    private navigation: StackNavigationProp<MainStackParams>;

    constructor (props: Props) {
        super(props);
        this.state = {
            verifyRequestSent: false
        };
        this.navigation = props.navigation;
        this.phoneVerifier = React.createRef();
    }

    async sendPhoneVerifyRequest () {
        await this.phoneVerifier.current?.sendPhoneVerifyRequest();
    }

    updateVerificationSentState (verificationSentState: boolean) {
        console.log('verify: ' + verificationSentState);
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
        console.log('loginMount');
        let firebaseInstance = Firebase.getInstance();
        firebaseInstance.addAuthChangeListener((user) => {
            if (user === null) {
                // Alert.alert('No user logged in');
            } else {
                // Alert.alert(`User logged in with UID:\n${user.uid}`);
            }
        });
    }

    async verifyOtp () {
        await this.phoneVerifier.current?.verifyOtp();
    }

    openSignUpPage () {
        try {
            this.navigation.push('Signup');
        } catch (err: any) {
            console.log(err.message);
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
