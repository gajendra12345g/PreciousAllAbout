import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { userProfile,reviewIcon,accountIcon,activeUserIcon,orderIcon,ticketIcon,watermarkIcon, settingIcon,activeOrder,activeReview,activeWaterMark,activeTicket,user,requestActive,homeIcon,insight,insightActive,portfolioActive,portfolioIcon, earningIcon,earningActive, helpIcon, requestIcon,homeActive } from "./assets";
import { Linking } from "react-native";
import { getStorageData} from "../../../framework/src/Utilities";

export const  sideBarListItem:any=[
  {
    id:"1",
    icon:reviewIcon,
    ActiveIcon:activeReview,
    listTitle:"REVIEW",
    PathUrl:"ReviewApprovalModerator",
    url:"/Moderator/review"
  },
  {
    id:"2",
    icon:user,
    ActiveIcon:activeUserIcon,
    listTitle:"USERS",
    PathUrl:"Usermanagement",
    url:"/UserManagement"
  },
  {
    id:"3",
    icon:orderIcon,
    ActiveIcon:activeOrder,
    listTitle:"ORDERS",
    PathUrl:"OrderManagementModerator",
    url:"/Moderator/OrderManagements"
  },
  {
    id:"4",
    icon:ticketIcon,
    ActiveIcon:activeTicket,
    listTitle:"TICKETS",
    PathUrl:"ModeratorTickets",
    url:"/tickets"
  },
  {
    id:"5",
    icon:watermarkIcon,
    ActiveIcon:activeWaterMark,
    listTitle:"WATERMARKS",
    PathUrl:"Watermark",
    url:"/Watermark"
  },
  {
    id:"6",
    icon:settingIcon,
    ActiveIcon:settingIcon,
    listTitle:"SETTINGS",
    PathUrl:"Settings2",
    url:"/Settings2"
   
  }
]
export const sideBarBottomNav:any=[
  {
    id:"7",
    icon:accountIcon,
    ActiveIcon:accountIcon,
    listTitle:"ACCOUNTS",
    PathUrl:"Account",
    url:"/account"
  }
]

export const  sideBarContributorListItem:any=[
  {
    id:"1",
    icon:homeIcon,
    ActiveIcon:homeActive,
    listTitle:"HOME",
    PathUrl:"LadingPageAfterLoginContributor"
  },
  {
    id:"2",
    icon:earningIcon,
    ActiveIcon:earningActive,
    listTitle:"EARNINGS",
    PathUrl:"LadingPageAfterLoginContributor"
  },
  {
    id:"3",
    icon:portfolioIcon,
    ActiveIcon:portfolioActive,
    listTitle:"PORTFOLIO",
    PathUrl:"PhotoLibrary",
    url:"/Contributor/PhotoLibrary"
  },
  {
    id:"4",
    icon:insight,
    ActiveIcon:insightActive,
    listTitle:"INSIGHTS",
    PathUrl:"LadingPageAfterLoginContributor"
  },
  {
    id:"5",
    icon:requestIcon,
    ActiveIcon:requestActive,
    listTitle:"REQUEST",
    PathUrl:"LadingPageAfterLoginContributor"
  },
  
]
export const sideBarContributoBottomNav:any=[
  {
    id:"6",
    icon:accountIcon,
    ActiveIcon:accountIcon,
    listTitle:"ACCOUNT",
    PathUrl:"Account"
  },
   {
    id:"7",
    icon:helpIcon,
    ActiveIcon:accountIcon,
    listTitle:"HELP",
    PathUrl:"Help"
  }
]

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  drawerContent?: boolean;
  contributorLogin?:any,
   showHeardNav?: any,
    languageOptions?: any,
     selectedLanguage?: any,
      handleChangeLanguage?: any,
        showContributorLable?:any,
         contributorContent?: any,
          contributorPortfolio?:any,
          goToUpload? :(value: any)=>void;
          goToCatalogue? :() => void;
          handleSelect?: any;
          goToLanding? : any;
          ModeratorLogin?:any;
          showCollection?:any;
          onItemClick?:(value:any)=> any;
          sideBarListItem?: Array<{
            id: string;
            icon: any;
            listTitle: string;
            ActiveIcon: any;
            PathUrl: string;
        }>,
        sideBarBottomNav?: Array<{
            id: string;
            listTitle: string;
            ActiveIcon: any;
            icon: any;
            PathUrl: string;
        }>,
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  webDrawer: boolean;
  token: any;
  drawerItems: any;
  drawerOpen: boolean,
  closeModalProp: any,
  closeLoginModal: any,
  closeSignupModal: any,
  selectedLanguage: any,
  contributorName: any,
  selectedProfile: any,
  active:string,
  logOutModal:boolean;
  selectedItemModal:any
  setAnchorEl:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NavigationMenuController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetDataCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      webDrawer: false,
      token: "",
      drawerItems: [],
      drawerOpen: false,
      closeModalProp: null,
      closeLoginModal: null,
      closeSignupModal: null,
      selectedLanguage: configJSON.assestType[0],
      contributorName: '',
      selectedProfile: '',
      active:"1",
      logOutModal: false,
      selectedItemModal:'',
      setAnchorEl:null
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token }, () => {
      });
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiGetDataCallId !== "" &&
      this.apiGetDataCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson) {
        this.setState({ drawerItems: responseJson });
      } 
    }
    // Customizable Area End
  }

  // Customizable Area Start
  

  onPressMenuItem = (menuItem: any) => {
    let path = menuItem.url;

    let tarea_regex = /^(http|https)/;
    if (tarea_regex.test(String(path).toLowerCase())) {
      if (this.isPlatformWeb()) {
        window.open(path);
      } else {
        Linking.openURL(path);
      }
    } else {
      const msg: Message = new Message(getName(MessageEnum.NavigationMessage));
      msg.addData(getName(MessageEnum.NavigationTargetMessage), path);
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  };

  userProfileProps = {
    source: userProfile,
  };

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.fetchContributorName();
    const path=window.location.pathname;
    const newArray=[...this.props.sideBarListItem || [],...this.props.sideBarBottomNav || []]
    const ActiveUrl=newArray.find((item:any)=>item.url===path)
    if(ActiveUrl){
      this.setState({active:ActiveUrl.id})
    }
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getMenuItems = async () => {
    let token = this.state.token;

    const header = {
      "Content-Type": configJSON.jsonApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetDataCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getMenuItemsEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  changeModalProp = () => {
    this.setState({ closeModalProp: false});
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  closeLogin = () => {
    this.setState({ closeLoginModal: true, closeSignupModal: false });
  };

  closeSignup = () => {
    this.setState({ closeSignupModal: true, closeLoginModal: false });
  };

  resetLogin = () => {
    this.setState({ closeLoginModal: false });
  };

  resetSignUp = () => {
    this.setState({ closeSignupModal: false });
  };

  handleLanguageChange = (option: {
    value: string | number;
    label: string;
  }) => {
    this.setState({ selectedLanguage:option });
  };
  async fetchContributorName() {
      const storedContributorName = await getStorageData('contributorName');
      this.setState({ contributorName: storedContributorName || '' });
  }
  handleListItemClick=(id:string, PathUrl:string)=>{
    this.setState({active:id});
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage),PathUrl);
    msgs.addData(getName(MessageEnum.NavigationPropsMessage),this.props);
    this.send(msgs)
    if (this.props.onItemClick) {
      this.props.onItemClick(id);
  }
    }
    closeLogOutModal = () => {
      this.setState({logOutModal: false})
    }
    handleLogoutModal = (selectedItem: any) => {
      if(selectedItem.value=="lg"){
        this.setState({logOutModal: true, selectedItemModal:selectedItem})
      }
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({setAnchorEl:event.currentTarget})
    };
  
   handleClose = () => {
      this.setState({setAnchorEl:null})
    };
  
   receiveState1=()=>{
    this.setState({setAnchorEl:null})
   }
  // Customizable Area End
}
