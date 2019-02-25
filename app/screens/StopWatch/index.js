import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundButton from "./RoundButton";

export default class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pqCronometro: 0,
      grdCronometro: 0,
      voltas: ["", "", "", "", "", ""],
      btn1Status: false,
      btn2Status: false
    };
  }

  timer = null;

  time() {
    let x = this.state.grdCronometro;
    x++;
    let y = this.state.pqCronometro;
    y++;
    this.setState({ grdCronometro: x, pqCronometro: y });
    this.timer = setTimeout(this.time.bind(this), 10);
  }

  handleCronometro = () => {
    let btn2Status = !this.state.btn2Status;
    if (btn2Status) {
      this.time();
    } else {
      clearInterval(this.timer);
    }
    let btn1Status = !this.state.btn1Status;
    this.setState({ btn2Status, btn1Status });
  };

  handleVoltas = () => {
    let btn1Status = this.state.btn1Status;
    if (btn1Status) {
      let voltas = this.state.voltas;
      voltas.pop();
      voltas.unshift(this.transformIntToCronometro(this.state.pqCronometro));
      this.setState({ voltas, pqCronometro: 0 });
    } else {
      this.setState({
        pqCronometro: 0,
        grdCronometro: 0,
        voltas: ["", "", "", "", "", ""],
        btn1Status: false,
        btn2Status: false
      });
    }
  };

  transformIntToCronometro(number) {
    let x = Math.floor(number / 100);
    let y = number % 100;
    if (x < 10) {
      if (y < 10) return "00:0" + x.toString() + ".0" + y.toString();
      else return "00:0" + x.toString() + "." + y.toString();
    } else {
      if (y < 10) return "00:" + x.toString() + ".0" + y.toString();
      else return "00:" + x.toString() + "." + y.toString();
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical: 25
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 18,
                color: "#ccc",
                fontWeight: "100"
              }}
            >
              {this.transformIntToCronometro(this.state.pqCronometro)}
            </Text>
            <Text
              style={{
                fontSize: 76,
                fontWeight: "100"
              }}
            >
              {this.transformIntToCronometro(this.state.grdCronometro)}
            </Text>
          </View>
        </View>
        <View
          style={{ height: StyleSheet.hairlineWidth, backgroundColor: "#ccc" }}
        />
        <View style={{ backgroundColor: "#eee", flex: 3 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 30
            }}
          >
            <RoundButton
              onPress={this.handleVoltas}
              text={this.state.btn1Status ? "Volta" : "Zerar"}
            />
            <RoundButton
              onPress={this.handleCronometro}
              text={this.state.btn2Status ? "Pausar" : "Iniciar"}
              textColor={this.state.btn2Status ? "red" : "green"}
            />
          </View>
          <View style={{ flex: 2 }}>
            {this.state.voltas.map((item, index) => {
              return (
                <View key={item + "_" + index.toString()} style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginLeft: 15,
                      paddingHorizontal: 30,
                      paddingVertical: 5,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: "#ccc"
                    }}
                  >
                    {item !== "" && (
                      <Text style={{ color: "gray" }}>
                        {"Volta " + (index + 1).toString()}
                      </Text>
                    )}
                    <Text>{item}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}
