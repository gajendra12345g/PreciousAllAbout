//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
const CategoryData = [
  {
    idss: 0,
    title: "User 1",
    value: 'user_1'
  },
  {
    idss: 1,
    title: "User 2",
    value: 'user_2'

  },
];
// Customizable Area End

export const configJSON = require("./config");


export interface Props {
  // Customizable Area Start
  navigation: any;
  idContent: string | number;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  imageData:any;
  videoData:any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  idManagement: number | string;
  // Customizable Area End
}

export default class ContentManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  imageDataApi: any;
  videoDataApi:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      imageData:[],
      videoData:[],
      catagorydata: CategoryData,
      showCategory: false,
      category: {
        idss: 0,
        title: "User 1",
      value:'user_1'
      },
      showModel: false,
      images: [],
      imagesWeb:[],
      baseImages: [],
      title: "",
      description: "",
      price: "",
      quantity: "",
      userDataList:[]
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
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
      if (responseJson && !responseJson.errors) {
        
        if (apiRequestCallId === this.imageDataApi) {
          this.setState({ imageData: responseJson.data });
          console.log("image",this.state.imageData);
          
        }
      }}

      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
  
        let responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        if (responseJson && !responseJson.errors) {
          
          if (apiRequestCallId === this.videoDataApi) {
            this.setState({ videoData: responseJson });
            console.log("video",this.state.videoData);
            
          }
        }}
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.imageAllData();
    this.videoAllData();
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
    };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    request.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);

    body && type != "formData"
      ? request.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        )
      : request.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(request.id, request);
    return request.messageId;
  };

  imageAllData = async () => {
    this.imageDataApi = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: "bx_block_landingpage2/landingpages/images",
    });
  };

  videoAllData = async () => {
    this.videoDataApi = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: "bx_block_landingpage2/landingpages/videos",
    });
  };

  getContentImage = (jsonData) => {
    if (jsonData && jsonData.length > 0) { 
    const imageUrls = jsonData
      .filter((item) => item.type === 'image' && item.attributes && item.attributes.pic)
      .map((item) => item.attributes.pic);
      return imageUrls;
    }
    return [];
}
  // Customizable Area End
}
