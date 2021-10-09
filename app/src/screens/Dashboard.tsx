
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularLoader from "../components/Loader";
import colors from "../constants/colors";
import { MainStackParams } from "../navigation/Main";
import Authentication, { AuthState } from "../util/Authentication";
import Firebase from "../util/FirebaseUtils";
import UserData from "../util/UserData";
import ConsentScreen from "./DashboardPages/ConsentScreen";
import HomeScreen from "./DashboardPages/HomeScreen";
import MenuScreen from "./DashboardPages/MenuScreen";
import UserProfileScreen from "./UserProfileScreen";

type Props = {
    navigation: StackNavigationProp<MainStackParams>
}

type States = {
    isLoading: boolean;
    isConsentTaken: boolean;
}

export type DashboardTabProps = {
    Home: undefined,
    Menu: { isConsentTaken: boolean },
};

const DashboardNavigator = createMaterialTopTabNavigator<DashboardTabProps>();

type DashboardProps = {
    isConsentTaken: boolean;
    isLoading: boolean;
}

function TabIcons(route: RouteProp<DashboardTabProps, keyof DashboardTabProps>, focused: boolean, color: string,) {
    if (route.name === 'Home') {
        return <Icon name="home" color={color} />
    }
    if (route.name === 'Menu') {
        return <Icon name="menu" color={color} />
    }
}

function SyncWaitScreen() {
    return (
        <View>
            <CircularLoader />
            <View style={{ alignItems: "center" }}>
                <Text style={{ color: colors.primary }}>
                    Please wait till Dike syncs your Finance Data
                </Text>
            </View>
        </View>
    )
}

function DashboardTabs(props: DashboardProps) {
    console.log(props.isConsentTaken);
    return (
        <DashboardNavigator.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => { return TabIcons(route, focused, color); },
                tabBarShowLabel: false
            })}
        >
            <DashboardNavigator.Screen
                name='Home'
                component={props.isConsentTaken ? (props.isLoading ? SyncWaitScreen : HomeScreen) : ConsentScreen}
            />
            <DashboardNavigator.Screen
                name='Menu'
                component={MenuScreen}
            />
        </DashboardNavigator.Navigator>
    )
}

class Dashboard extends React.Component<Props, States> {
    private auth: Authentication | undefined;
    private releaseDataProcessListener: (() => void) | undefined;

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: true,
            isConsentTaken: false
        };
    }

    componentDidMount() {
        this.auth = new Authentication((state) => {
            this.updateConsentState(state === AuthState.CONSENTPROVIDED);
        });
    }

    updateConsentState(isConsentTaken: boolean) {
        this.setState(state => {
            return {
                ...state,
                isConsentTaken: isConsentTaken
            };
        });
        if (isConsentTaken) {
            let user = Firebase.getInstance().getAuth().currentUser;
            let doc = Firebase.getInstance().getFirestore().doc(`users/${user?.uid}`);
            this.releaseDataProcessListener = doc.onSnapshot(snapshot => {
                let data = snapshot.data();
                if (data != undefined) {
                    let fetchStatus = data.FIDataFetchStatus;
                    if (fetchStatus === 1) {
                        this.dataFetchComplete();
                    }
                }
            })
        }
    }

    async dataFetchComplete() {
        await UserData.instance.refreshData();
        this.setState(state => {
            return {
                ...state,
                isLoading: false
            }
        });
        if (this.releaseDataProcessListener !== null && this.releaseDataProcessListener !== undefined)
            this.releaseDataProcessListener();
    }

    componentWillUnmount() {
        this.auth?.releaseInstance();
    }

    render() {
        return (
            <SafeAreaView style={styles.root}>
                <DashboardTabs isConsentTaken={this.state.isConsentTaken} isLoading={this.state.isLoading} />
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