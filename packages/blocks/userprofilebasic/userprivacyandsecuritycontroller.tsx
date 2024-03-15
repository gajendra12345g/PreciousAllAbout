import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";

// Customizable Area Start

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  minPassLength: boolean;
  includeUpperCaseChar: boolean;
  includeLowerCaseChar: boolean;
  includeNumber: boolean;
  visibility: string;
  alertType: string;
  profileImg: string | null;
  userName: string | null;
  name: string | null;
  passwordErrorMessage: string;
  passwordMatchError: boolean;
  oldPasswordErrorMessage: string;
  isOldPasswordError: boolean;
  passwordUpdateSuccessfully: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class UserProfilePrivacyAndSecurity extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  userProfileDetailsApi: any = "";
  updatePasswordApiCall: any = "";
  visbilityAndSecurityAlertDetailApiCall: any = "";
  updateVisibilityAndSecurityAlertApiCall: any = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      confirmNewPassword: "",
      includeLowerCaseChar: false,
      includeNumber: false,
      includeUpperCaseChar: false,
      minPassLength: false,
      newPassword: "",
      oldPassword: "",
      visibility: configJSON.publicVisibility,
      alertType: configJSON.inAppNotificationAlert,
      profileImg: null,
      userName: null,
      name: null,
      passwordErrorMessage: "",
      passwordMatchError: false,
      isOldPasswordError: false,
      oldPasswordErrorMessage: "",
      passwordUpdateSuccessfully: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson.errors) {
        switch (apiRequestCallId) {
          case this.updateVisibilityAndSecurityAlertApiCall:
            this.getSecurityAlertAndSetVisibility();
            break;

          case this.updatePasswordApiCall:
            this.setState({
              oldPasswordErrorMessage: responseJson.errors[0].password,
              isOldPasswordError: true
            });
            break;
          default:
            break;
        }
      }
      if (responseJson && !responseJson.errors) {
        switch (apiRequestCallId) {
          case this.userProfileDetailsApi:
            this.setState({
              profileImg: responseJson.data.attributes.photo,
              userName: responseJson.data.attributes.user_name,
              name: responseJson.data.attributes.first_name
            });
            break;
          case this.visbilityAndSecurityAlertDetailApiCall:
            this.setState({
              visibility: responseJson.visibility,
              alertType: responseJson.security_alert
            });
            break;

          case this.updatePasswordApiCall:
            this.setState({ passwordUpdateSuccessfully: true });
            this.resetPassowrdFields();
            break;
          default:
            break;
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount(): Promise<void> {
    this.userDetails();
    this.getSecurityAlertAndSetVisibility();
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body, type } = data;
    let token = await getStorageData("authToken");
    const header = { "Content-Type": contentType, token: token };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    request.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    body && type !== "formData"
      ? request.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        )
      : request.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(request.id, request);
    return request.messageId;
  };

  userDetails = async () => {
    this.userProfileDetailsApi = await this.apiCall({
      contentType: configJSON.contentTypeAppliactionJson,
      method: configJSON.getMethod,
      endPoint: configJSON.userProfileEndPoit
    });
  };

  getSecurityAlertAndSetVisibility = async () => {
    this.visbilityAndSecurityAlertDetailApiCall = await this.apiCall({
      contentType: configJSON.contentTypeAppliactionJson,
      method: configJSON.getMethod,
      endPoint: configJSON.getVisibilityAndSecurityAlertEndPoint
    });
  };

  updateSecurityAlertAndSetVisibility = async (body: any) => {
    this.updateVisibilityAndSecurityAlertApiCall = await this.apiCall({
      contentType: configJSON.contentTypeAppliactionJson,
      method: configJSON.patchMethod,
      endPoint: configJSON.updateVisibilityAndSecurityAlertEndPoint,
      body
    });
  };

  handleChangePassword = (event: any) => {
    if (this.state.isOldPasswordError) {
      this.setState({ isOldPasswordError: false, oldPasswordErrorMessage: "" });
    }
    this.setState({ oldPassword: event.value });
  };

  handleNewPassword = (event: any) => {
    const value = event.value;
    const minLength = configJSON.regexForMinimumLen.test(value),
      containUpperCase = configJSON.regexForUpperChar.test(value),
      containLowerCase = configJSON.regexForLowerChar.test(value),
      containNumber = configJSON.regexForNumber.test(value);

    this.setState({
      newPassword: value,
      includeLowerCaseChar: containLowerCase,
      includeNumber: containNumber,
      minPassLength: minLength,
      includeUpperCaseChar: containUpperCase
    });
  };

  handleChangeConfirmPassword = (event: any) => {
    if (this.state.passwordMatchError) {
      this.setState({ passwordErrorMessage: "", passwordMatchError: false });
    }
    this.setState({ confirmNewPassword: event.value });
  };

  handleSetVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ visibility: event.target.value });
    const body = {
      data: {
        attributes: {
          visibility: configJSON.visibility[event.target.value]
        }
      }
    };
    this.updateSecurityAlertAndSetVisibility(body);
  };

  handleAlert = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ alertType: event.target.value });
    const body = {
      data: {
        attributes: {
          security_alert: configJSON.security_alert[event.target.value]
        }
      }
    };
    this.updateSecurityAlertAndSetVisibility(body);
  };

  resetPassowrdFields = () => {
    this.setState({
      passwordErrorMessage: "",
      confirmNewPassword: "",
      includeLowerCaseChar: false,
      includeNumber: false,
      includeUpperCaseChar: false,
      isOldPasswordError: false,
      minPassLength: false,
      newPassword: "",
      oldPassword: "",
      oldPasswordErrorMessage: "",
      passwordMatchError: false
    });
  };

  handleSavePassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const {
      includeLowerCaseChar,
      confirmNewPassword,
      includeNumber,
      includeUpperCaseChar,
      minPassLength,
      newPassword,
      oldPassword
    } = this.state;

    if (
      confirmNewPassword !== newPassword &&
      includeLowerCaseChar &&
      includeUpperCaseChar &&
      includeNumber &&
      minPassLength &&
      oldPassword
    ) {
      this.setState({
        // passwordErrorMessage: "Password not match",
        passwordMatchError: true
      });
    } else if (
      includeLowerCaseChar &&
      includeUpperCaseChar &&
      includeNumber &&
      minPassLength &&
      oldPassword
    ) {
      const body = {
        data: {
          attributes: {
            current_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confirmNewPassword
          }
        }
      };

      this.updatePasswordApiCall = await this.apiCall({
        contentType: configJSON.contentTypeAppliactionJson,
        method: configJSON.patchMethod,
        endPoint: configJSON.updatePasswordEndPoint,
        body
      });
    }
  };

  handleCloseSnackBar = () => {
    this.setState({ passwordUpdateSuccessfully: false });
  };

  // Customizable Area End
}
