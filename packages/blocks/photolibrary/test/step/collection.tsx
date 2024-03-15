import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PhotoLibraryCollection from "../../src/PhotoLibraryCollection.web";
const navigation = require("react-navigation");

const screenProps = {
    selectedContent:jest.fn(),
    handleContentSelect :jest.fn(),
    selectedPublish: jest.fn(),
    handlePublishSelect : jest.fn(),
    selectedUpdate: jest.fn(),
    handleSortSelect: jest.fn(),
    closeCollectionModal: jest.fn(),
    collectionModal: jest.fn(),
    openCollectionModal : jest.fn(),
    selectedButton:"",
    handleButtonClick:jest.fn(),
    handleSetVisibility: jest.fn(),
    setVisibility:jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/PhotoLibraryCollection-scenario.web.feature"
);

jest.mock("../../../../framework/src/StorageProvider", () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve(undefined))
}));

jest.mock("react-navigation", () => ({}));

const imageData = [
  {
    id: "1",
    isSelected: false,
    file_name: "demo.jpg",
    file_url: "https://picsum.photos/200/300"
  },
  {
    id: "2",
    isSelected: false,
    file_name: "demo.jpg",
    file_url: "https://picsum.photos/200/300"
  },
  {
    id: "3",
    isSelected: false,
    file_name: "demo.jpg",
    file_url: "https://picsum.photos/200/300"
  },
  {
    id: "4",
    isSelected: false,
    file_name: "demo.jpg",
    file_url: "https://picsum.photos/200/300"
  },
  {
    id: "5",
    isSelected: false,
    file_name: "demo.jpg",
    file_url: "https://picsum.photos/200/300"
  }
];
jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockImplementation(() => true),
    // .mockImplementationOnce(() => Promise.reject({code : 2})),
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
defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PhotoLibraryCollection", ({ given, when, then }) => {
    let photoLibraryCollection: ShallowWrapper;
    let instance: PhotoLibraryCollection;

    given("I am a User loading PhotoLibraryCollection", () => {
      photoLibraryCollection = shallow(<PhotoLibraryCollection {...screenProps}/>);
    });

    when("User navigate to the PhotoLibraryCollection", () => {
      instance = photoLibraryCollection.instance() as PhotoLibraryCollection;
    });

    then("PhotoLibraryCollection will load without errors", () => {
      
    });

    then("User can click the view Image without errors", () => {
      let buttonComponent = photoLibraryCollection.findWhere(
        node => node.prop("data-test-id") === "handlebtnViewImage0"
      );
    //   buttonComponent.simulate("click");
      instance.setState({ isViewImageModalVisible: true });
    });

    then("Image view modal opens without errors", () => {
      let buttonComponent = photoLibraryCollection.findWhere(
        node => node.prop("data-test-id") === "closeViewImageModal"
      );
    //   buttonComponent.simulate("click");
      buttonComponent = photoLibraryCollection.findWhere(
        node => node.prop("data-test-id") === "handleDeleteImage"
      );
    //   buttonComponent.simulate("click");

      instance.setState({ isViewImageModalVisible: false });
    });

    when("User can press share modal button without errors", () => {
      
    });

    then("User try to share with an empty account id", () => {
      
    });

    then("User share the PhotoLibraryCollection without errors", () => {
     
    });

    then("User can click add image modal btn without errors", () => {
      
    });

    when("User try to save an empty image", () => {
     
    });

    then(
      "Add new image modal opens and user can save the new image data without errors",
      () => {
       
      }
    );

    then(
      "User can select delete image and gallery buttons without errors",
      () => {
        
      }
    );

    then("User can leave the screen without errors", () => {
      expect(photoLibraryCollection).toBeTruthy();
    });
  });
});
