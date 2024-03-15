//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from "../../../../framework/src/RunEngine";
import React from "react";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import UserProfilePrivacyAndSecurity from "../../src/UserProfilePrivacyAndSecurity.web";

const feature = loadFeature(
  "./__tests__/features/UserProfilePrivacyAndSecurity.web.feature"
);

const screenProps = {
  navigation: jest.fn(),
  id: "UserProfilePrivacyAndSecurity"
};

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

  test("User navigates to UserProfilePrivacyAndSecurity", ({
    given,
    when,
    then
  }) => {
    let userProfilePrivacyAndSecurityBlock: ShallowWrapper;
    let instance: UserProfilePrivacyAndSecurity;

    given("I am a User loading UserProfilePrivacyAndSecurity", () => {
      userProfilePrivacyAndSecurityBlock = shallow(
        <UserProfilePrivacyAndSecurity {...screenProps} />
      );
    });

    when("I navigate to the UserProfilePrivacyAndSecurity", () => {
      instance = userProfilePrivacyAndSecurityBlock.instance() as UserProfilePrivacyAndSecurity;
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      msgApiupdate.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        visibility: "set_public",
        security_alert: "in_app_notification"
      });

      instance.visbilityAndSecurityAlertDetailApiCall = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);
    });

    then("UserProfilePrivacyAndSecurity will load with out errors", () => {
      expect(userProfilePrivacyAndSecurityBlock).toBeTruthy();
    });

    when("user can input old password", () => {
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

      instance.userProfileDetailsApi = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);
      instance.handleChangePassword({ value: "ACEace109" });
    });

    then("old password should be change", () => {
      expect(instance.state.oldPassword.length).toEqual(9);
    });

    when("user can input new password", () => {
      instance.handleNewPassword({ value: "ACEace109" });
    });

    then("new password should be change", () => {
      expect(instance.state.newPassword.length).toEqual(9);
    });

    when("user can input confirm password", () => {
      instance.handleChangeConfirmPassword({ value: "ACEace109" });
    });

    then("confirm password should be change", () => {
      expect(instance.state.confirmNewPassword.length).toEqual(9);
    });
    when("user set notification visibility", () => {
      let event = {
        target: {
          value: "Private"
        }
      } as React.ChangeEvent<HTMLInputElement>;
      instance.handleSetVisibility(event);
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      msgApiupdate.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: "update sucessfuly"
      });

      instance.updateVisibilityAndSecurityAlertApiCall = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);
    });

    then("visibility should be change", () => {
      expect(instance.state.visibility).toEqual("Private");
    });

    when("user set security alert", () => {
      let event = {
        target: {
          value: "emailAlert"
        }
      } as React.ChangeEvent<HTMLInputElement>;
      instance.handleAlert(event);
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      msgApiupdate.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        message: "update sucessfuly"
      });

      instance.updateVisibilityAndSecurityAlertApiCall = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);
    });

    then("alert should be change", () => {
      expect(instance.state.alertType).toEqual("emailAlert");
    });
  });

  test("User Can chnage password", ({ given, when, then }) => {
    let userProfilePrivacyAndSecurityBlock: ShallowWrapper;
    let instance: UserProfilePrivacyAndSecurity;

    given("I am a User loading UserProfilePrivacyAndSecurity", () => {
      userProfilePrivacyAndSecurityBlock = shallow(
        <UserProfilePrivacyAndSecurity {...screenProps} />
      );
    });

    when("I navigate to the UserProfilePrivacyAndSecurity", () => {
      instance = userProfilePrivacyAndSecurityBlock.instance() as UserProfilePrivacyAndSecurity;
    });

    then("UserProfilePrivacyAndSecurity will load with out errors", () => {
      expect(userProfilePrivacyAndSecurityBlock).toBeTruthy();
    });

    when("user can input old password", () => {
      instance.handleChangePassword({ value: "ACEace109" });
    });

    then("old password should be change", () => {
      expect(instance.state.oldPassword.length).toEqual(9);
    });

    when("user can input new password", () => {
      instance.handleNewPassword({ value: "ACEace109" });
    });

    then("new password should be change", () => {
      expect(instance.state.newPassword.length).toEqual(9);
    });

    when("user can input confirm password", () => {
      instance.handleChangeConfirmPassword({ value: "ACEace10" });
    });

    then("confirm password should be change", () => {
      expect(instance.state.confirmNewPassword.length).toEqual(8);
    });

    when("user submit the form", () => {
      const event = { preventDefault: jest.fn() } as React.SyntheticEvent;
      instance.handleSavePassword(event);
    });

    then("get error confrm password not matched", () => {
      expect(instance.state.passwordMatchError).toEqual(true);
    });

    when("user input confirmpass same as new pass and submit", () => {
      instance.handleCloseSnackBar();
      instance.handleChangeConfirmPassword({ value: "ACEace109" });
      const event = { preventDefault: jest.fn() } as React.SyntheticEvent;
      instance.handleSavePassword(event);
      const msgApiupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgApiupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgApiupdate.messageId
      );

      msgApiupdate.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        message: "password updated"
      });

      instance.updatePasswordApiCall = msgApiupdate.messageId;
      runEngine.sendMessage("Unit Test", msgApiupdate);
    });

    then("pass update successfully", () => {
      expect(instance.state.passwordMatchError).toEqual(false);
    });
  });
});
