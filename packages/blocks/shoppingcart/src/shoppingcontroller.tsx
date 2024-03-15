import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  order_id: any;
  catalogue_id: number;
  quantity: number;
  taxable: boolean;
  taxable_value: number;
  token: string;
  orderList: any;
  orderItems: any;
  isVisible: boolean;
  isRefreshing: boolean;

  id: any;
  name: string;
  description: string;
  price: number;
  currency: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  trendingList: any;
  showDeleteModal:boolean;
  ModalData:any;
  CouponData:any;
  showCoupon:boolean;
  CartSize: Array<{
    label: string
    value: string
  }>;
  CountryValue:{
    label: string
    value: string
  };
  coupon_code:string;
  showSnackbar:boolean;
  couponResponseMessage:string;
  couponError: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: number | undefined;
  orderData: any;
  sizeFormatValue: any;
  videoFormats: any;
  imageFormats: any;
  selectedImageFormat: any;
  snackVariant: any;
  selectedVideoFormat: any;
  contentLicense: any;
  licenseIds: any;
  countryList: any;
  stateList: any;
  selectedNames: any;
  licenceArrayOriginal: any,
  couponIsValid: boolean,
  appliedCoupon: string,
  finalPrice: any
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ShoppingCartOrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrdersApiCallId: any;
  showOrderApiCallId: any;
  createOrderItemApiCallId: any;
  deleteOrderItemApiCallId: any;
  getCouponApiCallId:any;
  postValidCouponCodeApiCallId:any;
  getOrdersListApiCallId: any;
  deleteOrderItemApiCallIdWeb: any;
  getContentFormatApiId: any;
  updateOrderItemFormatId: any;
  getContentLicenseTypeApiId: any;
  getCountryListApiId: any;
  getStateListApiId: any;
  getDiscountedPriceApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      order_id: 0,
      catalogue_id: 0,
      quantity: 0,
      taxable: false,
      taxable_value: 0,
      token: "",
      orderList: [],
      orderItems: [],
      isVisible: false,
      isRefreshing: false,

      id: 0,
      name: "",
      description: "",
      price: 0,
      currency: "",
      category_id: 0,
      created_at: "",
      updated_at: "",
      account_id: 0,
      trendingList: [],
      showDeleteModal:false,
      ModalData:null,
      CouponData:[],
      showCoupon:false,
      CartSize: [{
        value: "Original Size ",
        label: "Original Size"
      }],
      CountryValue:{
        value: "India",
        label: "India"
      },
      sizeFormatValue: [],
      coupon_code:"",
      showSnackbar:false,
      couponResponseMessage:"",
      couponError: '',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: undefined,
      orderData: {},
      videoFormats: {},
      imageFormats: {},
      selectedImageFormat: {},
      snackVariant: 'success',
      selectedVideoFormat: {},
      contentLicense: [],
      licenseIds: [],
      countryList: [],
      stateList: [],
      selectedNames:{},
      licenceArrayOriginal:[],
      couponIsValid: false,
      appliedCoupon:"",
      finalPrice:""
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.getOrdersList();
    this.getContentFormat();
    this.getContentLicenseTypes();
    this.getCountryList();
    // Customizable Area End
  }

  receive = async (from: String, message: Message) => {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getOrders(token);
      this.getCoupons(token);
    }
    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      )
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson) {
        switch (apiRequestCallId) {
          case this.getCountryListApiId:
            this.setState({
              countryList: responseJson.map((item: any) => ({
                label: item,
                value: item
              }))
            })
            break;
          case this.getStateListApiId:
            this.setState({
              stateList: responseJson.map((item: any) => ({
                label: item,
                value: item
              }))
            })
            break;
          case this.getContentLicenseTypeApiId:
            this.setState({licenceArrayOriginal: responseJson.data})
            break;
          case this.updateOrderItemFormatId:
            this.handleUpdateOrderItemFormatId(responseJson);
            break;
          case this.getContentFormatApiId:
            this.setState({
              videoFormats: responseJson.data.filter((item: any) => item.attributes.type_format === 'video').map((item: any) => ({ label: item.attributes.name, value: item.id })),
              imageFormats: responseJson.data.filter((item: any) => item.attributes.type_format === 'image').map((item: any) => ({ label: item.attributes.name, value: item.id })),
            })
            break;
          case this.getOrdersListApiCallId:
            this.setState({
              orderData: responseJson.data,
              finalPrice: responseJson.data.attributes?.total_price
            },()=> this.setSelectedLicenceIds())
            break;
          case this.getOrdersApiCallId:
            this.setState({ orderList: responseJson?.data });
            break;
          case this.showOrderApiCallId:
            this.setState({
              orderItems: responseJson?.data?.attributes?.order_items?.data,
            });
            break;
          case this.createOrderItemApiCallId:
            this.props.navigation.navigate("ShoppingCartOrders");
            break;
          case this.deleteOrderItemApiCallId:
            this.showOrder(this.state.order_id);
            this.getOrders(this.state.token);
            break;
          case this.deleteOrderItemApiCallIdWeb:
            this.handleDeleteOrderItemApiCall(responseJson);
            break;
          case this.getDiscountedPriceApiCallId:
            this.setState({finalPrice:responseJson.discounted_price})
            break;
          case this.getCouponApiCallId:
            this.setState({
                    CouponData: responseJson?.data
                  });
            break;
          case this.postValidCouponCodeApiCallId:
            this.handleValidCouponCodeApiResponse(responseJson);
          default:
            break;
        }
        if(responseJson.errors){
          this.handleResponseError(responseJson,apiRequestCallId)     
        }
      }
    }
    // Customizable Area End
  };

  // Customizable Area Start
  handleUpdateOrderItemFormatId = (responseJson: any) => {
    const { getOrdersList } = this;
    const snackVariant = responseJson.error ? 'error' : 'success';
    const couponResponseMessage = responseJson.error ? responseJson.error : 'Item updated successfully.';
    this.setState({
      showSnackbar: true,
      snackVariant,
      couponResponseMessage
    }, getOrdersList);
  }
  handleDeleteOrderItemApiCall = (responseJson:any) => {
    const { getOrdersList } = this;
    const snackVariant = responseJson.error ? 'error' : 'delete';
    const couponResponseMessage = responseJson.error ? responseJson.error : 'Item removed from the Cart.'; 
    this.setState({
      ModalData: null,
      showDeleteModal: false,
      showSnackbar: true,
      snackVariant,
      couponResponseMessage
    }, getOrdersList);
  }
  handleValidCouponCodeApiResponse = (responseJson:any) => {
    if (responseJson?.message.includes("valid")) {
      this.getDiscountedPrice()
      this.setState({ couponIsValid: true, coupon_code: "" });
    } else {
      this.setState({ coupon_code: "", showSnackbar: true, snackVariant: 'error', couponResponseMessage: responseJson?.message });
    }
  }
  setSelectedLicenceIds = () => {
    const licenceIds = (this.state.orderData.attributes.order_items.data).map((item: any) => {
      // Extract licence_type IDs from each order item and convert to an array
      return item.attributes.license_type.map((license: any) => parseInt(license.id));
    });
    const licenceNames = (this.state.orderData.attributes.order_items.data).map((item: any) => {
      // Extract licence_type names from each order item and convert to a single object with a single label property
      const label = item.attributes.license_type.map((license: any) => license.name).join(',');
      return { label };
    });
    this.setState({ licenseIds: licenceIds, selectedNames: licenceNames },()=> this.setEachLicenceArray());
  }
  
  setEachLicenceArray = () => {
    const contentLicense = (this.state.orderData.attributes.order_items.data).map((item: any, index: any) => {
      // Extract licence_type information for each order item and set checked property based on selected license IDs
      return this.state.licenceArrayOriginal.map((license: any) => ({
        label: license.attributes.name, // Assuming 'name' holds the label information
        value: parseInt(license.id),
        checked: this.state.licenseIds[index].includes(parseInt(license.id))
      }))
    });
    this.setState({ contentLicense: contentLicense })
  }
  getDiscountedPrice = () => {
    const token = localStorage.getItem('authToken')
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const httpBody:any = {
      "order_id": this.state.orderData.id,
      "coupon_code":this.state.appliedCoupon
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getDiscountedPriceApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getDiscountedPriceApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getCountryList = () => {
    const token = localStorage.getItem('authToken')
    const header = {
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCountryListApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.getCountryListApiId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getStateList = (countryName: any) => {
    const token = localStorage.getItem('authToken')
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const httpBody = {
      "country_name": countryName
    }
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getStateListApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    ); 

    this.getStateListApiId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  getContentFormat = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getContentFormatApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.getContentFormatApiId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getContentLicenseTypes = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getLicenseTypeApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.getContentLicenseTypeApiId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToAdvancedSearchPage = () => {
    this.props.navigation.navigate('AdvancedSearch')
  }

  handleChange = (target: any) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }


  isNumberNull(num: number) {
    // return num === null || num === NaN;
    return num === null;
  }

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  navigateToAddShoppingCartOrderItem = () => {
    this.props.navigation.navigate("AddShoppingCartOrderItem");
  };

  navigateToShoppingCartOrders = () => {
    this.props.navigation.navigate("ShoppingCartOrders");
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  setModal = (item: any) => {
    this.setState({
      id: item.post?.id,
      name: item.post?.name,
      description: item.post?.description,
      price: item.post?.price,
      currency: item.post?.currency,
      category_id: item.post?.category_id,
      created_at: item.post?.created_at,
      updated_at: item.post?.updated_at,
      account_id: item.post?.account_id,
      isVisible: !this.state.isVisible,
    });
  };

  getOrders = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const params = { filter_by: "scheduled" };

    this.getOrdersApiCallId = requestMessage.messageId;
    let urlParams = new URLSearchParams(params).toString();

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getOrdersApiEndPoint}?${urlParams}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getOrdersList = () => {
    const token = localStorage.getItem('authToken')
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrdersListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrdersListApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getCoupons = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCouponApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.getCouponApiCallId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  PostValidCoupon=(coupan_code: string,) => {
    this.setState({appliedCoupon:coupan_code})
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({coupon_code:coupan_code})
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postValidCouponCodeApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.postValidCouponCodeApiCallId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  showOrder = (order_id: any) => {
    this.setState({ isVisible: true });

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.showOrderApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrdersApiEndPoint + "/" + `${order_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  createOrderItem = (token: string) => {
    if (
      this.isNumberNull(this.state.catalogue_id) ||
      this.isNumberNull(this.state.quantity) ||
      this.isNumberNull(this.state.taxable_value)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const order_items = {
      catalogue_id: this.state.catalogue_id,
      quantity: this.state.quantity,
      taxable: this.state.taxable,
      taxable_value: this.state.taxable_value,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createOrderItemApiCallId = requestMessage.messageId;

    const httpBody = {
      order_items,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createOrderItemApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  deleteOrderItem = (order_id: any, order_item_id: any) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteOrderItemApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteOrderItemApiEndPoint +
        "/" +
        `${order_id}` +
        "/order_items/" +
        `${order_item_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  handleDeleteCartItem=(item:any)=>{
    this.setState({
      ModalData:item.id,
      showDeleteModal:true
    })
  }
  handleCloseItemDialog=()=>{
    this.setState({showDeleteModal:false})
  }
  handleRemoveCartConfirm=()=>{
    const token = localStorage.getItem('authToken')
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const httpBody = {
      order_item_id: this.state.ModalData
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteOrderItemApiCallIdWeb = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteOrderItemApiEndPointWeb
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  updateOrderItemFormat=(formatId: any, orderId: any)=>{
    const token = localStorage.getItem('authToken')
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const httpsBody = {
      "order_item": {
        "order_item_id": parseInt(orderId),
        "format_id": parseInt(formatId)
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateOrderItemFormatApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.updateApiPutMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    this.updateOrderItemFormatId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpsBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  updateOrderItemLicense=(licenseId: any, orderId: any)=>{
    const token = localStorage.getItem('authToken')
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const httpBody = {
      "order_item": {
        "order_item_id": parseInt(orderId),
        "license_type_id": licenseId,
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updateOrderItemFormatId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.updateApiPutMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateOrderItemFormatApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  handleImageFormats = (value:{
    label: string;
    value: any;
  }, orderId: any, identifier: any) => {
    this.setState((prevState) => ({
      selectedImageFormat: {
        ...prevState.selectedImageFormat,
        [identifier]: value,
      },
    }), () => {
      this.updateOrderItemFormat(value.value, orderId);
    });
  };
  handleVideoFormats = (value:{
    label: string;
    value: any;
  }, orderId:any, identifier: any) => {
    this.setState((prevState) => ({
      selectedVideoFormat: {
        ...prevState.selectedVideoFormat,
        [identifier]: value,
      },
    }), () => {
      this.updateOrderItemFormat(value.value, orderId);
    });
  };
  handleCountrySelection=(value:{
    label: string;
    value: any;
  }) => {
    this.setState({CountryValue: value }, () => {
      this.getStateList(value.value)
    });
  };
  handleLicenseChange = (value: { label: string; value: any; }, indexId: any) => {
    const { licenseIds, selectedNames, contentLicense } = this.state;
    const newValue = parseInt(value.value);
    const newLabel = value.label;
    // Update selectedNames
    const labelArray = selectedNames[indexId]?.label ? selectedNames[indexId].label.split(',') : [];
    const index = labelArray.indexOf(newLabel);

    if (index !== -1) {
        // Remove the label if it exists
        labelArray.splice(index, 1);
    } else {
        // Add the label only if it doesn't exist
        labelArray.push(newLabel);
    }
    const updatedLabel = labelArray.join(',');

    // Update licenseIds
    const updatedLicenseIds = [...licenseIds];
    updatedLicenseIds[indexId] = licenseIds[indexId]?.includes(newValue)
        ? licenseIds[indexId].filter((item: number) => item !== newValue)
        : [...licenseIds[indexId], newValue];

    // Update contentLicense
    const updatedContentLicense = [...contentLicense];
    updatedContentLicense[indexId] = updatedContentLicense[indexId]?.map((license: any) => {
        if (license.label === newLabel) {
            license.checked = !license.checked; // Toggle checked property
        }
        return license;
    });

    this.setState({
        licenseIds: updatedLicenseIds,
        selectedNames: { ...selectedNames, [indexId]: { label: updatedLabel } },
        contentLicense: updatedContentLicense
    });
};

  
  updateLicense = (orderId: any,indexId:any) => {
     if(this.state.licenseIds[indexId]?.length == 0){
      this.setState({
        showSnackbar: true,
        snackVariant: "error",
        couponResponseMessage: 'Licence type must be selected.'
      })
     }else{
       this.updateOrderItemLicense(this.state.licenseIds[indexId], orderId)
     }
  }
  handleAddPromoCode=()=>{
    if(!this.state.coupon_code){
      this.setState({
        couponError: 'Please enter coupon code!'
      })
    } else {
      this.setState({
        couponError: ''
      }, () => {
        this.PostValidCoupon(this.state.coupon_code);
      })
    }
  }
  handleSnackBarShow=()=>{
    this.setState({showSnackbar:true})
  }
  handleCloseSnackBar=()=>{
    this.setState({showSnackbar:false})
  }
  handleResponseError=(responseJson:any,apiRequestCallId:any)=>{
    switch (apiRequestCallId) {
      case this.getOrdersApiCallId:
        this.showAlert("Alert", "No Data", "");
        this.setState({ orderList: [] });
        break;
      case this.showOrderApiCallId:
        this.parseApiCatchErrorResponse(responseJson.errors);
        break;
      case this.createOrderItemApiCallId:
        this.parseApiCatchErrorResponse(responseJson.errors);
        break;
      default:
        break;
    }
  }

  // Customizable Area End
}
