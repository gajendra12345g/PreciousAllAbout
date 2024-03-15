import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
    ItemList,
    ProfileIcon,
} from "./assets";
interface Order {
    id:string,
    type:string,
    attributes: {
        id: string;
    ItemList: any;
    order_id: number;
    Customer: string;
    Customer_img: any;
    email: string;
    Purchase_date: string;
    status: string;
    Price: string;
    };
}

const data = [
    {
        id: "1",
        type: "order",
        attributes: { id: "1", ItemList: ItemList, order_id: 1002343, Customer: "Jordan sins", Customer_img: ProfileIcon, email: "Jordan2023@gmail.com", Purchase_date: "Oct 19, 2023", status: "PAID", Price: "$9.99" }
    },
    {
        id: "2",
        type: "order",
        attributes: { id: "2", ItemList: ItemList, order_id: 1002343, Customer: "Jordan sins",Customer_img: ProfileIcon, email: "Jordan2023@gmail.com", Purchase_date: "Oct 19, 2023", status: "REJECT", Price: "$9.90" }
    },
    {
        id: "3",
        type: "order",
        attributes: { id: "3", ItemList: ItemList, order_id: 1007843, Customer: "Nick sins", Customer_img: ProfileIcon, email: "Nick42023@gmail.com", Purchase_date: "Oct 19, 2023", status: "REJECT", Price: "$9.11" }
    },
    {
        id: "4",
        type: "order",
        attributes: { id: "4", ItemList: ItemList, order_id: 1005343, Customer: "Jordan sins",Customer_img: ProfileIcon, email: "Jordan2784@gmail.com", Purchase_date: "Oct 19, 2023", status: "PAID", Price: "$9.27" }
    },
    {
        id: "5",
        type: "order",
        attributes: { id: "5", ItemList: ItemList, order_id: 1452343, Customer: "Jordan sins", Customer_img: ProfileIcon, email: "Jordan2023@gmail.com", Purchase_date: "Oct 19, 2023", status: "PAID", Price: "$9.89" }
    }
]
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
    sortOrder: {
        label: string,
        value: string
    };
    OrderData: Order[];
    active: number;
    searchOrderValue: string;
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
            sortOrder: {
                value: "",
                label: "SORT BY"
            },
            active: 1,
            searchOrderValue: "",
            OrderData:data
        };

        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start

        // Customizable Area End
    }

    // Customizable Area Start

    handleOrderSearchChange = (target: { value: string }) => {
        this.setState({ searchOrderValue: target.value })
    };
    handleOrderSort = (value: {
        label: string;
        value: any;
    }) => {
        this.setState({ sortOrder: value });
    };
    handleOrderActive = (id: any) => {
        if (id === 1) {
            this.setState({ OrderData:data, active: id });
        } else {
            const filteredData = data.filter(item => item.attributes.status === (id === 2 ? "PAID" : "REJECT"));
            this.setState({ OrderData: filteredData, active: id });
        }
    }
        // Customizable Area End
}
