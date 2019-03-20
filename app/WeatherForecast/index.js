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
import { fetchWeatherData, pageChange } from "../actions";

const OWMIcon = require("../../assets/owm_icon.png");
const weatherIcons = {
  "01d": require("../../assets/weather/01d.png"),
  "01n": require("../../assets/weather/01n.png"),
  "02d": require("../../assets/weather/02d.png"),
  "02n": require("../../assets/weather/02n.png"),
  "04d": require("../../assets/weather/04d.png"),
  "04n": require("../../assets/weather/04n.png"),
  "09d": require("../../assets/weather/09d.png"),
  "09n": require("../../assets/weather/09n.png"),
  "10d": require("../../assets/weather/10d.png"),
  "10n": require("../../assets/weather/10n.png"),
  "11d": require("../../assets/weather/11d.png"),
  "11n": require("../../assets/weather/11n.png"),
  "13d": require("../../assets/weather/13d.png"),
  "13n": require("../../assets/weather/13n.png"),
  "50d": require("../../assets/weather/50d.png"),
  "50n": require("../../assets/weather/50n.png")
};

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
  if (!string) return;
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
      bgs: []
    };
  }

  componentDidMount() {
    let bgs = [];
    for (let i = 0; i < this.props.cities.list.length; i++) {
      bgs.push(this.generateBackgroundColor());
    }
    this.setState({ bgs });

    this.props.fetchData(this.props.cities.list[this.props.cities.page].id);
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

  roundNumber = num => (num ? Math.round(num) : "0");

  render() {
    let forecastDetails = [];

    if (this.props.cities.currentWeather.dt) {
      let sR = this.transformDate(this.props.cities.currentWeather.sys.sunrise);
      let sS = this.transformDate(this.props.cities.currentWeather.sys.sunset);

      function lessThanTen(num) {
        if (num < 10) return "0" + num.toString();
        return num;
      }

      forecastDetails = [
        [
          {
            title: "SUN STARTS",
            text: `${lessThanTen(sR.getHours())}:${lessThanTen(
              sR.getMinutes()
            )}`
          },
          {
            title: "SUN ENDS",
            text: `${lessThanTen(sS.getHours())}:${lessThanTen(
              sS.getMinutes()
            )}`
          }
        ],
        [
          {
            title: "HUMIDITY",
            text: `${this.props.cities.currentWeather.main.humidity}%`
          },
          {
            title: "RAIN CHANCE",
            text: `${100 - this.props.cities.currentWeather.clouds.all}%`
          }
        ],
        [
          {
            title: "VISIBILITY",
            text: `${this.props.cities.currentWeather.visibility / 1000} km`
          },
          { title: "PRECIPITATION", text: `${0} mm` }
        ],
        [
          {
            title: "PRESSURE",
            text: `${this.props.cities.currentWeather.main.pressure}`
          }
        ]
      ];
    }

    return (
      <View style={[{ flex: 1 }, this.state.bgs[this.props.cities.page]]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          contentOffset={{ x: screenWidth * this.props.cities.page, y: 0 }}
          onScroll={event => {
            let x = event.nativeEvent.contentOffset.x;
            if (x > 0) {
              if (Math.round(x / screenWidth) === this.props.cities.page)
                return;
              else {
                this.props.changePage(Math.round(x / screenWidth));
              }
            }
          }}
          scrollEventThrottle={16}
        >
          <StatusBar barStyle={"light-content"} />
          {this.props.cities.list.map((item, index) => (
            <ScrollView
              style={styles.container}
              contentContainerStyle={{
                paddingTop: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
              key={item.title + index.toString()}
            >
              <Text style={[styles.text, { fontSize: 36 }]}>{item.title}</Text>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {capitalizeFirstLetter(
                  this.props.cities.currentWeather.weather[0].description
                )}
              </Text>
              <Text style={styles.textBigTemp}>
                {this.roundNumber(this.props.cities.currentWeather.main.temp)}
              </Text>

              <View style={[styles.lineSpaced, styles.container]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end"
                  }}
                >
                  <Text style={[styles.textDay, { fontWeight: "300" }]}>
                    {this.props.cities.currentWeather.dt &&
                      days[
                        this.transformDate(
                          this.props.cities.currentWeather.dt
                        ).getDay()
                      ]}
                  </Text>
                  <Text style={[styles.textBoldWhite, { paddingLeft: 10 }]}>
                    {"TODAY"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textTempWhite}>
                    {this.roundNumber(
                      this.props.cities.currentWeather.main.temp_max
                    )}
                  </Text>
                  <Text style={styles.textTempGray}>
                    {this.roundNumber(
                      this.props.cities.currentWeather.main.temp_min
                    )}
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                style={[styles.topBottomWhiteBorder, styles.container]}
                showsHorizontalScrollIndicator={false}
              >
                {this.props.cities.currentWeather.hourList.map(
                  (item2, index2) => {
                    const iconURL = item2.weather[0].icon;
                    const hourString =
                      index2 === 0
                        ? "Now"
                        : this.transformDate(item2.dt).getHours();
                    const tempString = this.roundNumber(item2.main.temp) + "º";

                    return (
                      <View
                        style={[styles.lineSpaced, { flexDirection: "column" }]}
                        key={item2.hour + index2.toString()}
                      >
                        <Text style={styles.text}>{hourString}</Text>
                        <Image
                          style={{ height: 24, width: 24, marginVertical: 20 }}
                          source={weatherIcons[iconURL]}
                        />
                        <Text style={styles.textBoldWhite}>{tempString}</Text>
                      </View>
                    );
                  }
                )}
              </ScrollView>
              <View style={styles.container}>
                {this.props.cities.currentWeather.list.map((item3, index3) => {
                  const iconURL = item3.weather[0].icon;
                  const dayString = days[this.transformDate(item3.dt).getDay()];

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
                          source={weatherIcons[iconURL]}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          flex: 1
                        }}
                      >
                        <Text style={styles.textTempWhite}>
                          {this.roundNumber(item3.main.temp_max)}
                        </Text>
                        <Text style={styles.textTempGray}>
                          {this.roundNumber(item3.main.temp_min)}
                        </Text>
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
                    "Today: Heavy rain and storm. Enjoy your time and visit my github. Temperature now is 21ºC; maximum today was 28ºC."
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
            {this.props.cities.list.map((item5, index5) => (
              <View
                style={[
                  styles.ball,
                  {
                    backgroundColor: `rgba(255,255,255,${
                      index5 === this.props.cities.page ? "0.5" : "0.2"
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
    fetchData: id => dispatch(fetchWeatherData(id)),
    changePage: n => dispatch(pageChange(n))
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
