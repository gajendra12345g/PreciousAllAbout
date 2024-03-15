import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React from 'react';
export const images= require("./assets")
import { getStorageData, setStorageData,removeStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  isSubmitEnabled: boolean;
  selectedContents:any;
  goToPortfolioScreen: string;
  inValidContent: boolean;
  files: any,
  progress: any,
  success: any,
  showProcesssing: boolean,
  uploadTime:any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
  public inputRef: any;
    // Customizable Area End
      getProductApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
    // Customizable Area Start
      arrayHolder: [],
      token: "",
      isSubmitEnabled: false,
      selectedContents:[],
      goToPortfolioScreen:"",
      inValidContent: false,
      files: [],
      progress: {},
      success: {},
      showProcesssing: false,
      uploadTime: {}
    // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.inputRef = React.createRef();
    // Customizable Area End
  }

  async componentDidMount() {
  // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getListRequest = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token,
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

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      // let token = localStorage.getItem('authToken');
      this.setState({ token: token });
      this.getListRequest(token);
    }
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    if(apiRequestCallId != null){
      if(apiRequestCallId === this.sentContentApi){
        this.setState({ goToPortfolioScreen: "true" }, () => {
          this.goToPortfolio();
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  isVideoFile = (file: File) => {
    return file.type.startsWith('video/');
  };

  isValidImageFormat = (file: File) => {
    return /\.(pg|jpeg|png|gif|bmp|eps|jpg)$/i.test(file.name);
  };

  isValidVideoFormat = (file: File) => {
    return /\.(avi|mp4|mkv|mov|wmv|flv|webm|ogg)$/i.test(file.name);
  };

  handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    this.handleFiles(files);
  };

  handleFiles = (files: FileList) => {
    const fileList = Array.from(files);
    for (const file of fileList) {
      let mediaType: 'image' | 'video' | null = null;
  
      if (this.isImageFile(file) && this.isValidImageFormat(file)) {
        mediaType = 'image';
      } else if (this.isVideoFile(file) && this.isValidVideoFormat(file)) {
        mediaType = 'video';
      }
  
      if (mediaType) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const mediaData = {
            file,
            contentName: file.name,
            dataUrl: e.target?.result as string,
            type: mediaType,
          };
  
          this.handleFileChange([...this.state.files, mediaData]);
          this.setState({isSubmitEnabled: true})
        };
  
        reader.readAsDataURL(file);
      }
    }
  };

  handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  handleUploadClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  };

  handleFileInputChange = (event: any) => {
    const selectedFiles: any = Array.from(event.files);
    this.handleFiles(selectedFiles);
  };

  handleRemoveMedia = (index: any) => {
    this.setState((prevState) => ({
      files: prevState.files.filter((_:any, i:any) => i !== index),
      isSubmitEnabled: prevState.files.length > 1
    }));
  };
  goToPortfolioPage = () =>{
    this.setState({ goToPortfolioScreen: "false" }, () => {
      this.goToPortfolio();
    });
  }
  goToPortfolio = () =>{
    const goToPortfolioCatalogue: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationTargetMessage), "CataloguePortfolio");
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationPropsMessage),this.props);
    this.send(goToPortfolioCatalogue);
   setStorageData("showUploadedData", this.state.goToPortfolioScreen ) 
  }
   isValidMimeType = (item:any) => {
    const allowedExtensions = ['.jpg','.mp4', '.mov', '.eps'];
  const fileExtension = item.contentName.toLowerCase().split('.').pop();
  return allowedExtensions.includes(`.${fileExtension}`);
  }
  sendContentCall = () =>{
    const isValidArray = this.state.files.every(this.isValidMimeType);
if (isValidArray) {
  this.setState({showProcesssing : true})
  this.handleUpload()
} else {
 this.setState({inValidContent: true})
}

  }
  sentContentApi:string = "";
  sendContent = async () => {
    const storeUploadedCntent:any = []
    for (const item of this.state.files) {
      storeUploadedCntent.push(item.file);
    }
    const token = await getStorageData("authContributorToken");
    const header = {
      token: token,
    };
      let formdata = new FormData();
      for (const content of storeUploadedCntent) {
        formdata.append("images[]", content);
      }      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.sentContentApi = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.uploadContentEndPoint
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formdata
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
       configJSON.postMethod
      );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
      return this.sentContentApi;
  }
  cancelBtn=()=>{
    this.setState({files:[]})
  }
  handleInValidContent = () =>{
    this.setState({inValidContent:false})
  }
  handleFileChange = (selectedFiles: any) => {
    const initialProgress = Object.fromEntries(selectedFiles.map((file: any) => [file.name, 0]));
    const initialSuccess = Object.fromEntries(selectedFiles.map((file: any) => [file.name, false]));
    const initialUploadTime = Object.fromEntries(selectedFiles.map((file :any) => [file.name, 0]));
this.setState({files : selectedFiles, progress:initialProgress, success: initialSuccess, uploadTime: initialUploadTime})
  };

  handleUpload = async () => {
    for (const file of this.state.files) {
      await this.uploadFile(file);
    }
   this.sendContent()
  };
  getRandomBoolean = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomNumber = array[0] / (0xFFFFFFFF + 1);
  
    return randomNumber < 0.8;
  };
  uploadFile = async (file: any) => {
    return new Promise<void>((resolve) => {
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = this.state.progress[file.name] + 20;
        this.setState((prevState) => ({
          uploadTime: {
            ...prevState.uploadTime,
            [file.name]: elapsedTime,
          },
          progress: {
            ...prevState.progress,
            [file.name]: newProgress <= 100 ? newProgress : 100,
          },
        }));

        if (this.state.progress[file.name] >= 100) {
          clearInterval(interval);
          const isSuccess = this.getRandomBoolean();
          this.setState((prevState) => ({
            success: {
              ...prevState.success,
              [file.name]: isSuccess ? 'success' : 'failure',
            },
          }));

          resolve();
        }
      }, 500);
    });
  };
  closeUploadingContent = () => {
    this.setState({showProcesssing: false})
  }
  handleSelect = async (selectedItem: any) => {
    if (selectedItem.value === 'lg') {
     await removeStorageData('authContributorToken');
     await removeStorageData('contributorName');
     const goToLandingPage: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToLandingPage.addData(getName(MessageEnum.NavigationTargetMessage), "Contributor");
    goToLandingPage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToLandingPage);
    } 
  };
  goToLanding = () => {
    const goToPortfolioCatalogue: Message = new Message(getName(MessageEnum.NavigationMessage));
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationTargetMessage), "LadingPageAfterLoginContributor");
    goToPortfolioCatalogue.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(goToPortfolioCatalogue);
  }
  // Customizable Area End
}
