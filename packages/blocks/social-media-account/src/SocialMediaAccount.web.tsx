import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
} from "react-native";

import CustomGoogleLogInButton from "../../social-media-account/src/CustomGoogleLogInButton";
import ErrorBoundary from "../../social-media-account/src/ErrorBoundary.web";
// Customizable Area End

const configJSON = require("./config.js");

import SocialMediaAccountController, {
  Props
} from "./SocialMediaAccountController.web";

class SocialMediaAccount extends SocialMediaAccountController {
  static SocialMediaAccount: SocialMediaAccount;

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
        <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
        <CustomGoogleLogInButton
          errorCallBack={(error: any) => this.props.errorCallBack(error)}
          successCallBack={() => this.props.successCallBack()}
          testID="btnGoogleLogIn" //Merge Engine::From BDS
          style={styles.googleStyle} //UI Engine::From Sketch
          {...this.btnGoogleLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />
        </ErrorBoundary>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  googleStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
});
// Customizable Area End

export default SocialMediaAccount;
