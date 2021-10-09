import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';

import { useSignin } from '../../util/auth';
import { AuthStackParams } from '../../navigation/Main';
import PhoneVerification from '../../components/Authentication/PhoneVerification';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from '../../util/Authentication';
import Firebase from '../../util/FirebaseUtils';

export type ViewProps = {} | undefined;

type Props = {
    navigation: StackNavigationProp<AuthStackParams>;
    route: ViewProps;
};

type States = {
    username: string;
    usernameError: string;
    isVerificationSent: boolean;
    isSignedIn: boolean;
    isLoading: boolean;
}

class SignupScreen extends React.Component<Props, States> {
    private phoneVerifier: React.RefObject<PhoneVerification>;
    private auth: Authentication;

    constructor(props: Props) {
        super(props);
        this.auth = new Authentication();
        this.phoneVerifier = React.createRef();
        let isSignedIn = Firebase.getInstance().getAuth().currentUser !== null;
        this.state = {
            username: '',
            usernameError: '',
            isSignedIn: isSignedIn,
            isVerificationSent: isSignedIn,
            isLoading: false
        };
    }

    componentWillUnmount() {
        this.auth.releaseInstance();
    }

    updateVerificationSentState(verificationState: boolean) {
        if (this.state.isVerificationSent !== verificationState) {
            this.setState(state => {
                return {
                    ...state,
                    isVerificationSent: verificationState
                };
            });
        }
    }

    async registerUser() {
        if (this.state.username.trim().length === 0) {
            this.setState(state => {
                return {
                    ...state,
                    usernameError: 'Please enter your name'
                }
            })
        } else {
            this.updateLoadingState(true)
            await this.auth.registerUser(this.state.username, this.phoneVerifier.current?.state.mobileNumber || '');
            this.updateLoadingState(false)
        }
    }

    async verifyOtp() {
        this.updateLoadingState(true)
        let signInState = await this.phoneVerifier.current?.verifyOtp();
        this.setState(state => {
            return {
                ...state,
                isSignedIn: signInState || false,
                isLoading: false
            };
        });
    }

    updateName(name: string) {
        this.setState(state => {
            return {
                ...state,
                username: name,
                usernameError: ''
            };
        });
    }

    async requestOTP() {
        this.updateLoadingState(true)
        await this.phoneVerifier.current?.sendPhoneVerifyRequest()
        this.updateLoadingState(false)
    }

    updateLoadingState(st: boolean) {
        this.setState(state => {
            return {
                ...state,
                isLoading: st
            }
        })
    }

    render() {
        let defaultMobile = Firebase.getInstance().getAuth().currentUser?.phoneNumber || '';
        if (this.state.isSignedIn) {
            defaultMobile = defaultMobile.substr(3, 10);
        }
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    label='Name'
                    value={this.state.username}
                    placeholder='Full Name'
                    onChangeText={(name) => { this.updateName(name) }}
                    errorText={this.state.usernameError}
                />
                <PhoneVerification
                    ref={this.phoneVerifier}
                    default={defaultMobile}
                    disableEdit={this.state.isSignedIn}
                    updateSentState={(flag) => { this.updateVerificationSentState(flag) }}
                />
                {
                    !this.state.isSignedIn && !this.state.isVerificationSent &&
                    <Button onPress={() => this.requestOTP()} isLoading={this.state.isLoading}>Request OTP</Button>
                }
                {
                    !this.state.isSignedIn && this.state.isVerificationSent &&
                    <Button onPress={() => this.verifyOtp()} isLoading={this.state.isLoading}>Verify OTP</Button>
                }
                {
                    this.state.isSignedIn && this.state.isVerificationSent &&
                    <Button onPress={() => this.registerUser()} isLoading={this.state.isLoading}>Register</Button>
                }
            </SafeAreaView>
        )
    }
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingRight: 10
    },
});
