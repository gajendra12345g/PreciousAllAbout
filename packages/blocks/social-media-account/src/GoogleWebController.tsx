import { runEngine } from "../../../framework/src/RunEngine";
import { GoogleDelegate } from "./GoogleDelegate";

// Customizable Area Start
interface UserInfo {
  email: string;
  id: string;
  token: string;
}

interface GoogleAuthDetails {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  token: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
// Customizable Area End

class GoogleWebControllerClass {
  googleUser: GoogleAuthDetails | null;
  googleUserInfo: UserInfo;
  delegateClass: GoogleDelegate;

  // Customizable Area Start
  // Customizable Area End

  static instance = new GoogleWebControllerClass();

  constructor() {
    this.googleLogIn = this.googleLogIn.bind(this);
    this.updateGoogleUser = this.updateGoogleUser.bind(this);
    // Customizable Area Start
    this.googleUser = {
      iss: 'string',
      nbf: 1,
      aud: 'string',
      sub: 'string',
      hd: 'string',
      email: 'string',
      token: 'string',
      email_verified: true,
      azp: 'string',
      name: 'string',
      picture: 'string',
      given_name: 'string',
      family_name: 'string',
      iat: 1,
      exp: 1,
      jti: 'string',
    }
    this.googleUserInfo = {
      email: '',
      id: '',
      token: ''
    }
    this.delegateClass = {
      googleUserStatusChanged: () => {}
    }
    // Customizable Area End
  }

  // Customizable Area Start
  ///////////////////////////////////
  signinChanged(userDetails: GoogleAuthDetails) {
    runEngine.debugLog("Signin state changed to ", userDetails);
  }

  userChanged(user: GoogleAuthDetails, isRegistration: boolean) {
    runEngine.debugLog("USER NOW: ", user);
    if (GoogleWebControllerClass.instance.updateGoogleUser(user)) {
      GoogleWebControllerClass.instance.delegateClass.googleUserStatusChanged(
        GoogleWebControllerClass.instance.googleUserInfo,
        isRegistration
      );
    }
  }

  parseUserDetails = (token: string) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((response) => {
          return "%" + ("00" + response.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const newJsonPayload = JSON.parse(jsonPayload);
    newJsonPayload['token'] = token;
    return newJsonPayload;
  };

  googleLogIn(delegateClass: GoogleDelegate, credential: string, isRegistration: boolean) {
    try {
      GoogleWebControllerClass.instance.googleUser = null;
      GoogleWebControllerClass.instance.delegateClass = delegateClass;

      const authDetail: GoogleAuthDetails = this.parseUserDetails(credential);
      GoogleWebControllerClass.instance.signinChanged(authDetail);
      GoogleWebControllerClass.instance.userChanged(authDetail, isRegistration);

      return Promise.resolve(authDetail);
    } catch (error) {
      runEngine.debugLog(error);
    }
  }

  updateGoogleUser(googleUser: GoogleAuthDetails) {
    if (googleUser && googleUser !== GoogleWebControllerClass.instance.googleUser) {
      GoogleWebControllerClass.instance.googleUser = googleUser;
      runEngine.debugLog(googleUser.sub + "_______" + googleUser.email);
      GoogleWebControllerClass.instance.googleUserInfo = {
        email: googleUser.email,
        id: googleUser.sub,
        token: googleUser.token
      };
      return true;
    }

    return false;
  }
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

const GoogleWebController = new GoogleWebControllerClass();
export default GoogleWebController;
