import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default class UserProfileScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Lava_the_sled_dog.jpg",
              }}
            />

            <Text style={styles.name}> Pup </Text>
            <TouchableOpacity>
              <Text style={styles.userInfo}>pup@mail.com </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.userInfo}> +91-6969696969 </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/glyph-neue/64/000000/home.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/color/70/000000/administrator-male.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Settings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/emoji/48/000000/bank-emoji.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Bank Details</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/ios-filled/50/000000/logout-rounded.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Sign out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "rgb(210, 242, 249)",
    flex: 1,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "50%",
    height: "50%",
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "rgb(6, 38, 45)",
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
    fontStyle: "italic",
    color: "rgb(6, 38, 45)",
    fontWeight: "bold",
  },
  userInfo: {
    marginVertical: 5,
    fontSize: 20,
    color: "rgba(6, 38, 45,0.7)",
    fontWeight: "bold",
  },
  body: {
    flex: 1.1,
    backgroundColor: "#2193b0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  item: {
    flexDirection: "row",
    marginVertical: 5,
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 24,
    marginTop: 20,
    color: "#FFFFFF",
  },
});
