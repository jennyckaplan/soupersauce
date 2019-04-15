import React from 'react';
import styles from './Styles.js';
import {Text, View} from 'react-native';

class Header extends React.Component {
    render() {
        return (
            <View styles={styles.container}>
                <Text style={styles.welcome}>Souper Sauce</Text>
            </View>
        );
    }
}

export default Header;