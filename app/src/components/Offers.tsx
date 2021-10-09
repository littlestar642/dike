import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
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
        <TouchableOpacity style = {styles.cards}>
        <Image
          style={{height:150, width: 300}}
          source={{ uri: 'https://cdn-images-1.medium.com/max/1200/1*v5SYqjYEdQMPIwNduRrnCw.png' }}
        /> 
        </TouchableOpacity>
        <TouchableOpacity style = {styles.cards}>
        <Image
          style={{height:150, width:300}}
          source={{ uri: 'https://www.deccanherald.com/sites/dh/files/article_images/2018/12/15/file70rohmh1zgz1ayirr267-1544881758.jpg' }}
        /> 
        </TouchableOpacity>
        <TouchableOpacity style = {styles.cards}>
        <Image
          style={{height:150, width:300}}
          source={{ uri: 'https://mma.prnewswire.com/media/534936/Ferns_N_Petals_Logo.jpg?p=facebook' }}
        /> 
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
    marginTop: 20,
    backgroundColor: "white",
    width: 300,
    margin: 10,
    height: 150,
    borderRadius: 10,
    resizeMode:"stretch"
  },
});
