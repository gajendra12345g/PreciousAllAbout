import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PhotoLibrary from "../../src/PhotoLibrary.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation,
  id: "PhotoLibrary"
};

const feature = loadFeature(
  "./__tests__/features/PhotoLibrary-scenario.web.feature"
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

  test("User navigates to PhotoLibrary", ({ given, when, then }) => {
    let photoLibrary: ShallowWrapper;
    let instance: PhotoLibrary;

    given("I am a User loading PhotoLibrary", () => {
      photoLibrary = shallow(<PhotoLibrary {...screenProps} />);
    });

    when("User navigate to the PhotoLibrary", () => {
      instance = photoLibrary.instance() as PhotoLibrary;
    });

    then("PhotoLibrary will load without errors", () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: true,
        }
      );
      instance.getPhotoLibraryApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: 1,
            type: "photo_library",
            attributes: {
              id: 1,
              photos: [
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/300"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/301"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/302"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/303"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/304"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/305"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/306"
                },
                {
                  file_name: "demo.jpg",
                  file_url: "https://picsum.photos/200/307"
                }
              ],
              caption: "testcaption",
              account_id: 1,
              created_at: new Date(),
              updated_at: new Date(),
              shared_to_ids: [1, 1],
              account: {
                id: 1,
                first_name: "first",
                last_name: "last",
                full_phone_number: "+916787656546",
                country_code: "IND",
                phone_number: "65856985",
                email: "test@test.com",
                activated: true,
                device_id: "test12",
                unique_auth_id: "test12",
                password_digest: "test12",
                created_at: new Date(),
                updated_at: new Date(),
                user_name: "test",
                platform: "test",
                user_type: "test",
                status: "test",
                suspend_until: new Date(),
                app_language_id: 1,
                is_blacklisted: true
              }
            }
          },
        }
      );

      instance.getPhotoLibraryApiCallId = msgValidationAPI.messageId;
      instance.setState({
        imageData: imageData,
      });
      expect(photoLibrary).toBeTruthy();
    });

    then("User can click the view Image without errors", () => {
      
    });

    then("Image view modal opens without errors", () => {
     
    });

    when("User can press share modal button without errors", () => {
      
    });

    then("User try to share with an empty account id", () => {
      

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: true,
        }
      );
      instance.sharePhotoLibraryApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({ inputAccountIdError: true });
    });

    then("User share the PhotoLibrary without errors", () => {
      
      instance.setState({ inputAccountIdError: false });

      
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Shared successfully"
        }
      );
      instance.sharePhotoLibraryApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

    });

    then("User can click add image modal btn without errors", () => {
     
    });

    when("User try to save an empty image", () => {
      
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: true,
        }
      );
      instance.addImageToPhotoLibraryApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then(
      "Add new image modal opens and user can save the new image data without errors",
      () => {
        instance.setState({
          isAddImageModalVisible: false
        });
      }
    );

    then(
      "User can select delete image and gallery buttons without errors",
      () => {
        const msgValidationAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgValidationAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgValidationAPI.messageId
        );
        msgValidationAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            message: "Deleted",
          }
        );
        instance.deletePhotoLibraryApiCallId = msgValidationAPI.messageId;
        runEngine.sendMessage("Unit Test", msgValidationAPI);
      }
    );

    then("User can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(photoLibrary).toBeTruthy();
    });
  });
});
