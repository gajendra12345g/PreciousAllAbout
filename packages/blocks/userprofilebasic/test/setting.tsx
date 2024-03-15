//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from "../../../../framework/src/RunEngine";
import React from "react";
import UserProfileSetting from "../../src/UserProfileSetting.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

const feature = loadFeature(
  "./__tests__/features/UserProfileSetting-scenario.web.feature"
);

class FormDataMock {
  private formData: Map<string, any[]>;

  constructor() {
    this.formData = new Map();
  }

  append(key: string, value: any): void {
    if (!this.formData.has(key)) {
      this.formData.set(key, []);
    }
    this.formData.get(key)!.push(value);
  }

  get(key: string): any[] {
    return this.formData.get(key) || [];
  }
}

Object.defineProperty(global, "FormData", {
  value: FormDataMock
});

const screenProps = {
  navigation: jest.fn(),
  id: "UserProfileSetting"
};

const event = { target: { checked: true } } as React.ChangeEvent<
  HTMLInputElement
>;
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
const data = {
  data: {
    id: "26",
    type: "profile",
    attributes: {
      id: 26,
      "photo,": null,
      "user_name,": "Harsh123",
      first_name: "Harsh"
    }
  }
};

defineFeature(feature, test => {
  jest
    .spyOn(utils, "setStorageData")
    .mockImplementation(() => Promise.resolve());
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to UserProfileSetting", ({ given, when, then }) => {
    let userProfileSettingPageBlock: ShallowWrapper;
    let instance: UserProfileSetting;

    given("I am a User loading UserProfileSetting", () => {
      userProfileSettingPageBlock = shallow(
        <UserProfileSetting {...screenProps} />
      );
    });

    when("I navigate to the UserProfileSetting", () => {
      instance = userProfileSettingPageBlock.instance() as UserProfileSetting;
    });

    then("UserProfileSetting will load with out errors", () => {
      expect(userProfileSettingPageBlock).toBeTruthy();
    });

    when("User change new content setting", () => {
      const newContent = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_newContent"
      );
      newContent.simulate("click");
      instance.onChangeNewContent(event);
    });

    then("new content state should be change", () => {
      expect(instance.state.newContent).toBe(true);
    });

    when("User change updates setting", () => {
      const updates = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_updates"
      );
      updates.simulate("click");
      instance.onChangeUpdates(event);
    });

    then("updates state should be change", () => {
      expect(instance.state.updates).toBe(true);
    });

    when("User change special and promotions setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_special"
      );
      node.simulate("click");
      instance.onChangeSpecialOffer(event);
    });

    then("special and promotions state should be change", () => {
      expect(instance.state.specialOffer).toBe(true);
    });

    when("User change inApp setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_inApp"
      );
      node.simulate("click");
      instance.onChangeInAppNotification(event);
    });

    then("inApp state should be change", () => {
      expect(instance.state.inAppNotification).toBe(true);
    });

    when("User change email setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_email"
      );
      node.simulate("click");
      instance.onChangeEmailNotification(event);
    });

    then("email state should be change", () => {
      expect(instance.state.emailNotification).toBe(true);
    });

    when("User change both setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_both"
      );
      node.simulate("click");
      instance.onChangeBoth(event);
    });

    then("both state should be change", () => {
      expect(instance.state.both).toBe(true);
    });
  });

  test("User navigates to UserProfileSetting Page", ({ given, when, then }) => {
    let userProfileSettingPageBlock: ShallowWrapper;
    let instance: UserProfileSetting;

    given("I am a User loading UserProfileSetting", () => {
      userProfileSettingPageBlock = shallow(
        <UserProfileSetting {...screenProps} />
      );
    });

    when("I navigate to the UserProfileSetting", () => {
      instance = userProfileSettingPageBlock.instance() as UserProfileSetting;
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        data
      );

      instance.getUserDetailsApiCalls = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);

      const msgApiupdate2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate2.messageId
      );

      msgApiupdate2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          id: 2,
          account_id: 87,
          in_app: true,
          email_notification: false,
          both: false,
          created_at: "2023-11-10T10:30:21.365Z",
          updated_at: "2023-11-10T10:30:21.365Z"
        }
      );

      instance.getCommunicationPreferencesApiCall = msgApiupdate2.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate2);

      const msgApiupdate3 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate3.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate3.messageId
      );

      msgApiupdate3.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
              "id": "401",
              "type": "setting",
              "attributes": {
                  "name": null,
                  "title": null,
                  "new_content": true,
                  "offers": true,
                  "in_app_notification": false,
                  "email_notification": false,
                  "updates": true,
                  "account_id": 709,
                  "both": false
              }
          }
      }
      );

      instance.getNotificationPreferencesApiCall = msgApiupdate3.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate3);
    });

    then("UserProfileSetting will load with out errors", () => {
      expect(userProfileSettingPageBlock).toBeTruthy();
    });

    when("User change new content setting", () => {
      const newContent = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_newContent"
      );
      newContent.simulate("click");
      instance.onChangeNewContent(event);

      const msgApiupdate3 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate3.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate3.messageId
      );

      msgApiupdate3.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          id: 2,
          account_id: 87,
          new_content: true,
          updates: false,
          offers_promotions: false,
          created_at: "2023-11-10T10:30:21.361Z",
          updated_at: "2023-11-10T10:30:21.361Z"
        }
      );

      instance.updateNotificationPreferencesApiCall = msgApiupdate3.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate3);
    });

    then("new content state should be change", () => {
      expect(instance.state.newContent).toBe(true);
    });

    when("User change updates setting", () => {
      const updates = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_updates"
      );
      updates.simulate("click");
      instance.onChangeUpdates(event);
    });

    then("updates state should be change", () => {
      expect(instance.state.updates).toBe(true);
    });

    when("User change special and promotions setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_special"
      );
      node.simulate("click");
      instance.onChangeSpecialOffer(event);
    });

    then("special and promotions state should be change", () => {
      expect(instance.state.specialOffer).toBe(true);
    });

    when("User change inApp setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_inApp"
      );
      node.simulate("click");
      instance.onChangeInAppNotification(event);

      const msgApiupdate2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate2.messageId
      );

      msgApiupdate2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          id: 2,
          account_id: 87,
          in_app: true,
          email_notification: false,
          both: false,
          created_at: "2023-11-10T10:30:21.365Z",
          updated_at: "2023-11-10T10:30:21.365Z"
        }
      );

      instance.updateCommunicationPreferencesApiCall = msgApiupdate2.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate2);
    });

    then("inApp state should be change", () => {
      expect(instance.state.inAppNotification).toBe(true);
    });

    when("User change email setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_email"
      );
      node.simulate("click");
      instance.onChangeEmailNotification(event);
    });

    then("email state should be change", () => {
      expect(instance.state.emailNotification).toBe(true);
    });

    when("User change both setting", () => {
      const node = userProfileSettingPageBlock.findWhere(
        node => node.prop("data-testId") === "switch_both"
      );
      node.simulate("click");
      instance.onChangeBoth(event);
    });

    then("both state should be change", () => {
      expect(instance.state.both).toBe(true);
    });

    when("User fetch the user profile details", () => {
      const msgApiupdate2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate2.messageId
      );

      msgApiupdate2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "325",
            type: "profile",
            attributes: {
              name: "Test",
              email: "test@mail.com",
              account_id: 399,
              photo: null,
              image: null
            }
          }
        }
      );

      instance.userProfileDetailsApi = msgApiupdate2.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate2);
    });
    then("user should get the name", () => {
      expect(instance.state.name).toEqual("Test");
    });
  });
});
