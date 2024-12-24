import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {paramList} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import ThemeContext from './ThemeContext';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import './gesture-handler';
// import MyTabs from './src/Components/BottomNavigator/MyTabs';
import Loginform from './src/Components/Loginform';
import SignUp from './src/Components/SignUp';
import MyDrawer from './src/Components/DrawerNavigator/MyDrawer';
import SplashScreen from './src/Screens/SplashScreen';
import MyTabs from './src/Components/BottomNavigator/MyTabs';
import {TouchableOpacity} from 'react-native';

type Props = NativeStackScreenProps<paramList, 'Login'>;

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Tabspage: undefined;
  MyDrawer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface IState {
  tokenValue: boolean | null;
  toggleTheme: boolean | string;
}

class App extends Component<Props, IState> {
  themeListener: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      tokenValue: null,
      toggleTheme: false,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (token) {
        this.setState({tokenValue: true});
      } else {
        this.setState({tokenValue: false});
      }
    } catch (error) {
      this.setState({tokenValue: false});
      console.log(error);
    }
  };

  changeThemeMode=(toggleTheme: boolean)=>{
    this.setState({toggleTheme})
  }

  render() {
    const {tokenValue, toggleTheme} = this.state;

    if (tokenValue === null) {
      return <SplashScreen />;
    }
    return (
      <ThemeContext.Provider value={{ toggleTheme, changeThemeMode: this.changeThemeMode }}>
     {/* <KeyboardAvoidingView style={styles.keyContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={tokenValue ? 'MyDrawer' : 'Login'}>
              <Stack.Screen name="Login" component={Loginform} />
              <Stack.Screen name="Signup" component={SignUp} />
              <Stack.Screen name="MyDrawer" component={MyDrawer} />
            </Stack.Navigator>
          </NavigationContainer>
        {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
      </ThemeContext.Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  keyContainer: {
    // backgroundColor: '#f9f9f9',
    flex: 1,
  },
  mainContainer: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    margin: 1,
  },
  darkMode: {
    color: '#fff',
    backgroundColor: '#000',
  },
  lightMode: {
    color: '#000',
    backgroundColor: '#fff',
  },
});
