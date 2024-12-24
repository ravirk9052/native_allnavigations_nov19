import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';







type Props = {
  navigation: any;
  getToken: () => void;
};



export default class Homepage extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      condition: false,
    };
  }

  onPressLogoutButton = () => {
    const removeToken = async () => {
      await AsyncStorage.removeItem('AccessToken');
      let token = await AsyncStorage.getItem('AccessToken');
      if (token === null) {
        this.props.navigation.replace('Login');
      }
    };
    removeToken();
  };

  render() {

    return (

      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../Images/Image.png')} resizeMode='stretch'>
          <Text style={styles.text}>Fashion sale</Text>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.checkButton}>Check</Text>
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity style={styles.logout}onPress={this.onPressLogoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: responsiveHeight(100),
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: responsiveWidth(100),
    height: responsiveHeight(80),
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontFamily: 'Montserrat-Bold',
    alignContent: 'flex-end',
    marginTop: responsiveHeight(50),
    width: responsiveWidth(50),
  },
  btnContainer: {
    backgroundColor: '#DB3022',
    width: responsiveWidth(35),
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    // marginTop: 12,
  },
  checkButton: {
    color: '#ffffff',
    alignSelf: 'center',
    borderWidth: 0.1,
    borderStyle: 'dotted',
    fontFamily: 'Montserrat-Bold',
  },
  logout: {
    backgroundColor: 'red',
    width: responsiveWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    borderRadius: 15,
    // borderWidth: 1,
    marginBottom: 40,
    marginLeft: 5,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',

  }
});
