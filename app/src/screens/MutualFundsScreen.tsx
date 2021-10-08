import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MutualFundsScreen = () => {
  const funds = [{}];
  return (
    <SafeAreaView style={{ flex: 1, padding: 2 }}>
      <FlatList
        data={funds}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.key}>
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              {item.key}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default MutualFundsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 2,
  },
  card: {
    width: 370,
    height: 200,
    backgroundColor: "lightblue",
    marginHorizontal: 5,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
