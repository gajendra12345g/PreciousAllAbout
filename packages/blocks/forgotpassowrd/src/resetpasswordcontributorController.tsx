import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  email: string;
  emailInputError: boolean;
  error: boolean;
  confirmPwd: string;
  errorText: string;
  errorType: string;
  emailHelperText: string;
  password: string;
  confirmPwdHelperText: string;
  passwordError: boolean;
  passwordHelperText: string;
  disabled: boolean;
  loading: boolean;
  confirmPwdError: boolean;
  selectedLanguage: { value: string | number; label: string };
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ResetPasswordContributorController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  emailReg: RegExp;
  passwordReg: RegExp;
  resetPasswordApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      email: "",
      emailInputError: false,
      error: false,
      password: "",
      emailHelperText: "",
      errorType: "",
      confirmPwd: "",
      passwordError: false,
      passwordHelperText: "",
      confirmPwdError: false,
      confirmPwdHelperText: "",
      errorText: "",
      disabled: true,
      selectedLanguage: configJSON.arrOfLanguages[0],
      loading: false
    };
    this.emailReg = new RegExp(`${configJSON.emailRegEx}`);
    this.passwordReg = new RegExp(`${configJSON.pwdRegEx}`);
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson.error) {
        if (apiRequestCallId === this.resetPasswordApiCallId) {
          this.setState({
            error: true,
            errorText: responseJson.error,
            errorType: "error",
            loading: false
          });
        }
      }
      if (responseJson && !responseJson.error) {
        if (apiRequestCallId === this.resetPasswordApiCallId) {
          this.setState({
            error: false,
            errorText: "",
            errorType: "",
            loading: false
          });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleChangeLanguage = (option: {
    value: string | number;
    label: string;
  }) => {
    this.setState({ selectedLanguage: option });
  };

  handleChangeInput = (input: any) => {
    this.setState(
      {
        ...this.state,
        [input.name]: input.value
      },
      () => {
        this.validate();
      }
    );
  };

  handleRedirectToLogin = ()=>{
    this.props.navigation.navigate("Contributor")
  }


  validate = () => {
    if (!this.emailReg.test(this.state.email)) {
      this.setState({
        error: true,
        errorType: "error",
        errorText: "Please enter a valid email!",
        disabled: true
      });
      return false;
    } else if (!this.passwordReg.test(this.state.password)) {
      this.setState({
        errorType: "error",
        error: true,
        errorText: "Please enter a valid password!",
        disabled: true
      });
      return false;
    } else if (this.state.password !== this.state.confirmPwd) {
      this.setState({
        errorType: "error",
        errorText: "New password and confirm password does not match!",
        error: true,
        disabled: true
      });
    } else {
      this.setState({
        error: false,
        errorText: "",
        disabled: false,
        errorType: ""
      });
    }
  };

  handleReset = () => {
    this.setState({
      loading: true
    });

    const token = window.location.search.slice(1);
    const header = {
      "Content-Type": configJSON.contentTypeApplicatioJson,
      token
    };

    const body = {
      data: {
        email: this.state.email,
        new_password: this.state.password,
        confirm_password: this.state.confirmPwd,
        role_type: 1
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.resetPasswordApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.resetPasswordApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
