import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import Consent from "../../components/Consent";

export default function ConsentScreen() {
    let [isClicked, updateClick] = useState(false);
    return (
        <View style={{flex: 1}}>
            { isClicked ? (
                <Consent />
            ) : (
                <View style={{margin: 10, justifyContent: "center", flex: 1}}>
                    <Text style={{fontSize: 16, paddingBottom: 30}}>
                        Please provide consent for Account Aggregator to let Dike use your data. 
                    </Text>
                    <Button onPress={() => updateClick(true)}>Provide Consent to Dike</Button>
                </View>
            )}
        </View>
    );
}