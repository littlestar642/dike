import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';

import { AuthStackParams } from '../../navigation/Main';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication, { AuthState } from '../../util/Authentication';
import PhoneVerification from '../../components/Authentication/PhoneVerification';
import Firebase from '../../util/FirebaseUtils';
import { LinearGradient } from "expo-linear-gradient";

export type ViewProps = {} | undefined;

type Props = {
    navigation: StackNavigationProp<AuthStackParams>;
    route: ViewProps;
};

type States = {
    verifyRequestSent: boolean;
    loadingState: boolean;
};

class LoginScreen extends React.Component<Props, States> {
    private phoneVerifier: React.RefObject<PhoneVerification>;
    private navigation: StackNavigationProp<AuthStackParams>;
    private auth: Authentication;

    constructor(props: Props) {
        super(props);
        this.state = {
            verifyRequestSent: false,
            loadingState: false,
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
        this.auth.userRegisterStateUpdateCallback = ((authState) => { this.updateAuthState(authState) });
    }

    componentWillUnmount() {
        this.auth.releaseInstance();
    }

    async sendPhoneVerifyRequest() {
        this.setState(state => {
            return {
                ...state,
                loadingState: true
            }
        })
        await this.phoneVerifier.current?.sendPhoneVerifyRequest();
        this.setState(state => {
            return {
                ...state,
                loadingState: false
            }
        })
    }

    updateVerificationSentState(verificationSentState: boolean) {
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
        if (authState === AuthState.NOTREGISTERED) {
            this.navigation.navigate('Signup');
        }
    }

    async verifyOtp() {
        this.setState(state => {
            return {
                ...state,
                loadingState: true
            }
        })
        await this.phoneVerifier.current?.verifyOtp();
        this.setState(state => {
            return {
                ...state,
                loadingState: false
            }
        })
    }

    openSignUpPage() {
        try {
            this.navigation.navigate('Signup');
        } catch (err: any) {
            console.error(err.message);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerVerticleContainer}>
                    <Text style={styles.title}>
                        Dike
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <PhoneVerification
                        ref={this.phoneVerifier}
                        updateSentState={(state: boolean) => { this.updateVerificationSentState(state); }}
                    />
                    {
                        this.state.verifyRequestSent ? (
                            <Button onPress={() => this.verifyOtp()} isLoading={this.state.loadingState}>Verify Otp</Button>
                        ) : (
                            <Button onPress={() => this.sendPhoneVerifyRequest()} isLoading={this.state.loadingState}>Login
                            </Button>
                        )
                    }
                    <View style={styles.centerVerticleContainer}>
                        <TouchableWithoutFeedback onPress={() => { this.openSignUpPage() }}>
                            <Text style={styles.link}>
                                Not registered yet! Sign Up
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
        justifyContent:"center",
        marginTop:20,
    },
    title: {
        fontSize: 42,
        fontWeight: "bold",
        color:"#5AD1FC",
        marginTop:"50"
    },
    link: {
        fontSize: 18,
        textDecorationLine: "underline",
        color: "#2193b0",
        marginTop: 5,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom:0
    }
});
