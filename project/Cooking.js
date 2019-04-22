import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import CookingIcon from './img/spin.png';

class Cooking extends React.Component {
    static navigationOptions = {
        title: 'Cooking',
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
        return (
            <Image style={styles.cookingSpinningIcon} source={CookingIcon}></Image>
        );
    }
}

export default Cooking;