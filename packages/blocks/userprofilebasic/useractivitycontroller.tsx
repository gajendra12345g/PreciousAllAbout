import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
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
  selectedId: number
  selectedLabel: string;
  tabsMenu: any;
  bookmarkData: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UserActivityController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getBookmarksApiItemCallId: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      selectedId: 1,
      selectedLabel: "Followings",
      tabsMenu : [
        { id:1, label: "Followings(67)" },
        { id:2, label: "Purchase History" },
        { id:3, label: "Comments" },
        { id:4, label: "Favourites" },
        { id:5, label: "My Collections" },
        { id:6, label: "Downloads" },
        { id:7, label: "Hires" }
      ],
      bookmarkData: []
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
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
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
   
      if (responseJson) {
        if (apiRequestCallId === this.getBookmarksApiItemCallId) {
          this.setState({bookmarkData: responseJson?.data})
        }
      } else {
        this.parseApiErrorResponse(errorReponse);
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getBookmarksData()
  }

  onGoBack = () => {
    this.props.navigation.navigate("BuildingBlocks");
  };
  getBookmarksData = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.contentTypeAppliactionJson,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBookmarksApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getBookmarksAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  handleChange = (event:any,value:any) => {
    const selectedTab = this.state.tabsMenu.find((tab: { id: any; }) => tab.id === value);
    if(selectedTab){
    const labelWithoutCount = selectedTab.label.replace(/\(\d+\)/, '');
    this.setState({ selectedId: value, selectedLabel: labelWithoutCount});
    }
  };
  
  // Customizable Area End
}
