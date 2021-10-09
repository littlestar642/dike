import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../../constants/colors";
import ExpensesOverview from "../../components/ExpensesOverview";
import Offers from "../../components/Offers";
import Transactions from "../../components/Transactions";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  components1: {
    backgroundColor: colors.primaryDark,
    padding: 10,
  },
  componnets2: {
    flex: 1.5,
    backgroundColor: "rgb(210, 242, 249)",
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: "rgb(120, 215, 237)",
  },
  componnets3: {
    flex: 1,
    backgroundColor: "rgb(210, 242, 249)",
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: "rgb(120, 215, 237)",
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.components1}>
        <ExpensesOverview />
      </View>
      <View style={styles.componnets2}>
      <Text style={{color: colors.gray, fontSize: 22, textAlign:"center"}}> Recent Transactions </Text>
        <Transactions></Transactions>
      </View>
      <View style={styles.componnets3}>
        <Text style={{color: colors.gray, fontSize: 22, textAlign:"center"}}> Offers </Text>
        <Offers></Offers>
      </View>
    </View>
  );
};

export default HomeScreen;
