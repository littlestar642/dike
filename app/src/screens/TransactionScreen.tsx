import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Firebase from "../util/FirebaseUtils";
import UserData from "../util/UserData";
const TransactionScreen = () => {
  //   const db = Firebase.getFirestore;
  //   const [transactionData, setTransactionData] = useState([]);

  //   useEffect(() => {
  //     db.collection("transactions")
  //       .get()
  //       .then((querySnapshot) => {
  //         // Loop through the data and store
  //         // it in array to display
  //         querySnapshot.forEach((element) => {
  //           var data = element.data();
  //           setTransactionData((transactionData) => [...transactionData, data]);
  //         });
  //       });
  //   }, [transactionData]);
  const transactionData = UserData.instance.transactions;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={transactionData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listitem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listContent}>Amount: {item.amount}</Text>
              <Text style={styles.listContent}>Type: {item.type}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.listContent}>
                Balance: {item.currentBalance}
              </Text>
              <Text style={styles.listContent}>
                Reference Number: {item.reference}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listitem: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(31, 189, 224,0.5)",
    borderRadius: 5,
    height: 152,
    backgroundColor: "#6dd5ed",
  },
  listContent: {
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
});
