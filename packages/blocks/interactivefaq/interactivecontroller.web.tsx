import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start


interface IRequest {
  id: string;
  type: string;
  attributes: {
    title: string;
    image: any;
  };
}
interface Questions {
  question_id: string;
  title: string;
  description: string;
}
interface QuestionType {
  id: string;
  type: string;
  attributes: {
    title: string;
    image: any;
    questions: Questions[];
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
  FaqData: IRequest[];
  searchValue: string;
  InteractiveFaqQuestionType: QuestionType[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class InteractiveFaqSectionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getInteractiveFAQDataApiCall: any = "";
  getInteractiveFaqQuestionsApiCall: any = "";
  getInteractiveFaqSearchApi: any = "";

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
      FaqData: [],
      InteractiveFaqQuestionType: [],
      searchValue: ""
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
          case this.getInteractiveFAQDataApiCall:
            console.log(responseJson.data);
            this.setState({ FaqData: responseJson.data });
            break;
          case this.getInteractiveFaqQuestionsApiCall:
            console.log(responseJson.data, "....");
            this.setState({ InteractiveFaqQuestionType: responseJson.data });
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
    this.FaqDataApi();
    this.InteractiveFaqQuestionsApi();
  }
  FaqDataApi = async () => {
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApigetFadData
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApigetFaqData
    );
    this.getInteractiveFAQDataApiCall = request.messageId;
    runEngine.sendMessage(request.id, request);
  };
  InteractiveFaqQuestionsApi = async () => {
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApigetInteractiveFaqQuestion
    );
    request.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApigetInteractiveFaqQuestion
    );
    this.getInteractiveFaqQuestionsApiCall = request.messageId;
    runEngine.sendMessage(request.id, request);
  };
  GoLandingPage=()=>{
    const goToFAQ: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToFAQ.addData(getName(MessageEnum.NavigationTargetMessage), "LandingPage");
    goToFAQ.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToFAQ);
  }

  handleSearchChange = (target: { value: string }) => {
    this.setState({ searchValue: target.value });
  };

  // Customizable Area End
}
