import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

import { getStorageData } from "../../../framework/src/Utilities";

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
  userProfileDetails: any;
  newContent: boolean;
  updates: boolean;
  specialOffer: boolean;
  inAppNotification: boolean;
  emailNotification: boolean;
  both: boolean;
  profileImg:null|string;
  userName:null|string;
  name:null|string;

  // Customizable Area End
}

interface SS {
  id: any;
}

export default class UserProfileSetting extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getUserDetailsApiCalls:any=""
  getNotificationPreferencesApiCall:any=""
  getCommunicationPreferencesApiCall:any=""
  updateNotificationPreferencesApiCall:any=""
  updateCommunicationPreferencesApiCall:any=""
  
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
      userProfileDetails: {},
      both: false,
      emailNotification: false,
      inAppNotification: false,
      newContent: false,
      specialOffer: false,
      updates: false,
      name:null,
      profileImg:null,
      userName:null
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
          case this.updateNotificationPreferencesApiCall:
             this.getNotificationPrefrences()
            break;
            case this.updateCommunicationPreferencesApiCall:
             this.getCommunicationPrefrences()
              break
          default:
            break;
        }
      }
      if (responseJson && !responseJson.errors) {
        switch (apiRequestCallId) {
          case this.getUserDetailsApiCalls:
            this.setState({
              profileImg: responseJson.data.attributes.photo,
              userName: responseJson.data.attributes.user_name,
              name: responseJson.data.attributes.first_name
            });
            break;
          case this.getNotificationPreferencesApiCall:
           this.handleSetNotificationPrefrences(responseJson)
            break;
          case this.getCommunicationPreferencesApiCall:
            this.handleSetCommunicationnPrefrences(responseJson)
            break

          case this.updateNotificationPreferencesApiCall:
             this.handleSetNotificationPrefrences(responseJson)
            break;
            case this.updateCommunicationPreferencesApiCall:
              this.handleSetCommunicationnPrefrences(responseJson)
              break
          default:
            break;
        }
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    this.getUserDetails()
    this.getCommunicationPrefrences()
    this.getNotificationPrefrences()
  }

  settingsApiCall = async (data: any) => {
    let token = await getStorageData("authToken");
    const { contentType, method, endPoint, body, type } = data;
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

  getUserDetails = async () => {
    this.getUserDetailsApiCalls = await this.settingsApiCall({
      contentType: configJSON.contentTypeAppliactionJson,
      method: configJSON.getMethod,
      endPoint: configJSON.userProfileEndPoit
    });
  };

  getNotificationPrefrences =  async () => {
    this.getNotificationPreferencesApiCall = await this.settingsApiCall({
      contentType: configJSON.contentTypeAppliactionJson,
      method: configJSON.getMethod,
      endPoint: configJSON.getNotificationPrefrencesEndPoint
    });
  };

  getCommunicationPrefrences =  async () => {
    this.getCommunicationPreferencesApiCall = await this.settingsApiCall({
      contentType: configJSON.contentTypeAppliactionJson,
      method: configJSON.getMethod,
      endPoint: configJSON.getCommunicationPrefrencesEndPoint
    });
  };

  updateNotificationPrefrences = async(data:FormData) =>{
    this.updateNotificationPreferencesApiCall = await this.settingsApiCall({
      method: configJSON.patchMethod,
      endPoint: configJSON.updateNotificationPrefrencesEndPoint,
      type : "formData",
      body:data
    });
  }

  updateCommunicationPrefrences = async(data:FormData) =>{
    this.updateCommunicationPreferencesApiCall = await this.settingsApiCall({
      method: configJSON.patchMethod,
      endPoint: configJSON.updateCommunicationPrefrencesEndPoint,
      type : "formData",
      body:data
    });
  }

  handleSetNotificationPrefrences = (response:any)=>{
    this.setState({
      newContent:response.new_content,
      updates:response.updates,
      specialOffer:response.offers_promotions
    })
  }

  handleSetCommunicationnPrefrences = (response:any)=>{
    this.setState({
      inAppNotification:response.in_app,
      emailNotification:response.email_notification,
      both:response.both
  })
  }

  onChangeUpdates = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updates: event.target.checked });
    const data = new FormData()
    data.append('updates',`${event.target.checked}`)
    this.updateNotificationPrefrences(data)
  };

  onChangeNewContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newContent: event.target.checked });
    const data = new FormData()
    data.append('newContent',`${event.target.checked}`)
    this.updateNotificationPrefrences(data)
  };

  onChangeSpecialOffer = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ specialOffer: event.target.checked });
    const data = new FormData()
    data.append('offers_promotions',`${event.target.checked}`)
    this.updateNotificationPrefrences(data)
  };

  onChangeInAppNotification = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inAppNotification: event.target.checked });
    const data = new FormData()
    data.append('in_app',`${event.target.checked}`)
    this.updateCommunicationPrefrences(data)
  };

  onChangeEmailNotification = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ emailNotification: event.target.checked });
    const data = new FormData()
    data.append('email_notification',`${event.target.checked}`)
    this.updateCommunicationPrefrences(data)
  };

  onChangeBoth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ both: event.target.checked });
    const data = new FormData()
    data.append('both',`${event.target.checked}`)
    this.updateCommunicationPrefrences(data)
  };

  // Customizable Area End
}
