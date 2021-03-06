import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import RecipeIcon from './img/soup.png';
import ManualIcon from './img/Manual.png';
import SQLite from 'react-native-sqlite-storage';

class MainMenu extends React.Component {

    openDB() {
        console.log('database opened');
    }

    errorDB(err) {
        console.log('database error: ' + err);
    }

    componentDidMount() {
        const db = SQLite.openDatabase({ name: 'recipes.db' }, this.openDB, this.errorDB);
        db.transaction(function(txn) {
            txn.executeSql("DROP TABLE recipes", [], (tx, results) => {
                //console.log('dropped table recipes');
            });
        });
        db.transaction(function(txn) {
            txn.executeSql("DROP TABLE ingredients", [], (tx, results) => {
                //console.log('dropped table ingredients');
            });
        });
        db.transaction(function(txn) {
            txn.executeSql("DROP TABLE steps", [], (tx, results) => {
                //console.log('dropped table steps');
            });
        });
        db.transaction(function(txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS recipes( " +
              "recipe_id INTEGER PRIMARY KEY NOT NULL, " +
              "title TEXT" +
              ");", [], (tx, results) => {
                  //console.log('created recipes table');
              });
        });
        db.transaction(function(txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS ingredients( " +
              "ingredient_id INTEGER PRIMARY KEY NOT NULL, " +
              "recipe TEXT, title TEXT, amount TEXT, step INTEGER" +
              ");", [], (tx, results) => {
                  //console.log('created ingredients table');
              });
        });
        db.transaction(function(txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS steps( " +
              "step_id INTEGER PRIMARY KEY NOT NULL, " +
              "recipe TEXT, title TEXT, step INTEGER, whisk INTEGER, "+
              +"temperature INTEGER, time INTEGER" +
              ");", [], (tx, results) => {
                  //console.log('created steps table');
              });
        });
        db.transaction(function(txn) {
            txn.executeSql("INSERT into recipes(title) VALUES(?)", ['Hollandaise Sauce'], (tx, results) => {
                //console.log('inserted hollandaise recipe');
            });
        });
    }

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
                <TouchableOpacity style={styles.recipes} onPress={()=> {navigate('Recipes')}}>
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