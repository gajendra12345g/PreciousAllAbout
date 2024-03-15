import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import UserActivity from "../../src/UserActivity.web";
import { Console } from "console";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    includes: jest.fn(),
    hideKeyboard: jest.fn(),
    length: jest.fn(),
    dispatch: jest.fn(),
    removeListener: jest.fn(),
  },
  id: "UserActivity",
};

const bookmarkData = {
    "data": [
        {
            "id": "15",
            "type": "bookmark",
            "attributes": {
                "id": 15,
                "account_id": 636,
                "catalogue_id": 483,
                "created_at": "2024-03-04T09:12:39.780Z",
                "updated_at": "2024-03-04T09:12:39.780Z",
                "images": {
                    "url": "https://qstockfullbrdincludingaicomponent-369205-ruby.b369205.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2NFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ce90ec05d644f2a437b9c290bbf00819f627b04d/lion.jpeg",
                    "status": "accepted",
                    "type": "image/jpeg"
                },
                "account_full_name": "Bhavya Modhiya",
                "account_profile_image": "no image"
            }
        }
    ]
}

const feature = loadFeature(
  "./__tests__/features/UserActivity-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserActivity", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UserActivity;

    given("I am a User loading UserActivity", () => {
      exampleBlockA = shallow(<UserActivity {...screenProps} />);
    });

    when("I navigate to the UserActivity", () => {
      instance = exampleBlockA.instance() as UserActivity;
    });

    then("UserActivity will load with out errors", () => {
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
          bookmarkData 
        );
        instance.getBookmarksApiItemCallId = msgValidationAPI.messageId;
        runEngine.sendMessage("Unit Test", msgValidationAPI);
        expect(exampleBlockA).toBeTruthy();
    });

    then("User can change the tabs", () => {
        exampleBlockA.find("#tabs").simulate("change", { target: { value: 2 } }, 2);
        exampleBlockA.find("#tabs").simulate("change", { target: { value: 3 } }, 3);
        exampleBlockA.find("#tabs").simulate("change", { target: { value: 4 } }, 4);
        exampleBlockA.find("#tabs").simulate("change", { target: { value: 5 } }, 5);
        exampleBlockA.find("#tabs").simulate("change", { target: { value: 6 } }, 6);
        exampleBlockA.find("#tabs").simulate("change", { target: { value: 7 } }, 7);
      });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
