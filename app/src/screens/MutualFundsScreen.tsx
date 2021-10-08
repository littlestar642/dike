import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MutualFundsScreen = () => {
  const funds = [
    {
      fundName: "Sexist Bank misogny fund",
      currentValue: "$96",
      currentGain: "$69",
      annualReturn: "420%",
    },
    {
      fundName: "Sexist Bank misogny fund",
      currentValue: "$96",
      currentGain: "$69",
      annualReturn: "420%",
    },
    {
      fundName: "Sexist Bank misogny fund",
      currentValue: "$96",
      currentGain: "$69",
      annualReturn: "420%",
    },
    {
      fundName: "Sexist Bank misogny fund",
      currentValue: "$96",
      currentGain: "$69",
      annualReturn: "420%",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, padding: 2 }}>
      <FlatList
        data={funds}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTop}>
              <Text
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  paddingTop: 20,
                  fontWeight: "bold",
                }}
              >
                {item.fundName}
              </Text>
            </View>
            <View style={styles.cardBottom}>
              <View style={styles.cardBottomCol}>
                <Text style={styles.colContent}>
                  Current {"\n"} Value {"\n"} {item.currentValue}
                </Text>
              </View>
              <View style={styles.cardBottomCol}>
                <Text style={styles.colContent}>
                  Current {"\n"} Gain {"\n"} {item.currentGain}
                </Text>
              </View>
              <View style={styles.cardBottomCol}>
                <Text style={styles.colContent}>
                  Annual {"\n"} Return {"\n"} {item.annualReturn}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default MutualFundsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 2,
  },
  card: {
    width: 370,
    height: 200,
    backgroundColor: "lightblue",
    marginHorizontal: 5,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
  },
  cardTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottom: {
    flex: 2,
    flexDirection: "row",
  },
  cardBottomCol: {
    flex: 1,
    paddingBottom: 10,
  },
  colContent: {
    fontSize: 20,
    padding: 20,
  },
});
