import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

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
  price: string;
  quantity: number;
  totalCost: number;
  nothingInCart: boolean;
  title: string;
  content: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MultitieredCartController extends BlockComponent<
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
      price: "",
      quantity: 1,
      totalCost: 0,
      nothingInCart: false,
      title: "",
      content: "",
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

  async componentDidMount() {
    const object = await getStorageData("CartDetails");
    const CartDetails = JSON.parse(object);
    this.setState({
      totalCost: CartDetails.price,
      price: CartDetails.price,
      title: CartDetails.title,
      content: CartDetails.content,
    });
  }

  handleBackButton = () => {
    this.props.navigation.navigate("Multitieredpricing");
  };

  handlePlus = () => {
    const newQuantity = this.state.quantity + 1;
    const convertedPrice = Number(this.state.price);
    const newTotalCost = newQuantity * convertedPrice;
    this.setState({
      quantity: newQuantity,
      totalCost: newTotalCost,
    });
  };

  handleMinus = () => {
    if (this.state.quantity < 1) {
      this.setState({ nothingInCart: true });
      return false;
    }
    const newQuantity = this.state.quantity - 1;
    const convertedPrice = Number(this.state.price);
    const newTotalCost = newQuantity * convertedPrice;
    this.setState({
      quantity: newQuantity,
      totalCost: newTotalCost,
    });
  };

  // Customizable Area End
}
