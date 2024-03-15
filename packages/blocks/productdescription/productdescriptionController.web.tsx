//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React from "react";
import { getStorageData} from "framework/src/Utilities";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
  isloading: boolean;
  focusedImageIndex: number;
  product_id:number
  electronicData: any;
  cartModalFlag: boolean;
  selectedValue: string;
  selectedRes: string;
  isRqeustForm: boolean;
  catalogueId: number;
  productData: any;
  licenseTypes: any;
  clientSizes: any;
  formatSizes: any;
  commentsData: any;
  similarImages: any;
  userscatalogueImages: any;
  selectedLicenseIDs: any;
  selectedClientSizeId: any;
  email: string;
  phone: string;
  endClient: string;
  distDetails: string;
  catalogueType: string;
  videoFormats: any;
  imageFormats: any;
  licensePrice: number;
  sizePrice: number;
  formatPrice: number;
  totalPrice: number;
  showAlert: boolean;
  alertTitle: string;
  alertType: any;
  calledAPI: boolean;
  openPreview: boolean;
  showCommentBlock:boolean;
  CommentInput:string;
  ReplyText:string;
  commentId:string;
  ReplyData:any;
  searchQuery:any;
  perPage:number;
  PageNumber:number;
  showLoadMore:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProductDescriptionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  productApiItemCallId: string = '';
  licenseTypeApiItemCallId: string = '';
  clientSizeApiItemCallId: string = '';
  formatSizeApiItemCallId: string = '';
  getCommentApiItemCallId: string = '';
  getSimilarImagesApiItemCallId: string = '';
  getUsersCatalogueApiItemCallId: string = '';
  postCommentApiItemCallId: string = '';
  postRepliesApiItemCallId: string = '';
  postAddToCartApiItemCallId: string = '';
  postSendRequestApiItemCallId: string = '';
  postFollowApiItemCallId: string = '';
  postLikeApiItemCallId: string = '';
  postBookmarkApiItemCallId: string = '';
  getReplyApiItemCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      isloading: false,

      // Customizable Area Start
      isloading: false,
      productData: [],
      product_id: 8,
      focusedImageIndex:1,
      electronicData:[],
      cartModalFlag: false,
      selectedValue: "",
      selectedRes:"",
      isRqeustForm: false,
      catalogueId: this.props.navigation.getParam('id'),
      licenseTypes: [],
      clientSizes: [],
      formatSizes: [],
      commentsData: [],
      similarImages: [],
      userscatalogueImages: [],
      selectedLicenseIDs: [],
      selectedClientSizeId: '',
      email:'',
      phone: '',
      endClient: '',
      distDetails: '',
      catalogueType: 'image',
      videoFormats: [],
      imageFormats: [],
      licensePrice: 0,
      sizePrice: 0,
      formatPrice: 0,
      totalPrice: 0,
      showAlert: false,
      alertTitle: '',
      alertType: 'success',
      openPreview: false,
      showCommentBlock:false,
      CommentInput:"",
      ReplyText:"",
      commentId:"0",
      ReplyData:[],
      searchQuery:this.props.navigation.getParam('searchQuery'),
      perPage:5,
      PageNumber:1,
      showLoadMore:false
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
       this.SwitchCaseFunction(apiRequestCallId,responseJson)
        
      } else {
        this.parseApiErrorResponse(errorReponse);
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const path=window.location.pathname;
    this.getLicenseType();
    this.getClientSize();
    this.getFormatSize();
    this.getProductData()
    if(path === `ProductDetail/comment/${this.state.searchQuery}`){
      this.getCommentData();
    }
  }
 
  onGoBack = () => {
    this.props.navigation.navigate("BuildingBlocks");
  };
  gotoHomePage = () => {
    const gotoHomePage: Message = new Message(getName(MessageEnum.NavigationMessage));
    gotoHomePage.addData(getName(MessageEnum.NavigationTargetMessage), "LandingPage");
    gotoHomePage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(gotoHomePage);
  }
  gotoCartPage = () => {
    const gotoCartPage: Message = new Message(getName(MessageEnum.NavigationMessage));
    gotoCartPage.addData(getName(MessageEnum.NavigationTargetMessage), "ShoppingCartOrders");
    gotoCartPage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(gotoCartPage);
  }
  getProductData = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.productApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint+`${this.state.catalogueId||this.state.searchQuery}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getLicenseType = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.licenseTypeApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.licenseTypeAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getClientSize = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.clientSizeApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSizeAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getFormatSize = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.formatSizeApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getFormatAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getCommentData = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCommentApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCommentAPiEndPoint +`${this.state.catalogueId || this.state.searchQuery}?per_page=${this.state.searchQuery?5:3}&page=${this.state.searchQuery?this.state.PageNumber:1}`

    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getSimilarImages = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSimilarImagesApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.similarImagesAPiEndPoint+`${this.state.catalogueId||this.state.searchQuery}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getUsersCatalogueImages = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUsersCatalogueApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userCatalogueAPiEndPoint+`${this.state.catalogueId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postComments = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
      "comment": {
          "comment": this.state.CommentInput,
          "catalouge_id": this.state.catalogueId||this.state.searchQuery
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCommentApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCommentAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postCommentReplies = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
      "comment": {
          "content": this.state.ReplyText, 
          "comment_id": this.state.commentId
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postRepliesApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.repliesAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postAddToCart = async () => {
    if(this.state.selectedClientSizeId == '' || this.state.selectedLicenseIDs == []){
      this.setState({showAlert: true, alertTitle:"Selcection of distribution and client size is required", alertType:"error"})
      return;
    }
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
      "data": {
          "attributes": {
              "catalogue_id": this.state.catalogueId,
              "status": "in-cart",
              "format_id" : this.state.catalogueType == "video" ? parseInt(this.state.selectedRes) : parseInt(this.state.selectedValue),
              "size_id": this.state.selectedClientSizeId,
              "license_type_id": this.state.selectedLicenseIDs
          }
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postAddToCartApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addToCartAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postSendRequest = async () => {
    if(this.state.email == '' || this.state.phone == ''|| this.state.endClient == '' || this.state.distDetails == ''){
      this.setState({showAlert: true, alertTitle:"All fields are mandatory", alertType:"error"})
      return;
    }
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
      "data": {
          "attributes": 
          {
              "email": this.state.email,
              "phone_number": this.state.phone,
              "end_client": this.state.endClient,
              "distribution_details": this.state.distDetails
          }
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postSendRequestApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sentRequestAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postFollowAPI = async () => {
    this.setState({calledAPI: true})
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
      "follow": {
          "catalogue_id": this.state.catalogueId,
          "type": this.state.productData?.attributes?.follow == "0" ? "add" : "remove"
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postFollowApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postFollowAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postLikeAPI = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
      "favourites": {
          "catalogue_id": this.state.catalogueId,
          "type": this.state.productData?.attributes?.favourties == "0" ? "add" : "remove"
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postLikeApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postLikeAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  postBookmarkAPI = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.productApiContentType,
      "token": token
    };
    const httpBody:any = {
          "catalogue_id": this.state.catalogueId,
          "type":this.state.productData?.attributes?.bookmark == "0" ? "add" : "remove"
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postBookmarkApiItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postBookmarkAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  checkIsCommercial = (licenceId) => {
    const selectedValues = licenceId;
    const selectedIDs = selectedValues.map(value => {
      const selectedLicense = this.state.licenseTypes.find(license => license.attributes.name === value);
      return parseInt(selectedLicense?.id);
    });
    const totalPrices = selectedValues.map(value => {
      const selectedFormat = this.state.licenseTypes.find(format => format.attributes.name === value);
      return parseInt(selectedFormat?.attributes.price);
    });
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    const isAnyCommercial = selectedValues.some(value => {
      const selectedLicense = this.state.licenseTypes.find(license => license.attributes.name === value);
      return selectedLicense?.attributes.is_commercial === true;
    });
    this.setState({
      electronicData: selectedValues,
      selectedLicenseIDs: selectedIDs,
      isRqeustForm: isAnyCommercial,
      licensePrice: parseInt(totalPrice)
    },()=>this.calculateTotalPrice());
  }
  setSizePriceAndId = (sizeId) => {
    const selectedValue = sizeId;
    const selectedSize = this.state.clientSizes.find(size => size.id === selectedValue);
    const price = selectedSize?.attributes.price;
    this.setState({
      selectedClientSizeId: parseInt(selectedValue),
      sizePrice: parseInt(price)
    }, () => this.calculateTotalPrice());
  }
  setFormatPrice = (formatId) => {
    const selectedValue = formatId;
    const selectedFormat = this.state.formatSizes?.find(size => size.id === selectedValue);
    const price = selectedFormat?.attributes.price;
    this.setState({
      selectedValue: selectedValue,
      selectedRes: selectedValue,
      formatPrice: parseInt(price)
    }, () => this.calculateTotalPrice());
  }
  handleChange = (target: any) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }
  calculateTotalPrice(){
    const finalPrice = this.state.licensePrice + this.state.sizePrice + this.state.formatPrice
    this.setState({totalPrice: finalPrice})
  }
  handleAlertClose = () => {
    this.setState({showAlert:false})
  }
  getUploadDate = (date) => {
    let dateObject = new Date(date);
    const day = dateObject.getUTCDate();
    const month = dateObject.toLocaleString('en-US', { month: 'long' });
    const year = dateObject.getUTCFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
    return formattedDate;
  }
  timeElapsedAgo = (dateStr) => {
    const currentDate = new Date();
    const date = new Date(dateStr);
  
    const elapsedMilliseconds = currentDate - date;
  
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30);
    
    if (elapsedMonths > 0) {
      return `${elapsedMonths} month${elapsedMonths > 1 ? 's' : ''}`;
    }
  
    if (elapsedDays > 0) {
      return `${elapsedDays} day${elapsedDays > 1 ? 's' : ''}`;
    }
  
    if (elapsedHours > 0) {
      return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''}`;
    }
  
    if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''}`;
    }
  
    return 'Just now';
  }
  handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      this.setState({showAlert: true, alertTitle:'URL copied to clipboard', alertType:"success"})
    })
  }
  getFollowWord = (flag) => {
   if(flag == "0"){
    return "Follow"
   }else{
    return "Following"
   }
  }
  getLikeWord = (flag) => {
    if(flag == "0"){
     return "LIKE"
    }else{
     return "LIKED"
    }
  }
  getLikeIcon = (flag) => {
    if(flag == "0"){
      return <FavoriteBorderIcon/>
     }else{
      return <FavoriteIcon/>
     }
    }
 
  handleCommentBlock=()=>{
  this.setState({showCommentBlock:true})
  }
  handleCommentChange=(e:any)=>{
  this.setState({CommentInput:e.target.value})
  }
  handleAddComment=()=>{
  this.postComments();
 
  }
  handleReplyBlock=(id:any)=>{
    this.setState({commentId:id})
  }
  handleReplyChange=(e:any)=>{
    this.setState({ReplyText:e.target.value})
  }
  handleAddReply=()=>{
    this.postCommentReplies(); 
  }
  handleViewComment=()=>{
    this.props.navigation.navigate('ProductDescriptionComment', { searchQuery: this.state.catalogueId },{per_page:5},{page:this.state.PageNumber})
  }
  handleLoadMore=()=>{
    this.setState({PageNumber:this.state.PageNumber + 1})
    this.setState({showLoadMore:true})
    this.getCommentData();
  }
  SwitchCaseFunction=(apiRequestCallId,responseJson)=>{
    switch (apiRequestCallId) {
      case this.productApiItemCallId:
        this.setState({ productData: responseJson?.data });
        this.setState({catalogueType: responseJson?.data.attributes?.images.type.includes('video')?"video":"image"},()=>this.getCommentData())
        break;
      case this.licenseTypeApiItemCallId:
        this.setState({ licenseTypes: responseJson?.data });
        break;
      case this.clientSizeApiItemCallId:
        this.setState({ clientSizes: responseJson?.data });
      break;
      case this.formatSizeApiItemCallId:
        this.setState({ formatSizes: responseJson?.data });
        this.setState({videoFormats: responseJson?.data.filter(item => item.attributes.type_format === "video"), imageFormats: responseJson?.data.filter(item => item.attributes.type_format === "image")})
        this.setState({ selectedRes: this.state.videoFormats[0].id, selectedValue: this.state.imageFormats[0].id });
      break;
      case this.getCommentApiItemCallId:
        this.setState({
          commentsData: this.state.showLoadMore ? [...this.state.commentsData,...responseJson?.data] : responseJson.data
        }, () => this.getSimilarImages());
        
      break;
      case this.getSimilarImagesApiItemCallId:
        this.setState({ similarImages: responseJson },()=> this.getUsersCatalogueImages());
      break;
      case this.getUsersCatalogueApiItemCallId:
        this.setState({ userscatalogueImages: responseJson?.data });
      break;
      case this.postCommentApiItemCallId:
        if(responseJson.meta.success===true){
          this.setState({CommentInput:""})
          this.getCommentData();
        }
        this.setState({showCommentBlock:false})
      break;
      case this.postRepliesApiItemCallId:
        console.log("responseJson.meta.success",responseJson.meta.success)
        if(responseJson.meta.success===true){
          this.setState({ReplyText:""})  
          this.getCommentData();
        }
        this.setState({commentId:"0"})
      break;
      case this.postAddToCartApiItemCallId:
        this.setState({cartModalFlag:true})
      break;
      case this.postSendRequestApiItemCallId:
        responseJson.message && this.setState({showAlert: true, alertTitle:responseJson.message, alertType:"success",
        email:"",phone:"",endClient:"",distDetails:""})
        responseJson.errors && this.setState({showAlert: true, alertTitle:responseJson.errors, alertType:"error"})
      break;
      case this.postFollowApiItemCallId:
        this.setState({calledAPI:false})
        this.getProductData()
      break;
      case this.postLikeApiItemCallId:
        this.getProductData()
      break;
      case this.postBookmarkApiItemCallId:
        this.getProductData()
      break;
      default:
        break;
    }
  }
  // Customizable Area End
}
