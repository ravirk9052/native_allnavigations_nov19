import React, {Component} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {paramList} from '../../../type';
import Bagpage from '../../Screens/Bagpage';
import Favourites from '../../Screens/Favourites';
import Homepage from '../../Screens/Homepage';
import Profile from '../../Screens/Profile';
import Shoppage from '../../Screens/Shoppage';
import CustomDrawerContent from './CustomDrawerContent';
import MyTabs from '../BottomNavigator/MyTabs';
import {Text, TouchableOpacity} from 'react-native';
import App from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../../../ThemeContext';

const Drawer = createDrawerNavigator();
type Props = NativeStackScreenProps<paramList, 'Home'>;

class MyDrawer extends Component {
  constructor(props: {}) {
    super(props);
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          // console.log('29',value)
          const {toggleTheme} = value;
          // console.log('30 -ravi', toggleTheme)
          return (
            <Drawer.Navigator
              screenOptions={{
                drawerStyle: {
                  backgroundColor: toggleTheme ? 'black' : 'white',
                  width: 250,
                  borderWidth: 1,
                },
              }}
              drawerContent={props => <CustomDrawerContent {...props} />}>
              {/* <Drawer.Screen name="Home" component={MyTabs} /> */}
              <Drawer.Screen name="Home" component={MyTabs} />
              <Drawer.Screen name="Shop" component={Shoppage} />
              <Drawer.Screen name="Bag" component={Bagpage} />
              <Drawer.Screen name="Favourites" component={Favourites} />
              <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default MyDrawer;
