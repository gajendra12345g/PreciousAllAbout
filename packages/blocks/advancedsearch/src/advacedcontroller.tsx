import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
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
  firstNameSearchText: string;
  lastNameSearchText: string;
  advancedsearchList: any;
  activeId: number;
  activeFirstName: string;
  activeLastName: string;
  activeUserName: string;
  activeEmail: string;
  activePhoneNumber: string;
  activeCountryCode: string;
  activeType: string;
  activeDeviceId: string;
  activeCreatedAt: string;
  isVisible: boolean;
  showHideFilter: boolean;
  searchList: any;
  isSmallScreen: boolean;
  searchQuery: string;
  searchResult: any;
  searchType: string;
  selectedSort: string;
  hashTags: any;
  isLoading:any;
  category:string;
  hasMore:any;
  page:number;
  checkboxes:any;
  selectedSubtype:any
  selectedCategorySubtype:any;
  specificAssestType:any;
  orientationType:any;
  optionalPara:any
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AdvancedSearchController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  advancedsearchApiCallId: any;
  getSearchResultApiId: any;
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
      token: "",
      firstNameSearchText: "",
      lastNameSearchText: "",
      advancedsearchList: [],
      activeId: 0,
      activeFirstName: "",
      activeLastName: "",
      activeUserName: "",
      activeEmail: "",
      activePhoneNumber: "",
      activeCountryCode: "",
      activeType: "",
      activeDeviceId: "",
      activeCreatedAt: "",
      isVisible: false,
      showHideFilter: false,
      searchList: [
        "One Flew Over Nest",
        "Goodfellas",
        "The Matrix",
        "Seven Samurai",
        "Interstellar",
        "Paths of Glory",
      ],
      isSmallScreen: false,
      searchQuery: this.props.navigation.getParam('searchQuery'),
      searchResult: [],
      searchType: '',
      selectedSort: 'most_relevant',
      hashTags: [],
      isLoading:true,
      category:"",
      hasMore:true,
      page:1,
      checkboxes: {},
    selectedSubtype: "",
    selectedCategorySubtype:"",
    specificAssestType:"",
    orientationType:"",
      optionalPara:""
      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleWindowSizeChange);
      this.handleWindowSizeChange();
    }
    this.search(this.state.searchQuery);
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
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
      this.getAdvancedSearchList(token);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      // alert(JSON.stringify(responseJson))
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.getSearchResultApiId) {
       this.handleResponse(responseJson,errorReponse)
        
      }
      runEngine.debugLog("API Message Recived", message);

    }
    // Customizable Area End
  }

  // Customizable Area Start

  setSearchType = (val: string) => {
    if(val != 'all' || !val){
      this.setState({
        searchType: val
      }, () => {
        this.search(this.state.searchQuery)
      })
    } else {
      this.setState({
        searchType: ''
      }, () => {
        this.search(this.state.searchQuery)
      })
    }
  }

  setSortedVal = (val: string) => {
    this.setState({
      selectedSort: val
    }, () => {
      this.search(this.state.searchQuery);
    })
  }

  search = async (val: string) => {
    let category = await getStorageData("Category")
    this.setState({category: category})
    
    const {
      page,orientationType,
      selectedSort, specificAssestType, selectedCategorySubtype
    } = this.state;
    const header = {
      "Content-Type": configJSON.advancedsearchApiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSearchResultApiId = requestMessage.messageId;
if (specificAssestType !== ""){
  this.setState({category:""})
}
    let searchParams = {
      search: val,
      asset_type: specificAssestType,
      sort: selectedSort,
      page:page.toString(),
      per_page: '10',
      category:selectedCategorySubtype,
      search_type:this.state.category,
      orientation:orientationType
    }

    const filteredOptionalParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value)
    );
    
    const queryString = Object.entries(filteredOptionalParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
    
  
      this.optionalFunction(val,queryString);

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      this.state.optionalPara
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

  setSearchQuery = (val: string) => {
    this.setState({
      searchQuery: val
    }, () => {
      if(!this.state.searchQuery){
        this.search(this.state.searchQuery);
      }
    })
  }

  handleWindowSizeChange = () => {
    if (typeof window !== 'undefined') {
      const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
      this.setState({ isSmallScreen });
    }
  }

  toggleFilter = () => {
    this.setState({
      showHideFilter: !this.state.showHideFilter
    })
  }

  setHashtags = () => {
    const uniqueKeywords = Array.from(
      new Set(this.state.searchResult.map((item: any) =>this.state.searchQuery && this.state.searchQuery.charAt(0)==="#"?item.attributes.category.attributes.keywords: item.attributes.keyword_array))
    ); 
    this.setState({
      hashTags: uniqueKeywords[0]
    })
  }
   updateSubtypeState = (subtype:any, stateKey:any, id:any, selectedSubtype:any, updatedCheckboxes:any, data:any) => {
    if (selectedSubtype[subtype] === id) {
        const selectedItem = data.find((item: any) => item.id === selectedSubtype[subtype]);
        let subtypeValue = selectedItem?.attributes.sub_type;
        subtypeValue = subtype === "Categories" ? subtypeValue?.toUpperCase() : subtypeValue?.toLowerCase();
        this.setState({ [stateKey]: subtypeValue } as any);
    }
     if (!updatedCheckboxes[id]) {
        this.setState({ [stateKey]: '' } as any);
    }
};

handleCheckboxChange = (id:any, pName:any, data:any) => {
    this.setState({
        searchResult: [],
        category: '',
        page: 1,
        hasMore: true,
        isLoading: true,
    });

    this.setState(prevState => {
        const updatedCheckboxes = { ...prevState.checkboxes };
        const selectedSubtype = { ...prevState.selectedSubtype };
        updatedCheckboxes[id] = !updatedCheckboxes[id];
        Object.entries(selectedSubtype).forEach(([subtype, selectedId] :any) => {
            if (subtype === pName && selectedId !== id) {
                updatedCheckboxes[selectedId] = false;
                selectedSubtype[subtype] = updatedCheckboxes[id] ? id : '';
            }
        });
        if (!selectedSubtype[pName]) {
            selectedSubtype[pName] = updatedCheckboxes[id] ? id : '';
        }
        switch (pName) {
            case "Asset Type":
                this.updateSubtypeState("Asset Type", "specificAssestType", id, selectedSubtype, updatedCheckboxes, data);
                break;
            case "Categories":
                this.updateSubtypeState("Categories", "selectedCategorySubtype", id, selectedSubtype, updatedCheckboxes, data);
                break;
            case "ORIENTATION":
                this.updateSubtypeState("ORIENTATION", "orientationType", id, selectedSubtype, updatedCheckboxes, data);
                break;
            default:
                break;
        }
        return {
            checkboxes: updatedCheckboxes,
            selectedSubtype: selectedSubtype
        };
    }, () => {
        this.search("");
    });
};
  txtInputFirstNameSearchTextProps = {
    onChangeText: (text: string) => {
      this.setFirstNameText(text);
    }
  };

  txtInputLastNameSearchTextProps = {
    onChangeText: (text: string) => {
      this.setLastNameText(text);
    }
  };

  setFirstNameText = (firstName: string) => {
    this.setState({ firstNameSearchText: firstName });
  };

  setLastNameText = (firstName: string) => {
    this.setState({ lastNameSearchText: firstName });
  };

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  setModal = (item: any) => {
    this.setState({
      activeId: item.id,
      activeFirstName: item.attributes.first_name,
      activeLastName: item.attributes.last_name,
      activeUserName: item.attributes.user_name,
      activeEmail: item.attributes.email,
      activePhoneNumber: item.attributes.phone_number,
      activeCountryCode: item.attributes.country_code,
      activeType: item.type,
      activeDeviceId: item.attributes.device_id,
      activeCreatedAt: item.attributes.created_at,
      isVisible: !this.state.isVisible
    });
  };

  getAdvancedSearchList = (token: string) => {
    if (
      this.state.firstNameSearchText.length === 0 &&
      this.state.lastNameSearchText.length === 0
    ) {
      return;
    }

    const header = {
      "Content-Type": configJSON.advancedsearchApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    let attrs = null;

    if (
      this.state.firstNameSearchText.length > 0 &&
      this.state.lastNameSearchText.length > 0
    ) {
      attrs = {
        first_name: this.state.firstNameSearchText,
        last_name: this.state.lastNameSearchText
      };
    } else if (this.state.firstNameSearchText.length > 0) {
      attrs = {
        first_name: this.state.firstNameSearchText
      };
    } else if (this.state.lastNameSearchText.length > 0) {
      attrs = {
        last_name: this.state.lastNameSearchText
      };
    }

    this.advancedsearchApiCallId = requestMessage.messageId;

    //@ts-ignore
    let urlParams = new URLSearchParams(attrs).toString();

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getAdvancedSearchApiEndPoint}?${urlParams}`
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
  };

  goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  fetchData = () => {
    this.setState(prevState => ({
        page: prevState.page + 1,
    }), () => {
        setTimeout(() => {
            this.search("");
        }, 1000);
    });
   }

  serchButton=(val:any)=>{
    this.setState({
      searchResult: [],
      page:1,
      hasMore:true,
      isLoading:true
    },()=>{
      this.search(val)
   })
  }

  metaData=(responseJson:any)=>{
    if(responseJson.meta.paginated_catalogue_data_count<10){
      this.setState({hasMore:false})
    }
  }
  optionalFunction = (val: any, queryString: any) => {
    let urlWithOptionalParams = configJSON.getSearchReasultsApiEndPoint;
    if (val && val.charAt(0) === '#') {
      urlWithOptionalParams = configJSON.getHastagsFilterApiEndPoint + `%23${val.slice(1)}`;
    } else if (queryString) {
      urlWithOptionalParams = `${configJSON.getSearchReasultsApiEndPoint}?${queryString}`;
    }
    return this.setState({ optionalPara: urlWithOptionalParams });
  };
  
  handleResponse=(responseJson:any ,errorReponse:any)=>{
    if(responseJson.message){
      this.setState({isLoading:false})
      this.setState({hasMore:false})
     }
     
    const response = responseJson.data || responseJson.catalogues.data
    if (responseJson && response) {
      this.setState(prevState => ({
        searchResult: [...prevState.searchResult, ...response],
        isLoading: false
      }) , () => {
        this.setHashtags()
        if(!responseJson.catalogues)
        {
          this.metaData(responseJson)
        } else {
          this.setState({hasMore:false})
        }
      })
    } else if ((responseJson && responseJson.errors) || errorReponse) {
      this.showAlert("Alert", "API Error", "");
    } 
  }

  // Customizable Area End
}
