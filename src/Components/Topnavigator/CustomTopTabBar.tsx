import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
// import { TopTabBarProps } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'; // For Material Top Tab bar

import {Text} from '@react-navigation/elements';
import {Platform} from 'react-native';
import ThemeContext from '../../../ThemeContext';

class CustomTopTabBar extends Component<MaterialTopTabBarProps> {
  constructor(props: MaterialTopTabBarProps) {
    super(props);
  }

  render() {
    const {state, descriptors, navigation} = this.props;
    return (
      <ThemeContext.Consumer>
        {value => {
          const {toggleTheme} = value;
          // console.log('20', toggleTheme);
          return (
            <View style={{flexDirection: 'row'}}>
              {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                // console.log('19',options)
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;
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
                    accessibilityRole={
                      Platform.OS === 'web' ? 'link' : 'button'
                    }
                    accessibilityState={isFocused ? {selected: true} : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={
                      isFocused
                        ? styles.textContainer
                        : styles.textContainerFalse
                    }
                    key={index}>
                      <Text style={styles.tabText}>{typeof label === 'string' ? label : null}</Text>
                    {/* <Text style={styles.tabText}>{label}</Text> */}
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      </ThemeContext.Consumer>
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
    textDecorationLine: 'underline',
    borderBottomWidth: 2,
    borderBottomColor: '#DB3022',
    
  },
  textContainerFalse: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 2,
  },
  tabText: {
    color: '#222222',
    fontFamily: 'Montserrat-Bold',
  },
});

export default CustomTopTabBar;
