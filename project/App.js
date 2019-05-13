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
import CreateRecipe from './CreateRecipe.js';
import ViewRecipe from './ViewRecipe.js';
import Step from './Step.js';
import Done from './Done.js';
import { createStackNavigator, createAppContainer } from "react-navigation";
import BleManager from 'react-native-ble-manager';

type Props = {};
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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
  constructor(){
    super()

    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: '',
      item: '',
      text: '',
    }
    
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );


  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.setState({scanning:true});
      });
    }
  }

  handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (peripheral.name == "DSD TECH"){
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
      this.setState({item :peripheral.id});
      BleManager.connect(peripheral.id);
      this.setState({ scanning: false });
      const {navigate} = this.props.navigation;
      navigate('Main');
 
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.appContainer}>
        <TouchableOpacity style={styles.connect} onPress={()=> this.startScan()}>
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
  CreateRecipe: {
    screen: CreateRecipe
  },
  ViewRecipe: {
    screen: ViewRecipe
  },
  Step: {
    screen: Step,
  },
  Done: {
    screen: Done,
  }
});

export default createAppContainer(AppNavigator);


