import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import CookingIcon from './img/spin.png';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

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
    render() {
      const { navigation } = this.props;
      var timer = navigation.getParam('timer');
      var done = navigation.getParam('isDone');
      var currentStep = navigation.getParam('currentStep');
      console.log("STEP");
      console.log(currentStep);
      console.log(done);
      var newStep;
      var nextPage='Step';
      if (done) {
        newStep = currentStep;
        nextPage='Done';
      } else {
        newStep = currentStep + 1;
      }
      const { navigate } = this.props.navigation;
      myTimeout = setTimeout(() => {
        navigate(nextPage, {currentStep: newStep});
      }, timer*1000);
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