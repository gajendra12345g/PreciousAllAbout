import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React from "react";
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
  name: string;
  email: string;
  phoneNumber: string;
  comments: string;
  enableField: boolean;
  token: string;
  contactUsList: any;
  activeId: number;
  activeName: string;
  activeEmail: string;
  activePhoneNumber: string;
  activeDescription: string;
  activeCreatedAt: string;
  isVisible: boolean;
  subject:string
  summary:string
  inValidEmail:boolean
  errorEmail:string
  errorNumber:string
  pageName:string
  RequestSnack:boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactusController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  contactUsApiCallId: any;
  deleteContactApiCallId: any;
  addContactApiCallId: any;
  addQueryApiCallId:any;
  emailReg: RegExp;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.contactUsApiCallId = "";
    this.deleteContactApiCallId = "";
    this.addContactApiCallId = "";

    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      comments: "",
      enableField: false,
      token: "",
      contactUsList: [],
      activeId: 0,
      activeName: "",
      activeEmail: "",
      activePhoneNumber: "",
      activeDescription: "",
      activeCreatedAt: "",
      isVisible: false,
      subject:"",
      summary:"",
      errorEmail:"",
      errorNumber:"",
      inValidEmail:false,
      pageName:"",
      RequestSnack:false,
    };
    this.emailReg = new RegExp(`${configJSON.emailRegEx}`);
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.getUrl()
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);

      if (responseJson && !responseJson.errors) {
        switch(apiRequestCallId){
          case this.addQueryApiCallId:
            this.setState({
              name:"",
              email:"",
              phoneNumber:"", 
              subject:"",
              summary:"",
              RequestSnack:true
            })
            break
            case this.addContactApiCallId:
              this.props.navigation.goBack()
              break
            default:
              break
        }
        }
        if (responseJson.errors && responseJson.errors.length > 0) {
          const phoneError = responseJson.errors[0].contact?.phone_number?.[0];
          if (phoneError === "invalid") {
            this.setState({ errorNumber: configJSON.phoneNumberError });
          }
        }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  txtNameProps = {
    onChangeText: (text: string) => {
      this.setState({ name: text });

      //@ts-ignore
      this.txtNameProps.value = text;
    },
  };

  txtEmailProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtEmailProps.value = text;
    },
  };
  txtPhoneNumberProps = {
    onChangeText: (text: string) => {
      this.setState({ phoneNumber: text });

      //@ts-ignore
      this.txtPhoneNumberProps.value = text;
    },
    // keyboardType: "phone-pad"
  };
  txtCommentsProps = {
    multiline: true,
    onChangeText: (text: string) => {
      this.setState({ comments: text });

      //@ts-ignore
      this.txtCommentsProps.value = text;
    },
  };

  setName = (text: string) => {
    this.setState({ name: text });
  };

  setEmail = (text: string) => {
    this.setState({ email: text });
  };

  setPhoneNumber = (text: string) => {
    this.setState({ phoneNumber: text,errorNumber:"" });
  };

  setComments = (text: string) => {
    this.setState({ comments: text });
  };

  addQuery = () => {
    this.props.navigation.navigate("AddContactus");
  };

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  handleChangeSubject =(event:any)=>{
      this.setState({subject:event.value})
  }

  handleChangeEmail = (event:any)=>{
    this.setState({email:event.value})
  }

  handleChangePhone = (event:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({phoneNumber:event.target.value})
  }

  handleChangeName = (event:any)=>{
    const value=event.value;
    if(configJSON.nameValidation.test(value)){
      this.setState({ name: value});
    }
  }


  handleChangeSummary = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
    this.setState({summary:event.target.value})
  }

  setModal = (item: any) => {
    this.setState({
      activeId: item.id,
      activeName: item.attributes.name,
      activeEmail: item.attributes.email,
      activeDescription: item.attributes.description,
      activePhoneNumber: item.attributes.phone_number,
      activeCreatedAt: item.attributes.created_at,
      isVisible: !this.state.isVisible,
    });
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail = (Email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return  reg.test(Email)
  };

  handleAddQuery = (event: React.FormEvent)=>{
    event.preventDefault()
    const isValidMail = this.isValidEmail(this.state.email)
   
    if(!isValidMail){
      this.setState({inValidEmail:true,errorEmail:"Please enter valid mail."})
    }else{
      this.setState({inValidEmail:false,errorEmail:""})

      const header = {
        "Content-Type": configJSON.postMethodContentType
      };

      const {name,email,phoneNumber,summary,subject} = this.state
  
      const body = {
        data: {
         name:name,
         email:email,
         phone_number:`+${phoneNumber}`,
         subject:subject.trim(),
         details:summary.trim()
        }
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.addQueryApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.addQueryContactApi
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
    }
    
  }

  addQueryApi = () => {
    if (
      this.isStringNullOrBlank(this.state.name) ||
      this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.phoneNumber) ||
      this.isStringNullOrBlank(this.state.comments)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    } else if (!this.isValidEmail(this.state.email.trim())) {
      this.showAlert(configJSON.errorTitle, configJSON.errorEmailNotValid);
      return false;
    } else {
      let data = {
        data: {
          name: this.state.name.trim(),
          email: this.state.email.trim(),
          phone_number: this.state.phoneNumber.trim(),
          description: this.state.comments.trim(),
        },
      };

      const header = {
        "Content-Type": configJSON.contactUsApiContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addContactApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getContactUsAPiEndPoint
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
        configJSON.httpPostMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  };

  deleteContactUs = (id: number) => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteContactApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getContactUsAPiEndPoint + `/${id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getContactUsList = (token: string) => {
    const header = {
      "Content-Type": configJSON.contactUsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.contactUsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getContactUsAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  btnSubmitProps = {
    onPress: () => this.addQueryApi(),
  };

  btnBackProps = {
    onPress: () => this.props.navigation.goBack(),
  };

  getUrl=()=>{
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(1);
    this.setState({pageName:pageName})
  }

  handleCloseRequestSnack=()=>{
    this.setState({ RequestSnack: false });
  }
  
  // Customizable Area End
}
