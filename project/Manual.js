import React from 'react';
import styles from './Styles';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import whiskIcon from './img/Whisk.png';
import thermo from './img/thermo.png';
import timer from './img/timer.png';
import Slider from '@react-native-community/slider';

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
                  minimumTrackTintColor={'blue'}
                  maximumTrackTintColor={'red'}
                  step={1}
                  onValueChange={value => this.setState({whisk: value})}
                />
                <Text style={styles.whiskSpeedText}>{this.state.whisk}</Text>
                <View style={styles.temperature} >
                  <Image style={styles.manualIcons} source={thermo} />
                  <Text style={styles.manualText}>Temperature</Text>
                </View>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={7}
                    minimumTrackTintColor={'blue'}
                    maximumTrackTintColor={'red'}
                    step={1}
                    onValueChange={value => this.setState({temperature: value})}
                  />
                 <Text style={styles.whiskSpeedText}>{this.state.temperature}</Text>
                <View style={styles.timer} >
                  <Image style={styles.manualIcons} source={timer} />
                  <Text style={styles.manualText}>Timer</Text>
                </View>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0.5}
                    maximumValue={5}
                    minimumTrackTintColor={'blue'}
                    maximumTrackTintColor={'red'}
                    step={0.5}
                    onValueChange={value => this.setState({timer: value})}
                  />
                 <Text style={styles.whiskSpeedText}>{this.state.timer} minutes</Text>
                 <TouchableOpacity style={styles.startButton} onPress={()=> {navigate('Cooking')}}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Manual;