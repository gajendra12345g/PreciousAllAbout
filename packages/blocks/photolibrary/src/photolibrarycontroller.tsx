import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Image, ImageListType, SelectedImage } from "./types";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  isAddImageModalVisible: boolean;
  isViewImageModalVisible: boolean;
  isVisibleDeleteCheckbox: boolean;
  isShareModalVisible: boolean;
  imageData: ImageListType[];
  selectedImage: SelectedImage;
  viewSelectedImage: SelectedImage;
  selectedImageId: string | undefined;
  addImageError: boolean;
  photoLibraryId: string;
  inputAccountId: string;
  inputAccountIdError: boolean;
  selectedContent: any;
  selectedPublish: any;
  selectedUpdate:any;
  collectionModal:boolean,
  selectedButton: string,
  setVisibility:any,
  assetsModal:boolean
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class PhotoLibraryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPhotoLibraryApiCallId = "";
  addImageToPhotoLibraryApiCallId = "";
  deletePhotoLibraryApiCallId = "";
  sharePhotoLibraryApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      isAddImageModalVisible: false,
      isViewImageModalVisible: false,
      isVisibleDeleteCheckbox: false,
      isShareModalVisible: false,
      selectedImage: { uri: "" },
      viewSelectedImage: { uri: "" },
      selectedImageId: "",
      addImageError: false,
      imageData: [],
      photoLibraryId: "",
      inputAccountId: "",
      inputAccountIdError: false,
      selectedContent: configJSON.contentType[0],
      selectedPublish: configJSON.publishType[0],
      selectedUpdate: configJSON.sortType[0],
      collectionModal:false,
      selectedButton: "image",
      setVisibility: "",
      assetsModal:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token });
        this.getPhotoLibrary(token);
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPhotoLibraryApiCallId != null &&
      this.getPhotoLibraryApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson && responseJson.data) {
        let newPhotoArr = [];
        newPhotoArr = responseJson.data.attributes.photos.map(
          (imgData: ImageListType, index: number) => {
            return {
              ...imgData,
              id: (index + 1).toString(),
              isSelected: false,
            };
          }
        );
        this.setState({
          imageData: newPhotoArr,
          photoLibraryId: responseJson.data.id,
        });
      } else if (responseJson && responseJson.errors) {
        this.showAlert("Alert", "Something went wrong.");
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.addImageToPhotoLibraryApiCallId != null &&
      this.addImageToPhotoLibraryApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson && responseJson.data) {
        alert("Image added successfully");
        this.getPhotoLibrary(this.state.token);
      } else if (responseJson && responseJson.errors) {
        this.showAlert("Alert", "Something went wrong.");
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deletePhotoLibraryApiCallId != null &&
      this.deletePhotoLibraryApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.message) {
        alert(responseJson.message);
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.sharePhotoLibraryApiCallId != null &&
      this.sharePhotoLibraryApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.message) {
        this.setState({ isShareModalVisible: false });
        alert(responseJson.message);
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.getPhotoLibrary(this.state.token);
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handlebtnAddImage = () => {
    this.setState({
      selectedImage: { uri: "" },
      isAddImageModalVisible: true,
      addImageError: false
    });
  };

  handlebtnViewImage = (item: ImageListType) => {
    this.setState({
      selectedImageId: item.id,
      viewSelectedImage: { uri: item.file_url },
      isViewImageModalVisible: true
    });
  };

  handleAnputAccountID = (accountId: string) => {
    this.setState({ inputAccountId: accountId, inputAccountIdError: false });
  };

  closeViewImageModal = () => {
    this.setState({ isViewImageModalVisible: false });
  };

  closeShareModal = () => {
    this.setState({ isShareModalVisible: false });
  };

  openShareModal = () => {
    this.setState({
      isShareModalVisible: true,
      inputAccountIdError: false,
      inputAccountId: "",
    });
  };

  closeAddImageModal = () => {
    this.setState({ isAddImageModalVisible: false });
  };

  handleDeleteGallery = () => {
    this.setState({ imageData: [] });
    this.deletePhotoLibrary(this.state.photoLibraryId);
  };

  toggleDeleteMultipleImages = () => {
    this.setState({
      isVisibleDeleteCheckbox: !this.state.isVisibleDeleteCheckbox
    });
  };

  deleteSelectedImages = () => {
    this.setState({
      imageData: this.state.imageData.filter(
        (image: ImageListType) => !image.isSelected
      ),
      isVisibleDeleteCheckbox: false
    });
  };

  handleDeleteImage = () => {
    this.setState({
      imageData: this.state.imageData.filter(
        (image: ImageListType) => image.id !== this.state.selectedImageId
      ),
      isViewImageModalVisible: false
    });
  };

  toggleImageChecked = (imageData: ImageListType) => {
    let newData = this.state.imageData.map((account: ImageListType) => {
      if (account.id === imageData.id) {
        return { ...account, isSelected: !account.isSelected };
      }
      return account;
    });
    this.setState({ imageData: newData });
  };

  openImagePicker = async (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (this.isPlatformWeb()) {
      if (event && event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          this.setState({
            selectedImage: { uri: reader.result?.toString() || "" },
            addImageError: false,
          })
        );
        reader.readAsDataURL(event.target.files[0]);
      }
      return;
    }
  };

  isStringNullOrBlank = (str: string) => {
    return str === null || str.length === 0;
  };

  handleAddnewImage = async () => {
    const ImagePicker = require("react-native-image-crop-picker");
    const imageData: Image = await ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      includeExif: true
    });

    const source = { uri: `data:${imageData.mime};base64,` + imageData.data };
    this.setState({
      selectedImage: source,
      addImageError: false
    });
  };

  handleSaveImage = () => {
    if (this.state.selectedImage.uri !== "") {
      const data = this.state.imageData;
      let imgObj = {
        id: (data.length + 3).toString(),
        isSelected: false,
        file_name: "abc",
        file_url: this.state.selectedImage.uri
      };
      data.push(imgObj);
      this.setState({
        imageData: data,
        isAddImageModalVisible: false,
        addImageError: false
      });
    } else {
      this.setState({ addImageError: true });
    }
    this.addImageToPhotoLibrary("")
  };

  getPhotoLibrary = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPhotoLibraryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.photoLibraryApiEndpoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  addImageToPhotoLibrary = (token: string) => {
    if (this.state.selectedImage.uri === "") {
      this.setState({ addImageError: true });
    }
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addImageToPhotoLibraryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.photoLibraryApiEndpoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  deletePhotoLibrary = (galleryId: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deletePhotoLibraryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.photoLibraryApiEndpoint + "/" + `${galleryId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  sharePhotoLibrary = () => {
    if (this.isStringNullOrBlank(this.state.inputAccountId)) {
      this.setState({ inputAccountIdError: true });
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.sharePhotoLibraryApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.postApiMethod
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.photoLibraryApiEndpoint +
          "/" +
          `${this.state.photoLibraryId}` +
          "/share"
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };
  handleContentSelect = (option: {
    value: string | number;
    label: string;
  }) => {
    this.setState({ selectedContent :option });
  };
  handlePublishSelect = (option: {
    value: string | number;
    label: string;
  }) => {
    this.setState({ selectedPublish :option });
  };
  handleSortSelect = (option: {
    value: string | number;
    label: string;
  }) => {
    this.setState({ selectedUpdate :option });
  };
  openCollectionModal = () =>{
    this.setState({collectionModal: true})
  }
  closeCollectionModal = () =>{
this.setState({collectionModal:false})
  }
  handleButtonClick = (buttonType: string) => {
    this.setState({ selectedButton: buttonType });
  };
  handleSetVisibility = (event:any) => {
    this.setState({setVisibility: event.target.value})
  }
  openAssestModal = () => {
    this.setState({assetsModal: true})
  }
  closeAssetsModal = () => {
    this.setState({assetsModal: false})
  }
  // Customizable Area End
}
