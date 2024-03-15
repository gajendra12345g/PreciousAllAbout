import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";

import {
  getStorageData,
} from "framework/src/Utilities";

export interface ApiRequestReggData {
  contentType:string;
  method:string;
  endPoint:string;
  body?:{};
  type?:string;
  token?:string;
}
export interface Option{
  id:number,
  attributes: {
  description?: string;
  price: string;
  product_id:number,
  productName?:string,
  quality_range:string,
  multitieredpricing_id?:string
  }}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  selectedPriceType: string;
  content: string;
  allProductsMultitiered: [];
  productName:string,
  productDescription:string,
  productImage:"",
  productId:number,
  multitieredpricingId:number,
  quantity:number,
  price:string,
  resolutionType:string;
  userType:string;
  allResolutionType:[];
  allUserType:[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MultitieredpricingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  allProductsMultitieredApi: string="";
  addToCartApi: string="";
  updatePriceApi:string="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      selectedPriceType: "",
      content: "",
      allProductsMultitiered: [],
      productName:"",
      productDescription:"",
      productImage:"",
      productId:0,
      multitieredpricingId:0,
      quantity:1,
      price:"",
      resolutionType:"",
      userType:"",
      allResolutionType:[],
      allUserType:[],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.allProductsMultitieredApi) {
          this.setState({ 
          allUserType:responseJson.user_type,
          allResolutionType:responseJson.resolution_type,
          allProductsMultitiered: responseJson.pricing_tiers,
          productName:responseJson.pricing_tiers[0].attributes.product_attributes.name,
          productDescription:responseJson.pricing_tiers[0].attributes.product_attributes.description,
          productImage:responseJson.pricing_tiers[0].attributes.product_attributes.image.url,
          price:responseJson.pricing_tiers[0].attributes.price,
          selectedPriceType:responseJson.pricing_tiers[0].attributes.quality_range,
          productId:responseJson.pricing_tiers[0].attributes.product_id,
          multitieredpricingId:responseJson.pricing_tiers[0].id,
        });
        } 
        if (apiRequestCallId === this.updatePriceApi) {
          this.setState({price:responseJson.price});
        } 
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msgs = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msgs.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msgs);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    this.getAllProductsMultitiered();
  }

  apiCall = async (data: ApiRequestReggData) => {
    const { contentType, method, endPoint, body, type } = data;
    const token = await getStorageData("authToken")
    const header = {
      "Content-Type": contentType,
       token:token,
    };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));request.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    request.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),endPoint);
    request.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    body && type != "formData"? request.addData(getName(MessageEnum.RestAPIRequestBodyMessage),JSON.stringify(body)):request.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(request.id, request);
    return request.messageId;
  };

  getAllProductsMultitiered = async () => {
    const productId = await getStorageData("productId");
    this.allProductsMultitieredApi = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_multitieredpricing/multitieredpricings/show_mtp/${productId}`,
    });
  };

  updatePrice = async () => {
    const body={
      resolution_type:this.state.resolutionType,
      user_type:this.state.userType
    }
    this.updatePriceApi = await this.apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `bx_block_multitieredpricing/multitieredpricings/${this.state.multitieredpricingId}`,
      body:body
    });
  };

  handleClick = (event: string,option:Option) => {
    this.setState({ selectedPriceType: event,
    productId:option.attributes.product_id,
    multitieredpricingId:option.id,
    price:option.attributes.price,
  });
  };

  handleHomeBack = () => {
   this.toNavigate("MultitieredProduct")
  };

  handleAddToCart =async () => {
    const productDetails={
      cart:{
        multitieredpricing_id:this.state.multitieredpricingId,
        quantity:this.state.quantity
      }
    }
    this.addToCartApi = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: "bx_block_multitieredpricing/carts",
      body:productDetails
    });
    this.toNavigate("MultitieredCart");
    };
   
  toNavigate=(path:string)=>{
    const toNavigate: Message = new Message(getName(MessageEnum.NavigationMessage));
    toNavigate.addData(getName(MessageEnum.NavigationTargetMessage),path);
    toNavigate.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(toNavigate);
  }

  handleCart=()=>{
    this.toNavigate("MultitieredCart")
  }

  handleResolution = (event:React.ChangeEvent<{value:unknown}>) => {
    this.setState({resolutionType:event.target.value as string},this.updatePrice);
  };

  handleUserType = (event:React.ChangeEvent<{value:unknown}>) => {
    this.setState({userType:event.target.value as string},this.updatePrice);
  };

  // Customizable Area End
}
