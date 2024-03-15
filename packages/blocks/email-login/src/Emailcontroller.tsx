import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { setStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  callBack: any;
  closeLogin: any;
  roleType: number;
  forgetPasswordRoute:string
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  emailInputError: boolean;
  emailHelperText: string;
  error: boolean;
  errorText: string;
  errorType: string;
  roleType: number;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  apiCheckRoleId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      emailInputError: false,
      emailHelperText: '',
      error: false,
      errorText: '',
      errorType: '',
      roleType: this.props.roleType
    };

    this.emailReg = new RegExp(`${configJSON.emailRegEx}`);
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  onSignupResponse = () => {
    if(this.props.roleType == 1){
      this.props.navigation.navigate('LadingPageAfterLoginContributor')
    } else {
      this.props.callBack()
    }
  }

  errorResponse = (error: any) => {
    this.setState({
      error: true,
      errorText: error,
      errorType: 'error'
    }, () => {
      this.scrollToDiv()
    })
  }
  
  scrollToDiv = () => {
    const myDiv = document.getElementById('wrapper'); 

    if (myDiv) {
      myDiv.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  joinQstock = () => {
    this.props.closeLogin()
  }

  handleChange = (target: any) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    }, () => {
      if(this.props.roleType == 0 && target.name == 'email'){
        if(configJSON.emailRegEx.test(this.state.email)){
          setTimeout(() => {
            this.checkRole();
          }, 1000)
        }
      }
    })
  }

  checkRole = () => {
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const data = {
      "email": this.state.email
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiCheckRoleId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.checkRoleApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  login = () => {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !configJSON.emailRegEx.test(this.state.email)
    ) {
      this.setState({
        error: true,
        errorText: 'Invalid Email ID',
        errorType: 'error'
      }, () => {
        this.scrollToDiv()
      })
      return false
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.setState({
        error: true,
        errorText: 'Please enter password!',
        errorType: 'error'
      }, () => {
        this.scrollToDiv()
      })
      return false
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
      role_type: this.state.roleType
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginApiEndPointWeb
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin(),
  };

  btnEmailLogInProps = {
    onPress: () => this.doEmailLogIn(),
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  setEmail = (text: string) => {
    this.setState({
      email: text,
    });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setRememberMe = (value: boolean) => {
    this.setState({ checkedRememberMe: value });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword(),
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;



  setLoginResponse = (responseJson: any) => {
    if (responseJson?.meta?.token && !responseJson.errors) {
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      this.props.callBack();
      if(this.state.roleType == 1){
        setStorageData("authContributorToken", responseJson.meta.token )
        setStorageData("contributorName", responseJson.meta.name)
        setStorageData("roleType", '1' )
        setStorageData("email", responseJson.meta.email )
        this.props.navigation.navigate('LadingPageAfterLoginContributor')
      }  else if(this.state.roleType == 2){
          setStorageData("authToken", responseJson.meta.token )
          setStorageData("roleType", '2' )
          setStorageData("name", responseJson.meta.name )
          this.props.navigation.navigate('ModeratorTickets')
      } else {
        this.saveLoggedInUserData(responseJson);
        setStorageData("roleType", '0' )
        setStorageData("name", responseJson.meta.name )
        setStorageData("email", responseJson.meta.email )
        this.sendLoginSuccessMessage();
      }
      this.setState({
        error: false,
        errorText: '',
        errorType: ''
      })
    } else {
      //Check Error Response
      this.sendLoginFailMessage();
      this.setState({
        error: true,
        errorText: responseJson.errors[0].failed_login,
        errorType: 'error'
      }, () => {
        this.scrollToDiv()
      })
    }
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {
        if(apiRequestCallId === this.apiCheckRoleId){
          this.setState({
            roleType: responseJson.is_moderator ? 2 : 0
          });
        }
        if (apiRequestCallId === this.apiEmailLoginCallId) {
          this.setLoginResponse(responseJson)

          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    // Merge Engine - Navigation - btnEmailLogIn - Start
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
    // Merge Engine - Navigation - btnEmailLogIn - End
  }

  goToForgotPassword() {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
