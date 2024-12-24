import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../../../ThemeContext';

interface IToggle {
  toggle: boolean
}
class CustomDrawerContent extends Component<DrawerContentComponentProps, IToggle> {
  constructor(props: DrawerContentComponentProps) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

 

  render() {
    const {state, descriptors, navigation} = this.props;
    // console.log('14',descriptors['route'])
    return(


    <ThemeContext.Consumer>
      {
      value => {
        const {toggleTheme, changeThemeMode} = value;
        const onPressToggleButton = () => {
          changeThemeMode(!toggleTheme)
          this.setState({toggle: !this.state.toggle})
        }
        
        return (
          <View style={styles.spaceContainer}>
            <SafeAreaView style={styles.drawerContainer}>
              {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                  options.drawerLabel !== undefined
                    ? options.drawerLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
  
                const isFocused = state.index === index;
  
                let IconComponent;
                if (label === 'My Home') {
                  IconComponent = (
                    <MaterialCommunityIcons
                      name={isFocused ? 'home' : 'home-outline'}
                      size={30}
                      color={isFocused ? 'green' : 'grey'}
                    />
                  );
                } else if (label === 'Shop') {
                  IconComponent = (
                    <MaterialCommunityIcons
                      name={isFocused ? 'cart' : 'cart-outline'}
                      size={30}
                      color={isFocused ? 'green' : 'grey'}
                    />
                  );
                } else if (label === 'Bag') {
                  let Icon = isFocused ? (
                    <Entypo name="shopping-bag" size={30} color="green" />
                  ) : (
                    <Feather name="shopping-bag" size={30} color="grey" />
                  );
                  IconComponent = Icon;
                } else if (label === 'Favourites') {
                  IconComponent = (
                    <MaterialCommunityIcons
                      name={isFocused ? 'cards-heart' : 'cards-heart-outline'}
                      size={30}
                      color={isFocused ? 'green' : 'grey'}
                    />
                  );
                } else if (label === 'Profile') {
                  IconComponent = (
                    <FontAwesome
                      name={isFocused ? 'user' : 'user-o'}
                      size={25}
                      color={isFocused ? 'green' : 'grey'}
                    />
                  );
                }
  
                const onPress = () => {
                  const event = navigation.emit({
                    type: 'drawerItemPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
  
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                };
  
                return (
                  <View key={route.key || index}>
                    <TouchableOpacity
                      accessibilityRole="button"
                      onPress={onPress}
                      style={styles.textContainer}
                      key={route.key}>
                      <View style={styles.textIcon}>
                        {IconComponent}
                        <Text
                          style={[
                            {color: isFocused ? 'green' : 'grey'},
                            styles.textContext,
                          ]}>
                          {typeof label === 'function'
                            ? label({
                                color: isFocused ? 'green' : 'grey',
                                focused: isFocused,
                              })
                            : label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </SafeAreaView>
  
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={onPressToggleButton}>
              {this.state.toggle ? (
                <MaterialIcons name="light-mode" color='red' size={25} />
              ) : (
                <MaterialIcons name="dark-mode" color='green' size={25} />
              )}
            </TouchableOpacity>
          </View>
      );
      }
      }
    </ThemeContext.Consumer>
      )
  }
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  spaceContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerContainer: {
    flexDirection: 'column',
    // borderRadius: Platform.OS === 'ios' ? 50 : 0
  },
  textContainer: {
    borderWidth: 0.1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 5,
    padding: 15,
    width: 240,
    opacity: 0.6,
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  textContext: {
    marginLeft: 10,
    fontSize: 20,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 20,
    // borderWidth: 0.5,
    borderRadius: 50,
  },
});
