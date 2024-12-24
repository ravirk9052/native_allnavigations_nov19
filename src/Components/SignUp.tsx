import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './Footer';
import {paramList} from '../../type';

type Props = NativeStackScreenProps<paramList, 'Signup'>;

interface IState {
  name: string;
  email: string;
  password: string;
  showCheckuser: boolean;
  showUserError: boolean;
  showEye: boolean;
  showError: boolean;
  showNameError: boolean;
}

class SignUp extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      showCheckuser: false,
      showUserError: false,
      showEye: true,
      showError: false,
      showNameError: false,
    };
  }

  clearToken = () => {
    return AsyncStorage.removeItem('AccessToken');
  };

  componentDidMount() {
    this.clearToken();
  }

  validatePassword = (password: string) => {
    const passwordRegEx = /^.{5,}$/;
    return passwordRegEx.test(password);
  };

  validateName = (name: string) => {
    const nameRegEx = /^.{3,}$/;
    return nameRegEx.test(name);
  };

  validateMail = (email: string) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(email);
  };

  onChangeNameInput = (text: string) => {
    this.setState(prevState => ({
      ...prevState,
      name: text,
    }));

    if (!this.validateName(this.state.name)) {
      this.setState(prevState => ({
        ...prevState,
        showNameError: true,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        showNameError: false,
      }));
    }
  };

  onChangeEmailInput = (text: string) => {
    this.setState(prevState => ({
      ...prevState,
      email: text,
    }));

    if (!this.validateMail(this.state.email)) {
      this.setState(prevState => ({
        ...prevState,
        showUserError: true,
        showCheckuser: false,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        showUserError: false,
        showCheckuser: true,
      }));
    }
  };

  onPressEyeIcon = () => {
    this.setState(prevState => ({
      ...prevState,
      showEye: !prevState.showEye,
    }));

  };

  onChangePasswordInput = (text: string) => {
    this.setState(prevState => ({
      ...prevState,
      password: text,
    }));

    if (!this.validatePassword(this.state.password)) {
      this.setState(prevState => ({
        ...prevState,
        showError: true,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        showError: false,
      }));
    }
  };

  onPressSignUpButton = () => {
    const {name, email, password} = this.state;

    if (name && email && password) {
      const apicall = async () => {
        let url = 'https://reqres.in/api/register',
          options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          };

        const response = await fetch(url, options);
        if (response.ok) {
          const output = await response.json();
          Alert.alert('Signup Successfull...');
          await AsyncStorage.setItem('AccessToken', output.accessToken);
        } else {
          this.setState(prevState => ({
            ...prevState,
            name: '',
            password: '',
          }));
        }
      };

      apicall();

      const getTokenCall = async () => {
        let tokenValue = await AsyncStorage.getItem('AccessToken');
      };

      getTokenCall();
    } else {
      this.setState(prevState => ({
        ...prevState,
        showError: !prevState.showError,
        showUserError: !prevState.showUserError,
        showNameError: !prevState.showNameError,
      }));
    }
  };


  render() {
    const {
      name,
      email,
      password,
      showCheckuser,
      showUserError,
      showEye,
      showError,
      showNameError,
    } = this.state;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View>
          <Icon
            onPress={() => this.props.navigation.navigate('Login')}
            name="angle-left"
            style={styles.iconSize}
            size={36}
          />
          <Text style={styles.header}>Sign up</Text>
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.nameContainer}>
            <View style={styles.nameInput}>
              <TextInput
                onChangeText={this.onChangeNameInput}
                value={name}
                placeholder="Name"
                placeholderTextColor="black"
               
              />
            </View>
            {showNameError && (
              <View style={styles.errorUserContainer}>
                <Text style={styles.error}>* Name is Required...</Text>
              </View>
            )}
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.emailInput}>
              <TextInput
                onChangeText={this.onChangeEmailInput}
                value={email}
                placeholder="E-Mail"
                placeholderTextColor="black"
              />
              {showCheckuser ? (
                <Icon style={styles.checkIcon} name="check" size={20} />
              ) : (
                <Icon style={styles.checkIconFalse} name="check" size={20} />
              )}
            </View>
            {showUserError && (
              <View style={styles.errorUserContainer}>
                <Text style={styles.error}>
                  * Email Address Required & should be valid...
                </Text>
              </View>
            )}
          </View>
          <View style={styles.nameContainer}>
            {showEye ? (
              <View style={styles.emailInput}>
                <TextInput
                  secureTextEntry
                  onChangeText={this.onChangePasswordInput}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor="black"
                />
                <TouchableOpacity
                  onPress={this.onPressEyeIcon}
                  style={styles.eyeIcon}>
                  <Icon name="eye-slash" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emailInput}>
                <TextInput
                  onChangeText={this.onChangePasswordInput}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor="black"
                />
                <TouchableOpacity
                  onPress={this.onPressEyeIcon}
                  style={styles.eyeIcon}>
                  <Icon name="eye" size={20} />
                </TouchableOpacity>
              </View>
            )}
            {showError && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>
                  * Password should be in 6 characters or more..
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.alreadyContainer}>
              <Text style={styles.altText}>Already have an account?</Text>
              <Icon
                name="long-arrow-right"
                style={styles.longArrowIcon}
                size={15}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.onPressSignUpButton}>
          <Text style={styles.button}>SIGN UP</Text>
        </TouchableOpacity>

        <Footer />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: responsiveHeight(100),
    justifyContent: 'space-between',
  },

  textInputContainer: {
    width: '100%',
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: -9,
  },

  nameInput: {
    width: responsiveWidth(95),
    margin: responsiveHeight(1),
    height: 64,
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 15,
    boxShadow: '0px 1px 12px 0px #0000000D',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emailInput: {
    width: responsiveWidth(95),
    margin: responsiveHeight(1),
    height: 64,
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 15,
    boxShadow: '0px 1px 12px 0px #0000000D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordInput: {
    width: responsiveWidth(95),
    margin: responsiveHeight(0),
    height: 64,
    backgroundColor: 'white',
    boxShadow: '0px 1px 12px 0px #0000000D',
    color: 'black',
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  alreadyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  altText: {
    fontSize: 14,
    color: '#222222',
    fontFamily: 'Roboto-Medium',
  },
  longArrowIcon: {
    marginTop: 0,
    color: '#DB3022',
    marginLeft: 8,
  },
  submitButton: {
    width: responsiveWidth(95),
    height: 48,
    backgroundColor: '#DB3022',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 25,
    marginVertical: responsiveHeight(6),
  },
  button: {
    color: '#ffffff',
    fontFamily: 'Roboto-Medium',
  },

  checkIcon: {
    color: 'green',
    alignSelf: 'center',
    paddingRight: 10,
  },
  checkIconFalse: {
    display: 'none',
  },
  error: {
    color: 'red',
    textAlign: 'left',
  },
  errorContainer: {
    alignSelf: 'flex-start',
    marginTop: 2,
    marginLeft: 12,
  },

  eyeIcon: {
    alignSelf: 'center',
    paddingRight: 10,
  },
  errorUserContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  },
  iconSize: {
    top: 8,
    left: 10,
    width: responsiveWidth(6),
  },
  header: {
    fontSize: 34,
    width: 180,
    paddingTop: 45,
    left: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default SignUp;
