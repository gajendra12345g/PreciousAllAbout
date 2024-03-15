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
  password: string;
  confirmPwd: string;
  passwordError: boolean;
  passwordHelperText: string;
  confirmPwdError: boolean;
  confirmPwdHelperText: string;
  disabled: boolean;
  loading: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ResetPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  emailReg: RegExp;
  passwordReg: RegExp;
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
        password: '',
        confirmPwd: '',
        passwordError: false,
        passwordHelperText: '',
        confirmPwdError: false,
        confirmPwdHelperText: '',
        disabled: true,
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
      console.log("hello")
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleChange = (target: any) => {
    this.setState({
      ...this.state,
      [target?.name]: target?.value
    }, () => {
      this.validate()
    })
  }

  validate = () => {
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
    } else if(!this.passwordReg.test(this.state.password)){
      this.setState({
        error: true,
        errorText: 'Please enter a valid password!',
        errorType: 'error',
        disabled: true
      })
      return false
    } else if(this.state.password !== this.state.confirmPwd){
      this.setState({
        error: true,
        errorText: 'New password and confirm password does not match!',
        errorType: 'error',
        disabled: true
      })
    } else {
      this.setState({
        error: false,
        errorText: '',
        errorType: '',
        disabled: false
      })
    }
  }

  resetPwd = () => {
    this.setState({
      loading: true
    })
  }
  // Customizable Area End
}
