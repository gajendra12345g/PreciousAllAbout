import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export interface HashtagAttributes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  swag_shots_count: number;
  posts_count: number;
}

interface HashtagData {
  id: string;
  type: string;
  attributes: HashtagAttributes;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  hashTags: [];
  searchQuery:string
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  hashInputValue: string;
  selectedHashOption: null;
  selectedHashOptions: HashtagAttributes[];
  hashData: HashtagAttributes[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class HashtagsController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess), getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      token: "",
      hashData: [],
      hashInputValue: '',
      selectedHashOption: null,
      selectedHashOptions: []
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.hashtagApiCallId) //istanbul ignore next
      {
        if (responseJson && responseJson.data) //istanbul ignore next
        {
          this.setState({
            hashData: responseJson.data.map((item: HashtagData) => item.attributes)
          });
        } else {
          //Check Error Response
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  hashtagApiCallId: string = "";

  componentDidMount = async () => {
    const token: string = localStorage.getItem("USER_TOKEN") || '';
    this.setState({
      token: token
    });
  }

  hashtagFn = (tagVal: string) => {

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const body = {
      search: tagVal
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.hashtagApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.hashtagApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  handleHashInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    this.setState({
      hashInputValue: value
    }, () => {
      if (this.state.hashInputValue !== "") {
        this.hashtagFn(this.state.hashInputValue);
      }
    })
  };

  handleHashOptionChange = (event: React.ChangeEvent<{}>, value: HashtagAttributes | null) => {
    if (value !== null) {
      const isMatchedHash = this.state.selectedHashOptions.find((item: HashtagAttributes) => item.id === value.id);
      if (isMatchedHash === undefined) {
        let { selectedHashOptions } = this.state;
        this.setState({
          selectedHashOptions: [...selectedHashOptions, value],
          hashData: [],
          hashInputValue: '',
          selectedHashOption: null
        });
      }
    }
  }

  handleHashChipDelete = (selectedChip: HashtagAttributes) => {
    let { selectedHashOptions } = this.state;
    this.setState({ selectedHashOptions: selectedHashOptions.filter((data: HashtagAttributes) => data.id !== selectedChip.id) || [] as HashtagAttributes[] });
  }
  // Customizable Area End
}
