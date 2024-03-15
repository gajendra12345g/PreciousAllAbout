import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

import { getStorageData } from "../../../framework/src/Utilities";

interface IRequest {
  id: string;
  type: string;
  attributes: {
    email: string;
    full_name: null | string;
    role_type: null | string;
    activated: boolean;
    country_code: null | number;
    first_name: null | string;
    full_phone_number: string;
    last_name: null | string;
    phone_number: null | string;
    type: null;
    created_at: string;
    updated_at: string;
    device_id: null | string;
    unique_auth_id: string;
    profile_images: { url: string } | null;
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
  DeleteUserId: string;
  receivedRequests: IRequest[];
  sortItem: {
    label: string,
    value: string
  };
  active: number;
  searchValue: string;
  pageNumber:number;
  CurrentPage:any;
  showDeleteUserDialog:boolean,
  snackBar:boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class UserManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getUserManagementApiCall: any = "";
  getUserDeleteApiCall: any = "";
  getPaginationApi:any= "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];
    this.state = {
      receivedRequests: [],
      DeleteUserId: "",
      sortItem: {
        value:"",
        label:"SORT BY"
      },
      active: 1,
      searchValue : "",
      pageNumber:1,
      CurrentPage:1,
      showDeleteUserDialog:false,
      snackBar:false
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
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
        switch (apiRequestCallId) {
          case this.getUserManagementApiCall:
            this.setState({ receivedRequests: responseJson.accounts.data });
            this.setState({pageNumber:Math.ceil(responseJson.total_count/responseJson.per_page)})
            break;
          case this.getUserDeleteApiCall:
          this.handleDeleteResponse(responseJson)
            break;
            case this.getPaginationApi:
              this.setState({ receivedRequests:responseJson.accounts.data });
              break;
          default:
            break;
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    this.UserManagementData({sortQuery:"desc"});
   
  }
  UserManagementData = async (query?:any) => {
    let token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserManagement,
      token: token
    };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPointApiGetUserManagement}?search_query=${query?.searchQuery || ""}&sort_order=${query?.sortQuery || ""}`
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserManagement
    );
    this.getUserManagementApiCall = request.messageId;
    runEngine.sendMessage(request.id, request);
  };

  DeleteUser = async () => {
    let token = await getStorageData("authToken");
    const header = {
      "Content-Type": configJSON.contentTypeApiGetDeleteUserManagement,
      token: token
    };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPointApiGetDeleteUserManagement}`
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({id: this.state.DeleteUserId})
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetDeleteUserManagement
    );
    runEngine.sendMessage(request.id, request);
    this.getUserDeleteApiCall = request.messageId;
  };
  PaginationApi=async()=>{
    let token = await getStorageData("authToken");

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserManagement,
      token: token
    };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPointApiGetUserManagement}?page=${this.state.CurrentPage}`
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserManagement
    );
    runEngine.sendMessage(request.id, request);
    this.getPaginationApi = request.messageId;
  };
  handleDeleteModal = (id: any) => {
    this.setState({ DeleteUserId: id });
    this.setState({showDeleteUserDialog:true})
    
  };
  handleSearchChange = (target:{value: string}) => {
    this.setState({searchValue : target.value})
    this.UserManagementData({searchQuery:target.value});
  };
  handleSortChange = (value:{
    label: string;
    value: any;
  }) => {
    this.setState({ sortItem: value });
    this.UserManagementData({sortQuery:value.value});
  };
  handleChange=(page:number)=>{
  this.setState({CurrentPage:page})
  this.PaginationApi()
  }
  handleActive=(id:number)=>{
   this.setState({active:id})
  }
  handleUserCloseDialog=()=>{
    this.setState({showDeleteUserDialog:false})
  }
  handleDeleteUser=()=>{
   this.DeleteUser();
   this.setState({showDeleteUserDialog:false})
  }
  handleCloseSnackBar = () => {
    this.setState({snackBar: false });
  };
  handleDeleteResponse=(response:any)=>{
    if(response.message === "Account is deleted"){
      const filteredData = this.state.receivedRequests.filter(
        i => this.state.DeleteUserId !== i.id
      );
      this.setState({ receivedRequests: filteredData });
      this.setState({snackBar: true });
    } 
  }
  // Customizable Area End
}
