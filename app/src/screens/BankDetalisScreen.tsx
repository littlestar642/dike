import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
class BankDetailsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Text style={{ flex: 1, justifyContent: "center" }}>Bank Details</Text>
      </SafeAreaView>
    );
  }
}

export default BankDetailsScreen;
