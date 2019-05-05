import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import ButtonImage from './img/Button.png';
import RecipeIcon from './img/Recipe.png';
import Arrow from './img/Arrow.png';

class Recipes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        recipes: [],
      };
    }
    componentDidMount() {
      const db = SQLite.openDatabase({ name: 'recipes.db' });

      db.transaction(function(txn) {
        txn.executeSql(
          "SELECT * FROM recipes;"
          ,
          [],
          function(tx, res) {
            var len = res.rows.length;
            const recipesList = [];
            for (let i = 0; i < len; i++) {
              let row = res.rows.item(i);
              recipesList.push(row.title);
            }
            this.setState({
              recipes: recipesList,
            });
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
        console.log(this.state.recipes);
        return (
            <View style={styles.recipesContainer}>
              <TouchableOpacity style={styles.addContainer}>
                <Image style={styles.addButton} source={ButtonImage} alt="add" />
                <Text style={styles.addRecipeText}>Create New Recipe</Text>
              </TouchableOpacity>
              {/*recipes.map((recipe) => {
                return (
                  <TouchableOpacity style={styles.recipeContainer}>
                  <Image style={styles.recipeIcon} source={RecipeIcon} alt="recipe" />
                  <Text style={styles.recipeText}>{recipe}</Text>
                  <Image style={styles.arrow} source={Arrow} alt="go-to" />
                </TouchableOpacity>
                )
              })*/}

             {/*} <TouchableOpacity style={styles.recipeContainer}>
                <Image style={styles.recipeIcon} source={RecipeIcon} alt="recipe" />
                <Text style={styles.recipeText}>Hollandaise</Text>
                <Image style={styles.arrow} source={Arrow} alt="go-to" />
            </TouchableOpacity> */}
            </View>
        );
    }
}

export default Recipes;