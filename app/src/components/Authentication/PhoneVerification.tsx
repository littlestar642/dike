import React from 'react';
import { StyleSheet, View } from 'react-native';
import { default as FirebaseRecaptchaVerifierModal } from '../../util/RecaptchaVerifier';
import config from '../../util/google-services.json';

import { TextInput } from '../../components/Form';

import Authentication from '../../util/Authentication';
import Common from '../../util/CommonUtils';

type Props = {
    default?: string
    disableEdit?: boolean
    updateSentState?: ((state: boolean) => void) | null
};

type States = {
    mobileNumber: string;
    mobileNumberError: string;
    otp: string;
    otpError: string;
    verifyRequestSent: boolean;
    confirmationCallback: ((verificationCode: string) => Promise<boolean>) | null
};

class PhoneVerification extends React.Component<Props, States> {
    private auth: Authentication;
    private recaptchaVerifier: React.RefObject<FirebaseRecaptchaVerifierModal>;

    constructor (props: Props) {
        super(props);
        this.state = {
            mobileNumber: this.props.default || '',
            mobileNumberError: '',
            otp: '',
            otpError: '',
            verifyRequestSent: this.props.disableEdit || false,
            confirmationCallback: null
        };
        this.auth = new Authentication();
        this.recaptchaVerifier = React.createRef();
    }

    updateMobileNumber (mobile: string) {
        if (!(this.props.disableEdit || false)) {
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

    shouldComponentUpdate (_: Props, nextState: States): boolean {
        if (this.props.updateSentState !== null && this.props.updateSentState !== undefined) this.props.updateSentState(nextState.verifyRequestSent);
        return true;
    }

    async sendPhoneVerifyRequest () {
        if (Common.regex.phone.test(this.state.mobileNumber)) {
            try {
                if (this.recaptchaVerifier.current !== null) {
                    let callback = await this.auth.beginPhoneVerification('+91' + this.state.mobileNumber, this.recaptchaVerifier.current);
                    if (callback !== null) {
                        this.setState(state => {
                            return {
                                ...state,
                                verifyRequestSent: true,
                                confirmationCallback: callback,
                            }
                        });
                        return true;
                    }
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
        return false;
    }

    async verifyOtp () {
        if (Common.regex.otp.test(this.state.otp)) {
            try {
                if (this.state.confirmationCallback !== null) {
                    if (!await this.state.confirmationCallback(this.state.otp)) {
                        this.setState(state => {
                            return {
                                ...state,
                                otpError: 'Invalid OTP'
                            };
                        });
                    } else {
                        return true;
                    }
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
        return false;
    }

    render () {
        return (
            <View>
                <View>
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
                    {
                        this.state.verifyRequestSent && !(this.props.disableEdit || false) &&        
                        <TextInput
                        label="OTP"
                        placeholder="6 digit OTP"
                        maxLength={6}
                        value={this.state.otp}
                        onChangeText={(text: string) => this.updateOtp(text)}
                        errorText={this.state.otpError}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        />
                    }
                </View>
                <FirebaseRecaptchaVerifierModal
                    ref={this.recaptchaVerifier}
                    firebaseConfig={config}
                    androidHardwareAccelerationDisabled={true}
                    attemptInvisibleVerification={true}
                />
            </View>
        )
    }
}

export default PhoneVerification;
