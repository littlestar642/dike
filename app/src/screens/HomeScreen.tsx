import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../constants/colors';
import ExpensesOverview from '../components/ExpensesOverview';
import Offers from '../components/Offers';
import Transactions from '../components/Transactions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    // borderTopWidth: 2,
    // borderTopColor: 'grey',
  },
  components1: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    // borderTopWidth: 2,
    // borderTopColor: 'grey',
  },
  componnets2: {
    flex: 1.5,
    backgroundColor: colors.white,
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
  componnets3: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.components1}>
        <ExpensesOverview />
      </View>
      <View style={styles.componnets2}>
        <Transactions></Transactions>
      </View>
      <View style={styles.componnets3}>
        <Offers></Offers>
      </View>
    </View>
  );
};

export default HomeScreen;
