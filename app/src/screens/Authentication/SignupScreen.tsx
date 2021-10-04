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

type Props = {
    navigation: StackNavigationProp<AuthStackParams>;
};

type States = {
    username: string;
    usernameError: string;
    mobile: string;
    isVerificationSent: boolean;
    isSignedIn: boolean;
}

class SignupScreen extends React.Component<Props, States> {
    private phoneVerifier: React.RefObject<PhoneVerification>;
    private auth: Authentication;

    constructor (props: Props) {
        super(props);
        this.auth = new Authentication();
        this.phoneVerifier = React.createRef();
        this.state = {
            username: '',
            usernameError: '',
            mobile: '',
            isSignedIn: this.auth.isSignedIn || false,
            isVerificationSent: this.auth.isSignedIn || false
        };
    }

    updateVerificationSentState (verificationState: boolean) {
        if (this.state.isVerificationSent !== verificationState) {
            this.setState(state => {
                return {
                    ...state,
                    isVerificationSent: verificationState
                };
            });
        }
    }

    async registerUser () {
        if (this.state.username === '' || this.state.username.trim().length === 0) {
            this.setState(state => {
                return {
                    ...state,
                    usernameError: 'Please enter your name'
                }
            })
        } else {
            let status = await this.auth.registerUser(this.state.username, this.phoneVerifier.current?.state.mobileNumber || '')
            status && this.loadMain();
        }
    }

    loadMain () {
        // redirect to main screen;
        Alert.alert('User registered');
    }

    componentWillUnmount () {
        this.auth.signOut();
    }

    async verifyOtp () {
        let signInState = await this.phoneVerifier.current?.verifyOtp();
        this.setState(state => {
            return {
                ...state,
                isSignedIn: signInState || false
            };
        });
    }

    updateName (name: string) {
        this.setState(state => {
            return {
                ...state,
                username: name,
                usernameError: ''
            };
        });
    }

    render() {
        let defaultMobile = this.auth.currentUser?.phoneNumber || '';
        if (this.state.isSignedIn) {
            defaultMobile = defaultMobile.substr(defaultMobile.length - 10, 10);
        }
        return (
            <SafeAreaView style={styles.container}>
                    <TextInput
                        label='Name'
                        value={this.state.username}
                        placeholder='Full Name'
                        onChangeText={(name) => {this.updateName(name)}}
                        errorText={this.state.usernameError}
                    />
                    <PhoneVerification
                        ref={this.phoneVerifier}
                        default={defaultMobile}
                        disableEdit={this.state.isSignedIn}
                        updateSentState={(flag) => {this.updateVerificationSentState(flag)}}
                    />
                    { 
                        !this.state.isSignedIn && !this.state.isVerificationSent && 
                        <Button onPress={() => this.phoneVerifier.current?.sendPhoneVerifyRequest()}>Request OTP</Button>
                    }
                    {
                        !this.state.isSignedIn && this.state.isVerificationSent &&
                        <Button onPress={() => this.verifyOtp()}>Verify OTP</Button>
                    }
                    {
                        this.state.isSignedIn && this.state.isVerificationSent &&
                        <Button onPress={() => this.registerUser()}>Register</Button>
                    }
            </SafeAreaView>
        )
    }
}

// const SignupScreen = ({ navigation }: Props) => {
//   const {
//     submit,
//     errors,
//     name,
//     setName,
//     email,
//     setEmail,
//     number,
//     setNumber,
//     password,
//     setPassword,
//     passwordConf,
//     setPasswordConf,
//   } = useSignin();

//   return (
//     <View style={{ flex: 1 }}>
//       <KeyboardAvoidingView behavior="position" style={styles.container}>
//         <TextInput
//           label="Name"
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={(text: string) => setName(text)}
//           errorText={errors.name}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Email Address"
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={(text: string) => setEmail(text)}
//           errorText={errors.email}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Phone Number"
//           placeholder="Enter your phone no."
//           value={number}
//           onChangeText={(text: string) => setNumber(text)}
//           errorText={errors.number}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Password"
//           placeholder="Enter your password"
//           value={password}
//           onChangeText={(text: string) => setPassword(text)}
//           secureTextEntry
//           errorText={errors.password}
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Confirm Password"
//           placeholder="Enter your password again"
//           value={passwordConf}
//           onChangeText={(text: string) => setPasswordConf(text)}
//           secureTextEntry
//           errorText={errors.passwordConf}
//           autoCapitalize="none"
//         />
//         <Button onPress={() => submit(navigation)}>Sign Up</Button>
//         {/* <View style={{ height: 5 }}></View> */}
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingRight: 10
    },
});
