import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import CookingIcon from './img/spin.png';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';

class Cooking extends React.Component {
  constructor(props) {
    super(props);
    var myTimeout;
  }
    static navigationOptions = {
        title: '',
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

    stop(){	

      var id = '070FC77C-181A-4F7D-8A81-04DB71C6541B'	
     var service = 'FFE0';	
     var serviceTX = 'ffe1';	
     setTimeout(() => {	
             BleManager.retrieveServices(id).then((peripheralInfo) => {  	
               setTimeout(() => {	
                 BleManager.startNotification(id, service, serviceTX).then(() => {	
                   console.log('Started notification on ' + id);	
                   setTimeout(() => {	
                     BleManager.writeWithoutResponse(id, service, serviceTX, stringToBytes("S")).then(() => {	
                       console.log('Sent message');	
                     });	

                    }, 500);	
                 }).catch((error) => {	
                   console.log('Notification error', error);	
                 });	
               }, 200);	
             });	

            }, 900);	
       clearTimeout(myTimeout);	
       const {navigate} = this.props.navigation;	
       navigate('Manual');	
     }

    render() {
      const { navigation } = this.props;	
      var timer = navigation.getParam('timer');	
      const {navigate} = this.props.navigation;	
      myTimeout = setTimeout(() => {	
          navigate('Manual'); 	
      }, timer*60000);

        return (
          <View style={styles.cookingContainer}>
            <Text style={styles.cookingText}>
              Cooking
            </Text>
            <AnimatedEllipsis style={styles.ellipsis} />
            <Image style={styles.cookingSpinningIcon} source={CookingIcon}></Image>
            <TouchableOpacity style={styles.stopButton} onPress={()=> this.stop()}>	
                    <Text style={styles.startText}>Stop</Text>	
            </TouchableOpacity>
          </View>
        );
    }
}

export default Cooking;