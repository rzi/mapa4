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

// import Lista from "./components/old/list";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      timestamp: null,
      Data: [],
    };
  }
  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        var d = new Date(position.timestamp);
        var n = d.toISOString();
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          timestamp: n,
        });
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
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  saveToDB = () => {
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var timestamp = position.coords.timestamp;
      var th = this;
      Data = {
        id: timestamp,
        text: "pozycja gps",
        color: "red",
        text2: latitude,
        text3: longitude,
      };
      this.serverRequest = axios
        .get(
          `https://api.darksky.net/forecast/APIKEY/` +
            latitude +
            `,` +
            longitude +
            `?units=auto`
        )
        .then((result) => {
          // th.setState({
          //   daily: result.data.daily.data,
          //   loading: false,
          //   error: null,
          // });
          console.log("axios success ");
        })
        .catch((err) => {
          // Something went wrong. Save the error in state and re-render.
          this.setState({
            loading: false,
            error: err,
          });
        });
    }
    function error() {
      console.log("geolocation error: " + error.message);
    }
    // navigator.geolocation.getCurrentPosition(success, error);
    navigator.geolocation.getCurrentPosition(success.bind(this), error);
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
    var Data = [
      {
        id: 1,
        text: "Item One",
        color: "red",
        text2: "aaaaa",
        text3: "bbbbbbaaaaaaaaaaaaaaaaaa",
      },
      {
        id: 2,
        text: "Item Two",
        color: "blue",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 3,
        text: "Item Three",
        color: "yellow",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 4,
        text: "Item Four",
        color: "green",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 5,
        text: "Item Five",
        color: "orange",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 6,
        text: "Item Six",
        color: "red",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 7,
        text: "Item Seven",
        color: "blue",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 8,
        text: "Item Eight",
        color: "yellow",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 9,
        text: "Item Nine",
        color: "green",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 10,
        text: "Item Ten",
        color: "orange",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 11,
        text: "Item Eleven",
        color: "red",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 12,
        text: "Item Twelve",
        color: "blue",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 13,
        text: "Item Thirteen",
        color: "yellow",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 14,
        text: "Item Fourteen",
        color: "green",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
      {
        id: 15,
        text: "Item Fifteen",
        color: "orange",
        text2: "aaaaa",
        text3: "bbbbbb",
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Odczyt GPS</Text>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          <Text>timestamp: {this.state.timestamp}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={this.saveToDB(Data)}>
          <Text style={styles.welcome}>Wyślij do Bazy danych</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}> tabela danych z pozycją GPS </Text>

        <FlatList
          data={Data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#3333",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    height: 70,
  },
  title: {
    fontSize: 16,
  },
  header: {
    height: 60,
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
    borderBottomColor: "grey",
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical: 18,
    fontSize: 12,
    marginLeft: 4,
  },
});
