import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

class Recipes extends React.Component {
    componentDidMount() {
      const db = SQLite.openDatabase({ name: 'recipes' });
      db.transaction(function(txn) {
        txn.executeSql(
          "SELECT * FROM recipes;"
          ,
          [],
          function(tx, res) {
            console.log(res);
            console.log('connected to database');
            if (res.rows.length == 0) {
              txn.executeSql(
                "CREATE TABLE IF NOT EXISTS recipes( " +
                "recipe_id INTEGER PRIMARY KEY NOT NULL, " +
                "title TEXT, ingredients TEXT, time INTEGER, whisk INTEGER, temp INTEGER" +
                ");",
                []
              );
            }
          }
        );
      });
    }

    static navigationOptions = {
        title: 'Recipes',
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
                
            </View>
        );
    }
}

export default Recipes;