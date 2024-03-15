import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../framework/src/IBlock";

import googleController from "./GoogleWebController";
import { GoogleDelegate } from "./GoogleDelegate";

const configJSON = require("./config");

// Customizable Area Start
interface ResponseJson {
  meta: {
    token: string;
  };
}
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  isRegistration: boolean;
  role: any;
  successCallBack: any;
  errorCallBack: any;
  // Customizable Area End
}


interface S {
  loading: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class SocialMediaAccountController
  extends BlockComponent<Props, S, SS>
  implements GoogleDelegate {
  createAccountAPICallId: string = "";
  googleUser: any;
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage)
      // Customizable Area End
    ]);

    this.state = {
      // Customizable Area Start
      loading: false
      // Customizable Area End
    };
  }

  // Customizable Area Start
  googleUserStatusChanged(userInfo: {
    email: string;
    id: string;
    token: string;
    status?: string;
  }): void {
    if (this.props.isRegistration) {
      this.createAccountFromSocial(userInfo.email, userInfo.id, userInfo.token, this.props);
    } else {
      this.logInWithSocial(
        userInfo.email,
        userInfo.token,
        userInfo.id,
        this.props
      );
    }
  }

  responseFacebook = (response: {
    email: string;
    id: string;
    name: string;
    userID: string;
    accessToken: string;
    status?: string;
  }) => {
    if (this.props.isRegistration) {
      this.createAccountFromSocial(response.email, response.id, response.accessToken, this.props);
    } else {
      this.logInWithSocial(
        response.email,
        response.accessToken,
        response.id,
        this.props
      );
    }
    runEngine.debugLog(response);
  };

  googleLogIn = (isRegistration: boolean, credential: string) => {

    googleController.googleLogIn(this, credential, isRegistration)?.then(
      function() {
        runEngine.debugLog("User SIGNED IN.");
      },
      function(error: { error: string }) {
        if (error.error === "popup_closed_by_user") {
          //handle window closed event
        }
      }
    );
  };
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      this.props.successCallBack()
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createAccountAPICallId !== "" &&
      this.createAccountAPICallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        this.saveLoggedInUserData(responseJson);
      } else if (responseJson && responseJson.errors) {
        this.props.errorCallBack(responseJson.errors)
      } else {
        let errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.props.errorCallBack(errorReponse)
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async createAccountFromSocial(
    incomingEmail: string,
    incomingId: string,
    token: string,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0 ||
      !token ||
      token.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createAccountURL
    );

    const httpBodyData = {
      type: "social_account",
      attributes: {
        // email: incomingEmail,
        // password: incomingEmail,
        // unique_auth_id: incomingId,
        token: token,
        role_type: props.role
      }
    };

    const httpBody = {
      data: httpBodyData
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postHttpRequest
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async logInWithSocial(
    incomingEmail: string,
    token: string,
    incomingId: string,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0 ||
      !token ||
      token.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON
    };

    const attributes = {
      // email: incomingEmail,
      token: token,
      // unique_auth_id: incomingId,
      role_type: props.role
    };

    const httpData = {
      type: "social_account",
      attributes
    };

    const httpDataBody = {
      data: httpData
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAccountURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpDataBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postHttpRequest
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  navigate() {
    if (this.props?.isRegistration) {
      this.navigateToRegister();
    } else {
      this.navigateToSignin();
    }
  }

  navigateToRegister() {
    const navigateToSignupMessage: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    navigateToSignupMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(navigateToSignupMessage);
  }

  navigateToSignin() {
    const navigateToLoginMessage: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    navigateToLoginMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(navigateToLoginMessage);
  }

  saveLoggedInUserData(responseJson: ResponseJson) {
    const saveSessionMessage: Message = new Message(
      getName(MessageEnum.SessionSaveMessage)
    );

    saveSessionMessage.addData(
      getName(MessageEnum.SessionResponseData),
      JSON.stringify(responseJson)
    );

    saveSessionMessage.addData(
      getName(MessageEnum.SessionResponseToken),
      responseJson.meta.token
    );

    this.send(saveSessionMessage);
  }

  openInfoPage() {
    const openInfoPageMessage = new Message(
      getName(
        this.props.isRegistration
          ? MessageEnum.AccoutResgistrationSuccess
          : MessageEnum.AccoutLoginSuccess
      )
    );
    openInfoPageMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(openInfoPageMessage);
  }

  btnFacebookLogInProps = {
    onPress: () => {
    },
    callback: this.responseFacebook
  };

  btnGoogleLogInProps = {
    useOneTap: true,
    onResponse: (credential: string) => {
      this.googleLogIn(this.props.isRegistration, credential);
    },
    onError: (error: string) => {
      alert(error);
    }
  };

  btnNavigateProps = {
    onPress: () => this.navigate()
  };
  // Customizable Area End
}
