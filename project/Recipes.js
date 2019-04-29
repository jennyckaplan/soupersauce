import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import ButtonImage from './img/Button.png';
import RecipeIcon from './img/Recipe.png';
import Arrow from './img/Arrow.png';

class Recipes extends React.Component {
    componentDidMount() {
      const db = SQLite.openDatabase({ name: 'recipes.db' });
      db.transaction(function(txn) {
        txn.executeSql("CREATE TABLE IF NOT EXISTS recipes( " +
          "recipe_id INTEGER PRIMARY KEY NOT NULL, " +
          "title TEXT, ingredients TEXT, time INTEGER, whisk INTEGER, temp INTEGER" +
          ");", []);
      });
      db.transaction(function(txn) {
        txn.executeSql(
          "SELECT * FROM recipes;"
          ,
          [],
          function(tx, res) {
            console.log(res);
            console.log('connected to database');
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
            <View style={styles.recipesContainer}>
              <TouchableOpacity style={styles.addContainer}>
                <Image style={styles.addButton} source={ButtonImage} alt="add" />
                <Text style={styles.addRecipeText}>Create New Recipe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.recipeContainer}>
                <Image style={styles.recipeIcon} source={RecipeIcon} alt="recipe" />
                <Text style={styles.recipeText}>Bernaise Sauce</Text>
                <Image style={styles.arrow} source={Arrow} alt="go-to" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.recipeContainer}>
                <Image style={styles.recipeIcon} source={RecipeIcon} alt="recipe" />
                <Text style={styles.recipeText}>Hollandaise</Text>
                <Image style={styles.arrow} source={Arrow} alt="go-to" />
              </TouchableOpacity>
            </View>
        );
    }
}

export default Recipes;