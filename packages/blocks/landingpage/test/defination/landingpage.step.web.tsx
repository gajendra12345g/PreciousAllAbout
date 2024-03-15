//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import LandingPage from "../../src/LandingPage.web";
const navigation = require("react-navigation")

const searchListRes = {
  data: []
}

const feature = loadFeature(
  "./__tests__/features/LandingPage-scenario.web.features"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LandingPage", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;

    given("I am a User loading LandingPage", () => {
      landingPageBlock = shallow(<LandingPage navigation={{navigate : jest.fn()}} id={""} />);
    });

    when("I navigate to the LandingPage", () => {
      instance = landingPageBlock.instance() as LandingPage;
    });

    then("LandingPage will load with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });
    then("Search api will load", () => {
      const searchWrapper = landingPageBlock.findWhere((node) => node.prop('TestID') == 'searchCom')
      searchWrapper.props().clickSuggesion('val')
      const msgSearchRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgSearchRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgSearchRestAPI.messageId
      );
      msgSearchRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        searchListRes
      );
      instance.searchApiCallId = msgSearchRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSearchRestAPI);

      msgSearchRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: "api error" }
      );
      instance.searchApiCallId = msgSearchRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSearchRestAPI);
    })

    then("I can leave the screen with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
