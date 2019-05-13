import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import BlackPepper from './img/blackPepper.png';

class ViewRecipe extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ingredients: [],
      };
    }
    componentDidMount() {
      const db = SQLite.openDatabase({ name: 'recipes.db' });

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM recipes R JOIN ingredients I WHERE R.title = I.recipe;', [], (tx, results) => {
          const rows = results.rows;
          console.log(rows);
          let ingredients = [];
  
          for (let i = 0; i < rows.length; i++) {
            ingredients.push({
              ...rows.item(i),
            });
          }
  
          this.setState({ ingredients });
        });
      });
    }

    static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle: {
        backgroundColor: '#F8F8F8',
        height: 80,
      },
      headerTintColor: '#FF8436',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'Thonburi',
      },
      });

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const { ingredients } = this.state;
        console.log(ingredients);
        return (
            <View style={styles.ingredientsContainer}>
              {ingredients.map((ingredient,index) => {
                return(
                <View key={index} style={styles.ingredientContainer}>
                  <Image style={styles.ingredientIcon} source={BlackPepper} alt="recipe" />
                  <Text><Text style={styles.amount}> {ingredient.amount}</Text><Text style={styles.ingredientText}> {ingredient.title}</Text> </Text>
                </View>
                )
              })}
              <TouchableOpacity style={styles.startButton2} onPress={()=> {navigate('Step', {title: navigation.state.params.title, currentStep: 1})}}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

export default ViewRecipe;