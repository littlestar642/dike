import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const ExpensesOverview = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <View style={styles.container}>
        <Text>helllllloo</Text>
      </View>
      <View style={styles.container}>
        <Text>meeeeeeee</Text>
      </View>
    </View>
  );
};

export default ExpensesOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
