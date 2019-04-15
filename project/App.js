/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './Styles.js';
import MainMenu from './MainMenu.js';
import { createStackNavigator, createAppContainer } from "react-navigation";

type Props = {};
class App extends Component<Props> {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Souper Sauce</Text>
        <View style={styles.connectContainer}>
          <Text style={styles.ready}>Ready to cook?</Text>
          <TouchableOpacity style={styles.connect} onPress={()=> {navigate('Main')}}>
            <Text style={styles.connectText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  Main: {
    screen: MainMenu
  }
});

export default createAppContainer(AppNavigator);


