import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';

import { useSignin } from '../../util/auth';
import { MainStackParams } from '../../navigation/Main';
import PhoneVerification from '../../components/Authentication/PhoneVerification';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from '../../util/Authentication';

type Props = {
    mobile?: string;
    navigation: StackNavigationProp<MainStackParams>;
};

type States = {
    username: string;
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
            mobile: this.props.mobile || '',
            isSignedIn: this.auth.isSignedIn,
            isVerificationSent: this.auth.isSignedIn
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

    registerUser () {
        console.log('register');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                    <Text>SignUp</Text>
                    <TextInput
                        label='Name'
                        placeholder='Full Name'
                    />
                    <PhoneVerification
                        ref={this.phoneVerifier}
                        default={this.props.mobile}
                        disableEdit={this.state.isSignedIn}
                        updateSentState={this.updateVerificationSentState}
                    />
                    { 
                        !this.state.isSignedIn && !this.state.isVerificationSent && 
                        <Button onPress={() => this.phoneVerifier.current?.sendPhoneVerifyRequest()}>Request OTP</Button>
                    }
                    {
                        !this.state.isSignedIn && this.state.isVerificationSent &&
                        <Button onPress={() => this.phoneVerifier.current?.verifyOtp()}>Verify OTP</Button>
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
