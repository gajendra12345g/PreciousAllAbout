import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {Abstract,Architechture,Cityview,Drone,Fashion,Food,Forest,Nature } from "./assets";
const navigation = require("react-navigation");
interface Item {
  attributes: {
    availability: number;
    breadth: number;
    description: string;
    discount: string;
    height: number;
    images: [
      {
        id: number;
        url: string;
        type: string;
        filename: string;
      }
    ];
    length: number;
    manufacture_date: string;
    name: string;
    on_sale: true;
    price: number;
    recommended: false;
    sale_price: string;
    sku: string;
    stock_qty: number;
    weight: string;
  };
  id: string;
  type: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  // Customizable Area Start
  navigation: typeof navigation;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  list: Item[];
  trendingData1:any
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: string | number;
  // Customizable Area End
}

export default class TrendingController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  trendingList: string | Message = "";
  trendingListId: string ="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      list: [],
      trendingData1:[],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.trendingList !== null &&
      this.trendingList ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson1 = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse1 = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson1) {
        this.setState({
          list: responseJson1?.data,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        this.parseApiErrorResponse(responseJson1);
      }
      this.parseApiCatchErrorResponse(errorResponse1);
    }
   else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.trendingListId !== null &&
      this.trendingListId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson1 = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson1) {
        this.setState({
         trendingData1:responseJson1.data                  
        });
        console.log("trending",this.state.trendingData1);

      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getTrendingListApi();
    this.getTrendingDataApi();
  }

  getTrendingListApi = async () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.trendingList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.exampleAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  moveToProductDetails =  (item: Item) => {
    localStorage.setItem('item', JSON.stringify(item));
    window.location.replace('/TrendingDetails')
  };

  trendingData = [
    { src: Nature, title: "NATURE" },
    { src: Forest, title: "FOREST" },
    { src: Drone, title: "DRONE" },
    { src: Fashion, title: "FASTION" },
    { src: Architechture, title: "ARCHITECHTURE" },
    { src: Cityview, title: "CITY VIEW" },
    { src: Food, title: "FOOD" },
    { src: Abstract, title: "ABSTRACT" }
  ];

  getTrendingDataApi = async () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.trendingListId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.trending_collectionEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  // Customizable Area End
}
