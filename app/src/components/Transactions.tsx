import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colors from '../constants/colors';

const transactionData = [
  { key: 1, date: '', bankName: '', amount: '', paymentMethod: '' },
  { key: 2, date: '', bankName: '', amount: '', paymentMethod: '' },
  { key: 3, date: '', bankName: '', amount: '', paymentMethod: '' },
  { key: 4, date: '', bankName: '', amount: '', paymentMethod: '' },
];

const Transactions = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactionData}
        renderItem={({ item }) => (
          <View style={styles.listitem} key={item.key}>
            <Text style={{}}>{item.key}</Text>
          </View>
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
    flex: 1,
    marginVertical: 1,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    height: 152,
  },
});
