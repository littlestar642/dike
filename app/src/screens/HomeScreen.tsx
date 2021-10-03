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
    padding: 10,
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ExpensesOverview />
      </View>
      <View style={styles.container}>
        <Transactions></Transactions>
      </View>
      <View style={styles.container}>
        <Offers></Offers>
      </View>
    </View>
  );
};

export default HomeScreen;
