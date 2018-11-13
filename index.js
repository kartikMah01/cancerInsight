// index.js
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/screens";

import Amplify from "aws-amplify";
import aws_exports from "./app-config/aws-exports";
Amplify.configure(aws_exports);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing"
      }
    }
  });
});
