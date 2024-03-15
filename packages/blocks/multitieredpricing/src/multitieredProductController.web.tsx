import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import { setStorageData } from "../../../framework/src/Utilities";
export interface Product {
  itemId: number;
  title: string;
  content: string;
  basicprice: string;
  advanceprice: string;
  premiumprice: string;
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
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MutitieredProductController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleCardNavigation = (item: Product) => {
    const jsondata = JSON.stringify(item);
    setStorageData("productDetails", jsondata);
    this.props.navigation.navigate("Multitieredpricing");
  };

  cardItem = [
    {
      itemId: 1,
      title: "Headphone1",
      content: "Good and nice  headphone1 for you",
      basicprice: "200",
      advanceprice: "400",
      premiumprice: "600",
    },
    {
      itemId: 2,
      title: "Headphone2",
      content: "Good and nice  headphone2 for you",
      basicprice: "500",
      advanceprice: "1000",
      premiumprice: "2000",
    },
    {
      itemId: 3,
      title: "Headphone3",
      content: "Good and nice  headphone3 for you",
      basicprice: "200",
      advanceprice: "400",
      premiumprice: "600",
    },
    {
      itemId: 4,
      title: "Headphone4",
      content: "Good and nice  headphone4 for you",
      basicprice: "200",
      advanceprice: "400",
      premiumprice: "600",
    },
    {
      itemId: 5,
      title: "Headphone5",
      content: "Good and nice  headphone5 for you",
      basicprice: "200",
      advanceprice: "400",
      premiumprice: "600",
    },
    {
      itemId: 6,
      title: "Headphone6",
      content: "Good and nice  headphone6 for you",
      basicprice: "200",
      advanceprice: "400",
      premiumprice: "600",
    },
    {
      itemId: 7,
      title: "Headphone7",
      content: "Good and nice  headphone7 for you",
      basicprice: "200",
      advanceprice: "400",
      premiumprice: "600",
    },
  ];
  // Customizable Area End
}
