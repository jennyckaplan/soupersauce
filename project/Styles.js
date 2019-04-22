import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      position: 'absolute',
      width: 375,
      height: 120,
      left: 0,
      top: 0,
      backgroundColor: '#F8F8F8',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome: {
      fontSize: 35,
      textAlign: 'center',
      margin: 10,
      fontFamily: 'Thonburi',
      position: 'absolute',
      color: '#FF8436',
      fontWeight: 'bold',
      paddingTop: 15,
    },
    connectContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      top: 140,
      height: 500,
    },
    ready: {
      fontSize: 30,
      fontFamily: 'Thonburi',
    },
    connect: {
      width: 250,
      height: 85,
      marginTop: 40,
      backgroundColor: '#6FCF97',
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    connectText: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
    }
  });