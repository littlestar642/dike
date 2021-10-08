import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../constants/colors";
//import { Constants } from 'expo';
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

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
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}
      >
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={["#2193b0", "#6dd5ed"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.cards}
          ></LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={["#2193b0", "#6dd5ed"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.cards}
          ></LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={["#2193b0", "#6dd5ed"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.cards}
          ></LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(210, 242, 249)",
  },
  cards: {
    marginTop: 30,
    backgroundColor: "darkgrey",
    width: width - 120,
    margin: 10,
    height: 150,
    borderRadius: 10,
  },
});
