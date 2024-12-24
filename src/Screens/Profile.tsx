import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../type';
import ThemeContext from '../../ThemeContext';
export default class Profile extends Component {

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          // console.log('29',value)
          const {toggleTheme} = value;
          // console.log('30 -ravi', toggleTheme)
          return(
            <View style={toggleTheme  ? styles.darkContainer : styles.lightContainer}>
              <Text style={toggleTheme ? styles.darkContainer : styles.lightContainer}>Profile Screen</Text>
            </View>
          )
        
        }}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: '#000',
    flex: 1,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 24
  },
  lightContainer: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 24
  },
});
