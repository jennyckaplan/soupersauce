/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import RecipeBox from './RecipeBox.js';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Souper Sauce</Text>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    height: 150,
    width: width,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
});
