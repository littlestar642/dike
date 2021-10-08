import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

export default function CircularLoader() {
    return (
        <SafeAreaView>
            <ActivityIndicator
                color={colors.primary}
                size="large"
            />
        </SafeAreaView>
    )
}