// SignUp.js
import React, { Fragment } from "react";
import { View, Text, Button, TextInput, StyleSheet, Image, ImageBackground, TouchableHighlight, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";

import { Auth } from "aws-amplify";

const initialState = {
  username: "",
  password: "",
  email: "",
  phone_number: "",
  authenticationCode: "",
  showConfirmationForm: false
};

export default class SignUp extends React.Component {
  state = initialState;
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'My Screen'
        },
        drawBehind: true,
        visible: false,
        animate: false
      }
    };
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state;
    try {
      Auth.signUp({
        username,
        password,
        attributes: { email, phone_number }
      });
      console.log("user successfully signed up!: ", success);
    } catch (err) {
      console.log("error signing up: ", err);
    }
    this.setState({ showConfirmationForm: true });
  };
  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;
    try {
      Auth.confirmSignUp(username, authenticationCode);
      console.log("successully signed up!");
      alert("User signed up successfully!");
      goHome();
      this.setState({ ...initialState });
    } catch (err) {
      console.log("error confirming signing up: ", err);
    }
  };
  render() {
    return (
      <ImageBackground source={require('../images/signUp.png')} style={styles.container}>
        {!this.state.showConfirmationForm && (
          <Fragment>
            <Text style={styles.heading}>CREATE NEW ACCOUNT</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              placeholderTextColor='rgba(172, 112, 192, 0.8)'
              onChangeText={val => this.onChangeText("username", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor='rgba(172, 112, 192, 0.8)'
              onChangeText={val => this.onChangeText("password", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor='rgba(172, 112, 192, 0.8)'
              onChangeText={val => this.onChangeText("email", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              autoCapitalize="none"
              placeholderTextColor='rgba(172, 112, 192, 0.8)'
              onChangeText={val => this.onChangeText("phone_number", val)}
            />
            <Text style={styles.para}>Great! your one step away.</Text>
            <TouchableHighlight style={styles.back} onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'SignIn',
                }
              });
            }}>
              <Image source={require("../images/back.png")} >
              </Image>
            </TouchableHighlight>
            <TouchableOpacity
              style={styles.signUpBtn}
              title="Sign In" onPress={this.signUp}
            >
              <Text style={{ color: "#fff" }}> CREATE </Text>
            </TouchableOpacity>

          </Fragment>
        )}
        {this.state.showConfirmationForm && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Authentication code"
              autoCapitalize="none"
              placeholderTextColor='rgba(172, 112, 192, 0.8)'
              onChangeText={val => this.onChangeText("authenticationCode", val)}
            />

            <Button title="Confirm Sign Up" onPress={this.confirmSignUp} />
          </Fragment>
        )}
      </ImageBackground>
    );
  }
}
const navigatorStyle = { navBarHidden: true }
const styles = StyleSheet.create({
  input: {
    width: 320,
    fontSize: 14,
    fontWeight: "500",
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 14,
    color: 'rgba(172, 112, 192, 0.8)',
    padding: 12,
    paddingLeft: 25,
    borderRadius: 28,
    borderBottomColor: '#eab9fb',
    borderBottomWidth: 2,
    borderLeftColor: '#eab9fb',
    borderLeftWidth: 2,
    borderRightColor: '#eab9fb',
    borderRightWidth: 2,
    borderTopColor: '#eab9fb',
    borderTopWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    color: "#be70d8",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  },
  para: {
    color: "#888888",
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 50,
    marginTop: 30
  },
  back: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 16,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
    left: 40,
    width: 34,
    height: 34
  },
  signUpBtn: {
    backgroundColor: "#a83292",
    borderRadius: 28,
    color: "#fff",
    marginTop: 20,
    marginLeft: "auto",
    width: 150,
    height: 50,
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    position: 'absolute',
    bottom: 50,
    right: 40
  },
  signUpText: {
    color: "#fff"
  }
});
