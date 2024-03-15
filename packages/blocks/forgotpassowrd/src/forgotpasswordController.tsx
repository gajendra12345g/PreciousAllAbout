import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
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
  error: boolean;
  errorText: string;
  errorType: string;
  mailSent: boolean;
  loading: boolean;
  disabled: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  emailReg: RegExp;
  apiSendLinkID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
        email: '',
        emailInputError: false,
        emailHelperText: '',
        error: false,
        errorText: '',
        errorType: '',
        mailSent: false,
        loading: false,
        disabled: true
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

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.apiSendLinkID) {
          if (responseJson && !responseJson.error) {
            this.setState({
              mailSent: true,
              error: false,
              errorText: '',
              errorType: '',
              loading: false
            })
          } else {
            this.setState({
              error: true,
              errorText: responseJson.error,
              errorType: 'error',
              loading: false
            })
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  cancelPwdReset = () => {
    this.setState({
      email: '',
      error: false,
      errorText: ''
    })
  }
  handleChange = (e: any) => {
    this.setState({
        email: e.value
    }, () => {
      this.validateEmail()
    })
  }

  validateEmail = () => {
    if (
      !this.state.email ||
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.setState({
        error: true,
        errorText: 'Please enter a valid email!',
        errorType: 'error',
        disabled: true
      })
      return false
    } else {
      this.setState({
        error: false,
        errorText: '',
        errorType: '',
        disabled: false
      })
    }
  }

  sendLink = () => {
    const url: string = window.location.protocol+'//'+window.location.hostname;
    this.setState({
      loading: false
    })
    if (
        this.state.email === null ||
        this.state.email.length === 0 ||
        !this.emailReg.test(this.state.email)
      ) {
        this.setState({
          error: true,
          errorText: 'Please enter a valid email!',
          errorType: 'error',
          loading: false
        })
        return false
    } 

    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };

    const attrs = {
      email: this.state.email,
      front_end_url: url,
      role_type: 0
    };

    const data = {
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiSendLinkID = requestMessage.messageId;
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
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;

  }
  // Customizable Area End
}
