import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  startIcon: boolean;
  endIcon: boolean;
  dropDown: boolean;
  dropDownPosition: string;
  variant: string;
  searchQuery: string;
  setSearchQuery: any;
  testID: string;
  requestSearch: any;
  setSearchType: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  searchList: string[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SearchController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getRecommendationApiCallID: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      searchList: []
      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    
    // Customizable Area End
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
  
        if (apiRequestCallId === this.getRecommendationApiCallID) {
          if (responseJson && responseJson.data) {
            this.setState({
                searchList: responseJson.data
            })
          } else if (responseJson && responseJson.errors) {
            this.showAlert("Alert", "API Error", "");
          }
        }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  searchChange = (value: any) => {
    this.props.setSearchQuery(value)
    const header = {
        "Content-Type": configJSON.advancedsearchApiContentType
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getRecommendationApiCallID = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getRecommendationApiEndPoint+value 
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
  }

  moveToSearch = (value: any) => {
    const stringWithHyphens = value?.replace(/ /g, '-');
    this.props.navigation.navigate('AdvancedSearch', { searchQuery: stringWithHyphens })
  }

  // Customizable Area End
}
