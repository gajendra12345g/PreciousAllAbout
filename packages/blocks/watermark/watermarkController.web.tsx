import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start



// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface Array{
}
interface S {
  // Customizable Area Start
  selectedFile:Array[],
  applyClick:boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class WatermarkController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
 
  
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
      selectedFile:[],
      applyClick:false
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  handleFileInputChange = (event: any) => {
    this.setState({selectedFile:event.files}) 
  };
  handleApplyClick=()=>{
    this.setState({applyClick:true})
  }
  // Customizable Area End
}
