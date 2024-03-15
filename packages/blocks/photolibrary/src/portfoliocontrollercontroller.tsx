import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData} from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
// Customizable Area End

export interface Props {
  // Customizable Area Start
  selectedCollection:any;
  contentModals:any;
  openContentModal: () => void;
  closeContentModal: () => void;
  selectedCollectionContent:any;
  showSelectedCollectionApi:() => void;
  currentDataPage?:any;
  prevDataPage?:() => void;
  nextDataPage?:() => void;
  handleSortSelect: (value:any)=> void;
  selectedUpdate?:any;
  collectionData?:any;
  onItemClick?:(value:any) => void
  openLibraryModal? :() => void
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  selectedButton: string,
  setVisibility:any,
  assetsModal:boolean,
  libraryData:any,
  selectedImageIds:any,
  anchorEl: any,
  galleryID:any,
  galleryData:any,
  catalogueId:any,
  collectionName:any,
  collectionSuggestName:any,
  showAlert:boolean,
  alertType:any,
  userSuccessAlert:string,
  showDeleteDialog:boolean,
  hoveredItemId:any,
  selectedCollectionId:any,
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class PortfolioCollectionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPhotoLibraryApiCallId = "";
  addImageToPhotoLibraryApiCallId = "";
  deletePhotoLibraryApiCallId = "";
  sharePhotoLibraryApiCallId = "";
  showApprovedContentCallID: string = "";
  createGalleryCallID:string = "";
  deleteGalleryCallID:string = "";
  createCollectionCallID : string ="";
  downloadCatalogueCallID: string = ""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      selectedButton: "image",
      setVisibility: "Public",
      assetsModal:false,
      libraryData:[],
      selectedImageIds:[],
    anchorEl: null,
    galleryID:"",
    galleryData:null,
    catalogueId:"",
    collectionName:"",
    collectionSuggestName:"",
    showAlert:false,
    alertType:"success",
    userSuccessAlert:"",
    showDeleteDialog:false,
    hoveredItemId:null,
    selectedCollectionId:null,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if(apiRequestCallId === this.showApprovedContentCallID){
      this.setApprovedData(responseJson);
    }
  
    if(apiRequestCallId === this.deleteGalleryCallID){
      this.setDeleteGalleryData(responseJson)
    }
    if(apiRequestCallId === this.createGalleryCallID){
      this.props.showSelectedCollectionApi()
    }
    if(apiRequestCallId === this.createCollectionCallID){
      this.setCreateCollectionApi(responseJson)
      
    }
    if(apiRequestCallId === this.downloadCatalogueCallID){
      this.props.showSelectedCollectionApi();
    }
    // Customizable Area End
}

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.showApprovedContent();
    this.props.showSelectedCollectionApi();
    // Customizable Area End
  }

  // Customizable Area Start
  openAssestModal = () => {
    this.setState({assetsModal: true, collectionName:"",collectionSuggestName:""})
  }
  closeAssetsModal = () => {
    this.setState({assetsModal: false})
  }
  handleButtonClick = (buttonType: string) => {
    this.setState({ selectedButton: buttonType });
  };
  handleSetVisibility = (event:any) => {
    this.setState({setVisibility: event.target.value})
  };
  saveContentCall = () => {
    this.props.closeContentModal();
    this.createGalleryApiCall()
  }
  
  showApprovedContent = async() => {
    const token = await getStorageData("authContributorToken");
    const header = {
      token: token
    };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.showApprovedContentCallID = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.showApprovedEndPoint
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
  
      return this.showApprovedContentCallID;
  }
  setApprovedData = (response:any) => {
    this.setState({libraryData:response?.data})
  }
  createGalleryApiCall = async() => {
    const token = await getStorageData("authContributorToken");
    const header = {
      token: token,
      "Content-Type": "application/json"
    };
    let httpBody:any = {
      "gallery":
      {
          "collection_id":this.props.selectedCollection.id ,
          "catalogue_ids":this.state.selectedImageIds
      }
  }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.createGalleryCallID = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.createGalleryEndPoint
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
       configJSON.postMethod
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      )
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
      return this.createGalleryCallID;
  }
  handleImageClick = (id:any) => {
    const { selectedImageIds } = this.state;
    const index = selectedImageIds.indexOf(id);

    if (index === -1) {
        this.setState({ selectedImageIds: [...selectedImageIds, id] });

    } else {
        const updatedSelectedImageIds = [...selectedImageIds];
        updatedSelectedImageIds.splice(index, 1);
        this.setState({ selectedImageIds: updatedSelectedImageIds });
    }
};
handleIconClick = (event: any, galleryData: any, catalogueId:any) => {
  this.setState({ anchorEl: event.currentTarget, galleryID: galleryData.gallery_id, galleryData:galleryData, catalogueId:catalogueId})
}
deleteGalleryApi = async() => {
  this.setState({anchorEl:null, showDeleteDialog:false})
  const token = await getStorageData("authContributorToken");
  const header = {
    token: token
  };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteGalleryCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.galleryDeleteEndPoint(this.state.galleryID, this.state.catalogueId)
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

    return this.deleteGalleryCallID;
}
setDeleteGalleryData = (response:any) => {
  this.setState({
    showAlert : true,
    userSuccessAlert:"Content Deleted Successfully",
    alertType:"delete"
  })
  this.props.showSelectedCollectionApi();
}
getIconLeftStyle = (webStyle:any) => {
  const {currentDataPage} = this.props;
  if (currentDataPage === 1) {
    return webStyle.disabled;
  } else {
    return webStyle.able;
  }
};
getIconRightStyle = (webStyle:any) => {
  const {currentDataPage,selectedCollectionContent} = this.props;

  if (currentDataPage == selectedCollectionContent.total_pages) {
    return webStyle.disabled;
  } else {
    return webStyle.able;
  }
};
handleCreateCollection = (e:any) => {
  this.setState({collectionName:e.value})
    }
    handleCreateDropCollection = (e:any) => {
      this.setState({collectionSuggestName:e.target.value})
        }
createCollection = () => {
  this.closeAssetsModal();
  const titlePattern = /^[a-zA-Z][a-zA-Z0-9_ -]*$/;
    if (this.state.collectionName != "" && !titlePattern.test(this.state.collectionName)) {
      this.setState({
        showAlert : true,
        userSuccessAlert:"Invalid Collection Name Format",
        alertType:"error"
      })
    } 
    else{
      this.createCollectionCallApi();
    }
}
    createCollectionCallApi = async() => {
      const{setVisibility, collectionName, selectedButton, collectionSuggestName} = this.state
      const token = await getStorageData("authContributorToken");
      const visibility=setVisibility.toLowerCase()
      const header = {
        token: token,
        "Content-Type": "application/json"
      };
      let httpBody:any = {
        "collection":
      {
          "collection_name":collectionName || collectionSuggestName,
          "collection_type":selectedButton,
          "collection_subtype": `${visibility}_domain`
      }
    }
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.createCollectionCallID = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.createCollectionEndPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
         configJSON.postMethod
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(httpBody)
        )
    
        runEngine.sendMessage(requestMessage.id, requestMessage);
    
        return this.createCollectionCallID;
    }
    openLibraryModal = () => {
      this.setState({selectedImageIds:[]}, () => this.props.openContentModal())
    }
    handleDropdownClick = (event:any) => {
      event.stopPropagation();
    };
    showAlertType = () => {
      const {alertType} = this.state;
      if (alertType ===  "success"){
        return "success"
      }
      else if(alertType ===  "delete"){
        return 'delete'
      }
      else{
        return 'error'
      }
    }
    handleAlertClose = () => {
      this.setState({showAlert:false})
    } 
    setCreateCollectionApi = (response:any) => {
        if(this.props.onItemClick){
          this.props.onItemClick("3")
        }
    }
    deleteMdal = () => {
      this.setState({showDeleteDialog:true})
    }
    handleCloseDeleteDialog = () => {
      this.setState({showDeleteDialog:false})
    }
    handleImageDownload = async (imageUrl:any, galleryId:any, catalogueId:any) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.handleDownload(galleryId,catalogueId)
    }
    handleDownload = async (galleryId:any, catalogueId:any) => {
      this.setState({selectedCollectionId: this.props.selectedCollectionContent.collection.data.attributes.id})
      const token = await getStorageData("authContributorToken");
      const header = {
        token: token,
      };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.downloadCatalogueCallID = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.downloadCatalogueEndPoint(this.state.selectedCollectionId, galleryId, catalogueId)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
         configJSON.postMethod
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return this.downloadCatalogueCallID;

    }
    
  // Customizable Area End
}
