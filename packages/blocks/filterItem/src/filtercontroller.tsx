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
  checkboxes?:any;
  handleCheckboxChange?:any
  // Customizable Area End
}

// Customizable Area Start
export interface AllBrands {
  id: string;
  name?: string;
  type?: string;
  attributes: Brand;
  checked?: boolean;
}

export interface Brand {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  currency?: string;
  checked?: boolean;
}

export interface SubCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  parent_id: string | number | null;
  rank: string | number | null;
}

export interface Reviews {
  id: number;
  catalogue_id: number;
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface CatalogueVariants {
  id: string;
  type: string | null;
  attributes: {
    id: number;
    catalogue_id: number | null;
    catalogue_variant_color_id: number | null;
    catalogue_variant_size_id: number | null;
    price: string;
    stock_qty: string | number | null;
    on_sale: boolean | null;
    sale_price: string | number | null;
    discount_price: string | number | null;
    length: string | number | null;
    breadth: string | number | null;
    height: string | number | null;
    created_at: string;
    updated_at: string;
    images: string[] | null;
  };
}

export interface AllCategory {
  id: string;
  type: string | null;
  checked?: boolean;
  attributes: {
    sub_category?: SubCategory | SubCategory[] | null;
    brand?: Brand | Brand[] | null;
    tags?: string[] | null;
    reviews?: Reviews[] | null;
    name: string | null;
    sku?: string | null;
    description?: string | null;
    manufacture_date?: string | null;
    length?: number | null;
    breadth?: number | null;
    height?: number | null;
    stock_qty?: number | null;
    availability?: string | null;
    weight?: string | null;
    price?: number | number[] | null;
    images?:
      | {
          url: string;
        }[]
      | null;
    recommended?: boolean | null;
    on_sale?: boolean | null;
    sale_price?: string | number | null;
    discount?: string | number | null;
    category: Category;
    average_rating?: number | null;
    catalogue_variants?: CatalogueVariants[] | null;
  };
}

export interface Category {
  id: string;
  type: string | null;
  name?: string | null;
  attributes: {
    id?: number;
    name: string | null;
    dark_icon?: string | null;
    dark_icon_active?: string | null;
    dark_icon_inactive?: string | null;
    light_icon?: string | null;
    light_icon_active?: string | null;
    light_icon_inactive?: string | null;
    rank?: number | string | null;
    created_at?: string | null;
    updated_at?: string | null;
    selected_sub_categories?: [] | string | null;
  };
}
// Customizable Area End

interface S {
  // Customizable Area Start
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  outOfStock: boolean;
  pricerange: boolean;
  brand: boolean;
  category: boolean;
  tag: boolean;
  checkedStock: boolean;
  checkedDiscounted: boolean;
  rangeLow: string | null;
  rangeHigh: string | null;
  value: number;
  token: string;
  data: AllCategory[];
  checkedCategory: boolean;
  checkedTag: boolean;
  GetAllBrand: AllBrands[];
  BrandList: AllBrands[];
  selectedItems: AllBrands[];
  selectedCategory: AllCategory[];
  scrollEnabled: boolean;
  minValue: number;
  maxValue: number;
  priceMin: number;
  priceMax: number;
  arrayHolder: AllCategory[];
  categoryArray: AllCategory[];
  filterData: [];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FilteroptionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProductApiCallId: string = "";
  getBrandApiCallId: string = "";
  applyAllApiCallId: string = "";
  getFiltersApiCallID: any;

  minimumValue =
    this.props.navigation?.state?.params && this.props.navigation?.state?.params?.min
      ? this.props.navigation?.state?.params?.min
      : 0;
  maximumValue =
    this.props.navigation?.state?.params && this.props.navigation?.state?.params?.max
      ? this.props.navigation?.state?.params?.max
      : 100;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      outOfStock: false,
      pricerange: true,
      brand: false,
      category: false,
      tag: false,
      checkedStock: false,
      checkedDiscounted: false,
      rangeLow: "",
      rangeHigh: "",
      value: 10,
      token: "",
      data: [],
      checkedCategory: false,
      checkedTag: false,
      GetAllBrand: [],
      BrandList: [],
      selectedItems: [],
      selectedCategory: [],
      scrollEnabled: false,
      minValue: 10,
      maxValue: 200,
      priceMin: 0,
      priceMax: 0,
      arrayHolder: [],
      categoryArray: [],
      filterData: []
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  openFilter(value: string) {
    if (value === "stock") {
      this.setState({
        tag: false,
        outOfStock: true,
        pricerange: false,
        brand: false,
        category: false
      });
    }
    if (value === "pricerange") {
      this.setState({
        tag: false,
        outOfStock: false,
        pricerange: true,
        brand: false,
        category: false
      });
    }
    if (value === "brand") {
      this.setState({
        tag: false,
        outOfStock: false,
        pricerange: false,
        brand: true,
        category: false
      });
    }
    if (value === "category") {
      this.setState({
        tag: false,
        outOfStock: false,
        pricerange: false,
        brand: false,
        category: true
      });
    }
    if (value === "tags") {
      this.setState({
        tag: true,
        outOfStock: false,
        pricerange: false,
        brand: false,
        category: false
      });
    }
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
    this.getFilters();
    if (!this.isPlatformWeb()) {
      let params = this.props.navigation.state.params;
      const nextMinValue = params && params.min ? params.min : 0;
      const nextMaxValue = params && params.max ? params.max : 100;
      if (
        params.priceSelectedMin != undefined &&
        params.priceSelectedMax != undefined
      ) {
        this.setState({
          minValue: params.priceSelectedMin,
          maxValue: params.priceSelectedMax
        });
      } else {
        this.setState({
          minValue: nextMinValue,
          maxValue: nextMaxValue
        });
      }
    }
    // Customizable Area End
  }

  getToken = () => {
    const messageValue: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(messageValue);
  };
  getListRequest = (token: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getBrandList = (token: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getBrandApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.brandAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  applyAllfilters = () => {
    let urlValue = configJSON.cataloguesAPiEndPoint;
    const priceMin = this.state.priceMin;
    const priceMax = this.state.priceMax;
    let brandSingle = "q[brand_id][]=";
    let brandMulti = "&q[brand_id][]=";
    let priceValue =
      "q[price][from]=" + `${priceMin}` + "&q[price][to]=" + `${priceMax}`;
    let categorySingle = "q[category_id][]=";
    let categoryMulti = "&q[category_id][]=";
    let brands: AllBrands[] = [];
    let price = priceMin !== 0 && priceMax !== 0;
    if (this.state.selectedItems.length > 0) {
      let selectedItems = this.state.selectedItems;
      brands = selectedItems;
    }
    let CategoryValue: AllCategory[] = [];
    if (this.state.selectedCategory.length > 0) {
      let selectedCategory = this.state.selectedCategory;
      CategoryValue = selectedCategory;
    }
    if (brands && !CategoryValue.length && !price) {
      for (let brandIndex = 0; brandIndex < brands.length; brandIndex++) {
        if (brandIndex === 0) {
          urlValue = urlValue + brandSingle + brands[brandIndex].id;
        } else {
          urlValue = urlValue + brandMulti + brands[brandIndex].id;
        }
      }
    } else if (price && !brands.length && !CategoryValue) {
      urlValue = urlValue + priceValue;
    } else if (CategoryValue && !brands.length && !price) {
      for (
        let categoryIndex = 0;
        categoryIndex < CategoryValue.length;
        categoryIndex++
      ) {
        if (categoryIndex === 0) {
          urlValue =
            urlValue + categorySingle + CategoryValue[categoryIndex].id;
        } else {
          urlValue = urlValue + categoryMulti + CategoryValue[categoryIndex].id;
        }
      }
    } else if (brands && price && !CategoryValue.length) {
      let brandIndex = 0;
      let brandSelect = "";
      for (brandIndex = 0; brandIndex < brands.length; brandIndex++) {
        if (brands.length === 1) {
          brandSelect = brandSingle + brands[brandIndex].id;
        } else {
          brandSelect = brandMulti + brands[brandIndex].id;
        }
        urlValue = urlValue + brandSelect;
      }
      urlValue = urlValue + "&" + priceValue;
    } else if (CategoryValue && price && !brands.length) {
      let categoryIndex = 0;
      let catSelect = "";
      for (
        categoryIndex = 0;
        categoryIndex < CategoryValue.length;
        categoryIndex++
      ) {
        if (CategoryValue.length === 1) {
          catSelect = categorySingle + CategoryValue[categoryIndex].id;
        } else {
          catSelect = categoryMulti + CategoryValue[categoryIndex].id;
        }
        urlValue = urlValue + catSelect;
      }
      urlValue = urlValue + "&" + priceValue;
    } else if (CategoryValue && brands && !price) {
      let brandIndex = 0;
      let categoryIndex = 0;
      let brandSelect = "";
      let catSelect = "";
      for (brandIndex = 0; brandIndex < brands.length; brandIndex++) {
        if (brands.length === 1) {
          brandSelect = brandSingle + brands[brandIndex].id;
        } else {
          brandSelect = brandMulti + brands[brandIndex].id;
        }
        urlValue = urlValue + brandSelect;
      }
      for (
        categoryIndex = 0;
        categoryIndex < CategoryValue.length;
        categoryIndex++
      ) {
        if (CategoryValue.length === 1) {
          catSelect = categorySingle + CategoryValue[categoryIndex].id;
        } else {
          catSelect = categoryMulti + CategoryValue[categoryIndex].id;
        }
        urlValue = urlValue + catSelect;
      }
    } else if (CategoryValue && brands && price) {
      let brandIndex = 0;
      let categoryIndex = 0;
      let brandSelect = "";
      let catSelect = "";
      for (brandIndex = 0; brandIndex < brands.length; brandIndex++) {
        if (brands.length === 1) {
          brandSelect = brandSingle + brands[brandIndex].id + "&";
        } else {
          brandSelect = brandMulti + brands[brandIndex].id;
        }
        urlValue = urlValue + brandSelect;
      }
      for (categoryIndex = 0; categoryIndex < CategoryValue.length; categoryIndex++) {
        if (CategoryValue.length === 1) {
          catSelect = categorySingle + CategoryValue[categoryIndex].id;
        } else {
          catSelect = categoryMulti + CategoryValue[categoryIndex].id;
        }
        urlValue = urlValue + catSelect;
      }
      urlValue = urlValue + "&" + priceValue;
    } else {
      this.props.navigation.goBack();
    }
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.applyAllApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      urlValue
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(apiRequestCallId === this.applyAllApiCallId){
        this.setResForAll(responseJson, errorReponse);
      }
      if(apiRequestCallId === this.getBrandApiCallId){
        this.setResForBrand(responseJson, errorReponse);
      }
      if(apiRequestCallId === this.getProductApiCallId){
        this.setResForProduct(responseJson, errorReponse);
      }
      if(apiRequestCallId === this.getFiltersApiCallID){
        this.setResForFilters(responseJson, errorReponse)
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  setResForAll = (responseJson: any, errorReponse: any) => {
    if (responseJson && !responseJson.errors && responseJson.data) {
      this.setState({
        data: responseJson.data
      });
      if (this.state.data.length > 0) {
        this.props.navigation.push("Filteritems", { data: this.state.data });
      } else {
        this.showAlert("Error", "Data not found!!!");
      }
    } else {
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  setResForBrand = (responseJson: any, errorReponse: any) => {
    if (responseJson && !responseJson.errors && responseJson.data) {
      this.setState({
        GetAllBrand: responseJson.data,
        BrandList: responseJson.data
      });
    } else {
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  setResForProduct = (responseJson: any, errorReponse: any) => {
    if (responseJson && !responseJson.errors && responseJson.data) {
      this.setState({
        arrayHolder: responseJson.data,
        categoryArray: responseJson.data
      });
    } else {
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  setResForFilters = (responseJson: any, errorReponse: any) => {
    if (responseJson && !responseJson.errors && responseJson.data) {
      this.setState({
        filterData: responseJson.data,
      });
    } else {
      this.parseApiCatchErrorResponse(errorReponse);
    }
  }

  getFilters = () => {
    const header = {
        "Content-Type": configJSON.validationApiContentType
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getFiltersApiCallID = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getFiltersApiEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypeGet
      );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  onCheckBrand = (item: AllBrands, itemIndex: number) => {
    let items: AllBrands[] = [];
    items = this.state.GetAllBrand;
    items[itemIndex].checked = items[itemIndex].checked ? !items[itemIndex].checked : true;
    if (items) {
      items.forEach(itemI => {
        if (item.id === itemI.id) {
          if (itemI.checked) {
            this.state.selectedItems.push(itemI);
          } else {
            this.setState({ selectedItems: [] });
          }
        }
      });
    }

    this.setState({ GetAllBrand: items });
  };

  onCheckCategory = (item: AllCategory, itemIndex: number) => {
    let items = [];
    items = this.state.arrayHolder;
    items[itemIndex].checked = items[itemIndex].checked ? !items[itemIndex].checked : true;
    if (items) {
      items.forEach(itemI => {
        if (item.id === itemI.id) {
          if (itemI.checked) {
            this.state.selectedCategory.push(itemI);
          } else {
            this.setState({ selectedCategory: [] });
          }
        }
      });
    }

    this.setState({ data: items });
  };

  searchFilterFunction = (text: string) => {
    if (this.state.brand) {
      if (text === "") {
        this.setState({ GetAllBrand: this.state.BrandList });
      } else {
        let Name = this.state.BrandList;
        const textData = Name.filter(item =>
          item.attributes.name
            .toLocaleLowerCase()
            .startsWith(text.toLowerCase())
        );
        this.setState({ GetAllBrand: textData });
      }
    } else if (this.state.category) {
      if (text === "") {
        this.setState({ arrayHolder: this.state.categoryArray });
      } else {
        let Name = this.state.categoryArray;
        const textData = Name.filter(item =>
          (
            item.attributes.category.name ||
            item.attributes.category.attributes.name
          )
            ?.toLocaleLowerCase()
            .startsWith(text.toLowerCase())
        );
        this.setState({ arrayHolder: textData });
      }
    }
  };

  numberValuesChange = (value: number[]) => {
    this.setState({
      priceMin: value[0],
      priceMax: value[1]
    });
  };

  valueChangeFinish = () => {
    this.setState({
      minValue: this.state.priceMin,
      maxValue: this.state.priceMax
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
