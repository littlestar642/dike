import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const transactionData = [
  { key: 1, date: "", bankName: "", amount: "", paymentMethod: "" },
  { key: 2, date: "", bankName: "", amount: "", paymentMethod: "" },
  { key: 3, date: "", bankName: "", amount: "", paymentMethod: "" },
  { key: 4, date: "", bankName: "", amount: "", paymentMethod: "" },
];

const Transactions = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactionData}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.key}>
            <LinearGradient
              colors={["#29b4d6", "#6dd5ed"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={styles.listitem}
            >
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                {item.key}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Transactions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(210, 242, 249)",
  },
  listitem: {
    flex: 1,
    marginVertical: 1,
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: "rgb(31, 189, 224)",
    borderRadius: 5,
    height: 152,
  },
});
