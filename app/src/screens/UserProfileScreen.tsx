import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import colors from "../constants/colors";
import { MainStackParams } from "../navigation/Main";
import Firebase from "../util/FirebaseUtils";
import UserData from "../util/UserData";

type Props = {
  navigation: StackNavigationProp<MainStackParams>;
};

export default class UserProfileScreen extends Component<Props> {
  profileData;
  constructor(props: Props) {
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
                <Text style={styles.userInfo}>DOB - {this.profileData.dob} </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.userInfo}>MOB - {this.profileData.mobile} </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.userInfo}>PAN - {this.profileData.pan} </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.userInfo}>Mail - {this.profileData.email} </Text>
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
    backgroundColor: colors.white,
    flex: 1,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 32,
    fontStyle: "italic",
    color: colors.primary,
    fontWeight: "bold",
  },
  userInfo: {
    marginVertical: 5,
    fontSize: 20,
    color: colors.primaryDark,
    fontWeight: "bold",
    borderBottomColor:colors.gray,
    borderBottomWidth:2
  },
  body: {
    flex: 1.1,
    backgroundColor: colors.white,
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
