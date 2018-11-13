import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  navigatorStyle = { navBarHidden: true }
  Navigation.registerComponent('Home', () => require('./Home').default);
  Navigation.registerComponent('Initializing', () => require('./Initializing').default);
  Navigation.registerComponent('SignIn', () => require('./SignIn').default);
  Navigation.registerComponent('SignUp', () => require('./SignUp').default);
  Navigation.registerComponent('Screen2', () => require('./Screen2').default);
}