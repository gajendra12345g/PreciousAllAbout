import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  getStorageData,
} from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  receiveState: () => void;
  style: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  setIsUserLoggedIn: boolean;
  open: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class EmailAccountLogoutController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  searchApiCallId: any;
  featuredApiId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
    ];

    this.state = {
      setIsUserLoggedIn: true,
      open: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  handleLogout = () => {
    localStorage.clear();
    this.props.receiveState();
    window.location.replace("/");
  };

  handleContributorLogout = async () => {
    this.props.receiveState();
    const role_type = await getStorageData("roleType");
    localStorage.clear();
    this.toReDirect(role_type);
  };

  toReDirect = (role_type: any) => {
    if (parseInt(role_type) === 1) {
      window.location.replace("/contributor");
    } else {
      window.location.replace("/");
    }
  };

  handleModal = (event: any) => {
    this.setState({ open: !event });
  };
  // Customizable Area End
}
