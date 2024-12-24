import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View} from 'react-native';
import React, {Component} from 'react';
import CustomTopTabBar from '../Components/Topnavigator/CustomTopTabBar';
import ThemeContext from '../../ThemeContext';
const TopTab = createMaterialTopTabNavigator();

function Men() {
  return (
    <View>
      <Text>Hello Men</Text>
    </View>
  );
}

function Women() {
  return (
    <View>
      <Text>Hello Women</Text>
    </View>
  );
}

function Kids() {
  return (
    <View>
      <Text>Hello Kids</Text>
    </View>
  );
}

class Shoppage extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
       
        {value => {
           const {toggleTheme} = value;
           console.log('39',toggleTheme)
          return(
            <TopTab.Navigator screenOptions={{
              tabBarStyle: { backgroundColor: 'green' },
            }}
            initialRouteName="Men"
            tabBar={props => <CustomTopTabBar {...props} />}>
            <TopTab.Screen name="Men" component={Men} />
            <TopTab.Screen name="Women" component={Women} />
            <TopTab.Screen name="Kids" component={Kids} />
          </TopTab.Navigator>
          )
        }}
      </ThemeContext.Consumer>
     
    );
  }
  //   </ThemeContext.Consumer>
  // </ThemeProvider>
}

export default Shoppage;
