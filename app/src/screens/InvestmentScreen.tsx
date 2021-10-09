import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

const InvestmentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.totalinv}>
          <Text style={{flex: 1, fontSize: 20, fontWeight: "bold", justifyContent:"center" , color: colors.gray}}>
            Total Investment
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "bold",
              justifyContent: "center",
              color: colors.gray
            }}
          >
            Rs 26,208
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invs}>
          <Text style={{ flex: 2.5, fontSize: 15, color: colors.gray }}>Direct Mutual Funds</Text>
          <Text style={styles.invsText}>Rs 10,752</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invs}>
          <Text style={{ flex: 2.5, fontSize: 15, color: colors.gray }}>Fixed Deposit</Text>
          <Text style={styles.invsText}>Rs 15,456</Text>
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
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  totalinv: {
    flex: 1,
    flexDirection: "column",
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
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    color: colors.primary
  },
});
