import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {paramList} from '../../../type';
import Shoppage from '../../Screens/Shoppage';
import Bagpage from '../../Screens/Bagpage';
import Homepage from '../../Screens/Homepage';
import Favourites from '../../Screens/Favourites';
import Profile from '../../Screens/Profile';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import CustomTabBar from './CustomTabBar';
import ThemeContext from '../../../ThemeContext';

const Tab = createBottomTabNavigator<paramList>();

type Props = NativeStackScreenProps<paramList, 'Home'>;

const Stack = createNativeStackNavigator();

export default class MyTabs extends Component<Props> {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {toggleTheme} = value;
          // console.log('28 kiran',toggleTheme)
          console
          return (
            <Tab.Navigator
              tabBar={props => <CustomTabBar {...props} />}>
              <Tab.Screen
                options={{headerShown: false}}
                name="Home"
                component={Homepage}
              />
              <Tab.Screen
                options={{headerShown: false}}
                name="Shop"
                component={Shoppage}
              />
              <Tab.Screen
                options={{headerShown: false}}
                name="Bag"
                component={Bagpage}
              />
              <Tab.Screen
                options={{headerShown: false}}
                name="Favourites"
                component={Favourites}
              />
              <Tab.Screen
                options={{headerShown: false}}
                name="Profile"
                component={Profile}
              />
            </Tab.Navigator>
          );
        }}
      </ThemeContext.Consumer>

      // </SafeAreaView>
    );
  }
}
