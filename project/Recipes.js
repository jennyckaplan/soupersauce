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

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM recipes;', [], (tx, results) => {
          const rows = results.rows;
          console.log(rows);
          let recipes = [];
  
          for (let i = 0; i < rows.length; i++) {
            recipes.push({
              ...rows.item(i),
            });
          }
  
          this.setState({ recipes });
        });
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
        const {recipes} = this.state;
        return (
            <View style={styles.recipesContainer}>
              <TouchableOpacity style={styles.addContainer} onPress={()=> {navigate('CreateRecipe')}}>
                <Image style={styles.addButton} source={ButtonImage} alt="add" />
                <Text style={styles.addRecipeText}>Create New Recipe</Text>
              </TouchableOpacity>
              {recipes.map((recipe,index) => {
                return (
                  <TouchableOpacity key={index} style={styles.recipeContainer} onPress={() => {navigate('ViewRecipe', {
                    title: recipe.title,
                  })}}>
                    <Image style={styles.recipeIcon} source={RecipeIcon} alt="recipe" />
                    <Text style={styles.recipeText}>{recipe.title}</Text>
                    <Image style={styles.arrow} source={Arrow} alt="go-to" />
                </TouchableOpacity>
                )
              })}
            </View>
        );
    }
}

export default Recipes;