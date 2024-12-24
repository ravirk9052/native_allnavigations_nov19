import {Text, View} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends Component {
  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');

      if (token){
      } else {
      }

      return token;
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount(): void {
    this.getToken();
  }
  render() {
    return (
      <View>
        <Text style={{fontSize: 36}}>SplashScreen</Text>
      </View>
    );
  }
}
