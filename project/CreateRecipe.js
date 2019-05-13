import React from 'react';
import styles from './Styles';
import {Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import Slider from '@react-native-community/slider';



class CreateRecipe extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        steps: [],
        whisk: 0,
        temperature: 0,
        timer: 0.5,
        amount: 'amount',
        ingredient: 'ingredient',
      }
    }
    static navigationOptions = {
        title: 'CreateRecipe',
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
            <View style={styles.createContainer}>
                <Text style={styles.stepText}>Recipe name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.RecipeTitle}
                    />
                <View style={styles.stepCreate}>
                <Text style={styles.stepText}>Step 1</Text>
                </View>
                <View style={styles.stepCreate}>
                <Text style={styles.createText}>Ingredients</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.inputWrap}>
                    <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.amount}
                    />
                    </View>
                    <View style={styles.inputWrap}>        
                    <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.ingredient}
                    />
                    </View>   
                </View>
                <View style={styles.stepCreate} >
                  <Text style={styles.createText}>Whisk Speed</Text>
                
                <Slider
                  style={{width: 100, height: 20}}
                  minimumValue={0}
                  maximumValue={4}
                  minimumTrackTintColor={'#9B51E0'}
                  maximumTrackTintColor={'red'}
                  step={1}
                  onValueChange={value => this.setState({whisk: value})}
                />
                
                <Text style={styles.createText}>{this.state.whisk}</Text>
                </View>
                <View style={styles.temperatureCreate} >
                  <Text style={styles.createText}>Temperature</Text>
                
                  <Slider
                    style={{width: 100, height: 20}}
                    minimumValue={0}
                    maximumValue={3}
                    minimumTrackTintColor={'#9B51E0'}
                    maximumTrackTintColor={'red'}
                    step={1}
                    onValueChange={value => this.setState({temperature: value})}
                  />
                  
                 <Text style={styles.createText}>{this.state.temperature}</Text>
                 </View>
                <View style={styles.timerCreate} >
                  <Text style={styles.createText}>Timer</Text>
                
                <Slider
                    style={{width: 100, height: 20}}
                    minimumValue={0.5}
                    maximumValue={20}
                    minimumTrackTintColor={'#9B51E0'}
                    maximumTrackTintColor={'red'}
                    step={0.5}
                    onValueChange={value => this.setState({timer: value})}
                  />
                  
                 <Text style={styles.createText}>{this.state.timer} minutes</Text>
                 </View>
                 <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startText}>Add Step</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startText}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CreateRecipe;