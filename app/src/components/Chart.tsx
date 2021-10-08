import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from "react-native-pie-chart";

export default class Chart extends Component {
  render() {
    const widthAndHeight = 300;
    const series = [500, 400]; //1st : credit, 2nd : debit
    const sliceColor = ["##387df2", "#38e8f2"];

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Debit vs Credit chart</Text>
        <PieChart
          style={styles.chart}
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
        {/* <Text style={styles.title}>Doughnut</Text> */}
        {/* <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.45}
          coverFill={"#FFF"}
        /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  chart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
});
