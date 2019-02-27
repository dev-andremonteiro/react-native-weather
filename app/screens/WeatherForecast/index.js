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

const OWMIcon = require("../../../assets/owm_icon.png");

export default class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      cityList: [
        {
          title: "Cuiabá",
          id:"3465038",
          desc: "Nublado",
          temp: "41",
          max: "38",
          min: "15",
          bg: null
        },
        {
          title: "Brasília",
          id:"3469058",
          desc: "Ensolarado",
          temp: "23",
          max: "38",
          min: "12",
          bg: null
        },
        {
          title: "Castanhal",
          id:"3402591",
          desc: "Ensolarado",
          temp: "23",
          max: "38",
          min: "12",
          bg: null
        },
        {
          title: "San Diego",
          id: "5391811",
          desc: "Ensolarado",
          temp: "23",
          max: "38",
          min: "12",
          bg: null
        }
      ]
    };
  }

  componentWillMount() {
    let cityList = this.state.cityList.map(item => {
      item.bg = this.back();
      return item;
    });
    this.setState({ cityList });
  }

  //Sol Nasce, Sol se Põe (Unix,UTC), Humidade(%), Chance de Chuva(%), Visibilidade(Km), Precipitação(mm), Pressão (hPa)
  transformDate(date) {
    var aestTime = new Date(date * 1000).toLocaleString("en-US", {
      timeZone: "America/Cuiaba"
    });
    aestTime = new Date(aestTime);
    return aestTime;
  }

  back() {
    function s(s) {
      return Math.floor(Math.random() * s).toString();
    }

    return {
      backgroundColor: "hsl(" + s(240) + ", " + s(100) + "%, " + s(30) + "%)"
    };
  }

  render() {
    let screenWidth = Dimensions.get("window").width;

    let forecastHours = [
      { hour: "Now", simbol: "12", temp: "34" },
      { hour: "15", simbol: "12", temp: "36" },
      { hour: "16", simbol: "225", temp: "33" },
      { hour: "17", simbol: "12", temp: "34" },
      { hour: "18", simbol: "12", temp: "36" },
      { hour: "19", simbol: "225", temp: "33" },
      { hour: "20", simbol: "12", temp: "34" },
      { hour: "21", simbol: "12", temp: "36" },
      { hour: "22", simbol: "225", temp: "33" }
    ];

    let forecastDays = [
      { day: "Sexta-Feira", simbol: "659", max: "28", min: "19" },
      { day: "Sexta-Feira", simbol: "659", max: "24", min: "19" },
      { day: "Sexta-Feira", simbol: "659", max: "24", min: "17" },
      { day: "Sexta-Feira", simbol: "659", max: "32", min: "21" },
      { day: "Sexta-Feira", simbol: "659", max: "36", min: "24" },
      { day: "Sexta-Feira", simbol: "659", max: "25", min: "19" },
      { day: "Sexta-Feira", simbol: "659", max: "32", min: "21" },
      { day: "Sexta-Feira", simbol: "659", max: "36", min: "24" },
      { day: "Sexta-Feira", simbol: "659", max: "25", min: "19" },
      { day: "Sexta-Feira", simbol: "659", max: "25", min: "19" }
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
              else this.setState({ page: Math.round(x / screenWidth) });
            }
          }}
          scrollEventThrottle={16}
        >
          <StatusBar barStyle={"light-content"} />
          {this.state.cityList.map((item, index) => (
            <ScrollView
              style={{
                flex: 1,
                width: screenWidth
              }}
              contentContainerStyle={{
                paddingTop: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
              key={item.title + index.toString()}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: screenWidth
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 36
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18
                  }}
                >
                  {item.desc}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 72,
                    fontWeight: "200"
                  }}
                >
                  {item.temp + "º"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: screenWidth,
                  paddingVertical: 10,
                  paddingHorizontal: 15
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "300",
                      color: "#fff"
                    }}
                  >
                    {"Sexta-Feira"}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: "#fff",
                      fontWeight: "600"
                    }}
                  >
                    {"HOJE"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      paddingHorizontal: 15,
                      fontSize: 20,
                      fontWeight: "300",
                      color: "#fff"
                    }}
                  >
                    {item.max}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "200", color: "#aaa" }}
                  >
                    {item.min}
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                style={{
                  width: screenWidth,
                  borderBottomColor: "#fff",
                  borderTopColor: "#fff",
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
                showsHorizontalScrollIndicator={false}
              >
                {forecastHours.map((item2, index2) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                    key={item2.hour + index2.toString()}
                  >
                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10, color: "#fff" }}>
                      {item2.hour}
                    </Text>
                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10,color: "#fff" }}>
                      {item2.simbol}
                    </Text>
                    <Text
                      style={{ paddingHorizontal: 15, paddingVertical: 10,fontWeight: "600", color: "#fff" }}
                    >
                      {item2.temp + "º"}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={{ width: screenWidth }}>
                {forecastDays.map((item3, index3) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 15,
                      paddingVertical: 5
                    }}
                    key={item3.day + index3.toString()}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "200",
                        color: "#fff"
                      }}
                    >
                      {item3.day}
                    </Text>
                    <Text style={{ color: "#fff" }}>{item3.simbol}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          fontSize: 20,
                          fontWeight: "300",
                          color: "#fff"
                        }}
                      >
                        {item3.max}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "200",
                          color: "#aaa"
                        }}
                      >
                        {item3.min}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  width: screenWidth,
                  borderBottomColor: "#fff",
                  borderTopColor: "#fff",
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  padding: 15,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "200",
                    lineHeight: 20
                  }}
                >
                  {
                    "Hoje: Temporais isolados no momento. A temperatura é de 21º; a máxima hoje foi prevista como 28º."
                  }
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: screenWidth
                }}
              >
                {forecastDetails.map((item4, index4) => (
                  <View
                    style={[
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 15,
                        borderBottomColor: "#fff",
                        borderBottomWidth: StyleSheet.hairlineWidth
                      },
                      index4 === 3 ? { borderBottomWidth: 0 } : null
                    ]}
                    key={"subarray" + index4.toString()}
                  >
                    {item4.map(i => (
                      <View style={{ flex: 1, padding: 10 }} key={i.title}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "300",
                            color: "#aaa"
                          }}
                        >
                          {i.title}
                        </Text>
                        <Text style={{ fontSize: 28, color: "#fff" }}>
                          {i.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          ))}
        </ScrollView>
        <View
          style={{
            borderTopColor: "#fff",
            borderTopWidth: StyleSheet.hairlineWidth,
            width: screenWidth,
            height: 40,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 15
          }}
        >
          <Image
            source={OWMIcon}
            resizeMode={"contain"}
            style={{ height: 20, width: 20 }}
          />
          <View style={{ flexDirection: "row",aligItems: "center", justifyContent: "center" }}>
            {this.state.cityList.map((item5, index5) => (
              <View 
              style={{
                backgroundColor: `rgba(255,255,255,${(index5===this.state.page)?"0.5":"0.2"})`,
                width: 6,
                height: 6,
                borderRadius: 3,
                margin: 3}}
              key={"bolinha"+index5.toString()}
                />
            ))}
          </View>
          <Ionicons name="ios-list" size={20} color="#fff" />
        </View>
      </View>
    );
  }
}
