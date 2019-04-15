/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Text, View, Dimensions} from 'react-native';
import styles from './Styles.js';

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Souper Sauce</Text>
        <View style={styles.connectContainer}>
          <Text style={styles.ready}>Ready to cook?</Text>
          <View style={styles.connect}>
            <Text style={styles.connectText}>Connect</Text>
          </View>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;



