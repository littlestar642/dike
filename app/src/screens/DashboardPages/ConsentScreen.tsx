import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import Consent from "../../components/Consent";
import colors from "../../constants/colors";

export default function ConsentScreen() {
    let [isClicked, updateClick] = useState(false);
    return (
        <View style={{flex: 1}}>
            { isClicked ? (
                <Consent />
            ) : (
                <View style={{margin: 10, justifyContent: "center", flex: 1}}>
                    <Text style={{fontSize: 16, paddingBottom: 40, color: colors.primaryDark, textAlign:"center"}}>
                        Please provide consent for Account Aggregator to let Dike fetch your financial data. 
                    </Text>
                    <Button onPress={() => updateClick(true)}>Provide Consent to Dike</Button>
                </View>
            )}
        </View>
    );
}