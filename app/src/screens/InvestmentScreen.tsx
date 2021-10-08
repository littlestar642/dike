import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InvestmentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.totalinv}>
          <Text style={{ flex: 2.5, fontSize: 20, fontWeight: "bold" }}>
            Total Investment
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            $10,000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invs}>
          <Text style={{ flex: 2.5, fontSize: 20 }}>Direct Mutual Funds</Text>
          <Text style={styles.invsText}>$5,000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invs}>
          <Text style={{ flex: 2.5, fontSize: 20 }}>Fixed Deposit</Text>
          <Text style={styles.invsText}>$3,000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invsLast}>
          <Text style={{ flex: 2.5, fontSize: 20 }}>NPS</Text>
          <Text style={styles.invsText}>$2,000</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: 10,
          height: 120,
          width: 360,
          flexDirection: "row",
          borderWidth: 0.5,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={{ flex: 1, margin: 30 }}>
          <Text style={{ fontSize: 16 }}>
            Expense Tracker{" "}
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#12c1cb" }}
            >
              {" "}
              Start now{">"}{" "}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, margin: 30 }}>
          <Text style={{ fontSize: 16 }}>
            Bill Tracker{" "}
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#12c1cb" }}
            >
              {" "}
              View Bills{">"}{" "}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvestmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    marginTop: 30,
    height: 350,
    width: 360,
    backgroundColor: "lightblue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  totalinv: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
  },
  invs: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 30,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  invsLast: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  invsText: {
    flex: 1,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
