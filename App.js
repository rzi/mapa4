import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
const axios = require('axios');

// import Lista from "./components/old/list";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.initData = Data;
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      speed: null,
      timestamp: null,
      Data: [],
      s: 0,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        var d = new Date(position.timestamp);
        var n = d.toString();
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          timestamp: n,
        });
        console.log(
          "timestamp: " +
            n +
            " latitude: " +
            position.coords.latitude +
            " longitude: " +
            position.coords.longitude
        );

        this.state.Data.push({
          id: Math.random().toString(12).substring(0),
          text: new Date(position.timestamp).toString(),
          color: "red",
          text2: position.coords.longitude,
          text3: position.coords.latitude,
        });

        axios
          .get(
            `https://busmapa.ct8.pl/saveToDB.php?time=` +
              this.state.timestamp +
              `&lat=` +
              this.state.latitude +
              `&longitude=` +
              this.state.longitude +
              `&s=0`
          )
          .then((result) => {
            console.log("axios success " + result.data + " timestamp: " + n);
          })
          .catch((err) => {
            console.log("axios failed " + err);
          });
        console.log("this.watchId: " + this.watchId);
      },
      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  findCoordinates = () => {
    console.log("click  odczyt");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        const speed = JSON.stringify(position.coords.speed);

        this.setState({ location });
        this.setState({ latitude });
        this.setState({ longitude });
        this.setState({ speed });
        this.setState({ timestamp: position.timestamp });

        this.state.Data.push({
          id: Math.random().toString(12).substring(0),
          text: new Date(position.timestamp).toString(),
          color: "red",
          text2: position.coords.longitude,
          text3: position.coords.latitude,
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  saveToDB = () => {
    this.state.Data.forEach((value, key, Data1) => {
      console.log(`
            id: ${value.id}
            text: ${value.text}
            color: ${value.color}
            text2: ${value.text2}
            text3: ${value.text3}
            Klucz: ${key}
        `);
    });

    console.log(" clik wyślij");
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.marginLeft}>
        <View style={[styles.menu, { backgroundColor: item.color }]}></View>
        <View style={[styles.menu, { backgroundColor: item.color }]}></View>
        <View style={[styles.menu, { backgroundColor: item.color }]}></View>
      </View>
      <View style={styles.marginLeft}>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.text}>{item.text2}</Text>
        <Text style={styles.text}>{item.text3}</Text>
      </View>
    </View>
  );
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Odczyt GPS</Text>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          <Text>timestamp: {this.state.timestamp}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={this.saveToDB()}>
          <Text style={styles.welcome}>Wyślij do Bazy danych</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}> tabela danych z pozycją GPS </Text>

        <FlatList
          data={this.state.Data.reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    fontSize: 16,
  },
  welcome: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#3333",
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    height: 20,
  },
  title: {
    fontSize: 18,
  },
  header: {
    height: 40,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "orange",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "red",
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 2,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical: 4,
    fontSize: 16,
    marginLeft: 4,
  },
});
