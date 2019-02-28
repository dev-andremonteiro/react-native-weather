import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";
import { fetchWeatherData } from "../../actions";

const OWMIcon = require("../../../assets/owm_icon.png");
const iconRequest = "https://openweathermap.org/img/w/";

const screenWidth = Dimensions.get("window").width;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function capitalizeFirstLetter(string) {
  let words = [];
  string.split(" ").forEach(word => {
    words.push(word[0].toUpperCase() + word.slice(1));
  });
  return words.join(" ");
}

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      cityList: [
        {
          title: "Cuiabá",
          id: "3465038",
          bg: null
        },
        {
          title: "Brasília",
          id: "3469058",
          bg: null
        },
        {
          title: "Castanhal",
          id: "3402591",
          bg: null
        },
        {
          title: "San Diego",
          id: "5391811",
          bg: null
        }
      ]
    };
  }

  componentDidMount() {
    let cityList = this.state.cityList.map(item => {
      item.bg = this.generateBackgroundColor();
      return item;
    });
    this.setState({ cityList });

    //FETCHING PAGE 0 DATA
    this.props.fetchData(this.state.cityList[0].id.toString());
  }

  transformDate(date) {
    var aestTime = new Date(date * 1000).toLocaleString("en-US", {
      timeZone: "America/Cuiaba"
    });
    aestTime = new Date(aestTime);
    return aestTime;
  }

  generateBackgroundColor() {
    function s(s) {
      return Math.floor(Math.random() * s).toString();
    }

    return {
      backgroundColor: "hsl(" + s(240) + ", " + s(100) + "%, " + s(30) + "%)"
    };
  }

  render() {
    let forecastHours = [
      { hour: "Now", simbol: "02n.png", temp: 34 },
      { hour: "15", simbol: "02n.png", temp: 36 },
      { hour: "16", simbol: "03n.png", temp: 33 },
      { hour: "17", simbol: "02n.png", temp: 34 },
      { hour: "18", simbol: "02n.png", temp: 36 },
      { hour: "19", simbol: "03n.png", temp: 33 },
      { hour: "20", simbol: "02n.png", temp: 34 },
      { hour: "21", simbol: "02n.png", temp: 36 },
      { hour: "22", simbol: "03n.png", temp: 33 }
    ];

    let forecastDays = [
      { day: 0, simbol: "01n.png", max: 24, min: 19 },
      { day: 1, simbol: "02d.png", max: 28, min: 19 },
      { day: 2, simbol: "03d.png", max: 24, min: 17 },
      { day: 3, simbol: "01d.png", max: 32, min: 21 },
      { day: 4, simbol: "02n.png", max: 36, min: 24 },
      { day: 5, simbol: "03d.png", max: 25, min: 19 },
      { day: 6, simbol: "03d.png", max: 32, min: 21 },
      { day: 0, simbol: "02n.png", max: 36, min: 24 },
      { day: 1, simbol: "03d.png", max: 25, min: 19 },
      { day: 2, simbol: "01n.png", max: 25, min: 19 }
    ];

    let forecastDetails = [
      [
        { title: "SUN STARTS", text: "07:07" },
        { title: "SUN ENDS", text: "18:18" }
      ],
      [
        { title: "HUMIDITY", text: "10%" },
        { title: "RAIN CHANCE", text: "40%" }
      ],
      [
        { title: "VISIBILITY", text: "10,0 km" },
        { title: "PRECIPITATION", text: "0 mm" }
      ],
      [{ title: "PRESSURE", text: "1011 hPa" }]
    ];
    //capitalizeFirstLetter(this.props.data.weather[0].description)
    //this.props.data.main.temp.toString() + "º"

    return (
      <View style={[{ flex: 1 }, this.state.cityList[this.state.page].bg]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={event => {
            let x = event.nativeEvent.contentOffset.x;
            if (x > 0) {
              if (Math.round(x / screenWidth) === this.state.page) return;
              else {
                this.setState({ page: Math.round(x / screenWidth) });
              }
            }
          }}
          scrollEventThrottle={16}
        >
          <StatusBar barStyle={"light-content"} />
          {this.state.cityList.map((item, index) => (
            <ScrollView
              style={styles.container}
              contentContainerStyle={{
                paddingTop: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
              key={item.title + index.toString()}
            >
              <Text style={[styles.text, { fontSize: 36 }]}>
                {this.props.weather.name}
              </Text>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {this.props.weather.weather.description}
              </Text>
              <Text style={styles.textBigTemp}>
                {this.props.weather.main.temp}
              </Text>

              <View style={[styles.lineSpaced, styles.container]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end"
                  }}
                >
                  <Text style={[styles.textDay, { fontWeight: "300" }]}>
                    {this.props.weather.dt &&
                      days[this.transformDate(this.props.weather.dt).getDay()]}
                  </Text>
                  <Text style={[styles.textBoldWhite, { paddingLeft: 10 }]}>
                    {"TODAY"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textTempWhite}>
                    {this.props.weather.main.temp_max}
                  </Text>
                  <Text style={styles.textTempGray}>
                    {this.props.weather.main.temp_min}
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                style={[styles.topBottomWhiteBorder, styles.container]}
                showsHorizontalScrollIndicator={false}
              >
                {forecastHours.map((item2, index2) => {
                  const iconURL = iconRequest + item2.simbol;
                  return (
                    <View
                      style={[styles.lineSpaced, { flexDirection: "column" }]}
                      key={item2.hour + index2.toString()}
                    >
                      <Text style={styles.text}>{item2.hour}</Text>
                      <Image
                        style={{ height: 24, width: 24, marginVertical: 20 }}
                        source={{ uri: iconURL }}
                      />
                      <Text style={styles.textBoldWhite}>
                        {" "}
                        {item2.temp + "º"}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.container}>
                {forecastDays.map((item3, index3) => {
                  const iconURL = iconRequest + item3.simbol;
                  const dayString = days[item3.day];
                  return (
                    <View
                      style={[styles.lineSpaced, { paddingVertical: 5 }]}
                      key={item3.day + index3.toString()}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flex: 1.4
                        }}
                      >
                        <Text style={styles.textDay}>{dayString}</Text>
                        <Image
                          style={{ height: 24, width: 24 }}
                          source={{ uri: iconURL }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          flex: 1
                        }}
                      >
                        <Text style={styles.textTempWhite}>{item3.max}</Text>
                        <Text style={styles.textTempGray}>{item3.min}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View
                style={[
                  styles.container,
                  styles.topBottomWhiteBorder,
                  styles.report
                ]}
              >
                <Text style={styles.textReport}>
                  {
                    "Hoje: Temporais isolados no momento. A temperatura é de 21º; a máxima hoje foi prevista como 28º."
                  }
                </Text>
              </View>
              <View style={styles.container}>
                {forecastDetails.map((item4, index4) => (
                  <View
                    style={[
                      styles.details,
                      index4 === 3 ? { borderBottomWidth: 0 } : null
                    ]}
                    key={"subarray" + index4.toString()}
                  >
                    {item4.map(i => (
                      <View style={{ flex: 1, padding: 10 }} key={i.title}>
                        <Text style={[styles.textTempGray, { fontSize: 12 }]}>
                          {" "}
                          {i.title}{" "}
                        </Text>
                        <Text style={[styles.text, { fontSize: 28 }]}>
                          {" "}
                          {i.text}{" "}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Image
            source={OWMIcon}
            resizeMode={"contain"}
            style={{ height: 20, width: 20 }}
          />
          <View style={styles.ballWraper}>
            {this.state.cityList.map((item5, index5) => (
              <View
                style={[
                  styles.ball,
                  {
                    backgroundColor: `rgba(255,255,255,${
                      index5 === this.state.page ? "0.5" : "0.2"
                    })`
                  }
                ]}
                key={"ball" + index5.toString()}
              />
            ))}
          </View>
          <Ionicons name="ios-list" size={20} color="#fff" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    fetchData: id => dispatch(fetchWeatherData(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherForecast);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth
  },
  topBottomWhiteBorder: {
    borderBottomColor: "#fff",
    borderTopColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  lineSpaced: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  //
  //
  textReport: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "200",
    lineHeight: 20
  },
  textBoldWhite: {
    color: "#fff",
    fontWeight: "600"
  },
  textDay: {
    fontSize: 20,
    fontWeight: "200",
    color: "#fff"
  },
  textBigTemp: {
    color: "#fff",
    fontSize: 72,
    fontWeight: "200"
  },
  textTempGray: { fontSize: 20, fontWeight: "200", color: "#aaa" },
  textTempWhite: {
    paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: "300",
    color: "#fff"
  },
  text: {
    color: "#fff"
  },
  //
  //
  report: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  //
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  //
  footer: {
    width: screenWidth,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderTopColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  ballWraper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ball: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 3
  }
});
