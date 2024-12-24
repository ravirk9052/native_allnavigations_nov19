import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

class Footer extends Component {
  render() {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Or login with social account</Text>
        <View style={styles.iconContainer}>
          <View style={styles.googleContainer}>
            <Image source={require('../Images/google.png')} />
          </View>
          <View style={styles.facebookContainer}>
            <Image source={require('../Images/facebook.png')} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 12,
    margin: 5,
  },
  googleContainer: {
    width: 90,
    height: 64,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginRight: 20,
  },
  facebookContainer: {
    width: 90,
    height: 64,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});

export default Footer;
