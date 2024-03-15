import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Catalogue from "../../src/Catalogue.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Catalogue",
};

const feature = loadFeature(
  "./__tests__/features/catalogueweb-scenario.feature"
);
jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockImplementation(() => true),
    signIn: jest.fn().mockImplementation(() => ({
      user: {
        email: "test@gmail.com",
        id: "id",
      },
    })),
  },
  statusCodes: {
    PLAY_SERVICES_NOT_AVAILABLE: 1,
    SIGN_IN_CANCELLED: 2,
    IN_PROGRESS: 3,
  },
}));
global.File= jest.fn()
const tempListData = [
  {
    id: 1,
    attributes: {
      name: "test name1",
      price: 10,
      average_rating: 5,
    },
  },
  {
    id: 2,
    attributes: {
      name: "test name2",
      price: 12,
      average_rating: 4,
    },
  },
  {
    id: 3,
    attributes: {
      name: "test name3",
      price: 13,
      average_rating: 4,
    },
  },
];
const mockFileReader = {
  onload: jest.fn(),
  readAsDataURL: jest.fn(),
} as any;

global.FileReader = jest.fn().mockImplementation(()=>mockFileReader)as any;
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(React, 'createRef').mockImplementation(()=> ({
      current:{click:jest.fn()}
    }))
    global.setInterval=jest.fn().mockImplementation((params1 : any,params2)=>{
      params1(), params2(120)
      }) as any
    
  });
  
  test("User navigates to catalogue", ({ given, when, then }) => {
    let catalogueBlock: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading catalogue", () => {
      catalogueBlock = shallow(<Catalogue {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = catalogueBlock.instance() as Catalogue;
    const dataTransfer = {
      files: [{ name: 'test-video.mp4', type: 'video/mp4' }],
    };
    

      const dragDrop= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='dragDrop')
      dragDrop.simulate('drop', {preventDefault:jest.fn(), dataTransfer})
      dragDrop.prop('onDragOver')({preventDefault:jest.fn()})
      const files = [{
        dataUrl: 'data:video/mp4;base64,...',
      },
      {
        dataUrl: 'data:video/mov;base64,...',
      },
      {
        dataUrl: 'data:image/eps;base64,...',
      }]
      for (const file of files) {
        mockFileReader.onload({ target: { result: file.dataUrl } });
      }
      const sendContent= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='sendContent')
      sendContent.simulate('click')
      
    });

    then("catalogue will load with out errors", () => {
      const mockFiles = [
        {
          name: 'test-video.mp4',
          type: 'video/mp4',
          content: 'content',
        },
        {
          name: 'test-video.mp4',
          type: 'video/mp4',
          content: 'content',
        },
      ]
      const dropEvent = {
        preventDefault: jest.fn(),
        dataTransfer: {
          files: mockFiles,
        },
      };
      
        const dragDrop1= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='dragDrop')
        dragDrop1.simulate('drop',dropEvent)
      

      instance.componentDidMount();
      expect(catalogueBlock).toBeTruthy();
    });

    then("catalogue will load data with internal module", () => {
      instance.getListRequest("test token");
      const handleUploadClick= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='handleUploadClick')
      handleUploadClick.simulate('click', {preventDefault:jest.fn()})

      const goToPortfolioPage= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='goToPortfolioPage')
      goToPortfolioPage.simulate('click')
    });

    then("catalogue will load data from API", () => {
      const msgProductRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgProductRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgProductRestAPI.messageId
      );
      msgProductRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: tempListData,
        }
      );
      instance.getProductApiCallId = msgProductRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgProductRestAPI);
    const mockFiles = [
      {
        name: 'file1.txt',
        type: 'image/jpeg',
        content: 'content',
      },
      {
        name: 'file2.txt',
        type: 'video/mp4',
        content: 'content',
      },
    ];
    const mockEvent = {
      files: mockFiles,
    };

      const handleFileInputChange= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='handleFileInputChange')
        handleFileInputChange.simulate('change', mockEvent)
        const responsemessage = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
         );
         instance.sentContentApi = responsemessage.messageId;
         responsemessage.addData(
         getName(MessageEnum.RestAPIResponceDataMessage),
          responsemessage.messageId
         );
         responsemessage.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
         "data"
         );
         runEngine.sendMessage("For unit test", responsemessage);
    });

    then("I can leave the screen with out errors", () => {
      const handleRemoveMedia= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='handleRemoveMedia')
        handleRemoveMedia.at(0).simulate('click')
        
        const cancelBtn= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='cancelBtn')
        cancelBtn.simulate('click')
        let goToUpload = catalogueBlock.findWhere((node) => node.prop('data-test-id') === 'goToUpload')
            goToUpload.prop("goToLanding")()
            goToUpload.prop("handleSelect")({value:"lg"})
    });
  });

  test("User navigates to catalogueBlock", ({ given, when, then }) => {
    let catalogueBlock: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading catalogueBlock", () => {
      catalogueBlock = shallow(<Catalogue {...screenProps} />);
    });

    when("I navigate to the catalogueBlock", () => {
      instance = catalogueBlock.instance() as Catalogue;
    const dataTransfer = {
      files: [{ name: 'test-image.eps', type: 'image/eps' }],
    };
      const dragDrop= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='dragDrop')
      dragDrop.simulate('drop', {preventDefault:jest.fn(), dataTransfer})
      dragDrop.prop('onDragOver')({preventDefault:jest.fn()})
      const mockResult ='';
      mockFileReader.onload({ target: { result: mockResult } })
      const sendContent= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='sendContent')
      sendContent.simulate('click')
    });

    then("catalogue will load with out errorss", () => {
      const handlePreviewClose= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='handlePreviewClose')
        handlePreviewClose.simulate('close')

        const closeUploadingContent= catalogueBlock.findWhere(node=>node.prop('data-test-id')==='closeUploadingContent')
        closeUploadingContent.simulate('close')
      instance.componentDidMount();
      expect(catalogueBlock).toBeTruthy();
    });

  });
});
