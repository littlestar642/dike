import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ExpensesOverview = () => {
  const numerator = 100;
  const denomenator = 200;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <View style={styles.container1}>
        <Text style={styles.number1}>{numerator}</Text>
        <Text style={styles.number2}>{denomenator}</Text>
      </View>
      <View style={styles.container2}>
        <View style={styles.rows}></View>
        <View style={styles.rows}></View>
        <View style={styles.rows}></View>
      </View>
    </View>
  );
};

export default ExpensesOverview;

const styles = StyleSheet.create({
  container1: {
    flex: 2,
    backgroundColor: "rgb(210, 242, 249)",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 3,
    backgroundColor: "rgb(210, 242, 249)",
    padding: 10,
  },
  number1: {
    flex: 1,
    borderBottomWidth: 2,
    paddingTop: 30,
    fontSize: 50,
    color: "rgb(6, 38, 45)",
  },
  number2: {
    flex: 1,
    fontSize: 50,
    marginBottom: 20,
    color: "rgb(6, 38, 45)",
  },
  rows: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgb(15, 94, 112)",
  },
});
