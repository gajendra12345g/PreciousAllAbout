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
  emailHelperText: string;
  mailSent: boolean;
  loading: boolean;
  disabled: boolean;
  selectedLanguage: { value: string | number; label: string };
  error: boolean;
  errorType: string;
  errorText: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordContributorController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  emailReg: RegExp;
  forgotPasswordCallId: string = "";
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
      emailHelperText: "",
      mailSent: false,
      loading: false,
      disabled: true,
      selectedLanguage: configJSON.arrOfLanguages[0],
      error: false,
      errorText: "",
      errorType: ""
    };
    this.emailReg = new RegExp(`${configJSON.emailRegEx}`);
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
        if (apiRequestCallId === this.forgotPasswordCallId) {
          this.setState({
            error: true,
            errorText: responseJson.error,
            errorType: "error",
            loading: false
          });
        }
      }
      if (responseJson && !responseJson.error) {
        if (apiRequestCallId === this.forgotPasswordCallId) {
          this.setState({
            mailSent: true,
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

  handleChange = (e: any) => {
    this.setState(
      {
        email: e.value
      },
      () => {
        this.validateEmail();
      }
    );
  };

  validateEmail = () => {
    if (
      !this.state.email ||
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.setState({
        errorText: "Please enter a valid email!",
        error: true,
        disabled: true,
        errorType: "error"
      });
      return false;
    } else {
      this.setState({
        errorText: "",
        error: false,
        disabled: false,
        errorType: ""
      });
    }
  };

  handleRedirectToLogin = ()=>{
    this.props.navigation.navigate("Contributor")
  }

  handleSendLink = () => {
    const baseUrl = window.location.origin;

    if (!this.emailReg.test(this.state.email)) {
      this.setState({
        error: true,
        errorText: "Please enter a valid email!",
        errorType: "error",
        loading: false
      });
      return false;
    }

    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };

    const body = {
      data: {
        attributes: {
          front_end_url: baseUrl,
          email: this.state.email,
          role_type: 1
        }
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.forgotPasswordCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sendLinkApiEndPoint
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
