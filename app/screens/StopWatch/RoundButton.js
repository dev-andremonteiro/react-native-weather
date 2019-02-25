import React from "react";
import { View, Text, TouchableHighlight } from "react-native";

export default class RoundButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.03)"
        onPress={this.props.onPress}
        style={{
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          height: 80,
          width: 80
        }}
        disabled={this.props.disabled}
      >
        <Text style={{ fontSize: 19, color: this.props.textColor }}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

RoundButton.defaultProps = {
  textColor: "black"
};
