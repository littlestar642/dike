
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackParams } from "../navigation/Main";
import Authentication, { AuthState } from "../util/Authentication";
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
    Menu: {isConsentTaken: boolean},
};

const DashboardNavigator = createMaterialTopTabNavigator<DashboardTabProps>();

type DashboardProps = {
    isConsentTaken: boolean;
}

function TabIcons( route: RouteProp<DashboardTabProps, keyof DashboardTabProps>, focused: boolean, color: string, ) {
    if (route.name === 'Home')
    {
        return <Icon name="home" color={color} />
    }
    if (route.name === 'Menu')
    {
        return <Icon name="menu" color={color} />
    }
}

function DashboardTabs(props: DashboardProps) {
    return (
        <DashboardNavigator.Navigator 
            initialRouteName='Home'
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color}) => {return TabIcons(route, focused, color);},
                tabBarShowLabel: false
            })}
        >
            <DashboardNavigator.Screen
                name='Home'
                component={ props.isConsentTaken ? HomeScreen : ConsentScreen }
            />
            <DashboardNavigator.Screen
                name='Menu'
                component={MenuScreen}
                initialParams={{isConsentTaken: props.isConsentTaken}}
            />
        </DashboardNavigator.Navigator>
    )
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
                <DashboardTabs isConsentTaken={this.state.isConsentTaken} />
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