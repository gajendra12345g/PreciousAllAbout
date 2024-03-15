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
  id: string;
  type: string | null;
  price: number | null;
  status: string;
  date: Date;
  file_link: string | null
  user_detail: {
    id: number;
    name: string;
  };
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
  contentCount: {
    total_approved: number;
    percentage_approved: number
    total_submitted: number;
    percentage_submitted: number
    total_pending: number;
    percentage_pending: number;
    total_rejected: number;
    percentage_rejected: number;
  };
  selectedTab:number;
  contents: IContent[];
  searchQuery: string;
  showDeleteDialog:boolean;
  contenDeleteID:any;
  showAlert:boolean;
  alertType:string;
  selectedUpdate:any;
  selectedUpdateLabel:string,
  CurrentPage:any,
  pageNumber:any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ReviewApprovalModeratorController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getContentApiCallId: any;
  getContentCountApiCallId: any;
  debounceTimer: any;
  deleteContentApiCallId:string = ""
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
      token: "",
      contents: [],
      selectedTab:0,
      searchQuery: '',
      contentCount: {
        total_approved: 0,
        percentage_approved: 0,
        total_pending:0,
        percentage_pending: 0,
        total_rejected: 0,
        percentage_rejected: 0,
        total_submitted: 0,
        percentage_submitted: 0,
      },
      showDeleteDialog:false,
      contenDeleteID:"",
      showAlert:false,
      alertType:"",
      selectedUpdate: configJSON.sortType[0],
      selectedUpdateLabel:"desc_date",
      CurrentPage:1,
      pageNumber: null
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message)

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = await getStorageData("authToken");
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({token});
      }
    }

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    switch (apiRequestCallId) {
      case this.getContentApiCallId:
        this.setState({ contents: responseJson?.data, pageNumber: Math.ceil(responseJson?.total_count/10)})
        break;
      case this.getContentCountApiCallId:
        this.setState({ contentCount: responseJson})
        break;
        case this.deleteContentApiCallId:
          this.setDeletedContentCall()
          break;
      default:
        break;
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.getTotalCount(this.state.token)
    this.getListRequest({})
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  getListRequest = async ({
    tokens,
    selectedTab,
    sortBy,
    query,
    page
  }: {
    tokens?: string,
    query?: string,
    selectedTab?: number,
    sortBy?: string | number,
    page?: any
  }) => {
    const { selectedTab: tab, selectedUpdateLabel: order, searchQuery } = this.state;
    const statusMap = ['accepted', 'pending', 'rejected', 'all'];
    const status = statusMap[selectedTab !== undefined ? selectedTab : tab] || '';
  
    const params = new URLSearchParams();
  
    if (status) params.append('search_query', status);
    if (sortBy !== 'sortBy') params.append('sort_by', String(sortBy || order));
    if (searchQuery) params.append('name', encodeURIComponent(searchQuery));
    if (page) params.append('page', String(page));
  
    const token = await getStorageData('authToken');
    const header = {
      'Content-Type': configJSON.contentApiContentType,
      token
    };
  
    const endPoint = `${configJSON.contentApiEndPoint}?${params.toString()}`;
  
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getContentApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), endPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);
  
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  

  getTotalCount = async(tokens: any) => {
    const token = await getStorageData("authToken");

    const header = {
      "Content-Type": configJSON.contentApiContentType,
      token:token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getContentCountApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.totalContentApiEndPoint
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

  handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
      this.setState({selectedTab:newValue}, ()=> this.getListRequest({selectedTab: newValue})) 
      
  };

  handleInputChange = (value: string) => {
    this.setState({ searchQuery: value });
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.getListRequest({ query: value });
    }, 1000);
  };

  handleRedirectToContentDetails = (id: string)=>{
    this.props.navigation.navigate("ReviewSetPriceModerator", { id })
  }
  deletecontent = (deleteID:any) => {
    this.setState({showDeleteDialog: true,contenDeleteID:deleteID})
  }
  handleCloseDeleteDialog  = () => {
    this.setState({showDeleteDialog: false})
  }
  handleDeleteContent = async() => {
    this.setState({showDeleteDialog: false})
    const token = await getStorageData("authToken");

    const header = {
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.deleteContentApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteContentEndPoint.replace(
        ":id",
        this.state.contenDeleteID
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
    this.getListRequest({});
    this.getTotalCount(this.state.token)
    this.setState({showAlert:true,alertType:"Catalogue Deleted Successfully"})
  }
  handleAlertClose = () => {
    this.setState({showAlert: false})
  }
  handleSortSelect = (option: {
    value: string;
    label: string;
  }) => {
    this.setState({ selectedUpdate :option,selectedUpdateLabel: option.value, }, 
      () => this.getListRequest({sortBy: option.value})

     );
  };
  handleChange=(page:any)=>{
    this.setState({CurrentPage:page})
    this.getListRequest({page})
    }
  // Customizable Area End
}
