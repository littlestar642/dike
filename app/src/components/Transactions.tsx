import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import colors from '../constants/colors';

const Transactions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.container}>dsfsdf</Text>
      <Text style={styles.container}>sdfdsf</Text>
      <Text style={styles.container}>sfdsf</Text>
    </ScrollView>
  );
};

export default Transactions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
