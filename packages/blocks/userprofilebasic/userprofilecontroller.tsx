import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import {
  getStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
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
  setSelectedValue: any;
  setOpen: any;
  setImgOpen: any;
  userProfileDetails: any;
  selectedTab: any;
  userName: any;
  profileImg: any;
  profileImg1: any;
  showButton: any;
  topMsg: any;
  email: any;
  phoneNumber: any;
  editEmail: any;
  editPhone: any;
  cancelBtn: any;
  emailInputError: boolean;
  error: boolean;
  errorType: any;
  saveBtnEnable: boolean;
  numberInputError: boolean;
  setDelete: any;
  setDeleteNext: any;
  otpError: any;
  deleteBtnEnable: any;
  otpCode: any;
  emailUpdateSuccessfully: any;
  profileUpdated: any;
  hideEmail: any;
  hideMobileNumber: any;
  galleryData: any;
  gallery_id: any;
  name: any;
  topMsg1: any,
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class UserProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  userProfileDetailsApi: any;
  updateUserProfileDetailsApi: any;
  galleryDataGetApi: any;
  emailReg: RegExp;
  deleteImageApi: any;
  deleteAccountApi: any;
  sendDeleteOtpApi: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
    ];

    this.state = {
      setSelectedValue: "a",
      setOpen: false,
      userProfileDetails: [],
      setImgOpen: false,
      selectedTab: 0,
      userName: "",
      profileImg: null,
      profileImg1: null,
      showButton: true,
      topMsg: false,
      email: "",
      phoneNumber: "",
      editEmail: false,
      editPhone: false,
      cancelBtn: false,
      emailInputError: false,
      error: false,
      errorType: "",
      saveBtnEnable: true,
      numberInputError: false,
      setDelete: false,
      setDeleteNext: false,
      otpError: false,
      deleteBtnEnable: true,
      otpCode: "",
      emailUpdateSuccessfully: false,
      profileUpdated: false,
      hideEmail: "",
      hideMobileNumber: "",
      galleryData: "",
      gallery_id: "",
      name: "",
      topMsg1: false,
    };
    // Customizable Area End
    this.emailReg = new RegExp(`${configJSON.emailRegEx}`);
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

      switch (apiRequestCallId) {
        case this.userProfileDetailsApi:
         this.userProfileDetailsApiOne(responseJson)
          break;

        case this.updateUserProfileDetailsApi:
         this.updateUserProfileDetailsApiOne(responseJson)
          break;

        case this.galleryDataGetApi:
          this.galleryDataGetApiOne(responseJson)
          break;

        case this.deleteImageApi:
          this.userDetails();
          this.setState({ showButton: false });
          break;

        case this.deleteAccountApi:
          this.deleteAccountApiOne(responseJson)
          break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  updateUserProfileDetailsApiOne=(responseJson:any)=>{
    if (responseJson) {
      this.setState({ userProfileDetails: responseJson.data.attributes });
      this.galleryDataGet();
      this.userDetails();
      this.setState({ gallery_id: "" });
    }
  }

  galleryDataGetApiOne=(responseJson:any)=>{
    if (responseJson) {
      this.setState({
        galleryData: responseJson.data?.attributes?.images,
      });
    }
  }

  userProfileDetailsApiOne=(responseJson:any)=>{
    if (responseJson.data) {
      this.setState({
        userProfileDetails: responseJson.data.attributes,
        profileImg: responseJson.data.attributes.image,
        profileImg1: responseJson.data.attributes.image,
        userName: responseJson.data.attributes.user_name,
        name: responseJson.data.attributes.name,
        email: responseJson.data.attributes.email,
        phoneNumber: responseJson.data.attributes.phone_number,
      });
      if(responseJson.data.attributes.phone_number==null){
        this.setState({phoneNumber: ""})
      }
      if (this.state.profileImg == null) {
        this.setState({ showButton: false });
      }
      this.hideMobileNumber(this.state.phoneNumber);
    }else if(responseJson.errors){
      this.props.navigation.navigate("LandingPage")
    }
  }  

  deleteAccountApiOne=(responseJson:any)=>{
    if (responseJson.errors) {
      this.setState({ otpError: true });
    } else if (responseJson.message) {
      this.setState({ otpError: false });
      this.handleLogout1();
    }
  }
  
  async componentDidMount(): Promise<void> {
    await this.userDetails();
    this.galleryDataGet();
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body, type } = data;
    let token = await getStorageData("authToken");
    const header = { "Content-Type": contentType, token: token };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    request.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),endPoint);
    request.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    body && type != "formData"
    ? request.addData(getName(MessageEnum.RestAPIRequestBodyMessage),JSON.stringify(body))
      : request.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(request.id, request);
    return request.messageId;
  };

  userDetails = async () => {
    this.userProfileDetailsApi = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: "bx_block_profile/profiles/my_profile",
    });
  };

  deleteAccount = async () => {
    const payload = {
      pin: this.state.otpCode,
    };
    this.deleteAccountApi = await this.apiCall({
      contentType: "application/json",
      method: "DELETE",
      endPoint: "bx_block_profile/delete_account",
      body: payload,
    });
  };

  sendDeleteOtp = async () => {
    this.sendDeleteOtpApi = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: "bx_block_profile/send_otp_account",
    });
  };

  deleteImage = async () => {
    this.deleteImageApi = await this.apiCall({
      contentType: "application/json",
      method: "DELETE",
      endPoint: "bx_block_profile/profiles/remove_image",
    });
  };

  galleryDataGet = async () => {
    this.galleryDataGetApi = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: "bx_block_profile/galleries",
    });
  };

  handleLogout1 = () => {
    removeStorageData("authToken");
    window.location.replace("/");
  };

  updateUserDetails = async () => {
    const token = await getStorageData("authToken");
    const header = {
      token: token,
    };

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("phone_number", this.state.phoneNumber);
    formData.append("gallery_id", this.state.gallery_id);
    if (this.state.profileUpdated) {
      formData.append("image", this.state.profileImg);
      this.setState({ profileUpdated: false });
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateUserProfileDetailsApi = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.profileUpdateEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.profileUpdateMethodtype
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ setSelectedValue: event.target.value });
  };

  handleOpen = (data: any) => {
    this.setState({ setOpen: !data });
  };

  handleImgOpen = (data: any) => {
    this.setState({ setImgOpen: !data });
  };

  handleTabChange = (event: any, newValue: any) => {
    this.setState({ selectedTab: newValue });
  };

  handleFileDrop = (acceptedFiles :any) => {
    const file=acceptedFiles[0];

    console.log(URL.createObjectURL(file), 'file url')
    if (file && file.size <= 5 * 1024 * 1024) {
      const fileType = file.type.split('/')[1];
      if (fileType === 'jpeg' || fileType === 'png') {
        this.setState({
          profileImg1: URL.createObjectURL(file),
          profileImg: file,
          showButton: true,
          profileUpdated: true,
          topMsg: false,
          topMsg1: false,
        });
        this.handleImgOpen(this.state.setImgOpen);
      } else {
        this.setState({ topMsg1:true,topMsg:false });
      }
    } else {
      this.setState({ topMsg: true,topMsg1:false });
    }
  }
  
  handleEditEmail1 = (e: any) => {
    this.setState({ email: e.value });
    this.handleEmail(e.value);
  };

  handleEditPhone1 = (e: any) => {
    this.setState({ phoneNumber: e.value });
    this.handlePhone(e.value);
  };

  handleEmailSave = () => {
    this.updateUserDetails();
    this.setState({ editPhone: false, cancelBtn: false });
    if (this.state.editEmail) {
      this.setState({ emailUpdateSuccessfully: true, editEmail: false, });
    }
  };

  handleSave = () => {
    this.updateUserDetails();
    this.handleOpen(this.state.setOpen);
  };

  handleImageClick = (imageSrc: any, imgId: any) => {
    this.setState({
      profileImg1: imageSrc,
      showButton: true,
      gallery_id: imgId,
    });
    this.handleImgOpen(this.state.setImgOpen);
  };

  handleEditEmail = () => {
    this.setState({
      editEmail: true,
      cancelBtn: true,
    });
  };

  handleEditPhone = () => {
    this.setState({
      editPhone: true,
      cancelBtn: true,
    });
  };

  handleCancle = () => {
    this.setState({
      editEmail: false,
      editPhone: false,
      cancelBtn: false,
      emailInputError: false,
      numberInputError: false,
    });
    this.userDetails();
  };

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  handleEmail(email: any) {
    if (!this.isValidEmail(email)) {
      this.setState({
        emailInputError: true,
        saveBtnEnable: true,
      });
      return false;
    }
    this.setState({
      emailInputError: false,
      },this.handleEmail2
    );
  }

  handleEmail2=()=>{
    this.setState({saveBtnEnable: this.state.emailInputError || this.state.numberInputError,})
  }

  handlePhone(phone: any) {
    if (!configJSON.numberRegEx.test(phone)) {
      this.setState({
        numberInputError: true,
        saveBtnEnable: true,
      });
    } else {
      this.setState({
        numberInputError: false,
      },this.handlePhone2);
    }
  }

  handlePhone2=()=>{
    this.setState({saveBtnEnable:this.state.emailInputError || this.state.numberInputError})
  }

  handleSaveEmail1 = () => {
    this.handleEmailSave();
  };
  handleOpenDelete = (data: any) => {
    this.setState({ setDelete: !data });
  };

  handleOpenDeleteNext = (data: any) => {
    this.setState({ setDeleteNext: !data });
    this.hideEmail(this.state.email);
    this.sendDeleteOtp();
  };

  handleKeepMyAccount = () => {
    this.setState({ setDelete: false, setDeleteNext: false });
  };

  handleOtpCode = (e: any) => {
    const value = e.value.replace(configJSON.otpAllowDigit, "");
    const value1 = e.value;
    this.setState({ otpCode: value });
    if (value1.length == 6) {
      this.setState({ deleteBtnEnable: false });
    } else {
      this.setState({ deleteBtnEnable: true });
    }
  };

  handleCloseSnackBar = () => {
    this.setState({ emailUpdateSuccessfully: false });
  };

  hideEmail = (email: any) => {
    const [localPart, domain] = email.split("@");
    const hiddenLocalPart =
      localPart.substring(0, 2) + "x".repeat(localPart.length - 2);
    const hiddenEmail = `${hiddenLocalPart}@${domain}`;
    this.setState({ hideEmail: hiddenEmail });
  };

  hideMobileNumber(mobileNumber: any) {
    const firstTwo = mobileNumber.slice(0, 4);
    const lastTwo = mobileNumber.slice(-3);
    const hiddenDigits = "*".repeat(mobileNumber.length - 7);
    const hiddenNumber = firstTwo + hiddenDigits + lastTwo;
    this.setState({ hideMobileNumber: hiddenNumber });
  }

   handleInputchange = (e: any) => {
    const value=e.value;
    if(configJSON.nameValidation.test(value)){
      this.setState({ name: value});
    }
  };

  // Customizable Area End
}
