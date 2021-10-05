import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from "../constants/colors";
import ExpensesOverview from "../components/ExpensesOverview";
import Offers from "../components/Offers";
import Transactions from "../components/Transactions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(210, 242, 249)",
    paddingHorizontal: 5,
    // borderTopWidth: 2,
    // borderTopColor: 'grey',
  },
  components1: {
    flex: 1,
    backgroundColor: "rgb(210, 242, 249)",
    padding: 10,
    // borderTopWidth: 2,
    // borderTopColor: 'grey',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.components1}>
        <ExpensesOverview />
      </View>
      <View style={styles.componnets2}>
        <Transactions></Transactions>
      </View>
      <View style={styles.componnets3}>
        <Offers></Offers>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
