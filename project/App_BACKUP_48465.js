import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  ScrollView,
  AppState,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';

<<<<<<< HEAD
import React, {Component} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import styles from './Styles.js';
import MainMenu from './MainMenu.js';
import Manual from './Manual.js';
import Cooking from './Cooking.js';
import Chef from './img/chef.png';
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
        <TouchableOpacity style={styles.connect} onPress={()=> {navigate('Main')}}>
            <Text style={styles.connectText}>Start cooking!</Text>
            <Image style={styles.chefIcon} source={Chef} />
        </TouchableOpacity>

=======
const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class App extends Component {
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
      this.setState({ peripherals })
      this.setState({item :peripheral.id})
      BleManager.connect(peripheral.id)
      this.setState({ scanning: false });
    }
  }

  
toggleSwitch(){
    
    var id = '070FC77C-181A-4F7D-8A81-04DB71C6541B'
    var service = 'FFE0';
    var bakeCharacteristic = 'ffe1';
    var crustCharacteristic = 'ffe1';
    setTimeout(() => {

            BleManager.retrieveServices(id).then((peripheralInfo) => {
              
              console.log('here: ', peripheralInfo);

              setTimeout(() => {
                BleManager.startNotification(id, service, bakeCharacteristic).then(() => {
                  console.log('Started notification on ' + id);
                  setTimeout(() => {
                    BleManager.writeWithoutResponse(id, service, crustCharacteristic, stringToBytes(this.state.text)).then(() => {
                      console.log('Sent message');
                    });

                  }, 500);
                }).catch((error) => {
                  console.log('Notification error', error);
                });
              }, 200);
            });

          }, 900);
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);


    return (
      <View style={styles.container}>
        <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.startScan() }>
          <Text>Connect</Text>
        </TouchableHighlight>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
        
        <Button
          onPress={this.toggleSwitch.bind(this)}
          title='Switch(On/Off)'
        />
      </View>
>>>>>>> bluetooth
    );
  }
}

<<<<<<< HEAD
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
});

export default createAppContainer(AppNavigator);


=======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});
>>>>>>> bluetooth
