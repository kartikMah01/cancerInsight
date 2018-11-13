// SignIn.js
import React, { Fragment } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ImageBackground, Image } from "react-native";
import { Navigation } from "react-native-navigation";
import { goHome } from "./navigation";
import { Auth } from "aws-amplify";

export default class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    user: {},
    authenticationCode: "",
    showConfirmationForm: false
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
  goToScreen = screenName => {
    console.log("screen: ", screenName);
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
      },
      topBar: {
        visible: false
      }
    });
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  signIn = async () => {
    const { username, password } = this.state;
    try {
      const user = await Auth.signIn(username, password);
      console.log("user successfully signed in!", user);
      //this.setState({ showConfirmationForm: true });
      goHome();
    } catch (err) {
      console.log("error:", err);
    }
  };
  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state;
    try {
      await Auth.confirmSignIn(user, authenticationCode);
      console.log("user successfully signed in!", user);
    } catch (err) {
      console.log("error:", err);
    }
  };
  render() {
    return (
      <ImageBackground source={require('../images/signIn.png')} style={styles.container}>
        {!this.state.showConfirmationForm && (
          <Fragment>
            <Image style={styles.logo} source={require("../images/logo.png")} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("username", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("password", val)}
            />
            <View style={styles.signInWrap}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
                <TouchableOpacity
                  style={styles.signInBtn}
                  title="Sign In" onPress={this.signIn}
                >
                  <Text style={{ color: "#fff" }}> SIGN IN </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: "auto"
              }} >

              </View>
            </View>
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Don't have an account yet?</Text>
              <TouchableOpacity onPress={() => this.goToScreen("SignUp")}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
            </View>
          </Fragment>
        )}
        {this.state.showConfirmationForm && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Authentication Code"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("authenticationCode", val)}
            />
            <Button title="Confirm Sign In" onPress={this.confirmSignIn} />
          </Fragment>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 320,
    fontSize: 14,
    fontWeight: "500",
    height: 55,
    backgroundColor: 'rgba(153, 63, 184, 0.8)',
    margin: 20,
    color: 'rgba(243, 207, 255, 1)',
    padding: 12,
    paddingLeft: 25,
    borderRadius: 28,
    borderColor: '#a43ec6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signInWrap: {
    flexDirection: 'row',
  },
  signInBtn: {
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
    elevation: 1
  },
  signText: {
    color: "#fff"
  },
  signupTextCont: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 16,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
});
