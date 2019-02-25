import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import Loading from "./screens/Loading";
import StopWatch from "./screens/StopWatch";
import WeatherForecast from "./screens/WeatherForecast";

export default createAppContainer(
  createStackNavigator(
    {
      Loading: Loading,
      StopWatch: {
        screen: StopWatch,
        navigationOptions: {
          title: "A Nice IOS Stop Watch"
        }
      },
      WeatherForecast: {
        screen: WeatherForecast,
        navigationOptions: {
          header: null
        }
      }
    },
    {
      initialRouteName: "StopWatch"
    }
  )
);
