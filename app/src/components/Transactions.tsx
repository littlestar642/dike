import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../constants/colors";
import UserData from "../util/UserData";


const Transactions = ({ }) => {
  const data = UserData.instance.transactions.sort((a, b) => { return new Date(a.transactionTimestamp) < new Date(b.transactionTimestamp) ? 1 : -1 });
  let transactionData = data.splice(0, 6);
  return (
    <View style={styles.container}>
      <FlatList
        data={transactionData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listitem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, color: colors.gray }}>
                Ref: {item.reference}
              </Text>
              <Text style={{ color: colors.gray }}>
                Date: {item.valueDate}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5}}>
              <Text style={{ fontSize: 16, color: colors.gray }}>₹ {item.amount}</Text>
              <Text style={{ color: colors.gray }}>Type: {item.type}</Text>
            </View>
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
    backgroundColor: colors.white,
  },
  listitem: {
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 4,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  debit: {
    borderColor: '#f00'
  },
  credit: {
    borderColor: '#0f0'
  },
  listContent: {
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
});
