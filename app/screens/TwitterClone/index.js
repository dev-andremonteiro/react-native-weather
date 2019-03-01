import React from "react";
import { Animated, Easing, View, Text, Image, StatusBar } from "react-native";

const TwitterLogo = require("../../../assets/twitter-logo.png");

const colors = {
  priamry: "#1DA1F2",
  secondary: "#14171A",
  dark_gray: "#657786",
  light_gray: "#AAB8C2",
  exlight_gray: "#E1E8ED",
  exexlight_gray: "#F5F8FA",
  white: "#FFF"
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSize: new Animated.Value(80)
    };
  }

  _startAnimation = () =>
    Animated.timing(this.state.iconSize, {
      toValue: 3000,
      duration: 350,
      easing: Easing.back(0.4)
    }).start(() => this.props.animationEnd());

  render() {
    return (
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.priamry
        }}
      >
        <Animated.Image
          name={"logo-twitter"}
          style={{
            alignSelf: "center",
            width: this.state.iconSize,
            height: this.state.iconSize
          }}
          source={TwitterLogo}
        />
      </Animated.View>
    );
  }
}

export default class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.initialState = this.state;
  }

  componentDidMount() {
    //LOADING CONTENT FETCHING DATA
    let asdfg = setTimeout(() => {
      this.load._startAnimation();
    }, 2000);
  }

  render() {
    if (this.state.isLoading)
      return (
        <Loading
          ref={ref => (this.load = ref)}
          animationEnd={() => this.setState({ isLoading: false })}
        />
      );

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar barStyle={"default"} />
        <Text>{"TWITTER APP :)"}</Text>
      </View>
    );
  }
}
