import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import UserData from "../util/UserData";

const MutualFundsScreen = () => {
  let funds: Array<any> = UserData.instance.mutualFunds?.holdings || [];
  console.log(funds)

  return funds.length == 0 ? (
    <Text>Nothing to show here</Text>
  ) : (<SafeAreaView style={{ flex: 1, padding: 2 }}>
    <FlatList
      data={funds}
      keyExtractor={(item, i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardTop}>
            <Text
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                paddingTop: 20,
                fontWeight: "bold",
              }}
            >
              {item.amc}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View style={styles.cardBottomCol}>
              <Text style={styles.colContent}>
                Closing Units
              </Text>
              <Text style = {styles.colContentBtm}> {item.closingUnits} </Text>
            </View>
            <View style={styles.cardBottomCol}>
              <Text style={styles.colContent}>
                Present Nav rate
              </Text>
              <Text style = {styles.colContentBtm}> Rs {item.nav}  </Text>
            </View>
            <View style={styles.cardBottomCol}>
              <Text style={styles.colContent}>
                Annual Return
              </Text>
              <Text style = {styles.colContentBtm}>Rs {parseInt(item.nav) * parseInt(item.units)} </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  </SafeAreaView>)
};

export default MutualFundsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 2,
  },
  card: {
    flex:1,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
  },
  cardTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottom: {
    flex: 1,
    flexDirection: "row",
  },
  cardBottomCol: {
    flex: 1,
    paddingBottom: 10,
    borderRightWidth: 2,
    borderRightColor:colors.border
  },
  colContent: {
    fontSize: 20,
    padding: 10,
    color: colors.primaryDark,
    textAlign:"center",
    alignItems:"center"
  },
  colContentBtm:{
    fontSize: 20,
    padding: 10,
    textAlign:"center",
    alignItems:"center"
  }
});
