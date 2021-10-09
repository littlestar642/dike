import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { MainStackParams } from '../../navigation/Main';
import Authentication, { AuthState } from '../../util/Authentication';
import Firebase from '../../util/FirebaseUtils';
import { DashboardTabProps } from '../Dashboard';

type MenuProps = {
    navigation: MaterialTopTabNavigationProp<DashboardTabProps>;
};

type MenuStates = {
    isConsentGiven: boolean;
}

type MenuItemProps = {
    onPress: () => void;
    children: string;
};

function MenuItem({onPress=()=>{}, children=''}: MenuItemProps) {
    return (
        <TouchableOpacity onPress={onPress} style={{padding: 10, marginRight: 20, marginLeft: 20, borderBottomColor: colors.background, borderBottomWidth: 1}}>
            <Text style={{fontSize: 20}}>{children}</Text>
        </TouchableOpacity>
    )
}

class MenuScreen extends React.Component<MenuProps, MenuStates> {
    private auth: Authentication | undefined;

    constructor (props: MenuProps) {
        super(props);
        this.state = {
            isConsentGiven: false
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
                isConsentGiven: isConsentTaken
            };
        });
    }

    componentWillUnmount () {
        this.auth?.releaseInstance();
    }

    navigateToScreen(name: keyof MainStackParams) {
        if (this.state.isConsentGiven)
            this.props.navigation.getParent<StackNavigationProp<MainStackParams>>()?.navigate(name);
        else
            ToastAndroid.show('Please give consent to Dike for access', ToastAndroid.LONG);
    }

    render () {
        return (
            <SafeAreaView style={{ flex: 1, margin: 0, backgroundColor: colors.primaryDark }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingBottom: 30, paddingTop: 0, backgroundColor: colors.primaryDark}}>
                    <Text style={{fontSize: 14, color: '#fff'}}>
                        Logged in as:
                    </Text>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{fontSize: 24, color: '#fff'}}>
                            {Firebase.getInstance().getAuth().currentUser?.displayName}
                        </Text>
                        <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>
                            {Firebase.getInstance().getAuth().currentUser?.phoneNumber}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <MenuItem onPress={() => {this.navigateToScreen('Bank');}}>Bank Details</MenuItem>
                    <MenuItem onPress={() => {this.navigateToScreen('Transactions');}}>Your Transactions</MenuItem>
                    <MenuItem onPress={() => {this.navigateToScreen('Investment');}}>Your Investments</MenuItem>
                    <MenuItem onPress={() => {this.navigateToScreen('MutualFund');}}>Your Mutual Funds</MenuItem>
                    <MenuItem onPress={() => {Firebase.getInstance().getAuth().signOut()}}>Sign Out</MenuItem>
                </View>
            </SafeAreaView>
        )
    }
}

export default MenuScreen;