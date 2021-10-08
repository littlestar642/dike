import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Consent from "../components/Consent";
import CircularLoader from "../components/Loader";
import { MainStackParams } from "../navigation/Main";
import Authentication from "../util/Authentication";
import Firebase from "../util/FirebaseUtils";

type Props = {
    navigation: StackNavigationProp<MainStackParams>
}

type States = {
    isLoading: boolean;
    isConsentTaken: boolean;
}

class Dashboard extends React.Component<Props, States> {
    private unsubscribeConsentListener: { (): void; } | null | undefined;

    constructor (props: Props) {
        super (props);
        this.state = {
            isLoading: true,
            isConsentTaken: false
        };
    }

    componentDidMount () {
        this.listenConsentState();

    }
    
    async listenConsentState () {
        let user = Firebase.getInstance().getAuth().currentUser;
        if (user !== null) {
            let userDoc = Firebase.getInstance().getFirestore().doc(`users/${user.uid}`);
            if ((await userDoc.get()).exists)
            {
                this.unsubscribeConsentListener = userDoc.onSnapshot(user => {
                    let fiConsentStatus = user?.data()?.FIDataConsentStatus;
                    if (fiConsentStatus === 1) {
                        this.updateConsentState(true);
                    }
                });
            }
        }
    }

    updateConsentState (isConsentTaken: boolean) {
        this.setState(state => {
            return {
                ...state,
                isLoading: false,
                isConsentTaken: isConsentTaken
            };
        });
        if (isConsentTaken && this.unsubscribeConsentListener !== undefined && this.unsubscribeConsentListener !== null) {
            this.unsubscribeConsentListener();
        }
    }

    render () {
        return (
            <SafeAreaView style={styles.root}>
                { !this.state.isConsentTaken ? (
                    <Consent />
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