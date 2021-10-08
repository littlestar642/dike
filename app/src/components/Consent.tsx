import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView, { WebViewNavigation } from 'react-native-webview';
import URLs from '../constants/urls';
import Authentication from '../util/Authentication';
import CircularLoader from './Loader';

type ConsentProps = {
}

type ConsentState = {
    consentUrl: string
}

class Consent extends React.Component<ConsentProps, ConsentState> {
    constructor (props: ConsentProps) {
        super(props);
        this.state = {
            consentUrl: ""
        };
    }

    componentDidMount () {
        this.loadConsentForm();
    }

    async loadConsentForm() {
        let auth = new Authentication();
        let url = await auth.getConsent();
        if (url !== "")
        {
            this.setState (state => {
                return {
                    ...state,
                    consentUrl: url
                }
            })
        }
    }

    viewStateChange (navigation: WebViewNavigation) {
        if (navigation.url === URLs.redirect) {
            console.log("success");
        }
        console.log(navigation.url);
    }

    render () {
        return (
            <View style={{flex: 1}}>
                {this.state.consentUrl === "" ? (
                    <CircularLoader />
                ) : (
                    <WebView
                        source={{
                            uri: this.state.consentUrl
                        }}
                        startInLoadingState={true}
                        renderLoading={() => (
                            <CircularLoader />
                        )}
                        onNavigationStateChange={this.viewStateChange}
                        style={{flex: 1}}
                    />
                )}
            </View>
        )
    }
}

export default Consent;