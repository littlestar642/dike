import React from "react";
import { SafeAreaView, Text } from "react-native";

interface SettingsScreenProps {}

interface SettingsScreenState {}

class SettingsScreen extends React.Component<
  SettingsScreenProps,
  SettingsScreenState
> {
  render() {
    return (
      <SafeAreaView>
        <Text style={{ flex: 1, justifyContent: "center" }}>Settings</Text>
      </SafeAreaView>
    );
  }
}

export default SettingsScreen;
