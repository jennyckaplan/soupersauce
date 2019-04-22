import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import RecipeIcon from './img/soup.png';
import ManualIcon from './img/Manual.png';

class MainMenu extends React.Component {
    static navigationOptions = {
        title: 'Main Menu',
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
            <View style={styles.main}>
                <TouchableOpacity style={styles.recipes} onPress={()=> {console.log('recipes page')}}>
                    <Text style={styles.text}>Recipes</Text>
                    <Image style={styles.icon} source={RecipeIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.manual} onPress={()=> {navigate('Manual')}}>
                    <Text style={styles.text}>Manual</Text>
                    <Image style={styles.iconManual} source={ManualIcon} />
                </TouchableOpacity>
                <View style={styles.space}></View>
            </View>
        );
    }
}

export default MainMenu;