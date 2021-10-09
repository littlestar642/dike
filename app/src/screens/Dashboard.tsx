import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackParams } from "../navigation/Main";
import Authentication, { AuthState } from "../util/Authentication";
import ConsentScreen from "./ConsentScreen";

type Props = {
    navigation: StackNavigationProp<MainStackParams>
}

type States = {
    isLoading: boolean;
    isConsentTaken: boolean;
}

class Dashboard extends React.Component<Props, States> {
    private auth: Authentication | undefined;

    constructor (props: Props) {
        super (props);
        this.state = {
            isLoading: true,
            isConsentTaken: false
        };
    }
    
    componentDidMount () {
        this.auth = new Authentication((state) => {
            console.log(state);
            this.updateConsentState(state === AuthState.CONSENTPROVIDED);
        });
    }

    updateConsentState (isConsentTaken: boolean) {
        this.setState(state => {
            return {
                ...state,
                isLoading: false,
                isConsentTaken: isConsentTaken
            };
        });
    }

    componentWillUnmount () {
        this.auth?.releaseInstance();
    }

    render () {
        return (
            <SafeAreaView style={styles.root}>
                { !this.state.isConsentTaken ? (
                    <ConsentScreen />
                ) : (
                    <Text>Consent Taken</Text>
                )
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})

export default Dashboard;