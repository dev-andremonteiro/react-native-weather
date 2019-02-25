import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";

export default class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //Sol Nasce, Sol se Põe (Unix,UTC), Humidade(%), Chance de Chuva(%), Visibilidade(Km), Precipitação(mm), Pressão (hPa)
  transformDate(date) {
    var aestTime = new Date(date * 1000).toLocaleString("en-US", {
      timeZone: "America/Cuiaba"
    });
    aestTime = new Date(aestTime);
    return aestTime;
  }

  render() {
    let screenWidth = Dimensions.get("window").width;
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onMomentumScrollEnd={() => {}}
      >
        {[
          {
            title: "Cuiabá",
            desc: "Nublado",
            temp: "41",
            max: "38",
            min: "15"
          },
          {
            title: "Brasília",
            desc: "Ensolarado",
            temp: "23",
            max: "38",
            min: "12"
          }
        ].map((item, index) => (
          <ScrollView
            style={{
              backgroundColor: "#333",
              flex: 1,
              width: screenWidth
            }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center"
            }}
            key={item + index.toString()}
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
              {[
                { hour: "Now", simbol: "%¨&", temp: "34" },
                { hour: "15", simbol: "%¨&", temp: "36" },
                { hour: "16", simbol: "*@!", temp: "33" },
                { hour: "17", simbol: "%¨&", temp: "34" },
                { hour: "18", simbol: "%¨&", temp: "36" },
                { hour: "19", simbol: "*@!", temp: "33" },
                { hour: "20", simbol: "%¨&", temp: "34" },
                { hour: "21", simbol: "%¨&", temp: "36" },
                { hour: "22", simbol: "*@!", temp: "33" }
              ].map((item2, index2) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                  key={item2.hour + index2.toString()}
                >
                  <Text style={{ padding: 10, color: "#fff" }}>
                    {item2.hour}
                  </Text>
                  <Text style={{ padding: 10, color: "#fff" }}>
                    {item2.simbol}
                  </Text>
                  <Text
                    style={{ padding: 10, fontWeight: "600", color: "#fff" }}
                  >
                    {item2.temp + "º"}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={{ width: screenWidth }}>
              {[
                { day: "Sexta-Feira", simbol: "$#$", max: "28", min: "19" },
                { day: "Sexta-Feira", simbol: "$#$", max: "24", min: "19" },
                { day: "Sexta-Feira", simbol: "$#$", max: "24", min: "17" },
                { day: "Sexta-Feira", simbol: "$#$", max: "32", min: "21" },
                { day: "Sexta-Feira", simbol: "$#$", max: "36", min: "24" },
                { day: "Sexta-Feira", simbol: "$#$", max: "25", min: "19" },
                { day: "Sexta-Feira", simbol: "$#$", max: "32", min: "21" },
                { day: "Sexta-Feira", simbol: "$#$", max: "36", min: "24" },
                { day: "Sexta-Feira", simbol: "$#$", max: "25", min: "19" },
                { day: "Sexta-Feira", simbol: "$#$", max: "25", min: "19" }
              ].map((item3, index3) => (
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
                      paddingHorizontal: 15,
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
                      style={{ fontSize: 20, fontWeight: "200", color: "#aaa" }}
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
              {[
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
              ].map((item4, index4) => (
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
    );
  }
}
