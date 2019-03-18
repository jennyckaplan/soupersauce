/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class Recipe extends Component<Props> {
  render() {
    return (
      <View style={styles.recipeContainer}>
      <Text> recipe</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recipeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'seashell',
    height: 50,
    width: 100,
  },
});