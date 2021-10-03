import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import colors from '../constants/colors';
//import { Constants } from 'expo';

const { width } = Dimensions.get('window');

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      //   this.scrollView.scrollTo({ x: -30 });
    }, 1); // scroll view position fix
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        //pagingEnabled={true}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width - 100}
        snapToAlignment={'center'}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}
      >
        <View style={styles.cards} />
        {/* <View style={styles.view2} /> */}
        <View style={styles.cards} />
        {/* <View style={styles.view2} /> */}
        <View style={styles.cards} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cards: {
    marginTop: 30,
    backgroundColor: 'darkgrey',
    width: width - 120,
    margin: 10,
    height: 150,
    borderRadius: 10,
  },
});
