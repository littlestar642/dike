import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Chart from "../components/Chart";

interface SettingsScreenProps {}

interface SettingsScreenState {}

class SettingsScreen extends React.Component<
  SettingsScreenProps,
  SettingsScreenState
> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={{ flex: 1, justifyContent: "center" }}>Settingss</Text>
        {/* <Chart /> */}
      </SafeAreaView>
    );
  }
}

export default SettingsScreen;
