import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    baseText: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 22
      },
      innerText: {
        color: 'red'
      },

      container: {
        flex: 1, 
        backgroundColor: "rgb(255,255,255)"
        ,
      },

      scrollView: {
        height: Dimensions.get('window').height,
     },

     scrollViewContainer: {
      marginHorizontal:30,
      marginVertical:16,
     },

      welcome: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22
      },

      settingsViewContainer: {
        marginHorizontal:30,
        marginVertical:16,
       },

      settingsText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
      },

      nameInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

      separator: {
        marginVertical: 8,
      },

      dateTitle: {
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 22
      },
      heartRateInfoText: {
        fontWeight: 'bold',
        fontSize: 14
      },
    
  });