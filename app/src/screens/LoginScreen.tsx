import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    FirebaseRecaptchaVerifierModal,
} from 'expo-firebase-recaptcha';
import config from '../util/google-services.json';

import colors from '../constants/colors';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';

import { MainStackParams } from '../navigation/Main';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from '../util/Authentication';
import Common from '../util/CommonUtils';
import Firebase from '../util/FirebaseUtils';

type Props = {
    navigation: StackNavigationProp<MainStackParams>;
};

type States = {
    mobileNumber: string;
    mobileNumberError: string;
    otp: string;
    otpError: string;
    verifyRequestSent: boolean;
    confirmationCallback: ((verificationCode: string) => Promise<boolean>) | null
};

class LoginScreen extends React.Component<Props, States> {
    private auth: Authentication;
    private recaptchaVerifier: React.RefObject<FirebaseRecaptchaVerifierModal>;

    constructor (props: Props) {
        super(props);
        this.state = {
            mobileNumber: '',
            mobileNumberError: '',
            otp: '',
            otpError: '',
            verifyRequestSent: false,
            confirmationCallback: null
        };
        this.auth = new Authentication();
        this.recaptchaVerifier = React.createRef();
    }

    updateMobileNumber (mobile: string) {
        this.setState(state => {
            return {
                ...state,
                mobileNumber: mobile,
                mobileNumberError: '',
                otp: '',
                otpError: '',
                verifyRequestSent: false,
                confirmationCallback: null
            };
        });
    }

    updateOtp (otp: string) {
        this.setState(state => {
            return {
                ...state,
                otp: otp,
                otpError: ''
            };
        });
    }

    async sendPhoneVerifyRequest () {
        if (Common.regex.phone.test(this.state.mobileNumber)) {
            try {
                if (this.recaptchaVerifier.current !== null) {
                    let callback = await this.auth.beginPhoneVerification('+91' + this.state.mobileNumber, this.recaptchaVerifier.current);
                    this.setState(state => {
                        return {
                            ...state,
                            verifyRequestSent: true,
                            confirmationCallback: callback,
                        }
                    });
                } else {
                    throw Error('Recaptcha Verifier not initialized');
                }
            } catch (err: any) {
                let error = 'Some unknown error occured. Please try again later';
                this.setState(state => {
                    return {
                        ...state,
                        mobileNumberError: error
                    };
                });
                console.error('Phone auth error', err.message);
            }
        } else {
            let error = 'Please enter a valid mobile number';
            this.setState(state => {
                return {
                    ...state,
                    mobileNumberError: error
                };
            });
        }
    }

    componentDidMount () {
        let firebaseInstance = Firebase.getInstance();
        firebaseInstance.addAuthChangeListener((user) => {
            if (user === null) {
                Alert.alert('No user logged in');
            } else {
                Alert.alert(`User logged in with UID:\n${user.uid}`);
            }
        });
    }

    async verifyOtp () {
        if (Common.regex.otp.test(this.state.otp)) {
            try {
                if (this.state.confirmationCallback !== null) {
                    await this.state.confirmationCallback(this.state.otp);
                } else {
                    throw Error('Phone auth verification callback not set');
                }
            } catch (err: any) {
                let error = 'Some unknown error occured. Please try again later';
                this.setState(state => {
                    return {
                        ...state,
                        otpError: error
                    };
                });
                console.error('Phone auth error', err.message);
            }
        } else {
            let error = 'Please enter a valid OTP';
            this.setState(state => {
                return {
                    ...state,
                    otpError: error
                };
            });
        }
    }

    render () {
        return (
            <SafeAreaView style={styles.container}>
                <FirebaseRecaptchaVerifierModal
                    ref={this.recaptchaVerifier}
                    firebaseConfig={config}
                    attemptInvisibleVerification={true}
                />
                <TextInput
                    label="Mobile"
                    placeholder="10 digit mobile number"
                    maxLength={10}
                    value={this.state.mobileNumber}
                    onChangeText={(text: string) => this.updateMobileNumber(text)}
                    errorText={this.state.mobileNumberError}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                />
                <TextInput
                    label="OTP"
                    placeholder="6 digit OTP"
                    maxLength={6}
                    value={this.state.otp}
                    onChangeText={(text: string) => this.updateOtp(text)}
                    errorText={this.state.otpError}
                    keyboardType="decimal-pad"
                    autoCapitalize="none"
                />
                {
                    this.state.verifyRequestSent ? (
                        <Button onPress={() => this.verifyOtp()}>Verify Otp</Button>
                    ) : (
                        <Button onPress={() => this.sendPhoneVerifyRequest()}>Login</Button>
                    )
                }
                <Button onPress={() => this.auth.signOut()}>SignOut</Button>
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
});
