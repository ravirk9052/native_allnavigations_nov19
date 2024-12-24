import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text} from '@react-navigation/elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';

class CustomTabBar extends Component<BottomTabBarProps> {
  constructor(props: BottomTabBarProps) {
    super(props);
  }

  render() {
    const {state, descriptors, navigation} = this.props;
    return (

      <SafeAreaView style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined 
              ? options.title
              : route.name;


          const isFocused = state.index === index;


          let IconComponent;

          if (label === 'Home') {
            IconComponent = (
              <MaterialCommunityIcons
                name={isFocused ? 'home' : 'home-outline'}
                size={25}
                color={isFocused ? 'red' : 'grey'}
              />
            );
          } else if (label === 'Shop') {
            IconComponent = (
              <MaterialCommunityIcons
                name={isFocused ? 'cart' : 'cart-outline'}
                size={25}
                color={isFocused ? 'red' : 'grey'}
              />
            );
          } else if (label === 'Bag') {
            let Icon = isFocused ? (
              <Entypo name="shopping-bag" size={25} color="red" />
            ) : (
              <Feather name="shopping-bag" size={25} color="grey" />
            );
            IconComponent = Icon;
          } else if (label === 'Favourites') {
            IconComponent = (
              <MaterialCommunityIcons
                name={isFocused ? 'cards-heart' : 'cards-heart-outline'}
                size={25}
                color={isFocused ? 'red' : 'grey'}
              />
            );
          } else if (label === 'Profile') {
            IconComponent = (
              <FontAwesome
                name={isFocused ? 'user' : 'user-o'}
                size={25}
                color={isFocused ? 'red' : 'grey'}
              />
            );
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (

              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.textContainer}
                key={index}>
                {IconComponent}
                <Text style={{color: isFocused ? 'red' : 'grey'}}>{typeof label === 'string' ? label : null}</Text>
              </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 2,
  },
  textIcon: {

  },
});

export default CustomTabBar;