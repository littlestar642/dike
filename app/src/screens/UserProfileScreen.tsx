import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MainStackParams } from "../navigation/Main";
import Firebase from "../util/FirebaseUtils";
import UserData from "../util/UserData";

type Props = {
  navigation: StackNavigationProp<MainStackParams>;
};

export default class UserProfileScreen extends Component<Props> {
  profileData;
  constructor (props: Props) {
    super(props);
    this.profileData = UserData.instance.profileDetails
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.profileData === null ? (
            <View style={styles.headerContent}>
              <Text>Let Dike fetch bank data from Account Aggregator</Text>
            </View>
          ) : (
          <View style={styles.headerContent}>
            <Text style={styles.name}> {this.profileData.name} </Text>
            <TouchableOpacity>
              <Text style={styles.userInfo}>{this.profileData.dob} </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.userInfo}> {this.profileData.mobile} </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.userInfo}>{this.profileData.pan} </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.userInfo}>{this.profileData.email} </Text>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </View>
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
