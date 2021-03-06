/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import styles from './Styles.js';
import MainMenu from './MainMenu.js';
import Manual from './Manual.js';
import Cooking from './Cooking.js';
import Chef from './img/chef.png';
import Recipes from './Recipes.js';
import { createStackNavigator, createAppContainer } from "react-navigation";

type Props = {};
class App extends Component<Props> {
  static navigationOptions = {
    title: 'Souper Sauce',
    headerStyle: {
      backgroundColor: '#F8F8F8',
      height: 80,
    },
    headerTintColor: '#FF8436',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 35,
      fontFamily: 'Thonburi',
    },
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.appContainer}>
        <TouchableOpacity style={styles.connect} onPress={()=> {navigate('Main')}}>
          <Text style={styles.connectText}>Start cooking!</Text>
          <Image style={styles.chefIcon} source={Chef} />
        </TouchableOpacity>
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
  },
  Manual: {
    screen: Manual
  },
  Cooking: {
    screen: Cooking
  },
  Recipes: {
    screen: Recipes
  },
});

export default createAppContainer(AppNavigator);


