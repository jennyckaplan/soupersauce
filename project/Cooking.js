import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import CookingIcon from './img/spin.png';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

class Cooking extends React.Component {
  constructor(props) {
    super(props);
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
        return (
          <View style={styles.cookingContainer}>
            <Text style={styles.cookingText}>
              Cooking
            </Text>
            <AnimatedEllipsis style={styles.ellipsis} />
            <Image style={styles.cookingSpinningIcon} source={CookingIcon}></Image>
          </View>
        );
    }
}

export default Cooking;