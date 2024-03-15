import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Profile1, Profile2, Profile3, subProfile1, subProfile2, subProfile3 } from "./assets";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
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
  searchList: any;
  category: any;
  featuredData: any;
  searchQuery: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  searchApiCallId: any;
  featuredApiId: any
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
    ];

    this.state = {
      searchList: [
        "One Flew Over Nest",
        "Goodfellas",
        "The Matrix",
        "Seven Samurai",
        "Interstellar",
        "Paths of Glory",
      ],
      category: 'all',
      featuredData: [],
      searchQuery: ''
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

      if (apiRequestCallId === this.searchApiCallId) {
        if (responseJson && responseJson.data) {
          console.log(responseJson)
        } else if (responseJson && responseJson.errors) {
          this.showAlert("Alert", "API Error", "");
        }
      }

      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.featuredApiId) {
          this.setState({ featuredData: responseJson.data });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount(): Promise<void> {
    setStorageData('Category', 'all')
    this.featuredAllData();
    this.searchChange('');
  }

  setSearchQuery = (val: string) => {
    this.setState({
      searchQuery: val
    })
  }

  featuredAllData = async () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.featuredApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.featuredApiEndPoing
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  };

  goToHome() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  featureData = [
    {
      src: Profile1,
      title: "LENOES",
      subTitle: "NEW YORK, USA",
      subProfile: subProfile1
    },
    {
      src: Profile2,
      title: "LENOES",
      subTitle: "NEW YORK, USA",
      subProfile: subProfile2
    },
    {
      src: Profile3,
      title: "LENOES",
      subTitle: "NEW YOUK, USA",
      subProfile: subProfile3
    }
  ];

   searchChange = async (val: any) => {
    await getStorageData('Category').then((res) => {
      this.setState({ category: res })
    })
    const header = {
      "Content-Type": configJSON.validationApiContentType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.searchApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchApiEndPoint + `?name=${this.state.category ?? ''}?search=${val ?? ''}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  // Customizable Area End
}
