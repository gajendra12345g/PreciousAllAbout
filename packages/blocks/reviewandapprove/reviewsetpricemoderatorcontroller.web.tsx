import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area Start
interface IContent {
  id: number;
  title: string;
  description: string;
  nsfw_content: boolean;
  technical_specification: string;
  category_id: number | null;
  location: string;
  keyword_array: string[],
  price: number | null;
  date: Date;
  status: string;
  file_link: string;
  type:string;
  size:string;
  license:any;
  formats:string;
}
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
  token: string;
  contentId: string;
  selectedTab:number;
  selectedSortType: { value: string | number; label: string };
  contentDetails: IContent | null;
  titleText: string
  descriptionText: string
  specificationText: string
  filterKey: string;
  locationSearchQuery: string;
  searchList: string[];
  categories: any;
  showDeleteDialog:boolean;
  location:any;
  locationData:any;
  suggestionLocation:any,
  showRejectectionModal: boolean,
  rejectionReason:any,
  catalogueID:any,
  title:string,
  selectedCategoryIndex: any,
  description:string,
  isChecked:any,
  inputValue: string;
  keywords: string[];
  suggestions: string[];
  licenseData:any;
  sizeData:any;
  setSize:any;
  formats:any;
  catalogueType:string;
  selectedFormat:any;
  selectedBtn : boolean;
  showAlert: boolean,
   alertType: string,
   userSuccessAlert: string,
   rejectionTitle:string,
   selectedLicenses:any,
   selectedLicenseNames:any,
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ReviewSetPriceModeratorController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getContentDetailsApiCallId: any;
  getCategoriesApiCallId: any;
  deleteContentApiCallId: string = "";
  showAllLOcationCallId : string = "";
  rejectCatalogueCallId : string = "";
  licenseApiCallId: string = "";
  sizeApiCallId : string = "";
  formatTypeCallId : string = "";
  approveCatalogueCallId : string = "";
  saveCatalogueCallId : string = ""
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      contentId: this.props.navigation.getParam('id'),
      token: '',
      selectedTab:0,
      categories: [],
      selectedSortType:configJSON.sortBy[0],
      contentDetails: null,
      filterKey: '',
      titleText: '',
      descriptionText: '',
      specificationText: '',
      locationSearchQuery: '',
      searchList: [],
      showDeleteDialog:false,
      location:"",
      locationData:[],
      suggestionLocation:[],
      showRejectectionModal:false,
      rejectionReason:"",
      catalogueID:null,
      title:"",
      description:"",
      selectedCategoryIndex: null,
       inputValue: "",
       isChecked: false,
       keywords: [],
       suggestions: [],
       licenseData:[],
       sizeData:[],
       setSize:"",
       formats:[],
       catalogueType:"",
       selectedFormat:null,
       selectedBtn: false,
       showAlert: false,
       alertType: "success",
       userSuccessAlert:"",
       rejectionTitle:"",
       selectedLicenses:[],
       selectedLicenseNames:[],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message)

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token =await getStorageData("authToken");
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({token});
      }
      this.getContentDetails(this.state.contentId)
    }
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    switch (apiRequestCallId) {
      case this.getContentDetailsApiCallId:
        this.setContentDetails(responseJson)
        break;
      case this.getCategoriesApiCallId:
        this.setCategories(responseJson)
        break;
        case this.deleteContentApiCallId:
          this.setDeletedContentCall()
          break;
          case this.showAllLOcationCallId:
            this.setState({locationData: responseJson})
            break;
            case this.rejectCatalogueCallId:
            this.setRejectionCall(responseJson)
            break;
            case this.licenseApiCallId:
              this.setLicenseCall(responseJson)
              break;
              case this.sizeApiCallId:
                this.setSizeCall(responseJson)
                break;
                case this.formatTypeCallId:
                  this.setFormatTypeApiCall(responseJson)
                  break;
                  case this.approveCatalogueCallId:
                    this.setApproveCall(responseJson)
                    break;
                    case this.saveCatalogueCallId:
                      this.setSaveCatalogueCall(responseJson)
                      break;
                  default:
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.getCategories();
    this.showAllLocation();
    this.showLicense();
    this.showSizeApi();
    this.formatTypeApiCall();
  }
  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  setCategories = (response:any) => {
    this.setState({ categories: response.data})
  }

  setContentDetails = (response:any) => {
    const { title, description, technical_specification,updated_at, format, nsfw_content,images,license_type,category, location, keyword_array, price, status, size } = response?.data.attributes || {}
    const details:IContent = {
      id: response?.data.id,
      title: title,
      description: description,
      technical_specification: technical_specification || "",
      nsfw_content: nsfw_content || false,
      category_id: category?.id || null,
      location: location || '',
      keyword_array: keyword_array || [],
      price: price || null,
      file_link: images?.url,
      status: status,
      date: updated_at,
      type: images?.type,
      size: size,
      license:license_type|| [],
      formats:format,
    }
    const names = Array.isArray(license_type) ? license_type.map((license) => license.name) : [];
const ids = Array.isArray(license_type) ? license_type.map((license) => license.id) : [];
let convertedArray = ids.map(String);

let selectedLicenses: string[]= [];
let selectedLicenseNames = [];

if (status === 'accepted') {
  selectedLicenses = convertedArray;
  selectedLicenseNames = names;
} else if (status === 'pending') {
  selectedLicenses = [];
} else if (status === 'rejected') {
  selectedLicenses = [];
}
    this.setState({
      description: details.description,
      specificationText:details.technical_specification,
      selectedCategoryIndex: details.category_id,
      location: details.location,
      keywords: details.keyword_array,
      isChecked: details.nsfw_content,
      title: details.title,
      catalogueType:details.type,
      setSize: details.size,
      selectedLicenseNames: selectedLicenseNames,
      selectedLicenses: selectedLicenses,
      selectedFormat: details.formats,
    });
    this.setState({ contentDetails: details, catalogueID : details.id})
    this.state.categories.forEach((category: any) => {
      if (category.id == this.state.selectedCategoryIndex) {
          this.setState({suggestions : category.attributes.keywords})
      }
  });
  }

  getContentDetails = (id:string) => {
    const header = {
      token: this.state.token
    };
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getContentDetailsApiCallId = requestMessage.messageId;
    let endPoint = `${configJSON.contentDetailsApiEndPoint}/${id}`
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage)
  }

  getCategories = () => {
    const header = {
      "Content-Type": configJSON.contentApiContentType,
      token: this.state.token
    };
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getCategoriesApiCallId = requestMessage.messageId;
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
   
    runEngine.sendMessage(requestMessage.id, requestMessage)
  }
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
if(name == "txtSpecification"){
  this.setState({ specificationText: value});
}
  }
  deletecontent = (deleteID:any) => {
    this.setState({showDeleteDialog: true, selectedBtn: false})

  }
  handleCloseDeleteDialog  = () => {
    this.setState({showDeleteDialog: false})
  }
  handleSelectedBtnCall = () => {
    if (this.state.selectedBtn === false){
       this.handleDeleteContent()
    }
    else{
    this.approveCatalogueApiCall()
    }
  }
  handleDeleteContent = () => {
    this.setState({showDeleteDialog: false})
    const header = {
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.deleteContentApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteContentEndPoint.replace(
        ":id",
        this.state.contentDetails?.id
      )
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage)
  }
  setDeletedContentCall = () => {
    const goToContentApproval: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToContentApproval.addData(getName(MessageEnum.NavigationTargetMessage), "ReviewApprovalModerator");
    goToContentApproval.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToContentApproval);
  }
  showAllLocation = async() =>{
    let token = await getStorageData("authToken")
    const header = {
      token: token,
    };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.showAllLOcationCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.allCountryEndPoints
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
       configJSON.apiMethodTypeGet
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return this.showAllLOcationCallId;
}
handleInputLocationChange = (event: any) => {
  const location = event.value;
  this.setState({ location }, () => {
    this.filterSuggestions();
  });
};
filterSuggestions = () => {
  const { location, locationData } = this.state;
  const filteredSuggestions = locationData?.filter((suggestion: any) =>
    suggestion.toLowerCase().includes(location.toLowerCase()),
  );
  this.setState({ suggestionLocation: filteredSuggestions });
};
handleSuggestionClick = (suggestion: any) => {
  this.setState({ location: suggestion, suggestionLocation: [] });
};
rejectCatalogue = () => {
  this.setState({showRejectectionModal : true})
}
handleCloseRejection = () => {
  this.setState({showRejectectionModal: false})
}
handleRejection = (event:any) => {
this.setState({rejectionReason:event.value})
}
handleRejectionTitle= (event:any) => {
  this.setState({rejectionTitle:event.value})
  }
rejectCatalogueApi = () => {
  this.setState({showRejectectionModal:false})
  const header = {
    "Content-Type": "application/json",
    token: this.state.token,
  };
  const httpBody = {
    "catalogue_id": this.state.catalogueID,
    "rejected_title": this.state.rejectionTitle,
    "rejected_reason": this.state.rejectionReason
}

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.rejectCatalogueCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.rejectCatalogueEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.putMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.rejectCatalogueCallId;
}
setRejectionCall  = (response:any) => {
  if(response.message == "Catalogue rejected successfully"){
    const goToContentApproval: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToContentApproval.addData(getName(MessageEnum.NavigationTargetMessage), "ReviewApprovalModerator");
    goToContentApproval.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToContentApproval);
  }
  else{
    this.setState({showAlert:true, alertType:"error", userSuccessAlert: response.message })
  }
  }
  
handleCategoryChange = (event: any) => {
  const selectedCategoryIndex = event.target.value;
  this.setState({ selectedCategoryIndex: selectedCategoryIndex}, () => 
  this.state.categories.forEach((category: any) => {
    if (category.id == selectedCategoryIndex) {
        this.setState({suggestions : category.attributes.keywords})
    }
}))
};
handleSize = (event: any) => {
  const selectedSizeIndex = event.target.value;
  this.setState({ setSize: selectedSizeIndex});
};
handleCheckBoxChange = () => {
  this.setState(
    (prevState) => ({ isChecked: !prevState.isChecked })
  );
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
handleInputKeywordChange = (event: any) => {
  const inputValue = event.value;
  this.setState({
    inputValue,
  });
};
handleAddKeyword = (keyword: string) => {
  if (!this.state.keywords.includes(keyword)) {
    this.setState((prevState) => ({
      inputValue: "",
      keywords: [...prevState.keywords, keyword],
    }));
  }
};
handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    const { inputValue } = this.state;
    if (inputValue.trim() !== "") {
      this.handleAddKeyword(inputValue.trim());
    }
  }
};
showLicense = async () =>{
  const header = {
    token: this.state.token,
  };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.licenseApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.licenseEndPoints
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.licenseApiCallId;
}
setLicenseCall = (response:any) => {
  this.setState({licenseData: response.data})
}
showSizeApi = async () =>{
  const header = {
    token: this.state.token,
  };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.sizeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sizeEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.sizeApiCallId;
}
setSizeCall = (response:any) => {
  this.setState({sizeData:response.data})
}
formatTypeApiCall = async () =>{
  const header = {
    token: this.state.token,
  };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.formatTypeCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.formatEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return this.formatTypeCallId;
}
setFormatTypeApiCall =  (response:any) => {
    this.setState({formats: response?.data})
}
handleFormatSelect = (format:any) => {
  this.setState({ selectedFormat: format });
};
approveCatalogueApiCall = () => {
  this.setState({showDeleteDialog: false})
  const {catalogueID, title, description, isChecked, specificationText, selectedCategoryIndex,
     location, keywords,selectedLicenses, setSize, selectedFormat} = this.state;
     const setFormat = typeof(selectedFormat)=== 'object' ? selectedFormat?.id : selectedFormat
  const header = {
    "Content-Type": "application/json",
    token: this.state.token,
  };
  const httpBody = {
    "catalogue": {
        "id": catalogueID, 
        "title": title, 
        "description": description, 
        "nsfw_content": isChecked,
        "technical_specification": specificationText,
        "category_id": selectedCategoryIndex,
        "location": location,
        "keywords": keywords, 
        "license_type": selectedLicenses,
        "size": setSize,
        "format": setFormat
    }
}
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.approveCatalogueCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.approveCatalogueEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.putMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.approveCatalogueCallId;
}
handleBtnCall = () => {
  this.setState({selectedBtn:true, showDeleteDialog : true})
}
setApproveCall = (response:any) => {
  if(!response.message){
    const goToContentApproval: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToContentApproval.addData(getName(MessageEnum.NavigationTargetMessage), "ReviewApprovalModerator");
    goToContentApproval.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToContentApproval);
  }
  else{
    this.setState({showAlert:true, alertType:"error", userSuccessAlert: response.message })
  }
  
}
saveCatalogueApiCall = () => {
  const {catalogueID, title, description, isChecked, specificationText, selectedCategoryIndex,
     location, setSize,selectedLicenses, selectedFormat,keywords} = this.state;
     const setFormat = typeof(selectedFormat)=== 'object' ? selectedFormat?.id : selectedFormat

  const header = {
    "Content-Type": "application/json",
    token: this.state.token,
  };
  const httpBody = {
  "id": catalogueID,
  "title": title, 
  "description": description,
  "nsfw_content": isChecked,
  "location":location,
  "keyword_array": keywords,
  "category_id": selectedCategoryIndex,
  "license_type_id": selectedLicenses,
  "size_id": setSize,
  "format_id": setFormat,
  "technical_specification": specificationText
}
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.saveCatalogueCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.saveCatalogueEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.putMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return this.saveCatalogueCallId;
}
setSaveCatalogueCall = (response:any) => {
if(!response.message){
this.setState({showAlert:true, alertType:"success", userSuccessAlert: "Catalogue Details saved Successfully"})
}
else{
  this.setState({showAlert:true, alertType:"error", userSuccessAlert: response.message })
}
}
handleAlertClose = () => {
  this.setState({showAlert: false})
}
handleLicenseText = (event:any) => {
  const selectedIds = event.target.value;
  const selectedNames = selectedIds.map((id:any) => this.getLicenseName(id));
  this.setState({
    selectedLicenses: selectedIds,
    selectedLicenseNames: selectedNames,
  });
};
getLicenseName = (licenseId:any) => {
  const license = this.state.licenseData.find((license:any) => license.id === licenseId);
  return license ? license.attributes.name : '';
};
isAssetChecked = (id:any) => {
  return this.state.selectedLicenses.includes(id);
};
onSelectionChange = (e:any, id:any) => {
  const isChecked = e.target.checked;
  let selection = [...this.state.selectedLicenses];
  if (isChecked) {
    selection.push(id);
  } else {
    selection = selection.filter((x) => x !== id);
  }
  this.setState({ selectedLicenses: selection });
};
  // Customizable Area End
}
