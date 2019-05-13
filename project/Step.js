import React from 'react';
import styles from './Styles';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Mixer from './img/mixer.png';
import BleManager from 'react-native-ble-manager';
//t { stringToBytes } from 'convert-string';

const db = SQLite.openDatabase({ name: 'recipes.db' });

class Step extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        steps: [],
        currentStepInfo: [],
        currentIngredients: [],
        title: "",
        info: [],
        maxSteps: 10,
      };
    }
    // sendInfo(){
    
    //     var id = '070FC77C-181A-4F7D-8A81-04DB71C6541B'
    //     var service = 'FFE0';
    //     var serviceTX = 'ffe1';
    //     var serviceRX = 'ffe1';
    //     var timer = this.state.timer *60;
    //     setTimeout(() => {
    
    //             BleManager.retrieveServices(id).then((peripheralInfo) => {
                  
    //               console.log('here: ', peripheralInfo);
    
    //               setTimeout(() => {
    //                 BleManager.startNotification(id, service, serviceTX).then(() => {
    //                   console.log('Started notification on ' + id);
    //                   setTimeout(() => {
    //                     BleManager.writeWithoutResponse(id, service, serviceTX, stringToBytes("T"+timer.toString()+"AW"+this.state.whisk.toString()+"H"+this.state.temperature.toString()+"G")).then(() => {
    //                       console.log('Sent message');
    //                     });
    
    //                   }, 500);
    //                 }).catch((error) => {
    //                   console.log('Notification error', error);
    //                 });
    //               }, 200);
    //             });
    
    //           }, 900);
    
    //       const {navigate} = this.props.navigation;
    //       console.log("timer"+this.state.timer);
    //       navigate('Cooking',{
    //         timer: this.state.timer,
    //       });
    //     }
    updateScreen() {
        //console.log('updated');
        const currentStep = this.props.navigation.state.params.currentStep;

        db.transaction(tx => {
          tx.executeSql('SELECT * FROM recipes R JOIN steps S WHERE R.title = S.recipe;', [], (tx, results) => {
            const rows = results.rows;
            //console.log(rows);
            let steps = [];
            let currentStepInfo = [];
    
            for (let i = 0; i < rows.length; i++) {
              if (rows.item(i).step === currentStep) {
                  currentStepInfo.push({
                      ...rows.item(i),
                  });
              }
              steps.push({
                ...rows.item(i),
              });
          }
            this.setState({ steps, currentStepInfo });
          });
        });
        this.getIngredients(currentStep);
    }

    componentDidMount() {
      //const db = SQLite.openDatabase({ name: 'recipes.db' });

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM recipes R JOIN steps S WHERE R.title = S.recipe;', [], (tx, results) => {
          const rows = results.rows;
          //console.log(rows);
          let steps = [];
          let currentStepInfo = [];
          let maxSteps = rows.length;
  
          for (let i = 0; i < rows.length; i++) {
            if (rows.item(i).step === this.props.navigation.state.params.currentStep) {
                currentStepInfo.push({
                    ...rows.item(i),
                });
            }
            steps.push({
              ...rows.item(i),
            });
        }
          this.setState({ steps, currentStepInfo, maxSteps });
        });
      });
      this.getIngredients(this.props.navigation.state.params.currentStep);
    }

    getInfo(currentStep) {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM recipes R JOIN steps S WHERE R.title = S.recipe AND S.step = ?;', [this.props.navigation.state.params.currentStep], (tx, results) => {
              const rows = results.rows;
              //console.log(rows);
              let info = [];
      
              for (let i = 0; i < rows.length; i++) {
                info.push({
                    ...rows.item(i),
                });
                }
                this.setState({info })
            });
          });
    }

    getIngredients(currentStep) {
        //const db = SQLite.openDatabase({ name: 'recipes.db' });

        db.transaction(tx => {
          tx.executeSql('SELECT * FROM recipes R JOIN ingredients I WHERE R.title = I.recipe AND I.step = ?;', [this.props.navigation.state.params.currentStep], (tx, results) => {
            const rows = results.rows;
            //console.log(rows);
            let currentIngredients = [];
    
            for (let i = 0; i < rows.length; i++) {
              currentIngredients.push({
                ...rows.item(i),
              });
            }
            this.setState({ currentIngredients });
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
        //this.updateScreen();
        //console.log('RENDERING');
        //console.log(this.props.navigation.state.params.currentStep);
        const {navigate} = this.props.navigation;
        const { steps, currentStepInfo, currentStep, currentIngredients } = this.state;
        let isDone = false;
        let title = "";
        let time = 0;
        if (currentStepInfo[0] && this.props.navigation.state.params.currentStep === 1) {
            title = currentStepInfo[0].title;
            time = currentStepInfo[0].time;
        } else {
            console.log('here');
            console.log(this.props.navigation.state.params.currentStep);
            this.getInfo(this.props.navigation.state.params.currentStep);
            this.getIngredients(this.props.navigation.state.params.currentStep);
            console.log(this.state.info);
            if (this.props.navigation.state.params.currentStep === this.state.maxSteps) {
                isDone = true;
            }
            if (this.state.info[0]) {
                title = this.state.info[0].title;
                time = this.state.info[0].time;
            }
        }
        return (
            <View style={styles.stepsContainer}>
                <Text style={styles.stepTitle}>{title}</Text>
                {(currentIngredients.length !== 0) ? (<Text style={styles.addIngredients}>Add the following ingredients: </Text>) : <Text></Text>}
                {currentIngredients.map((ingredient,index) => {
                    return (
                        <Text key={index}><Text style={styles.amount2}>{ingredient.amount}</Text> <Text style={styles.title2}>{ingredient.title} </Text></Text>
                    )
                })}
                <Image style={styles.mixerIcon} source={Mixer} alt="mixer-icon" />
                <TouchableOpacity style={styles.startButton2} onPress={()=> {navigate('Cooking', {timer: time, isDone: isDone, currentStep: this.props.navigation.state.params.currentStep})}}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

export default Step;