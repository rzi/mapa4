import React from "react";
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
} from "react-native";
import Constants from "expo-constants";

const DATA = [];

const getItem = (data, index) => {
  return {
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  };
};

const getItemCount = (data) => {
  return 50;
};

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: "#f9c2ff",
    height: 50,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default VirtualizedListExample;
