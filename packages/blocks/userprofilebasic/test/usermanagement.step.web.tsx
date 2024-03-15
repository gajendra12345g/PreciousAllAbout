//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UserManagement from "../../src/UserManagement.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as utilities from "framework/src/Utilities";
import CustomTable from "../../../../components/src/DesignSystem/CustomTable/CustomTable.web";
import CustomDropDown from "../../../../components/src/DesignSystem/CustomDropDown/CustomDropDown.web";
import ModalComponent from "../../../../components/src/DesignSystem/Modalcomponent/ModalComponent.web";
const feature = loadFeature(
  "./__tests__/features/UserManagement-scenario.web.features"
);

const screenProps = {
  navigation: jest.fn(),
  id: "UserManagement"
};
const UserMockData = {
  accounts:{
  data: [
    {
      id: "548",
      type: "account",
      attributes: {
        email: "demo@gmail.com",
        full_name: "user1",
        role_type: "user",
        activated: true,
        country_code: null,
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: "EmailAccount",
        created_at: "Jan 29, 2024",
        updated_at: "2024-01-29T07:43:41.787Z",
        device_id: null,
        unique_auth_id: "TRcFpWWiQ3RrM8dD7pfFagtt",
        profile_images: {
          url:
            "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXNFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eb6d1eaeed380914083c24dfd801d9d7a394ecac/image_user.png",
          status: "regular"
        }
      }
    },
    {
      id: "547",
      type: "account",
      attributes: {
        email: "user5@deeporion.com",
        full_name: "user5",
        role_type: "user",
        activated: true,
        country_code: null,
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: "EmailAccount",
        created_at: "Jan 29, 2024",
        updated_at: "2024-01-29T07:43:41.787Z",
        device_id: null,
        unique_auth_id: "TRcFpWWiQ3RrM8dD7pfFagtt",
        profile_images: {
          url:
            "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXNFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eb6d1eaeed380914083c24dfd801d9d7a394ecac/image_user.png",
          status: "regular"
        }
      }
    },
    {
      id: "543",
      type: "account",
      attributes: {
        email: "user8@deeporion.com",
        full_name: "user8",
        role_type: "user",
        activated: true,
        country_code: null,
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: "EmailAccount",
        created_at: "Jan 29, 2024",
        updated_at: "2024-01-29T07:43:41.787Z",
        device_id: null,
        unique_auth_id: "TRcFpWWiQ3RrM8dD7pfFagtt",
        profile_images: {
          url:
            "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaXNFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eb6d1eaeed380914083c24dfd801d9d7a394ecac/image_user.png",
          status: "regular"
        }
      }
    }
  ]
}};
const SearchUserMock = {
  accounts:{
  data: [
    {
      id: "591",
      type: "account",
      attributes: {
        email: "user4@deqode.com",
        full_name: "user4",
        role_type: "moderator",
        activated: true,
        country_code: null,
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: "EmailAccount",
        created_at: "Jan 29, 2024",
        updated_at: "2024-01-29T11:36:21.084Z",
        device_id: null,
        unique_auth_id: "TKo3ToaH1Ns2DvZqNrsh0gtt",
        profile_images: {
          url:
            "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakFFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bfbec23a9c24b63f326a0ee03b27986386ccd99c/group_icon.png",
          status: "regular"
        }
      }
    }
  ]
}
};
const sortedUserMock = {accounts:{
  data: [
    {
      id: 2,
      type: "account",
      attributes: {
        email: "demo@gmail.com",
        full_name: null,
        role_type: null,
        activated: true,
        country_code: null,
        first_name: "amit",
        full_phone_number: "",
        last_name: "jain",
        phone_number: null,
        type: "EmailAccount",
        created_at: "Oct 05, 2023",
        updated_at: "2023-10-05T11:13:05.484Z",
        device_id: null,
        unique_auth_id: "Y5HI0bbeEcdP3MHUsXeNVAtt",
        profile_images: null
      }
    },
    {
      id: "3",
      type: "account",
      attributes: {
        email: "newaccount@gmail.com",
        full_name: null,
        role_type: null,
        activated: true,
        country_code: null,
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: null,
        created_at: "Oct 05, 2023",
        updated_at: "2023-10-05T11:24:35.568Z",
        device_id: null,
        unique_auth_id: "BHfsBEGTfNArfb8u6tB1egtt",
        profile_images: null
      }
    }
  ]
}
};
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
  jest
    .spyOn(utilities, "setStorageData")
    .mockImplementation(() => Promise.resolve());
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(utilities, "getStorageData").mockImplementation(key => {
      if (key === "authToken") {
        Promise.resolve(
          "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NTkzLCJleHAiOjE3MDkxODM2MTB9.whCID1SLTK7mfEZe2CgI4Jw7yK7bwZOn-E43yQw4CgCKSU3D78tgiGAGALsLMkRG_TkzuuWRX5M3BGa7uynMRQ"
        );
      }
    });
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to UserManagementPage", ({ given, when, then }) => {
    let UserManagementBlock: ShallowWrapper;
    let instance: UserManagement;

    given("I am a User loading UserManagementPage", () => {
      UserManagementBlock = shallow(<UserManagement {...screenProps} />);
    });

    when("I navigate to the UserManagementPage", async () => {
      instance = UserManagementBlock.instance() as UserManagement;
    });

    then("UserManagementPage will load with out errors", () => {
      expect(UserManagementBlock).toBeTruthy();
    });

    when("Get User Api will call", async () => {
      instance = UserManagementBlock.instance() as UserManagement;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
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
        UserMockData
      );
      instance.getUserManagementApiCall = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("all user data will display on the table", () => {
      UserManagementBlock = UserManagementBlock.update();
      expect(instance.state.receivedRequests[0].attributes.full_name).toEqual(
        UserMockData.accounts.data[0].attributes.full_name
      );
    });
    when("User Click on Delete Icon", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let deleteComponent = UserManagementBlock.find(CustomTable).dive().findWhere(
        node => node.prop("data-test-id") === "delete_icon-0"
      );
      deleteComponent.simulate("click");
    });
    then("DeleteModal will open", () => {
      expect(instance.state.showDeleteUserDialog).toEqual(true);
    });
    when("User Click on Cancel button", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let deleteComponent = UserManagementBlock.find(ModalComponent).dive().findWhere(
        node => node.prop("data-test-id") === "cancel_button"
      );
      deleteComponent.simulate("click");
    });
    then("DeleteModal will close", () => {
      expect(instance.state.showDeleteUserDialog).toEqual(false);
    });
    when("DeleteUserApi will call when user click on Confirm button", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let deleteComponent = UserManagementBlock.find(ModalComponent).dive().findWhere(
        node => node.prop("data-test-id") === "DeleteData"
      );
      deleteComponent.simulate("click");
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
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
          message: "Account is deleted"
        }
      );
      instance.getUserDeleteApiCall = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("Deleted User will remove from table", () => {
      expect(instance.state.receivedRequests.length).toEqual(
        UserMockData.accounts.data.length - 1
      );
    });

    when(
      "SearchUserApi will call when user search in search input",
      async () => {
        UserManagementBlock = UserManagementBlock.update();
        let SearchedComponent = UserManagementBlock.findWhere(
          node => node.prop("data-test-id") === "search_data"
        );
        SearchedComponent.simulate("change", { target: { value: "user4" } });
        instance = UserManagementBlock.instance() as UserManagement;
        jest.spyOn(instance, "send");
        const msgToken = new Message(
          getName(MessageEnum.SessionResponseMessage)
        );
        msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        msgToken.addData(
          getName(MessageEnum.SessionResponseData),
          JSON.stringify({ meta: { id: 1 } })
        );
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
          SearchUserMock
        );
        instance.getUserManagementApiCall = msgValidationAPI.messageId;
        runEngine.sendMessage("Unit Test", msgValidationAPI);
      }
    );
    then("Searched User will show on the table", () => {
      expect(instance.state.receivedRequests[0].attributes.full_name).toEqual(
        SearchUserMock.accounts.data[0].attributes.full_name
      );
    });
    when("SortApi will call when user select sort_order", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let SortedComponent = UserManagementBlock.find(CustomDropDown).dive().findWhere(
        node => node.prop("data-test-id") === "sort_option-1"
      );
      SortedComponent.simulate("click");
      instance = UserManagementBlock.instance() as UserManagement;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
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
        sortedUserMock
      );
      instance.getUserManagementApiCall = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("Sorted user list will on the table", () => {
      expect(instance.state.receivedRequests[0].attributes.full_name).toEqual(
        sortedUserMock.accounts.data[0].attributes.full_name
      );
    });
    when("User click on All tab", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let listComponent = UserManagementBlock.findWhere(
        node => node.prop("data-test-id") === "list_item-0"
      );
      listComponent.simulate("click");
    });
    then("active state will be 0", () => {
      expect(instance.state.active).toEqual(1);
    });
    when("User click on member tab", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let listComponent = UserManagementBlock.findWhere(
        node => node.prop("data-test-id") === "list_item-1"
      );
      listComponent.simulate("click");
    });
    then("active state will change to 1", () => {
      expect(instance.state.active).toEqual(2);
    });
    when("User click on group tab", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let listComponent = UserManagementBlock.findWhere(
        node => node.prop("data-test-id") === "list_item-2"
      );
      listComponent.simulate("click");
    });
    then("active state will change to 2", () => {
      expect(instance.state.active).toEqual(3);
    });
    when("PaginationApi will call when user click on specific page", async () => {
      UserManagementBlock = UserManagementBlock.update();
      let PaginationComponent = UserManagementBlock.findWhere(
        node => node.prop("data-test-id") === "test"
      );
      PaginationComponent.simulate("change",{event:"",value:1});

      instance = UserManagementBlock.instance() as UserManagement;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
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
        sortedUserMock
      );
      instance.getPaginationApi = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("Specific Userlist will on the table according to page number", () => {
      expect(instance.state.receivedRequests[0].attributes.email).toEqual(
        UserMockData.accounts.data[0].attributes.email
      );
    });
  });
});
