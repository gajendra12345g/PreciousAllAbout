import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { ChangeEvent } from 'react';
export const images= require("./assets")
import { getStorageData, removeStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  selectedContent: string;
  selectedCategryContent:string;
  selectedReviewContent:string;
  submitModal: boolean;
  showUploadedData:any;
  selectedSingleContent:any;
  goToPortfolioPage:boolean;
  filterContent:boolean;
  title: any;
  value:number;
  inputValue: string;
  keywords: string[];
  suggestions: string[];
  selectedLabel:any;
  multiSelectActive: boolean,
  showPendingData: any,
  showReviewedData:any,
  description: any,
  isChecked:any,
  location:any,
  showCategoryData: any,
  selectedCategoryIndex: any,
  totalSubmit: any,
  totalPending:any,
  totoalReviewed: any,
  openlist: any,
  isPreviewOpen:boolean,
  fullConetnt: any,
  deleteModal:boolean,
  deleteAllModal:boolean,
  submittedDate: any,
  reviewDate: any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CataloguePortfolioController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    // Customizable Area End
      getProductApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
    // Customizable Area Start
      arrayHolder: [],
      token: "",
      selectedContent: 'images',
      selectedCategryContent:'newest',
      selectedReviewContent:'all',
      submitModal:false,
      showUploadedData:[],
        selectedSingleContent: [],
        goToPortfolioPage:false,
        filterContent:true,
        title:"",
        submittedDate:"",
        reviewDate:"",
       value:0,
       inputValue: "",
       keywords: [],
       suggestions: [
         "hills", "landscape","wilderness","nature","photography","culture","peace","greenery","serenity","Eco-Friendly",
         "Natural Environment"
       ],
       selectedLabel:'images',
       multiSelectActive: false,
       showPendingData:[],
       showReviewedData:[],
        description: "",
        isChecked: false,
        location:"",
        showCategoryData:[],
        selectedCategoryIndex: null,
        totalSubmit: 0,
        totalPending:0,
        totoalReviewed:0,
        openlist:null,
        isPreviewOpen: false,
        fullConetnt: null,
        deleteModal:false,
        deleteAllModal: false
    // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
  // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.showUploadedContent();
    this.showAllCategoryData()

   let uploadedData=  await getStorageData("showUploadedData")
if(uploadedData == 'true'){
    this.setState({goToPortfolioPage : !!uploadedData})
}
else{
   this.setState({goToPortfolioPage : !uploadedData})
}
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
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    }
    const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      switch (apiRequestCallId) {
        case this.showContentCallId:
          this.setshowUploadedContent(responseJson);
          break;
        case this.showPendingCallId:
          this.setShowPendingApi(responseJson);
          break;
        case this.deleteAllContentCallId:
          this.setState({deleteAllModal: false, value:0})
          this.showUploadedContent();
          this.showPendingData();
          this.showReviewedData()
          break;
        case this.showAllCategoryDataCallId:
          this.setState({ showCategoryData: responseJson.data });
          break;
        case this.showReviewedDataCallId:
          this.setState({
            showReviewedData: responseJson.data,
            totoalReviewed: responseJson.meta.total,
          });
          break;
        case this.deleteSingleContentCallId:
    this.setState({deleteModal: false})
          if(this.state.value == 1){
            this.showPendingData()
          }
          else if(this.state.value == 2){
            this.showReviewedData()
          }
          else{
          this.showUploadedContent();
          }
          break;
        case this.saveDetailsCallId:
        case this.contentInfoCallId:
          this.showUploadedContent();
          break;
        default:
      }
    // Customizable Area End
  }

  // Customizable Area Start
  handleContentChange= (event : any) => {
    const { value,label } = event.target;
    this.setState({ selectedContent: value as string, selectedLabel:label },
        ()=> this.showUploadedContent());
  }
  handleContentCategoryChange= (event : ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    this.setState({ selectedCategryContent: value as string }, () => this.showPendingData());
  }
  handleContentReviewChange= (event : ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    this.setState({ selectedReviewContent: value as string }, () => this.showReviewedData());
  }
  goToUpload =() =>{
    const goToPortfolioCatalogue: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationTargetMessage), "Catalogue");
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToPortfolioCatalogue);
  }
  goToDashboard = () => {
    const goToPortfolioCatalogue: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationTargetMessage), "LadingPageAfterLoginContributor");
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToPortfolioCatalogue);
  }
handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue,selectedSingleContent :[] })
    this.fetchData(newValue);
    
}
fetchData = (values:any) =>{
  switch(values){
    case 1:
      this.showPendingData();
      break;
      case 2:
        this.showReviewedData();
  }
}
  showContentCallId : string ="";
  showUploadedContent = async () =>{
      const token = await getStorageData("authContributorToken");
      const header = {
        token: token,
      };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
    
        this.showContentCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.showContentEndPoint(this.state.selectedContent)
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
    
        return this.showContentCallId;
  }
  setshowUploadedContent = (responseJson:  any) =>{
    this.setState({showUploadedData : responseJson.data, totalSubmit: responseJson.meta.total})
  }
  handleImageClick = (index: any, contentName: any, contentUrl: any) => {
    const { selectedSingleContent, multiSelectActive} = this.state;
  
    if (multiSelectActive) {
      const updatedSelectedContent = selectedSingleContent.includes(index)
        ? selectedSingleContent.filter((selectedIndex: any) => selectedIndex !== index)
        : [...selectedSingleContent, index];
  
      this.setState({ selectedSingleContent: updatedSelectedContent }, () => this.handleFillDetailsCall());
    } else {
      this.setState({
        selectedSingleContent: [index],
        filterContent: false,
        fullConetnt: contentUrl
      }, () => this.handleFillDetailsCall());
    }
  };
  
  handleMultiSelect = () =>{
    this.setState({multiSelectActive : true})
  }
  goToSubmiTab =() =>{
    this.setState({value: 0})
  }
  handleFillDetailsCall = () => {
    const { selectedSingleContent, showPendingData, showReviewedData, value, showUploadedData } = this.state;
  
    const processItem = (item: any) => {
      const newTitle = item.attributes.title || '';
      const newDescription = item.attributes.description || '';
      const newCategory = item.attributes.category?.id || '';
      const newLocation = item.attributes.location || '';
      const newKeyword = item.attributes.keyword_array || '';
      const newNsfw = item.attributes.nsfw_content || false;
      const newSubmittedDate = item.attributes.created_at || '';
      const newReviewDate = item.attributes.updated_at || '';
      
      this.setState({
        description: newDescription,
        selectedCategoryIndex: newCategory,
        location: newLocation,
        keywords: newKeyword,
        isChecked: newNsfw,
        title: newTitle,
        submittedDate: newSubmittedDate,
        reviewDate: newReviewDate
      });
    };
  
    switch (value) {
      case 1:
        const pendingItem = showPendingData.find((item: any) => selectedSingleContent.includes(item.id));
        if (pendingItem) {
          processItem(pendingItem);
        }
        break;
      case 2:
        const reviewedItem = showReviewedData.find((item:any) => selectedSingleContent.includes(item.id));
        if (reviewedItem) {
          processItem(reviewedItem);
        }
        break;
      default:
        const uploadedItem = showUploadedData.find((item:any) => selectedSingleContent.includes(item.id));
        if (uploadedItem) {
          processItem(uploadedItem);
        }
    }
  };
  

  deleteAllContentCallId : string = "";
  deleteAllContent = async() =>{
    const token = await getStorageData("authContributorToken");
    const header = {
      token: token,
    };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.deleteAllContentCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.deleteAllContentEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.deleteMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return this.deleteAllContentCallId;
}

deleteSingleContentCallId : string = "";
deleteSingleContent = async() =>{
  const token = await getStorageData("authContributorToken");
  const header = {
    token: token,
  };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteSingleContentCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deletedSingleEndPoint(this.state.selectedSingleContent)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return this.deleteSingleContentCallId;
}

contentInfoCallId : string = "";
handleContentInfo = async() =>{
  this.setState({submitModal : true})
    const {selectedSingleContent, isChecked,location, title, description, keywords, selectedCategoryIndex} = this.state
    const token = await getStorageData("authContributorToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    const httpBody={
        "id":selectedSingleContent, 
        "title": title,
        "description": description,
        "nsfw_content": isChecked,
        "location": location,
        "keyword_array": keywords,
        "category_id": selectedCategoryIndex
    }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.contentInfoCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.contentInfoEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.putMethod
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return this.contentInfoCallId;
}
showPendingCallId : string ="";
  showPendingData = async () =>{
      const token = await getStorageData("authContributorToken");
      const header = {
        token: token,
      };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
    
        this.showPendingCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.categoryContentEndPoint(this.state.selectedCategryContent)
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
    
        return this.showPendingCallId;
  }
  setShowPendingApi = (responJson : any) => {
   this.setState({showPendingData : responJson.data, totalPending : responJson.meta.total})
  }

  handleInputKeywordChange = (event: any) => {
    const inputValue = event.value;
    this.setState({
      inputValue,
    });
  };

  handleAddKeyword = (keyword: string) => {
    this.setState((prevState) => ({
      inputValue: "",
      keywords: [...prevState.keywords, keyword],
    }));
  };

  handleRemoveKeyword = (removedKeyword: string) => {
    this.setState((prevState) => ({
      keywords: prevState.keywords.filter(
        (keyword) => keyword !== removedKeyword
      ),
    }));
  };
  handleDeleteKeyword = (removedKeyword: string) => {
    this.setState((prevState) => ({
      suggestions: prevState.suggestions.filter(
        (keyword) => keyword !== removedKeyword
      ),
    }));
  }
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const { inputValue } = this.state;
      if (inputValue.trim() !== "") {
        this.handleAddKeyword(inputValue.trim());
      }
    }
  };
  handleFormChange = (event : any) =>{
    const {value, name} = event
    
    if(name == 'title'){
      const truncatedValue = value.slice(0, 100);
      this.setState({title: truncatedValue})
    }
if (name == 'description'){
  const truncatedValue = value.slice(0, 500);
    this.setState({description : truncatedValue})
}
if(name == "location"){
    this.setState({location: value})
}
  }
  handleCheckBoxChange = () => {
    this.setState(
      (prevState) => ({ isChecked: !prevState.isChecked })
    );
  };

  showAllCategoryDataCallId : string ="";
  showAllCategoryData = async () =>{
      const token = await getStorageData("authContributorToken");
      const header = {
        token: token,
      };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
    
        this.showAllCategoryDataCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.showCategoryEndPoint
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
    
        return this.showAllCategoryData;
  }
  handleCategoryChange = (event: any) => {
    const selectedCategoryIndex = event.target.value;
    this.setState({ selectedCategoryIndex: selectedCategoryIndex});
  };
  closeModal = () =>{
    this.setState({submitModal : false})
  }
  handleSelect = async (selectedItem: any) => {
    if (selectedItem.value === 'lg') {
     await removeStorageData('authContributorToken');
     await removeStorageData('contributorName');
     const goToLandingPage: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToLandingPage.addData(getName(MessageEnum.NavigationTargetMessage), "Contributor");
    goToLandingPage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToLandingPage);
    } 
  };
  showReviewedDataCallId : string ="";
  showReviewedData = async () =>{
      const token = await getStorageData("authContributorToken");
      const header = {
        token: token,
      };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
    
        this.showReviewedDataCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.reviewContentEndPoint(this.state.selectedReviewContent)
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
    
        return this.showReviewedDataCallId;
  }
  handleMoreList = (event: React.MouseEvent<HTMLButtonElement>, conetntUrl: any) =>{
    this.setState({openlist : event.currentTarget, fullConetnt: conetntUrl})
  }
  handlePreviewClose = () =>{
    this.setState({isPreviewOpen:false, openlist : false})
  }
  handleContentPreview = () => {
    this.setState({isPreviewOpen:true})
  }

  saveDetailsCallId : string ="";
  saveDetailsBtn = async() =>{
    const {selectedSingleContent, title,isChecked,location, description, keywords, selectedCategoryIndex} = this.state
    const token = await getStorageData("authContributorToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    const httpBody={
        "id":selectedSingleContent, 
        "title": title,
        "description": description,
        "nsfw_content": isChecked,
        "location": location,
        "keyword_array": keywords,
        "category_id": selectedCategoryIndex
    }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.saveDetailsCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.saveDetailsEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.putMethod
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return this.saveDetailsCallId;
  }
  closeList = () => {
      this.setState({openlist: false})
  }
  goToLanding = () => {
    const goToPortfolioCatalogue: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationTargetMessage), "LadingPageAfterLoginContributor");
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToPortfolioCatalogue);
  }
  deleteContentModal = () => {
    this.setState({deleteModal: true})
  }
  closeDeleteModal = () => {
    this.setState({deleteModal: false})
  }
    closeAllDeleteModal = () => {
  this.setState({deleteAllModal: false})
  }
  deleteAllModalOpen = () => {
    this.setState({deleteAllModal: true})
  }
  isContentVisible = (value: any) => {
    const{showUploadedData, showPendingData, showReviewedData} = this.state
    if (
      (showUploadedData.length === 0 && value === 0) ||
      (showPendingData.length === 0 && value === 1) ||
      (showReviewedData.length === 0 && value === 2)
    ) {
      return 'none';
    } else {
      return 'block';
    }
  };
  // Customizable Area End
}
