import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import CustomTheme from "../../../components/src/DesignSystem/Theme/Theme.web";

// Customizable Area Start
interface ITicket {
  id: string;
  type: string | null;
  attributes: {
    query: {
        requester: string;
        requested: string;
        subject: string;
        contact: string;
        email: string;
        status: string;
        details: string;
    }
  }
}

interface IComment {
    id: string;
    type: string | null;
    attributes: {
        account_id: string;
        comment: string;
        created_at: string;
        account_details: {
            url: string;
            name: string;
            comment_date: string;
        };
    }
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
  selectedTab:number;
  selectedSortType: { value: string | number; label: string };
  tickets: ITicket[];
  searchQuery: string;
  selectedId: string;
  selectedIds: string[];
  snackBarSource: boolean;
  showDeleteDialog: boolean;
  anchorEl: null | HTMLElement;
  selectedTicket: null | {
    data: ITicket,
    included: IComment[]
  };
  comment: string;
  ticketDialogOpen: boolean;
  checkAll: boolean;
  isEmojiVisible: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactUsTicketsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getTicketApiCallId: any;
  getTicketCommentsApiCallId: any;
  addTicketCommentApiCallId: any;
  deleteTicketDetailsApiCallId: any;
  debounceTimer: NodeJS.Timeout | null = null;
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
      showDeleteDialog: false,
      selectedId: "",
      selectedIds: [],
      tickets: [],
      selectedTab:0,
      selectedSortType:configJSON.sortBy[0],
      searchQuery: '',
      snackBarSource: false,
      anchorEl: null,
      selectedTicket: null,
      comment: '',
      ticketDialogOpen: false,
      checkAll: false,
      isEmojiVisible: false
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message)

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if(!apiRequestCallId) return null
    switch (apiRequestCallId) {
      case this.getTicketApiCallId:
        this.setState({ tickets: responseJson?.data})
        break;
      case this.getTicketCommentsApiCallId:
        this.setState({ selectedTicket: responseJson})
        break;
      case this.addTicketCommentApiCallId:
        const { selectedTicket } = this.state;
        if(!selectedTicket) return null
        const updatedTicket = {
          data: selectedTicket.data,
          included: selectedTicket.included ? [...selectedTicket.included, responseJson.data] : [responseJson.data]
        };
        this.setState({ selectedTicket: updatedTicket, comment: '' });
        break;
      case this.deleteTicketDetailsApiCallId:
        const filteredData = this.state.tickets.filter(ticket => ticket.id !== this.state.selectedId);
        this.setState({ tickets: filteredData, anchorEl: null, showDeleteDialog: false, selectedIds: [], snackBarSource: true });
        break;
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.TicketData({})
  }

  setStatus = (tab: number) => {
    if (tab === 1) {
      return 'pending';
    } else if (tab === 2) {
      return 'solved';
    } else if (tab === 3) {
      return 'rejected';
    } else {
      return 'all';
    }
  }

  TicketData = async ({selectedTab, sortBy, query}: { query?: string, selectedTab?: number, sortBy?:string | number}) => {
    let token = await getStorageData("authToken");
   
    const tab = selectedTab ?? this.state.selectedTab;
    const status = this.setStatus(tab)
    const order = sortBy ?? this.state.selectedSortType?.value ?? "sortBy";
    const searchQuery = query ?? this.state.searchQuery;

    let params = '';
    if (status !== "all") params += `status=${status}`;
    if (order !== "sortBy") params += `${params && '&'}order=${order}`;
    if (searchQuery) params += `${params && '&'}search_query=${encodeURIComponent(searchQuery)}`;

    const header = {
      "Content-Type": configJSON.contentApiContentType,
      token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getTicketApiCallId = requestMessage.messageId;
    let endPoint = configJSON.ticketApiEndPoint + (params ? `?${params}` : '');
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

  getTicketDetails = async () => {
    let token = await getStorageData("authToken");
    if(!this.state.selectedId) return null
    const header = {
      "Content-Type": configJSON.contentApiContentType,
      token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getTicketCommentsApiCallId = requestMessage.messageId;
    let endPoint = `${configJSON.ticketApiEndPoint}/${this.state.selectedId}`
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

  addTicketComment = async () => {
    if(!this.state.selectedTicket) return null
    let token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.contentApiContentType,
      token
    };
    const bodyData = {
        comment: this.state.comment
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.addTicketCommentApiCallId = requestMessage.messageId;
    let endPoint = `${configJSON.ticketApiEndPoint}/${this.state.selectedTicket?.data.id}/add_comment`
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(bodyData)
      );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );
   
    runEngine.sendMessage(requestMessage.id, requestMessage)

  }

  handleDeleteTicket = async () => {
    if(!this.state.selectedId) return null
    let token = await getStorageData("authToken");
  
    const header = {
      "Content-Type": configJSON.contentApiContentType,
      token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.deleteTicketDetailsApiCallId = requestMessage.messageId;
    let endPoint = `${configJSON.ticketApiEndPoint}/${this.state.selectedId}`
   
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
      configJSON.apiMethodTypeDelete
    );
    runEngine.sendMessage(requestMessage.id, requestMessage)
  }

  handleTabSelect = (tabIndex: number) => {
      this.setState({selectedTab:tabIndex}) 
      this.TicketData({selectedTab: tabIndex})
  };

  handleChangeSortType = (option: {
    value: string | number;
    label: string;
  }) => {
    this.setState({ selectedSortType: option });
    this.TicketData({sortBy: option.value})
  };

  handleInputChange = (target: any) => {
    this.setState({ searchQuery: target.value });
    this.TicketData({ query: target.value });
  };

  handleCloseSnackBar = () => {
    this.setState({ snackBarSource: false });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ showDeleteDialog: false, anchorEl: null })
  }
  
  showDeleteConfirmation = () => {
    this.setState({ showDeleteDialog: true, anchorEl: null})
  }

  viewTicket = () => {
    this.setState({ ticketDialogOpen: true, anchorEl: null})
    this.getTicketDetails()
  }

  handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>, value: string) => {
    this.setState({ anchorEl: event?.currentTarget, selectedId: value});
  };

  handleMoreMenuClose = () => {
    this.setState({ anchorEl: null, selectedId: ''});
  };

  handleCloseTicketDialog = () => {
    this.setState({ ticketDialogOpen: false, selectedId: '' })

  };

  handleTextAreaChange = (value: string) => {
    this.setState({ comment: value})
  }

  handleTicketSelect = (ticketId: string) => {
    const exist = this.state.selectedIds.includes(ticketId)
    let newList;
    if(exist) {
      newList = this.state.selectedIds.filter((id) => id !== ticketId)
    } else {
      newList = [...this.state.selectedIds, ticketId]
    }
    this.setState({ selectedIds: newList })
  }

  handleSelectAll = (value: boolean) => {
    if(value) {
      const list = this.state.tickets.map((ticket) => ticket.id)
      this.setState({ selectedIds: list, checkAll: value })
    } else {
      this.setState({ selectedIds: [], checkAll: value })
    }
  } 
  
 getColorForTicketStatus = (status:string) => {
    let color;
    switch(status) {
      case 'solved':
        color = CustomTheme.palette.success.dark;
        break;
      case 'reject':
        color = CustomTheme.palette.red.main;
        break;
      default:
        color = CustomTheme.palette.warning.dark;
        break;
    }
    return color;
  };

  formatDate = (date:string) => {
    if(date) {
      const [day, month, year] = date.split('-');
        return new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
    } else {
      return date
    }
  };

  toggleEmoji = () => {
    this.setState((prevState) => ({ isEmojiVisible: !prevState.isEmojiVisible }));
  }

  handleClickAwayEvent = () => {
    this.setState({
      isEmojiVisible: false
    })
  }

  onEmojiClick = (emojiObject: any) => {
    const { emoji } = emojiObject;
    const { comment } = this.state;
    const updatedMessage = comment + emoji;
    this.setState({ comment: updatedMessage });
  };
  // Customizable Area End
}
