import React from 'react';
import styles from './Styles';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import whiskIcon from './img/Whisk.png';
import thermo from './img/thermo.png';
import timer from './img/timer.png';
import Slider from '@react-native-community/slider';
import BleManager from 'react-native-ble-manager';
//import { stringToBytes } from 'convert-string';

const labels = {
  0: "Off",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Souper",
};

class Manual extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        whisk: 0,
        temperature: 0,
        timer: 0.5,
      }
    }
    static navigationOptions = {
        title: 'Manual',
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
    sendInfo(){
    
      var id = '070FC77C-181A-4F7D-8A81-04DB71C6541B'
      var service = 'FFE0';
      var serviceTX = 'ffe1';
      var serviceRX = 'ffe1';
      var timer = this.state.timer *60;
      setTimeout(() => {
  
              BleManager.retrieveServices(id).then((peripheralInfo) => {
                
                console.log('here: ', peripheralInfo);
  
                setTimeout(() => {
                  BleManager.startNotification(id, service, serviceTX).then(() => {
                    console.log('Started notification on ' + id);
                    setTimeout(() => {
                      // BleManager.writeWithoutResponse(id, service, serviceTX, stringToBytes("T"+timer.toString()+"AW"+this.state.whisk.toString()+"H"+this.state.temperature.toString()+"G")).then(() => {
                      //   console.log('Sent message');
                      // });
  
                    }, 500);
                  }).catch((error) => {
                    console.log('Notification error', error);
                  });
                }, 200);
              });
  
            }, 900);
  
        const {navigate} = this.props.navigation;
        console.log("timer"+this.state.timer);
        navigate('Cooking',{
          timer: this.state.timer,
        });
      }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.manualContainer}>
                <View style={styles.whiskSpeed} >
                  <Image style={styles.manualIcons} source={whiskIcon} />
                  <Text style={styles.manualText}>Whisk Speed</Text>
                </View>
                <Slider
                  style={{width: 200, height: 40}}
                  minimumValue={0}
                  maximumValue={4}
                  minimumTrackTintColor={'#9B51E0'}
                  maximumTrackTintColor={'red'}
                  step={1}
                  onValueChange={value => this.setState({whisk: value})}
                />
                <Text style={styles.whiskSpeedText}>{labels[this.state.whisk]}</Text>
                <View style={styles.temperature} >
                  <Image style={styles.manualIcons} source={thermo} />
                  <Text style={styles.manualText}>Temperature</Text>
                </View>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={3}
                    minimumTrackTintColor={'#9B51E0'}
                    maximumTrackTintColor={'red'}
                    step={1}
                    onValueChange={value => this.setState({temperature: value})}
                  />
                 <Text style={styles.whiskSpeedText}>{labels[this.state.temperature]}</Text>
                <View style={styles.timer} >
                  <Image style={styles.manualIcons} source={timer} />
                  <Text style={styles.manualText}>Timer</Text>
                </View>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0.5}
                    maximumValue={20}
                    minimumTrackTintColor={'#9B51E0'}
                    maximumTrackTintColor={'red'}
                    step={0.5}
                    onValueChange={value => this.setState({timer: value})}
                  />
                 <Text style={styles.whiskSpeedText}>{this.state.timer} minutes</Text>
                 <TouchableOpacity style={styles.startButton} onPress={()=> this.sendInfo()}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Manual;