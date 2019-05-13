import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Eating from './img/eating.png';

class Done extends React.Component {
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
    render() {
     
      const { navigate } = this.props.navigation;
      
        return (
          <View style={styles.cookingContainer}>
            <Text style={styles.cookingText}>
              Done!
            </Text>
            <Image style={styles.doneIcon} source={Eating}></Image>
            <TouchableOpacity style={styles.startButton} onPress={()=> {navigate('Main')}}>
                    <Text style={styles.doneText}>Main Menu</Text>
                </TouchableOpacity>
            
          </View>
        );
    }
}

export default Done;