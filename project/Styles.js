import {StyleSheet, Dimensions} from 'react-native';
import { blockStatement } from '@babel/types';

let {height, width} = Dimensions.get('window');
height = height - 80;

export default StyleSheet.create({
    appContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    connect: {
      width: 300,
      height: 280,
      marginTop: 150,
      backgroundColor: '#6F95CF',
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    connectText: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
    },
    main: {
      display: 'flex',
      height: height,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    recipes: {
      width: 250,
      height: 250,
      backgroundColor: '#82E6C2',
      marginTop: 30,
      borderRadius: 10,
    },
    manual: {
      width: 250,
      height: 250,
      backgroundColor: '#7C6FCF',
      borderRadius: 10,
    },
    space: {
      height: 100,
    },
    text: {
      fontSize: 36,
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Thonburi',
      position: 'absolute',
      left: 15,
      top: 15,
    },
    icon: {
      height: 196,
      width: 190,
      left: 45,
      top: 40,
    },
    iconManual: {
      height: 159,
      width: 159,
      left: 45,
      top: 75,
    },
    manualContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 30,
    },
    whiskSpeed: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#6FCF97',
      height: 100,
      borderRadius: 10,
      width: 300,
    },
   manualIcons: {
      height: 70,
      width: 70,
    },
    temperature: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#82C6E6',
      height: 100,
      width: 300,
      borderRadius: 10,
      marginTop: 20,
    },
    timer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#FF8436',
      height: 100,
      width: 300,
      borderRadius: 10,
      marginTop: 20,
    },
    manualText: {
      color: 'white',
      fontFamily: 'Thonburi',
      fontSize: 25,
      fontWeight: 'bold',
    },
    whiskSpeedText: {
      fontFamily: 'Thonburi',
      fontSize: 16,
      fontWeight: 'bold',
    },
    startButton: {
      backgroundColor: '#9B51E0',
      height: 60,
      width: 160,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    startText: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Thonburi',
      fontSize: 30,
    },
    stopButton: {
      backgroundColor: '#9B51E0',
      height: 60,
      width: 160,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 180,
    },
    cookingSpinningIcon: {
      top: 150,
    },
    cookingText: {
      fontSize: 50,
      fontFamily: 'Thonburi',
      fontWeight: 'bold',
    },
    cookingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 60,
    },
    ellipsis: {
      color: '#9B51E0',
      fontSize: 100,
    },
    addButton: {
      width: 25,
      height: 25,
      marginLeft: 30,
    },
    recipesContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    addContainer: {
      borderBottomWidth: 0.5,
      borderColor: 'black',
      width: width,
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#FF8436',
    },
    addRecipeText: {
      fontSize: 20,
      marginRight: 20,
      marginLeft: 60,
      fontFamily: 'Thonburi',
      fontWeight: 'bold',
      color: 'white',
    },
    recipeIcon: {
      width: 54,
      height: 54,
      marginLeft: 20,
    },
    recipeContainer: {
      borderBottomWidth: 0.5,
      borderColor: 'black',
      width: width,
      height: 75,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recipeText: {
      fontSize: 20,
      marginRight: 20,
      marginLeft: 50,
      flex: 1,
      fontFamily: 'Thonburi',
      fontWeight: 'bold',
      color: 'black',
    },
    arrow: {
      width: 8,
      height: 16,
      marginRight: 20,
    },
  });